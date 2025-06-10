# Pesquisa de Requisitos para o Aplicativo de Simulação Imobiliária

## 1. Regras de Financiamento - Caixa Econômica Federal (Minha Casa Minha Vida)

### 1.1. Público Alvo e Renda
- **Renda Familiar Mensal Bruta:** Até R$ 8.600,00 para programas de habitação popular.
- **Renda Familiar Mensal Bruta:** Até R$ 12.000,00 para operações enquadradas no programa Classe Média.

### 1.2. Tipo de Imóveis
- Somente imóveis residenciais (novos ou usados).
- Podem estar situados em área urbana ou rural.
- Financiamento com recursos do FGTS.

### 1.3. Modalidades
- Aquisição de unidade habitacional.
- Construção de unidade habitacional.
- Aquisição de Terreno e Construção de unidade habitacional.

### 1.4. Taxa de Juros
- Varia entre 4,50% a.a. e 10% a.a., conforme a renda familiar mensal bruta e o ano orçamentário da contratação.

### 1.5. Prazos
- **Prazo máximo:** 420 meses (35 anos).

### 1.6. Limite de Idade
- A soma da idade do proponente mais velho e o prazo do financiamento não pode ultrapassar 80 anos e 6 meses.

### 1.7. Valores Máximos dos Imóveis (Minha Casa Minha Vida - Faixas 1 e 2)
- **Imóvel Urbano:** Valor máximo de R$ 264.000,00.

### 1.8. Cota de Financiamento
- **Imóveis novos:** Até 80% do valor do imóvel em todo o Brasil.
- **Imóveis usados:**
    - 60% nas regiões Sul e Sudeste.
    - 80% para as demais localidades (incluindo Paraíba).

### 1.9. Subsídios
- Unidades habitacionais subsidiadas para famílias com renda mensal bruta até R$ 2.640,00 (moradias urbanas) e renda anual bruta até R$ 31.680,00 (moradias rurais).

## 2. Regras de Financiamento - Banco do Brasil

### 2.1. Público Alvo
- Pessoas físicas com capacidade de pagamento.

### 2.2. Tipo de Imóveis
- Residenciais (novos ou usados).

### 2.3. Taxa de Juros
- Variável, conforme perfil do cliente e relacionamento com o banco.

### 2.4. Prazos
- Até 360 meses (30 anos).

### 2.5. Cota de Financiamento
- Geralmente até 80% do valor do imóvel.

### 2.6. Uso do FGTS
- Pode ser utilizado para entrada, amortização ou liquidação do saldo devedor.

## 3. Regras de Financiamento - Bradesco

### 3.1. Público Alvo
- Pessoas físicas com renda comprovada.

### 3.2. Tipo de Imóveis
- Residenciais (novos ou usados).

### 3.3. Taxa de Juros
- Variável, conforme relacionamento e análise de crédito.

### 3.4. Prazos
- Até 360 meses (30 anos).

### 3.5. Cota de Financiamento
- Até 80% do valor do imóvel.

### 3.6. Uso do FGTS
- Sim, permitido.

## 4. Regras de Financiamento - Itaú

### 4.1. Público Alvo
- Pessoas físicas.

### 4.2. Tipo de Imóveis
- Residenciais (novos ou usados).

### 4.3. Taxa de Juros
- Variável, com opções de taxas pré-fixadas e pós-fixadas.

### 4.4. Prazos
- Até 360 meses (30 anos).

### 4.5. Cota de Financiamento
- Até 80% do valor do imóvel.

### 4.6. Uso do FGTS
- Sim, permitido.

## 5. Regras de Financiamento - Santander

### 5.1. Público Alvo
- Pessoas físicas.

### 5.2. Tipo de Imóveis
- Residenciais (novos ou usados).

### 5.3. Taxa de Juros
- Variável, com opções de taxas competitivas.

### 5.4. Prazos
- Até 420 meses (35 anos).

### 5.5. Cota de Financiamento
- Até 80% do valor do imóvel.

### 5.6. Uso do FGTS
- Sim, permitido.

## 6. Regras de Financiamento - Bancos Digitais (Nubank, Inter, C6 Bank)

### 6.1. Nubank
- Atualmente, o Nubank não oferece financiamento imobiliário direto. Eles possuem parcerias ou produtos relacionados a empréstimos com garantia de imóvel, mas não financiamento para aquisição.

### 6.2. Banco Inter
- **Público Alvo:** Pessoas físicas.
- **Tipo de Imóveis:** Residenciais (novos ou usados).
- **Taxa de Juros:** Geralmente competitivas, com processo 100% digital.
- **Prazos:** Até 360 meses (30 anos).
- **Cota de Financiamento:** Até 80% do valor do imóvel.
- **Uso do FGTS:** Sim, permitido.

### 6.3. C6 Bank
- **Público Alvo:** Pessoas físicas.
- **Tipo de Imóveis:** Residenciais (novos ou usados).
- **Taxa de Juros:** Variável, com foco em agilidade no processo.
- **Prazos:** Até 360 meses (30 anos).
- **Cota de Financiamento:** Até 80% do valor do imóvel.
- **Uso do FGTS:** Sim, permitido.

## 7. Variáveis do Cliente para Simulação

### 7.1. Dados Pessoais
- **Idade:** Mínima de 18 anos. Máxima para somar com o prazo do financiamento (geralmente 80 anos e 6 meses).
- **Estado Civil:** Influencia na composição da renda familiar e na documentação.
- **Número de Dependentes:** Pode influenciar na análise de renda e capacidade de pagamento.

