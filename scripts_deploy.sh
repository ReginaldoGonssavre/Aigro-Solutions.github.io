#!/bin/bash
# scripts/deploy.sh

set -e
echo "🚀 Iniciando deploy da AigroQuantumSaaS..."

CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "❌ Deploy deve ser feito a partir da branch main"
    exit 1
fi

git pull origin main
npm install --production
npm test
npm run build
sudo systemctl stop aigro-api
sudo systemctl stop nginx
cp -r /var/www/aigro /var/www/aigro_backup_$(date +%Y%m%d_%H%M%S)
cp -r dist/* /var/www/aigro/
npm run migrate
sudo systemctl start aigro-api
sudo systemctl start nginx
sleep 10
curl -f http://localhost/health || exit 1
echo "✅ Deploy concluído com sucesso!"