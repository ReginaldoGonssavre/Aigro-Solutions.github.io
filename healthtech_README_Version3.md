# HealthTech Quantum Ecosystem - Automação & Integração Total

## Como criar um novo projeto/squad HealthTech Quantum

1. Execute o script automatizado:
   ```
   cd healthtech/scripts
   python new_project.py
   ```
2. Informe o nome do projeto/squad quando solicitado.

3. O script irá:
   - Criar a estrutura de diretórios e arquivos markdown de documentação.
   - Gerar uma planilha Google Sheets de tracking baseada em template.
   - Criar uma Epic no Jira e tarefas de kickoff já linkadas com a planilha.

4. Use os arquivos markdown para documentação, planos e logs.
5. Use a planilha para acompanhamento de atividades.
6. Gerencie o ciclo de vida do projeto no Jira (epics, stories, sprints, bugs).

---

## Benefícios

- Governança, rastreabilidade e integração em tempo real.
- Onboarding e reporting rápidos.
- Pronto para escalar squads e produtos HealthTech Quantum.

---

> Configure as credenciais de integração (service_account.json para Google Sheets e API Token para Jira) antes de executar o script.