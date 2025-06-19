#!/bin/bash

# =============================================================================
# SCRIPTS DE AUTOMAÇÃO PARA AIGROQUANTUMSAAS
# =============================================================================

# -----------------------------------------------------------------------------
# 1. SCRIPT PRINCIPAL DE AUTOMAÇÃO
# -----------------------------------------------------------------------------

#!/bin/bash
# automate_aigro.sh - Script principal de automação

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configurações
PROJECT_NAME="AigroQuantumSaaS"
REPO_URL="https://github.com/ReginaldoGonssavre/Aigro-Solutions.github.io.git"
PROJECT_DIR="/var/www/aigro"
BACKUP_DIR="/var/backups/aigro"
LOG_FILE="/var/log/aigro/automation.log"

# Função de log
log() {
    echo -e "${BLUE}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a $LOG_FILE
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a $LOG_FILE
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a $LOG_FILE
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a $LOG_FILE
}

# Verificar se o script está sendo executado como root
check_permissions() {
    if [[ $EUID -eq 0 ]]; then
        warning "Script rodando como root. Recomendado usar sudo apenas quando necessário."
    fi
}

# Criar diretórios necessários
setup_directories() {
    log "Criando estrutura de diretórios..."
    
    sudo mkdir -p $PROJECT_DIR
    sudo mkdir -p $BACKUP_DIR
    sudo mkdir -p /var/log/aigro
    sudo mkdir -p /etc/aigro
    
    # Criar diretório de scripts
    mkdir -p scripts
    mkdir -p config
    
    success "Diretórios criados com sucesso!"
}

# Instalar dependências do sistema
install_dependencies() {
    log "Instalando dependências do sistema..."
    
    # Atualizar sistema
    sudo apt update && sudo apt upgrade -y
    
    # Instalar ferramentas essenciais
    sudo apt install -y \
        git \
        curl \
        wget \
        unzip \
        build-essential \
        nginx \
        postgresql \
        postgresql-contrib \
        redis-server \
        nodejs \
        npm \
        certbot \
        python3-certbot-nginx \
        htop \
        iotop \
        fail2ban \
        ufw
    
    # Instalar PM2 globalmente
    sudo npm install -g pm2
    
    success "Dependências instaladas com sucesso!"
}

# Configurar firewall
setup_firewall() {
    log "Configurando firewall..."
    
    sudo ufw --force reset
    sudo ufw default deny incoming
    sudo ufw default allow outgoing
    
    # Permitir SSH, HTTP, HTTPS
    sudo ufw allow ssh
    sudo ufw allow 'Nginx Full'
    sudo ufw allow 22
    sudo ufw allow 80
    sudo ufw allow 443
    
    sudo ufw --force enable
    
    success "Firewall configurado!"
}

# Clonar repositório
clone_repository() {
    log "Clonando repositório $PROJECT_NAME..."
    
    if [ -d "$PROJECT_DIR/.git" ]; then
        log "Repositório já existe. Atualizando..."
        cd $PROJECT_DIR
        git pull origin main
    else
        log "Clonando repositório..."
        sudo git clone $REPO_URL $PROJECT_DIR
        sudo chown -R $USER:$USER $PROJECT_DIR
    fi
    
    success "Repositório clonado/atualizado!"
}

# Configurar banco de dados
setup_database() {
    log "Configurando banco de dados PostgreSQL..."
    
    # Criar usuário e banco
    sudo -u postgres psql << EOF
CREATE USER aigro_user WITH PASSWORD 'aigro_secure_password_2024';
CREATE DATABASE aigro_quantum_db OWNER aigro_user;
GRANT ALL PRIVILEGES ON DATABASE aigro_quantum_db TO aigro_user;
\q
EOF
    
    success "Banco de dados configurado!"
}

# Instalar dependências do projeto
install_project_dependencies() {
    log "Instalando dependências do projeto..."
    
    cd $PROJECT_DIR
    
    # Instalar dependências
    npm install
    
    # Instalar dependências de produção se necessário
    if [ -f "package-lock.json" ]; then
        npm ci --only=production
    fi
    
    success "Dependências do projeto instaladas!"
}

