# Conceito de Design e Prototipagem (UI/UX) - Aplicativo de Simulação Imobiliária

## 1. Visão Geral do Aplicativo

O aplicativo será uma ferramenta essencial para corretores de imóveis, oferecendo simulações de financiamento imobiliário precisas e detalhadas, adaptadas a diversos bancos e perfis de clientes. O foco principal é a usabilidade, com uma interface intuitiva e moderna que agiliza o processo de simulação e apresentação de resultados.

## 2. Arquitetura do Aplicativo

O aplicativo será estruturado em módulos principais para facilitar a navegação e a organização das funcionalidades:

- **Tela Inicial (Dashboard):** Acesso rápido às principais funcionalidades.
- **Simulador de Financiamento:** Módulo central para todas as simulações.
- **Calculadora de Documentação:** Ferramenta para estimar custos adicionais.
- **Glossário Imobiliário:** Consulta rápida de termos.
- **Configurações/Perfil:** Personalização e informações sobre o app.

## 3. Conceito de Design (UI/UX)

### 3.1. Estilo Visual

- **Moderno e Clean:** Design minimalista com foco na clareza e legibilidade.
- **Profissional e Confiável:** Cores e elementos que transmitam seriedade e segurança.
- **Intuitivo:** Navegação fluida e elementos interativos de fácil compreensão.

### 3.2. Paleta de Cores

Será utilizada uma paleta de cores que transmita confiança e profissionalismo, com tons de azul e verde, complementados por cores neutras.

- **Azul Principal:** `#1E3A8A` (Azul Marinho - Confiança, Estabilidade)
- **Azul Secundário:** `#3B82F6` (Azul Médio - Modernidade, Tecnologia)
- **Verde Destaque:** `#10B981` (Verde Esmeralda - Crescimento, Sucesso)
- **Neutros:**
    - `#F9FAFB` (Branco Off-white - Fundo)
    - `#FFFFFF` (Branco Puro - Elementos, Cards)
    - `#6B7280` (Cinza Médio - Textos Secundários)
    - `#1F2937` (Cinza Escuro - Textos Principais)

### 3.3. Tipografia

Serão utilizadas fontes de fácil leitura, tanto para títulos quanto para o corpo do texto.

- **Títulos:** `Roboto Bold` ou `Montserrat Bold` (para impacto e clareza)
- **Corpo do Texto:** `Roboto Regular` ou `Open Sans Regular` (para legibilidade em telas pequenas)

### 3.4. Iconografia

Ícones serão simples, lineares e facilmente reconhecíveis, seguindo o estilo clean do aplicativo. Serão utilizados ícones que representem claramente as funcionalidades (ex: casa para imóvel, calculadora para simulação, etc.).

### 3.5. Layout e Estrutura das Telas

#### 3.5.1. Tela Inicial (Dashboard)

- **Cabeçalho:** Logo do aplicativo e nome "Diego Correia".
- **Boas-vindas:** Mensagem personalizada (ex: "Olá, Diego! Pronto para mais uma simulação?").
- **Cards de Acesso Rápido:** Botões grandes e intuitivos para:
    - Nova Simulação
    - Minhas Simulações (Favoritos)
    - Calculadora de Documentação
    - Glossário
- **Notificações/Dicas:** Área para exibir atualizações de taxas ou dicas rápidas.

#### 3.5.2. Tela de Simulação de Financiamento

- **Fluxo em Etapas:** O processo de simulação será dividido em etapas para não sobrecarregar o usuário.
    - **Etapa 1: Dados do Imóvel:** Valor, tipo (casa/apto/terreno), novo/usado.
    - **Etapa 2: Dados do Cliente:** Idade, estado civil, dependentes, renda (CLT/autônomo/MEI), histórico de crédito.
    - **Etapa 3: Detalhes do Financiamento:** Entrada (com FGTS), prazo, banco preferencial, programa (MCMV, SFI, SFH).
- **Validação em Tempo Real:** Feedback visual imediato sobre a validade dos dados inseridos.
- **Botões de Navegação:** "Próximo", "Voltar", "Simular".

#### 3.5.3. Tela de Resultados da Simulação

- **Resumo Visual:** Gráfico de pizza ou barras mostrando a distribuição do valor total (financiado, entrada, juros, taxas).
- **Cards de Destaque:** Valores principais em destaque (parcela inicial, valor máximo de financiamento, CET).
- **Seções Detalhadas (colapsáveis):**
    - **Detalhes do Financiamento:** Valor financiado, prazo, taxa de juros, tipo de tabela (SAC/PRICE).
    - **Custos Adicionais:** ITBI, registro, seguros (MIP/DFI).
    - **Gráfico de Amortização:** Interativo, mostrando saldo devedor e juros/amortização por período.
    - **Comparativo de Bancos:** Tabela simples comparando os resultados para os bancos selecionados.
- **Botões de Ação:** "Salvar Simulação", "Compartilhar PDF", "Nova Simulação".

#### 3.5.4. Tela de Calculadora de Documentação

- **Campo de Entrada:** Valor do imóvel.
- **Resultados:** ITBI, taxas de cartório, emolumentos (com base em Campina Grande - PB).
- **Detalhes:** Explicação breve de cada custo.

#### 3.5.5. Tela de Glossário Imobiliário

- **Lista Pesquisável:** Termos em ordem alfabética com campo de busca.
- **Detalhes do Termo:** Explicação clara e concisa ao clicar no termo.

#### 3.5.6. Tela de Configurações/Perfil

- **Informações do Corretor:** Nome "Diego Correia", CRECI, contato.
- **Personalização de Relatórios:** Opção para incluir/excluir nome nos PDFs.
- **Atualização de Taxas:** Botão para forçar a atualização das taxas (se houver conexão).
- **Sobre o Aplicativo:** Versão, créditos, mensagem de boas-vindas.

## 4. Experiência do Usuário (UX) Detalhada

- **Feedback Visual:** Animações sutis e indicadores de carregamento para operações demoradas.
- **Validações:** Mensagens de erro claras e sugestões de correção.
- **Navegação:** Uso de bottom navigation bar para acesso rápido às seções principais, e cabeçalhos com botão de voltar.
- **Salvar e Comparar:** Interface clara para gerenciar simulações salvas, permitindo renomear, excluir e comparar lado a lado.
- **Favoritos:** Ícone de estrela ou coração para marcar simulações importantes.

## 5. Acessibilidade

- **Tamanhos de Fonte Ajustáveis:** Respeitar as configurações de fonte do sistema.
- **Contraste de Cores:** Garantir contraste suficiente para legibilidade.
- **Descrições de Imagem:** Uso de `alt text` para ícones e imagens.
- **Navegação por Teclado:** Suporte para navegação sem toque (se aplicável).

## 6. Prototipagem (Wireframes Conceituais)

(Não é possível gerar imagens diretamente neste formato, mas o conceito visual será implementado no desenvolvimento do frontend.)

**Exemplo de Wireframe Conceitual (Tela de Simulação - Etapa 1):**

```
+-----------------------------------+
|  < Voltar  Simulação de Financiamento |
+-----------------------------------+
|                                   |
|       Etapa 1 de 3                |
|       Dados do Imóvel             |
|                                   |
|  [ Valor do Imóvel (R$) ]         |
|  [ Tipo de Imóvel (Casa/Apto) ]   |
|  [ Novo ou Usado (Radio) ]        |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                                   |
|                         
(Content truncated due to size limit. Use line ranges to read in chunks)