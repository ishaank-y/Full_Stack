#!/bin/bash
set -xe

REPO_URL="${repo_url}"
APP_DIR="/opt/app"

dnf update -y
dnf install -y docker git
systemctl enable --now docker

# Install docker-compose v2 (standalone)
curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Get the app
rm -rf "$APP_DIR"
mkdir -p "$APP_DIR"
cd "$APP_DIR"
git clone "$REPO_URL" .

# Build & run
/usr/local/bin/docker-compose up -d --build

# Health marker
echo "deployed" > /opt/health.txt