# Configurar variáveis de ambiente
setup_environment() {
    log "Configurando variáveis de ambiente..."
    
    cd $PROJECT_DIR
    
    # Criar arquivo .env se não existir
    if [ ! -f ".env" ]; then
        cat > .env << EOF
# Configurações da Aplicação
NODE_ENV=production
PORT=3000
APP_NAME=AigroQuantumSaaS
APP_URL=https://yourdomain.com

# Banco de Dados
DATABASE_URL=postgresql://aigro_user:aigro_secure_password_2024@localhost/aigro_quantum_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aigro_quantum_db
DB_USER=aigro_user
DB_PASS=aigro_secure_password_2024

# Redis
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=$(openssl rand -base64 32)
JWT_EXPIRE=24h

# Email (configurar com suas credenciais)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Storage
UPLOAD_PATH=/var/www/aigro/uploads
MAX_FILE_SIZE=10MB

# API Keys (configurar conforme necessário)
OPENAI_API_KEY=your-openai-key
WEATHER_API_KEY=your-weather-key

# Monitoramento
SENTRY_DSN=your-sentry-dsn
LOG_LEVEL=info
EOF
        success "Arquivo .env criado!"
    else
        log "Arquivo .env já existe."
    fi
}

# Configurar Nginx
setup_nginx() {
    log "Configurando Nginx..."
    
    # Backup da configuração padrão
    sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.backup
    
    # Criar configuração do Nginx
    sudo tee /etc/nginx/sites-available/aigro << EOF > /dev/null
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Redirecionar para HTTPS
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration (será configurado pelo Certbot)
    # ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Main application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Static files
    location /static/ {
        alias $PROJECT_DIR/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Uploads
    location /uploads/ {
        alias $PROJECT_DIR/uploads/;
        expires 1M;
        add_header Cache-Control "public";
    }

    # API rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}

# Rate limiting
limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;
EOF

    # Habilitar site
    sudo ln -sf /etc/nginx/sites-available/aigro /etc/nginx/sites-enabled/
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Testar configuração
    sudo nginx -t
    
    # Reiniciar Nginx
    sudo systemctl restart nginx
    sudo systemctl enable nginx
    
    success "Nginx configurado!"
}

# Configurar PM2
setup_pm2() {
    log "Configurando PM2..."
    
    cd $PROJECT_DIR
    
    # Criar arquivo de configuração do PM2
    cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'aigro-quantum-saas',
    script: './app.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    error_file: '/var/log/aigro/pm2-error.log',
    out_file: '/var/log/aigro/pm2-out.log',
    log_file: '/var/log/aigro/pm2.log',
    time: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    node_args: '--max-old-space-size=1024'
  }]
};
EOF

    # Iniciar aplicação com PM2
    pm2 start ecosystem.config.js --env production
    pm2 save
    pm2 startup
    
    success "PM2 configurado!"
}

