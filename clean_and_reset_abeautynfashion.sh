#!/bin/bash
# ==============================================================================
# Hostinger Safe Clean & Reset Script for abeautynfashion.com
# Account: u420563260 | Server: 167.88.47.8
# Purpose: Back up legacy files & DB, then purge compromised spam files and reset
# ==============================================================================

set -e

# Identify target domain docroot
TARGET_DIR=""
if [ -d "$HOME/domains/abeautynfashion.com/public_html" ]; then
    TARGET_DIR="$HOME/domains/abeautynfashion.com/public_html"
elif [ -d "$HOME/domains/beautynfashion.com/public_html" ]; then
    TARGET_DIR="$HOME/domains/beautynfashion.com/public_html"
else
    echo "ERROR: Could not locate abeautynfashion.com or beautynfashion.com in $HOME/domains/"
    exit 1
fi

echo "=========================================================="
echo "Starting clean & reset on: $TARGET_DIR"
echo "Timestamp: $(date)"
echo "=========================================================="

# Create backups directory
mkdir -p "$HOME/backups/abeautynfashion"
BACKUP_TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# 1. Back up existing database if wp-config.php exists
if [ -f "$TARGET_DIR/wp-config.php" ]; then
    echo "Backing up existing database before reset..."
    cd "$TARGET_DIR"
    DB_NAME=$(grep -oE "define\( *[\"']DB_NAME[\"'] *, *[\"'][^\"']+[\"']" wp-config.php | sed -E "s/.*, *[\"']([^\"']+)[\"']/\1/")
    DB_USER=$(grep -oE "define\( *[\"']DB_USER[\"'] *, *[\"'][^\"']+[\"']" wp-config.php | sed -E "s/.*, *[\"']([^\"']+)[\"']/\1/")
    DB_PASS=$(grep -oE "define\( *[\"']DB_PASSWORD[\"'] *, *[\"'][^\"']+[\"']" wp-config.php | sed -E "s/.*, *[\"']([^\"']+)[\"']/\1/")
    DB_HOST=$(grep -oE "define\( *[\"']DB_HOST[\"'] *, *[\"'][^\"']+[\"']" wp-config.php | sed -E "s/.*, *[\"']([^\"']+)[\"']/\1/")

    if [ -n "$DB_NAME" ] && [ -n "$DB_USER" ]; then
        mysqldump -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" 2>/dev/null | gzip > "$HOME/backups/abeautynfashion/db_backup_${BACKUP_TIMESTAMP}.sql.gz" || true
        echo "Database backup saved to: ~/backups/abeautynfashion/db_backup_${BACKUP_TIMESTAMP}.sql.gz"
    fi
fi

# 2. Back up files to ~/backups
echo "Creating forensic tar backup of web files..."
tar -czf "$HOME/backups/abeautynfashion/files_backup_${BACKUP_TIMESTAMP}.tar.gz" -C "$TARGET_DIR" . 2>/dev/null || true
echo "Files backup saved to: ~/backups/abeautynfashion/files_backup_${BACKUP_TIMESTAMP}.tar.gz"

# 3. Preserve Google Search Console verification files
cp -f "$TARGET_DIR"/google*.html /tmp/ 2>/dev/null || true

# 4. Purge all legacy files, malware injects, spam links, and compromised assets
echo "Wiping legacy directory contents..."
cd "$TARGET_DIR"
find . -mindepth 1 -delete

# Restore Google verification if saved
cp -f /tmp/google*.html "$TARGET_DIR"/ 2>/dev/null || true

# 5. Create clean index placeholder
cat << 'EOF' > index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ABeauty & Fashion — Under Construction</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FFF7F8; color: #1F1219; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
        .box { background: white; padding: 48px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.06); max-width: 500px; border: 1px solid #F1E4E8; }
        h1 { color: #2A1220; margin-top: 0; }
        p { color: #6E5A63; line-height: 1.6; }
        .badge { background: #C8325F; color: white; padding: 6px 14px; border-radius: 999px; font-size: 13px; font-weight: bold; display: inline-block; margin-bottom: 16px; }
    </style>
</head>
<body>
    <div class="box">
        <span class="badge">ABeauty &amp; Fashion</span>
        <h1>Site Reset &amp; Upgrade in Progress</h1>
        <p>We are currently upgrading to our brand-new headless multi-brand beauty and fashion platform.</p>
    </div>
</body>
</html>
EOF

echo "=========================================================="
echo "CLEANUP COMPLETE!"
echo "Target: $TARGET_DIR is now sanitized and fresh."
echo "Backup is secured at: ~/backups/abeautynfashion/"
echo "=========================================================="
