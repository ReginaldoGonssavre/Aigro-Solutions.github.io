#!/bin/bash
# scripts/monitor.sh

API_URL="https://your-domain.com/api/health"
EMAIL="admin@yourdomain.com"
LOG_FILE="/var/log/aigro/monitor.log"

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

ISSUES=0
if ! check_api; then ((ISSUES++)); fi
if ! check_disk; then ((ISSUES++)); fi
if ! check_memory; then ((ISSUES++)); fi

if [ $ISSUES -gt 0 ]; then
    echo "Problemas detectados na AigroQuantumSaaS. Verifique os logs em $LOG_FILE" | mail -s "Alerta AigroQuantumSaaS" $EMAIL
fi