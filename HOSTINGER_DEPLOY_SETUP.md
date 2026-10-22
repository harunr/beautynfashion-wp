# beautynfashion.com - Hostinger Deployment & Git Setup

## 1. Project Overview & Environment Details

- **Local Path:** `c:\xampp\htdocs\works\beautynfashion-wp`
- **Target Hostinger Server:** `167.88.47.8`
- **SSH Port:** `65002`
- **SSH User:** `u420563260`
- **Hostinger Target Path:** `domains/beautynfashion.com/public_html/`
- **SSH Key Pair:** Uses `~/.ssh/id_rsa` and `~/.ssh/id_rsa.pub` from this PC (`Lenovo Yoga 730`).

---

## 2. Fast SSH Connection from this PC

An SSH alias has been created in `~/.ssh/config`. You can connect directly:
```bash
ssh beautynfashion
```
Or with full flags:
```bash
ssh -i ~/.ssh/id_rsa -p 65002 u420563260@167.88.47.8
```

> **Note:** If Hostinger gives "Permission denied", ensure the public key from `~/.ssh/id_rsa.pub` is pasted in **Hostinger hPanel** -> **Advanced** -> **SSH Access** -> **Add SSH Key**.

---

## 3. Recommended GitHub Actions Workflow

When ready to enable automated CI/CD for `beautynfashion-wp`, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Hostinger

on:
  push:
    branches: [master, main]
    paths:
      - 'backend/wp-content/themes/**'
      - 'backend/wp-content/mu-plugins/**'
      - 'wp-content/themes/**'
      - 'wp-content/mu-plugins/**'
      - '.github/workflows/deploy.yml'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_PRIVATE_KEY }}" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -p ${{ secrets.SSH_PORT }} ${{ secrets.SSH_HOST }} >> ~/.ssh/known_hosts

      - name: Test SSH Connectivity
        run: |
          ssh -i ~/.ssh/deploy_key -p ${{ secrets.SSH_PORT }} -o StrictHostKeyChecking=no \
            ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} "echo 'Hostinger Connected'"

      - name: Deploy Theme via rsync (safe scoped sync)
        run: |
          # If using backend/wp-content/themes or wp-content/themes:
          THEME_SRC=$( [ -d "backend/wp-content/themes" ] && echo "backend/wp-content/themes/" || echo "wp-content/themes/" )
          rsync -avz --delete \
            -e "ssh -i ~/.ssh/deploy_key -p ${{ secrets.SSH_PORT }} -o StrictHostKeyChecking=no" \
            --exclude '.git*' \
            "$THEME_SRC" \
            ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:domains/beautynfashion.com/public_html/wp-content/themes/

      - name: Deploy mu-plugins via rsync (copy-only, never delete)
        run: |
          MU_SRC=$( [ -d "backend/wp-content/mu-plugins" ] && echo "backend/wp-content/mu-plugins/" || echo "wp-content/mu-plugins/" )
          if [ -d "$MU_SRC" ]; then
            rsync -avz \
              -e "ssh -i ~/.ssh/deploy_key -p ${{ secrets.SSH_PORT }} -o StrictHostKeyChecking=no" \
              "$MU_SRC" \
              ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:domains/beautynfashion.com/public_html/wp-content/mu-plugins/
          fi

      - name: Purge LiteSpeed Cache
        run: |
          ssh -i ~/.ssh/deploy_key -p ${{ secrets.SSH_PORT }} -o StrictHostKeyChecking=no \
            ${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }} "wp --path=domains/beautynfashion.com/public_html litespeed-purge all || true"
```

---

## 4. GitHub Repository Secrets Checklist

Add these in your GitHub repository under **Settings** -> **Secrets and variables** -> **Actions**:

| Secret Name | Value |
| :--- | :--- |
| `SSH_HOST` | `167.88.47.8` |
| `SSH_PORT` | `65002` |
| `SSH_USER` | `u420563260` |
| `SSH_PRIVATE_KEY` | Contents of `C:\Users\Lenovo Yoga 730\.ssh\id_rsa` |
