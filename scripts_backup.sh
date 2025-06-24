#!/bin/bash
# scripts/backup.sh

BACKUP_DIR="/var/backups/aigro"
DATE=$(date +%Y%m%d_%H%M%S)
DATABASE_NAME="aigro_quantum"

mkdir -p $BACKUP_DIR
pg_dump $DATABASE_NAME > $BACKUP_DIR/db_backup_$DATE.sql
tar -czf $BACKUP_DIR/files_backup_$DATE.tar.gz /var/www/aigro/uploads
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
echo "Backup concluído: $DATE"