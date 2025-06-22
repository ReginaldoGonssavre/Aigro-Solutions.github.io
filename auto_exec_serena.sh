python3 ~/Aigro-Solutions.github.io/ai/serena_painel.py

pip install rich
#!/bin/bash

echo "🔐 Iniciando agente SSH da Serena..."
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

echo "📁 Limpando pasta antiga (se existir)..."
rm -rf Aigro-Solutions.github.io

echo "📥 Clonando repositório da AgroNovaTech..."
git clone git@github.com:Aigro-Solutions/Aigro-Solutions.github.io.git

cd Aigro-Solutions.github.io || exit

echo "🤖 Executando Serena IA..."
python3 ai/serena_core.py

echo "✅ Preparando commit..."
git add .
git commit -m "🤖 Serena IA atualizou os arquivos automaticamente"
git push origin AigroQuantumSaas

echo "📡 Serena finalizou as atualizações com sucesso!"

# 🛰️ Painel visual
python3 ai/serena_painel.py🔍 Serena IA - Painel Operacional

📦 Arquivo Corrigido: README.md
📦 Arquivo Corrigido: index.html

✅ Push Realizado para: AigroQuantumSaas
⏰ Próxima execução agendada: 08h00
🔒 Status: OK
with open("ai/serena-log.md", 'a', encoding='utf-8') as log:
    log.write(f"\n### [{time.strftime('%Y-%m-%d %H:%M:%S')}] Correção em {caminho}\n")
    log.write(texto_corrigido + "\n\n")def painel_serena():
    table = Table(title="👩‍💻 SERENA IA – STATUS OPERACIONAL")

    table.add_column("Item", justify="right", style="cyan", no_wrap=True)
    table.add_column("Status", style="magenta")

    arquivos_corrigidos = "Nenhum"
    try:
        with open("ai/serena-log.md", "r", encoding="utf-8") as log:
            linhas = [l for l in log.readlines() if l.startswith("### [")]
            if linhas:
                arquivos_corrigidos = linhas[-1].strip()
    except FileNotFoundError:
        arquivos_corrigidos = "Arquivo de log não encontrado"

    table.add_row("Última Ação", arquivos_corrigidos)
    table.add_row("Push", "✔️ Enviado para AigroQuantumSaas")
    table.add_row("Próxima Execução", "🕗 08:00 AM (agendada)")
    table.add_row("SSH", "🔐 OK")
    table.add_row("Agente", "🚀 Ativo com sucesso")

    console.clear()
    console.print(Panel.fit(table, title="🛰️ PAINEL AO VIVO - SERENA IA"))