# Criar scripts de automação específicos
create_automation_scripts() {
    log "Criando scripts de automação específicos..."
    
    # Script de backup
    cat > scripts/backup.sh << 'EOF'
#!/bin/bash
# Backup automático da AigroQuantumSaaS

BACKUP_DIR="/var/backups/aigro"
DATE=$(date +%Y%m%d_%H%M%S)
PROJECT_DIR="/var/www/aigro"

# Criar backup do banco
pg_dump -h localhost -U aigro_user aigro_quantum_db > $BACKUP_DIR/db_backup_$DATE.sql

# Backup dos arquivos
tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz -C $PROJECT_DIR .

# Backup das configurações
cp -r /etc/nginx/sites-available/aigro $BACKUP_DIR/nginx_config_$DATE
cp $PROJECT_DIR/.env $BACKUP_DIR/env_backup_$DATE

# Limpeza de backups antigos (30 dias)
find $BACKUP_DIR -name "*backup*" -mtime +30 -delete

echo "Backup concluído: $DATE"
EOF

    # Script de monitoramento
    cat > scripts/monitor.sh << 'EOF'
#!/bin/bash
# Monitoramento da AigroQuantumSaaS

LOG_FILE="/var/log/aigro/monitor.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# Verificar se a aplicação está rodando
if ! pgrep -f "aigro-quantum-saas" > /dev/null; then
    echo "$DATE - ERRO: Aplicação não está rodando" >> $LOG_FILE
    pm2 restart aigro-quantum-saas
fi

# Verificar Nginx
if ! systemctl is-active --quiet nginx; then
    echo "$DATE - ERRO: Nginx não está rodando" >> $LOG_FILE
    sudo systemctl restart nginx
fi

# Verificar PostgreSQL
if ! systemctl is-active --quiet postgresql; then
    echo "$DATE - ERRO: PostgreSQL não está rodando" >> $LOG_FILE
    sudo systemctl restart postgresql
fi

# Verificar Redis
if ! systemctl is-active --quiet redis-server; then
    echo "$DATE - ERRO: Redis não está rodando" >> $LOG_FILE
    sudo systemctl restart redis-server
fi

# Verificar espaço em disco
DISK_USAGE=$(df / | awk 'NR==2 {print substr($5, 1, length($5)-1)}')
if [ $DISK_USAGE -gt 80 ]; then
    echo "$DATE - AVISO: Uso de disco alto: $DISK_USAGE%" >> $LOG_FILE
fi

echo "$DATE - Monitoramento executado com sucesso" >> $LOG_FILE
EOF

    # Script de atualização
    cat > scripts/update.sh << 'EOF'
#!/bin/bash
# Atualização automática da AigroQuantumSaaS

PROJECT_DIR="/var/www/aigro"
LOG_FILE="/var/log/aigro/update.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "$DATE - Iniciando atualização..." >> $LOG_FILE

cd $PROJECT_DIR

# Backup antes da atualização
./scripts/backup.sh

# Atualizar código
git pull origin main

# Atualizar dependências
npm install --production

# Executar migrações se existirem
if [ -f "migrate.js" ]; then
    node migrate.js
fi

# Rebuild se necessário
if [ -f "package.json" ] && grep -q "build" package.json; then
    npm run build
fi

# Reiniciar aplicação
pm2 restart aigro-quantum-saas

echo "$DATE - Atualização concluída" >> $LOG_FILE
EOF

    # Tornar scripts executáveis
    chmod +x scripts/*.sh
    
    success "Scripts de automação criados!"
}

# Configurar cron jobs
setup_cron_jobs() {
    log "Configurando tarefas agendadas..."
    
    # Criar arquivo de cron
    cat > /tmp/aigro_crontab << EOF
# Backup diário às 2:00 AM
0 2 * * * $PROJECT_DIR/scripts/backup.sh

# Monitoramento a cada 5 minutos
*/5 * * * * $PROJECT_DIR/scripts/monitor.sh

# Atualização semanal aos domingos às 3:00 AM
0 3 * * 0 $PROJECT_DIR/scripts/update.sh

# Limpeza de logs mensalmente
0 4 1 * * find /var/log/aigro -name "*.log" -mtime +30 -delete

# Reiniciar aplicação diariamente às 4:00 AM para limpeza de memória
0 4 * * * pm2 restart aigro-quantum-saas

# Verificar certificados SSL mensalmente
0 5 1 * * certbot renew --quiet
EOF

    # Instalar cron jobs
    crontab /tmp/aigro_crontab
    rm /tmp/aigro_crontab
    
    success "Tarefas agendadas configuradas!"
}

# Configurar SSL com Let's Encrypt
setup_ssl() {
    log "Configurando SSL com Let's Encrypt..."
    
    # Solicitar certificado SSL (substitua pelo seu domínio)
    read -p "Digite seu domínio (ex: yourdomain.com): " DOMAIN
    
    if [ ! -z "$DOMAIN" ]; then
        sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
        success "SSL configurado para $DOMAIN!"
    else
        warning "Domínio não informado. SSL não configurado."
    fi
}

