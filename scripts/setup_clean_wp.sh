#!/bin/bash
set -e

DOCROOT="$HOME/domains/abeautynfashion.com/public_html"
cd "$DOCROOT"

echo "=== 1. Extracting DB credentials ==="
DB_NAME=$(grep -oE "define\( *['\"]DB_NAME['\"] *, *['\"][^'\"]+['\"]" ~/temp_wp_config.php | sed -E "s/.*, *['\"]([^'\"]+)['\"]/\1/")
DB_USER=$(grep -oE "define\( *['\"]DB_USER['\"] *, *['\"][^'\"]+['\"]" ~/temp_wp_config.php | sed -E "s/.*, *['\"]([^'\"]+)['\"]/\1/")
DB_PASS=$(grep -oE "define\( *['\"]DB_PASSWORD['\"] *, *['\"][^'\"]+['\"]" ~/temp_wp_config.php | sed -E "s/.*, *['\"]([^'\"]+)['\"]/\1/")
DB_HOST="localhost"

echo "DB Host: $DB_HOST"
echo "DB Name: $DB_NAME"
echo "DB User: $DB_USER"

echo "=== 2. Creating clean wp-config.php ==="
wp config create \
  --dbname="$DB_NAME" \
  --dbuser="$DB_USER" \
  --dbpass="$DB_PASS" \
  --dbhost="$DB_HOST" \
  --dbprefix="bf_" \
  --force

echo "=== 3. Dropping legacy/compromised tables directly via MariaDB ==="
SQL="SET FOREIGN_KEY_CHECKS = 0; "
for tbl in $(mariadb -h localhost -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -Nse 'SHOW TABLES'); do
  SQL="${SQL}DROP TABLE IF EXISTS \`$tbl\`; "
done
SQL="${SQL}SET FOREIGN_KEY_CHECKS = 1;"
mariadb -h localhost -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -e "$SQL"
echo "Old tables count remaining: $(mariadb -h localhost -u "$DB_USER" -p"$DB_PASS" "$DB_NAME" -Nse 'SHOW TABLES' | wc -l)"

echo "=== 4. Installing fresh WordPress core ==="
ADMIN_USER="abf_admin"
ADMIN_PASS=$(head -c 16 /dev/urandom | base64 | tr -dc 'a-zA-Z0-9!@#%^&*')
ADMIN_EMAIL="md.rashidh@gmail.com"

wp core install \
  --url="https://www.abeautynfashion.com" \
  --title="ABeauty & Fashion" \
  --admin_user="$ADMIN_USER" \
  --admin_password="$ADMIN_PASS" \
  --admin_email="$ADMIN_EMAIL" \
  --skip-email

echo "WordPress installed successfully."

echo "=== 5. Setting up Pretty Permalinks for REST API ==="
wp rewrite structure '/%postname%/' --hard

echo "=== 6. Installing essential plugins (WooCommerce, WPGraphQL, LiteSpeed Cache) ==="
wp plugin install woocommerce --activate
wp plugin install wp-graphql --activate
wp plugin install litespeed-cache --activate

echo "=== 7. Cleaning up maintenance files ==="
rm -f "$DOCROOT/index.html"
rm -f ~/temp_wp_config.php

echo "=== 8. Storing admin credentials securely ==="
cat << CRED > "$HOME/abeautynfashion_credentials.txt"
======================================================
ABeauty & Fashion - Fresh Clean WordPress & WooCommerce
======================================================
Site URL:     https://www.abeautynfashion.com
Admin Login:  https://www.abeautynfashion.com/wp-admin
Username:     $ADMIN_USER
Password:     $ADMIN_PASS
Admin Email:  $ADMIN_EMAIL
REST API URL: https://www.abeautynfashion.com/wp-json/wc/v3/
GraphQL URL:  https://www.abeautynfashion.com/graphql
Installed At: $(date)
======================================================
CRED
chmod 600 "$HOME/abeautynfashion_credentials.txt"

echo "=== INSTALLATION COMPLETED SUCCESSFULLY ==="
cat "$HOME/abeautynfashion_credentials.txt"