### 7.2. Renda
- **Renda Bruta Familiar:** Soma da renda de todos os proponentes.
- **Comprovação de Renda:**
    - **CLT:** Holerites, carteira de trabalho, declaração de imposto de renda.
    - **Autônomo/Profissional Liberal:** Declaração de imposto de renda, extratos bancários, DECORE (Declaração Comprobatória de Percepção de Rendimentos).
    - **MEI:** Declaração Anual do Simples Nacional (DASN-SIMEI), extratos bancários.

### 7.3. Histórico de Crédito
- **Outros Financiamentos/Empréstimos:** Impactam a capacidade de pagamento (comprometimento de renda).
- **Restrições:** Nome negativado impede o financiamento.

### 7.4. Tipo de Imóvel
- **Valor do Imóvel:** Base para cálculo do financiamento.
- **Tipo de Imóvel:** Casa, apartamento, terreno (para construção).
- **Novo ou Usado:** Influencia na cota de financiamento e nas taxas de juros em alguns programas.

### 7.5. Entrada
- **Valor da Entrada:** Percentual do valor do imóvel pago à vista.
- **Uso de FGTS:** Pode ser usado total ou parcialmente como entrada.

### 7.6. Prazo do Financiamento
- Opções de prazos variados (ex: 120, 180, 240, 360, 420 meses).

### 7.7. Programas Governamentais/Bancários
- **Minha Casa Minha Vida (MCMV):** Faixas de renda e subsídios específicos.
- **ProCotista:** Linha de crédito com recursos do FGTS para trabalhadores com conta vinculada.
- **SFI (Sistema de Financiamento Imobiliário):** Utiliza recursos de poupança e letras de crédito imobiliário. Taxas de mercado.
- **SFH (Sistema Financeiro da Habitação):** Utiliza recursos do FGTS e SBPE (Sistema Brasileiro de Poupança e Empréstimo). Taxas limitadas.

## 8. Resultados Detalhados da Simulação

### 8.1. Valores Financeiros
- **Valor máximo de financiamento:** Baseado na renda e idade.
- **Valor da parcela inicial e final:**
    - **Tabela SAC (Sistema de Amortização Constante):** Parcelas decrescentes.
    - **Tabela PRICE:** Parcelas fixas.
- **Taxa de juros:** Nominal e efetiva anual.
- **Custo Efetivo Total (CET):** Inclui juros, taxas, seguros e outros encargos.
- **Valor total a ser pago:** Soma de todas as parcelas.

### 8.2. Seguros Obrigatórios
- **MIP (Morte e Invalidez Permanente):** Garante a quitação do saldo devedor em caso de morte ou invalidez do segurado.
- **DFI (Danos Físicos do Imóvel):** Cobre danos ao imóvel por eventos como incêndio, alagamento, etc.

### 8.3. Custos de Impostos e Taxas (Campina Grande - Paraíba)
- **ITBI (Imposto sobre Transmissão de Bens Imóveis):** Imposto municipal sobre a transferência de propriedade.
    - **Alíquota em Campina Grande:** Geralmente 2% a 3% do valor do imóvel ou do valor venal (o maior).
- **Registro de Imóveis:** Custas cartorárias para registrar o imóvel em nome do comprador.
    - **Tabela de Emolumentos:** Varia conforme o valor do imóvel e é definida pelo Tribunal de Justiça da Paraíba.
- **Taxas de Cartório:** Outras taxas para certidões e averbações.

### 8.4. Gráfico de Amortização
- Representação visual do saldo devedor ao longo do tempo, mostrando a evolução da amortização e dos juros.

## 9. Interface e Usabilidade

### 9.1. Design Intuitivo
- Interface limpa, moderna e de fácil navegação.
- Ícones claros e fluxos lógicos.

### 9.2. Experiência do Usuário (UX)
- Campos de entrada de dados otimizados (teclado numérico, máscaras).
- Validações de dados em tempo real.
- Resultados claros e organizados (resumos e detalhes).
- Possibilidade de salvar e comparar múltiplas simulações.
- Funcionalidade de "Favoritos".

### 9.3. Acessibilidade
- Design responsivo para diferentes tamanhos de tela.

## 10. Recursos Adicionais e Personalização

### 10.1. Compartilhamento de Simulações
- Geração de relatórios em PDF com resultados.
- Envio via WhatsApp, e-mail.
- Relatório profissional e personalizável com o nome do corretor.

### 10.2. Calculadora de Documentação
- Seção dedicada para calcular ITBI, taxas de cartório e emolumentos para Campina Grande.

### 10.3. Glossário Imobiliário
- Mini-glossário com termos comuns.

### 10.4. Atualização de Taxas
- Mecanismo para atualização automática das taxas de juros e condições dos bancos.

### 10.5. Personalização "Diego Correia"
- Nome "Diego Correia" em tela "Sobre o Aplicativo" ou "Desenvolvedor".
- Nome "Diego Correia" como padrão nos relatórios.
- Mensagem de boas-vindas personalizável na primeira inicialização.

## 11. Aspectos Técnicos

### 11.1. Performance
- Aplicativo leve e rápido.
- Otimizado para não consumir muitos recursos.

### 11.2. Segurança
- Garantir segurança dos dados.
- Não armazenar informações sensíveis do cliente (simulações efêmeras).

### 11.3. Offline First
- Simulações básicas sem conexão com a internet.
- Dados previamente sincronizados (taxas de juros mais recentes).