# Script de deploy automático
create_deploy_script() {
    log "Criando script de deploy automático..."
    
    cat > scripts/deploy.sh << 'EOF'
#!/bin/bash
# Deploy automático da AigroQuantumSaaS

set -e

PROJECT_DIR="/var/www/aigro"
LOG_FILE="/var/log/aigro/deploy.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

echo "$DATE - Iniciando deploy..." >> $LOG_FILE

# Verificar se está na branch main
cd $PROJECT_DIR
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "$DATE - ERRO: Deploy deve ser feito a partir da branch main" >> $LOG_FILE
    exit 1
fi

# Backup antes do deploy
echo "$DATE - Criando backup..." >> $LOG_FILE
./scripts/backup.sh

# Atualizar código
echo "$DATE - Atualizando código..." >> $LOG_FILE
git pull origin main

# Instalar/atualizar dependências
echo "$DATE - Instalando dependências..." >> $LOG_FILE
npm install --production

# Executar testes se existirem
if [ -f "package.json" ] && grep -q "test" package.json; then
    echo "$DATE - Executando testes..." >> $LOG_FILE
    npm test
fi

# Build da aplicação
if [ -f "package.json" ] && grep -q "build" package.json; then
    echo "$DATE - Fazendo build..." >> $LOG_FILE
    npm run build
fi

# Executar migrações do banco
if [ -f "migrate.js" ]; then
    echo "$DATE - Executando migrações..." >> $LOG_FILE
    node migrate.js
fi

# Reiniciar aplicação
echo "$DATE - Reiniciando aplicação..." >> $LOG_FILE
pm2 restart aigro-quantum-saas

# Verificar se aplicação está rodando
sleep 10
if pgrep -f "aigro-quantum-saas" > /dev/null; then
    echo "$DATE - Deploy concluído com sucesso!" >> $LOG_FILE
else
    echo "$DATE - ERRO: Aplicação não está rodando após deploy" >> $LOG_FILE
    exit 1
fi

# Verificar health check se disponível
if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "$DATE - Health check passou!" >> $LOG_FILE
else
    echo "$DATE - AVISO: Health check falhou" >> $LOG_FILE
fi

echo "$DATE - Deploy finalizado" >> $LOG_FILE
EOF

    chmod +x scripts/deploy.sh
    success "Script de deploy criado!"
}

# Configurar monitoramento avançado
setup_advanced_monitoring() {
    log "Configurando monitoramento avançado..."
    
    # Script de relatório de sistema
    cat > scripts/system_report.sh << 'EOF'
#!/bin/bash
# Relatório de sistema da AigroQuantumSaaS

REPORT_FILE="/var/log/aigro/system_report_$(date +%Y%m%d_%H%M%S).txt"

echo "=== RELATÓRIO DE SISTEMA AIGROQUANTUMSAAS ===" > $REPORT_FILE
echo "Data: $(date)" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Informações do sistema
echo "=== INFORMAÇÕES DO SISTEMA ===" >> $REPORT_FILE
uname -a >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Uso de CPU
echo "=== USO DE CPU ===" >> $REPORT_FILE
top -bn1 | grep "Cpu(s)" >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Uso de memória
echo "=== USO DE MEMÓRIA ===" >> $REPORT_FILE
free -h >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Uso de disco
echo "=== USO DE DISCO ===" >> $REPORT_FILE
df -h >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Processos da aplicação
echo "=== PROCESSOS DA APLICAÇÃO ===" >> $REPORT_FILE
pm2 list >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Status dos serviços
echo "=== STATUS DOS SERVIÇOS ===" >> $REPORT_FILE
systemctl status nginx --no-pager >> $REPORT_FILE
systemctl status postgresql --no-pager >> $REPORT_FILE
systemctl status redis-server --no-pager >> $REPORT_FILE
echo "" >> $REPORT_FILE

# Logs recentes
echo "=== LOGS RECENTES (ÚLTIMAS 50 LINHAS) ===" >> $REPORT_FILE
tail -50 /var/log/aigro/pm2.log >> $REPORT_FILE

echo "Relatório salvo em: $REPORT_FILE"
EOF

    # Script de alertas
    cat > scripts/alerts.sh << 'EOF'
#!/bin/bash
# Sistema de alertas da AigroQuantumSaaS

EMAIL="admin@yourdomain.com"
LOG_FILE="/var/log/aigro/alerts.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

send_alert() {
    local subject="$1"
    local message="$2"
    
    echo "$DATE - ALERTA: $subject" >> $LOG_FILE
    echo "$message" | mail -s "$subject" $EMAIL
}

# Verificar uso de CPU
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
if (( $(echo "$CPU_USAGE > 80" | bc -l) )); then
    send_alert "AigroQuantumSaaS - CPU Alta" "Uso de CPU: $CPU_USAGE%"
fi

# Verificar uso de memória
MEMORY_USAGE=$(free | awk 'NR==2{printf "%.2f", $3*100/$2}')
if (( $(echo "$MEMORY_USAGE > 80" | bc -l) )); then
    send_alert "AigroQuantumSaaS - Memória Alta" "Uso de memória: $MEMORY_USAGE%"
fi

# Verificar uso de disco
DISK_USAGE=$(df / | awk 'NR==2 {print substr($5, 1, length($5)-1)}')
if [ $DISK_USAGE -gt 80 ]; then
    send_alert "AigroQuantumSaaS - Disco Cheio" "Uso de disco: $DISK_USAGE%"
fi

# Verificar se aplicação está respondendo
if ! curl -f http://localhost:3000 > /dev/null 2>&1; then
    send_alert "AigroQuantumSaaS - Aplicação Offline" "A aplicação não está respondendo"
fi

# Verificar certificado SSL
if command -v openssl &> /dev/null; then
    CERT_EXPIRY=$(echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates | grep notAfter | cut -d= -f2)
    CERT_EXPIRY_EPOCH=$(date -d "$CERT_EXPIRY" +%s)
    CURRENT_EPOCH=$(date +%s)
    DAYS_UNTIL_EXPIRY=$(( ($CERT_EXPIRY_EPOCH - $CURRENT_EPOCH) / 86400 ))
    
    if [ $DAYS_UNTIL_EXPIRY -lt 30 ]; then
        send_alert "AigroQuantumSaaS - Certificado SSL" "Certificado SSL expira em $DAYS_UNTIL_EXPIRY dias"
    fi
fi
EOF

    chmod +x scripts/system_report.sh scripts/alerts.sh
    success "Monitoramento avançado configurado!"
}

