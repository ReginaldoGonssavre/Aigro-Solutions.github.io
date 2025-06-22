import openai
import os
from dotenv import load_dotenv

# Carrega variáveis do .env
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def tentar_modelos(mensagens):
    """
    Tenta gerar uma resposta usando o modelo GPT-4, e faz fallback para GPT-3.5-Turbo se não disponível.
    """
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=mensagens
        )
        return response
    except openai.error.InvalidRequestError:
        print("⚠️ GPT-4 indisponível. Usando gpt-3.5-turbo.")
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=mensagens
        )
        return response

def corrigir_arquivo(caminho):
    """
    Corrige o arquivo especificado usando o modelo de IA, adiciona comentários,
    aplica boas práticas e faz o log da correção.
    """
    print(f"🔧 Corrigindo arquivo: {caminho}")
    
    with open(caminho, 'r', encoding='utf-8') as file:
        conteudo = file.read()

    prompt = f"""
Você é Serena, uma IA engenheira de software. Analise e corrija o código abaixo:
- Corrija erros
- Adicione comentários claros
- Aplique boas práticas de programação
- Preserve o formato e a estrutura original

Código:
{conteudo}
"""

    mensagens = [
        {"role": "system", "content": "Você é uma engenheira de software especialista em correções e otimizações de código."},
        {"role": "user", "content": prompt}
    ]

    resposta = tentar_modelos(mensagens)
    texto_corrigido = resposta['choices'][0]['message']['content']

    with open(caminho, 'w', encoding='utf-8') as file:
        file.write(texto_corrigido)

    # Garante que o diretório ai/ existe antes de fazer log
    os.makedirs("ai", exist_ok=True)
    with open("ai/serena-log.md", 'a', encoding='utf-8') as log:
        log.write(f"\n### Correção em {caminho}\n{texto_corrigido}\n")

    print(f"✅ Arquivo corrigido com sucesso: {caminho}")

if __name__ == "__main__":
    arquivos_para_corrigir = ["index.html", "README.md"]
    for arquivo in arquivos_para_corrigir:
        if os.path.exists(arquivo):
            corrigir_arquivo(arquivo)