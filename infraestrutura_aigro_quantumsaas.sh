#!/bin/bash
# --- AigroQuantumSaaS: Automatização, Deploy, Monitoramento, Testes e Infraestrutura ---

# --- VARIÁVEIS GLOBAIS ---
BACKUP_DIR="/var/backups/aigro"
DATE=$(date +%Y%m%d_%H%M%S)
DATABASE_NAME="aigro_quantum"
API_URL="https://your-domain.com/api/health"
EMAIL="admin@yourdomain.com"
LOG_FILE="/var/log/aigro/monitor.log"

# --- BACKUP ---
backup() {
  mkdir -p $BACKUP_DIR
  pg_dump $DATABASE_NAME > $BACKUP_DIR/db_backup_$DATE.sql
  tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz /var/www/aigro/uploads
  find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
  find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
  echo "Backup concluído: $DATE"
}

# --- DEPLOY ---
deploy() {
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
}

# --- MONITORAMENTO ---
log() {
  echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a $LOG_FILE
}
check_api() {
  if curl -f -s $API_URL > /dev/null; then
      log "✅ API está funcionando"
      return 0
  else
      log "❌ API não está respondendo"
      return 1
  fi
}
check_disk() {
  DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | cut -d'%' -f1)
  if [ $DISK_USAGE -gt 80 ]; then
      log "⚠️ Uso de disco alto: ${DISK_USAGE}%"
      return 1
  else
      log "✅ Uso de disco OK: ${DISK_USAGE}%"
      return 0
  fi
}
check_memory() {
  MEMORY_USAGE=$(free | awk 'NR==2{printf "%.2f", $3*100/$2}')
  if (( $(echo "$MEMORY_USAGE > 80" | bc -l) )); then
      log "⚠️ Uso de memória alto: ${MEMORY_USAGE}%"
      return 1
  else
      log "✅ Uso de memória OK: ${MEMORY_USAGE}%"
      return 0
  fi
}
monitor() {
  ISSUES=0
  if ! check_api; then ((ISSUES++)); fi
  if ! check_disk; then ((ISSUES++)); fi
  if ! check_memory; then ((ISSUES++)); fi
  if [ $ISSUES -gt 0 ]; then
      echo "Problemas detectados na AigroQuantumSaaS. Verifique os logs em $LOG_FILE" | mail -s "Alerta AigroQuantumSaaS" $EMAIL
  fi
}

# --- TESTES AUTOMATIZADOS ---
testes() {
  echo "🧪 Executando testes da AigroQuantumSaaS..."
  echo "Executando testes unitários..."
  npm run test:unit
  echo "Executando testes de integração..."
  npm run test:integration
  echo "Executando testes e2e..."
  npm run test:e2e
  echo "Gerando relatório de cobertura..."
  npm run test:coverage
  echo "Executando análise de código..."
  npm run lint
  npm run audit
  echo "✅ Todos os testes concluídos!"
}

# --- MENU PRINCIPAL ---
case "$1" in
  backup)
    backup
    ;;
  deploy)
    deploy
    ;;
  monitor)
    monitor
    ;;
  test|testes)
    testes
    ;;
  all)
    backup
    deploy
    monitor
    testes
    ;;
  *)
    echo "Uso: $0 {backup|deploy|monitor|test|all}"
    echo "Exemplos:"
    echo "  $0 backup      # Executa backup completo"
    echo "  $0 deploy      # Executa deploy automático"
    echo "  $0 monitor     # Executa monitoramento"
    echo "  $0 test        # Executa todos os testes"
    echo "  $0 all         # Executa backup, deploy, monitoramento e testes"
    exit 1
    ;;
esac