# Configurar segurança adicional
setup_security() {
    log "Configurando segurança adicional..."
    
    # Configurar fail2ban
    sudo tee /etc/fail2ban/jail.local << EOF > /dev/null
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true
port = ssh
logpath = /var/log/auth.log
maxretry = 3

[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log

[nginx-req-limit]
enabled = true
filter = nginx-req-limit
port = http,https
logpath = /var/log/nginx/error.log
maxretry = 10
EOF

    sudo systemctl enable fail2ban
    sudo systemctl restart fail2ban
    
    # Configurar logrotate
    sudo tee /etc/logrotate.d/aigro << EOF > /dev/null
/var/log/aigro/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
    postrotate
        pm2 reloadLogs
    endscript
}
EOF

    success "Segurança adicional configurada!"
}

# Função principal
main() {
    echo -e "${GREEN}"
    echo "==============================================="
    echo "  AUTOMAÇÃO AIGROQUANTUMSAAS"
    echo "==============================================="
    echo -e "${NC}"
    
    check_permissions
    setup_directories
    install_dependencies
    setup_firewall
    clone_repository
    setup_database
    install_project_dependencies
    setup_environment
    setup_nginx
    setup_pm2
    create_automation_scripts
    setup_cron_jobs
    setup_ssl
    create_deploy_script
    setup_advanced_monitoring
    setup_security
    
    echo -e "${GREEN}"
    echo "==============================================="
    echo "  AUTOMAÇÃO CONCLUÍDA COM SUCESSO!"
    echo "==============================================="
    echo -e "${NC}"
    
    echo "Próximos passos:"
    echo "1. Edite o arquivo .env com suas configurações específicas"
    echo "2. Configure seu domínio no Nginx"
    echo "3. Execute o primeiro deploy: ./scripts/deploy.sh"
    echo "4. Monitore os logs em /var/log/aigro/"
    echo ""
    echo "Scripts disponíveis:"
    echo "- ./scripts/backup.sh - Backup manual"
    echo "- ./scripts/deploy.sh - Deploy da aplicação"
    echo "- ./scripts/monitor.sh - Monitoramento manual"
    echo "- ./scripts/update.sh - Atualização do sistema"
    echo "- ./scripts/system_report.sh - Relatório do sistema"
    echo "- ./scripts/alerts.sh - Verificação de alertas"
    echo ""
    echo "Comandos úteis:"
    echo "- pm2 status - Status da aplicação"
    echo "- pm2 logs - Logs em tempo real"
    echo "- pm2 restart aigro-quantum-saas - Reiniciar aplicação"
    echo "- sudo systemctl status nginx - Status do Nginx"
    echo "- tail -f /var/log/aigro/automation.log - Logs de automação"
}

# Executar se chamado diretamente
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi

# -----------------------------------------------------------------------------
# 2. SCRIPT DE INICIALIZAÇÃO RÁPIDA
# -----------------------------------------------------------------------------

#!/bin/bash
# quick_setup.sh - Configuração rápida

echo "🚀 Configuração Rápida da AigroQuantumSaaS"
echo "=========================================="

# Verificar se o script principal existe
if [ ! -f "automate_aigro.sh" ]; then
    echo "❌ Script principal não encontrado!"
    echo "Baixando script de automação..."
    
    # Aqui você pode baixar o script ou criá-lo
    curl -o automate_aigro.sh https://raw.githubusercontent.com/seu-usuario/scripts/main/automate_aigro.sh
    chmod +x automate_aigro.sh
