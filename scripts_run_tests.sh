#!/bin/bash
# scripts/run_tests.sh

echo "🧪 Executando testes da AigroQuantumSaaS..."

# Testes unitários
echo "Executando testes unitários..."
npm run test:unit

# Testes de integração
echo "Executando testes de integração..."
npm run test:integration

# Testes e2e
echo "Executando testes e2e..."
npm run test:e2e

# Análise de cobertura
echo "Gerando relatório de cobertura..."
npm run test:coverage

# Análise de código
echo "Executando análise de código..."
npm run lint
npm run audit

echo "✅ Todos os testes concluídos!"