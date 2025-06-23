import os
import shutil
import gspread
from jira import JIRA

# === CONFIGURAÇÕES ===
TEMPLATE_DIR = "projects/_TEMPLATE_"
PROJECTS_ROOT = "projects"

# Google Sheets
GOOGLE_SHEET_TEMPLATE_URL = "https://docs.google.com/spreadsheets/d/SEU_TEMPLATE_ID_AQUI"
GOOGLE_SERVICE_ACCOUNT_FILE = "service_account.json"  # Baixe do Google Cloud Console

# Jira
JIRA_SERVER = "https://seu-dominio.atlassian.net"
JIRA_USER = "seu_email@exemplo.com"
JIRA_API_TOKEN = "SEU_JIRA_API_TOKEN"
JIRA_PROJECT_KEY = "HTQ" # Exemplo: HealthTech Quantum

def create_new_project(project_name):
    # 1. Cria estrutura local
    project_path = os.path.join(PROJECTS_ROOT, project_name)
    if os.path.exists(project_path):
        print("Projeto já existe localmente.")
    else:
        shutil.copytree(TEMPLATE_DIR, project_path)
        print(f"Projeto '{project_name}' criado em {project_path}")

    # 2. Cria planilha Google Sheets a partir do template
    print("Criando Google Sheet...")
    gc = gspread.service_account(filename=GOOGLE_SERVICE_ACCOUNT_FILE)
    sh = gc.copy(GOOGLE_SHEET_TEMPLATE_URL.split("/")[-2], title=f"{project_name} - Tracking", copy_permissions=True)
    sheet_url = f"https://docs.google.com/spreadsheets/d/{sh.id}"
    print(f"Google Sheet criado: {sheet_url}")

    # 3. Cria Epic e Tarefas de Kickoff no Jira
    print("Criando Epic e tarefas no Jira...")
    jira = JIRA(server=JIRA_SERVER, basic_auth=(JIRA_USER, JIRA_API_TOKEN))
    epic = jira.create_issue(project=JIRA_PROJECT_KEY, summary=f"[{project_name}] Epic Inicial", issuetype={'name': 'Epic'})
    tasks = [
        ("Kickoff - Documentação", "Preencher documentação de iniciação."),
        ("Kickoff - Planejamento", "Montar cronograma e plano de ação."),
        ("Kickoff - Integração Sheets", f"Conectar Google Sheets: {sheet_url}"),
    ]
    for title, desc in tasks:
        jira.create_issue(project=JIRA_PROJECT_KEY, summary=f"[{project_name}] {title}", description=desc, issuetype={'name': 'Task'}, customfield_10011=epic.key)  # customfield_10011 = Epic Link (verifique seu campo Jira)

    print("Estrutura inicial Jira criada.")

    print("\n--- RESUMO ---")
    print(f"Projeto local: {project_path}")
    print(f"Google Sheet: {sheet_url}")
    print(f"Epic Jira: {epic.key} ({JIRA_SERVER}/browse/{epic.key})")


if __name__ == "__main__":
    nome = input("Nome do novo projeto/squad: ")
    create_new_project(nome)