fi

# Executar automação
./automate_aigro.sh

echo "✅ Configuração rápida concluída!"

# -----------------------------------------------------------------------------
# 3. SCRIPT DE DIAGNÓSTICO
# -----------------------------------------------------------------------------

#!/bin/bash
# diagnose.sh - Diagnóstico do sistema

echo "🔍 Diagnóstico da AigroQuantumSaaS"
echo "================================="

# Verificar serviços
echo "📋 Verificando serviços..."
services=("nginx" "postgresql" "redis-server")
for service in "${services[@]}"; do
    if systemctl is-active --quiet $service; then
        echo "✅ $service está rodando"
    else
        echo "❌ $service não está rodando"
    fi
done

# Verificar PM2
echo ""
echo "📋 Verificando PM2..."
if pgrep -f "PM2" > /dev/null; then
    echo "✅ PM2 está rodando"
    pm2 list
else
    echo "❌ PM2 não está rodando"
fi

# Verificar recursos
echo ""
echo "📋 Verificando recursos do sistema..."
echo "CPU: $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')"
echo "Memória: $(free -h | awk 'NR==2{printf "%.2f%%", $3*100/$2}')"
echo "Disco: $(df -h / | awk 'NR==2{print $5}')"

# Verificar logs
echo ""
echo "📋 Últimos logs de erro..."
if [ -f "/var/log/aigro/pm2-error.log" ]; then
    tail -10 /var/log/aigro/pm2-error.log
else
    echo "Nenhum log de erro encontrado"
fi

echo ""
echo "🔍 Diagnóstico concluído!"

# -----------------------------------------------------------------------------
# 4. MAKEFILE PARA FACILITAR COMANDOS
# -----------------------------------------------------------------------------

# Makefile
.PHONY: help setup deploy backup monitor logs clean restart status

help:
	@echo "AigroQuantumSaaS - Comandos Disponíveis:"
	@echo "======================================="
	@echo "setup     - Configuração inicial completa"
	@echo "deploy    - Deploy da aplicação"
	@echo "backup    - Backup manual"
	@echo "monitor   - Monitoramento manual"
	@echo "logs      - Ver logs em tempo real"
	@echo "clean     - Limpeza do sistema"
	@echo "restart   - Reiniciar todos os serviços"
	@echo "status    - Status do sistema"
	@echo "diagnose  - Diagnóstico completo"

setup:
	@echo "🔧 Iniciando configuração..."
	@chmod +x automate_aigro.sh
	@./automate_aigro.sh

deploy:
	@echo "🚀 Executando deploy..."
	@./scripts/deploy.sh

backup:
	@echo "💾 Criando backup..."
	@./scripts/backup.sh

monitor:
	@echo "👁️ Executando monitoramento..."
	@./scripts/monitor.sh

logs:
	@echo "📄 Mostrando logs..."
	@pm2 logs --lines 100

clean:
	@echo "🧹 Limpando sistema..."
	@find /var/log/aigro -name "*.log" -mtime +7 -delete
	@pm2 flush

restart:
	@echo "🔄 Reiniciando serviços..."
	@pm2 restart all
	@sudo systemctl restart nginx
	@sudo systemctl restart postgresql
	@sudo systemctl restart redis-server

status:
	@echo "📊 Status do sistema:"
	@pm2 status
	@systemctl status nginx --no-pager -l
	@systemctl status postgresql --no-pager -l
	@systemctl status redis-server --no-pager -l

diagnose:
	@echo "🔍 Executando diagnóstico..."
	@chmod +x diagnose.sh
	@./diagnose.sh

# Comandos de desenvolvimento
dev-start:
	@echo "🛠️ Iniciando ambiente de desenvolvimento..."
	@npm run dev

dev-stop:
	@echo "🛑 Parando ambiente de desenvolvimento..."
	@pm2 stop all

dev-logs:
	@echo "📄 Logs de desenvolvimento..."
	@npm run logs

# Comandos de produção
prod-start:
	@echo "🏭 Iniciando ambiente de produção..."
	@pm2 start ecosystem.config.js --env production

prod-stop:
	@echo "🛑 Parando ambiente de produção..."
	@pm2 stop all

prod-reload:
	@echo "🔄 Recarregando aplicação..."
	@pm2 reload all