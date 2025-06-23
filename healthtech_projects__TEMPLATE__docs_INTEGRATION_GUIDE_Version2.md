# Integração Automática HealthTech Quantum

## 1. Google Sheets (Tracking & Reporting)
- Cada novo projeto/squad gera automaticamente uma planilha Google Sheets baseada no template padrão.
- A planilha é usada para tracking de atividades, cronogramas, indicadores e status.
- O link para a planilha é criado e compartilhado no Jira automaticamente.
- Você pode conectar dashboards (PowerBI, DataStudio) diretamente nesta planilha.

## 2. Jira (Gestão Ágil)
- Ao criar um novo projeto/squad, uma Epic inicial é criada no Jira.
- Tarefas de kickoff (documentação, planejamento, integração) são populadas automaticamente.
- O link da planilha Google Sheets é adicionado na task “Integração Sheets”.
- Todas as tarefas, bugs e histórias do projeto devem ser criadas e rastreadas sob a Epic do projeto HealthTech.

## 3. Fluxo Automatizado
- Execute o script `new_project.py` para criar a estrutura local, Google Sheet e Epic Jira.
- Documentação, planos, testes e acompanhamento ficam sincronizados entre GitHub, Jira e Google Sheets.
- Use os templates markdown para toda documentação e uploads de artefatos.

## 4. Benefícios
- Governança total, rastreabilidade e integração entre squads, produto e gestão.
- Onboarding e reporting rápidos para novos projetos HealthTech Quantum-Ready.
- Pronto para escalar para múltiplos squads/produtos e stakeholders.

---

> **DICA:**  
> Customize o template do Google Sheets e os campos do Jira conforme sua operação.  
> Para integração contínua de dados, use Google Apps Script ou Zapier para atualizar dashboards automaticamente com base nos status do Jira/Sheets.