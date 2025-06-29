# 📊 Datadog Metrics Fetcher

Este script em Node.js coleta métricas horárias de uma consulta do Datadog ao longo de um intervalo de dias e exporta os resultados para um arquivo `.txt`.

## 🧠 O que ele faz

- Executa uma query definida para o Datadog usando as APIs `API_KEY` e `APP_KEY`
- Calcula a média horária dos pontos coletados para cada hora e dia definidos
- Exporta os resultados para um arquivo `.txt` com base no mês definido

---

## 📦 Pré-requisitos

- Node.js >= 14
- Uma conta ativa no Datadog
- Chaves de API e APP configuradas

---

## ⚙️ Instalação

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
```

## 🛠️ Configuração

Crie um arquivo `.env` na raiz do projeto com os seguintes campos:

```env
API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
APP_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
API_URL=https://api.datadoghq.com/api/v1/query
QUERY=avg:system.cpu.user{*}
DAY_START=1
DAY_END=7
MONTH=6
FILE=resultado
```

## 🧾 Descrição das variáveis

| Variável | Descrição |
|----------|-----------|
| `API_KEY` | Chave de API do Datadog |
| `APP_KEY` | Chave de Aplicação do Datadog |
| `API_URL` | URL da API de query do Datadog |
| `QUERY` | A query que será executada (ex: `avg:system.cpu.user{*}`) |
| `DAY_START` | Dia inicial para começar a coleta (ex: 1) |
| `DAY_END` | Dia final para encerrar a coleta (ex: 7) |
| `MONTH` | Mês da coleta (número entre 1-12) |
| `FILE` | Nome base do arquivo de saída (ex: resultado) |

## ▶️ Execução

Para rodar o script:

```bash
node index.js
```

O script criará um arquivo no formato `resultado_6.txt` (com base no valor de `FILE` e `MONTH`), contendo as médias horárias.

## 📝 Exemplo de saída

```
Dia 1 0H00 = 15
Dia 1 1H00 = 20
Dia 1 2H00 = 18
...
Dia 7 23H00 = 22
```

## 🧼 Observações

- O script não sobrescreve o arquivo de saída. Ele anexa (append) os dados, então exclua o arquivo manualmente antes de uma nova execução, se necessário
- Caso a query não retorne dados, o valor registrado será 0

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através do GitHub Issues.
