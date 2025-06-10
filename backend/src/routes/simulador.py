from flask import Blueprint, request, jsonify
import math

simulador_bp = Blueprint('simulador', __name__)

# Dados dos bancos com suas respectivas taxas e condições
BANCOS_DATA = {
    'caixa': {
        'nome': 'Caixa Econômica Federal',
        'taxa_juros_mcmv': 0.0499,  # 4.99% ao ano
        'taxa_juros_sfh': 0.0899,   # 8.99% ao ano
        'taxa_juros_sfi': 0.1099,   # 10.99% ao ano
        'entrada_minima': 0.10,     # 10%
        'prazo_maximo': 420,        # 35 anos
        'idade_maxima': 80,
        'renda_maxima_mcmv': 8000,
        'valor_maximo_mcmv': 350000,
        'comprometimento_maximo': 0.30
    },
    'bb': {
        'nome': 'Banco do Brasil',
        'taxa_juros_mcmv': 0.0549,  # 5.49% ao ano
        'taxa_juros_sfh': 0.0949,   # 9.49% ao ano
        'taxa_juros_sfi': 0.1149,   # 11.49% ao ano
        'entrada_minima': 0.20,     # 20%
        'prazo_maximo': 420,        # 35 anos
        'idade_maxima': 80,
        'renda_maxima_mcmv': 8000,
        'valor_maximo_mcmv': 350000,
        'comprometimento_maximo': 0.30
    },
    'bradesco': {
        'nome': 'Bradesco',
        'taxa_juros_sfh': 0.0999,   # 9.99% ao ano
        'taxa_juros_sfi': 0.1199,   # 11.99% ao ano
        'entrada_minima': 0.20,     # 20%
        'prazo_maximo': 420,        # 35 anos
        'idade_maxima': 75,
        'comprometimento_maximo': 0.30
    },
    'itau': {
        'nome': 'Itaú',
        'taxa_juros_sfh': 0.0949,   # 9.49% ao ano
        'taxa_juros_sfi': 0.1149,   # 11.49% ao ano
        'entrada_minima': 0.20,     # 20%
        'prazo_maximo': 420,        # 35 anos
        'idade_maxima': 75,
        'comprometimento_maximo': 0.30
    },
    'santander': {
        'nome': 'Santander',
        'taxa_juros_sfh': 0.0999,   # 9.99% ao ano
        'taxa_juros_sfi': 0.1249,   # 12.49% ao ano
        'entrada_minima': 0.20,     # 20%
        'prazo_maximo': 420,        # 35 anos
        'idade_maxima': 75,
        'comprometimento_maximo': 0.30
    },
    'inter': {
        'nome': 'Banco Inter',
        'taxa_juros_sfh': 0.0899,   # 8.99% ao ano
        'taxa_juros_sfi': 0.1099,   # 10.99% ao ano
        'entrada_minima': 0.20,     # 20%
        'prazo_maximo': 360,        # 30 anos
        'idade_maxima': 75,
        'comprometimento_maximo': 0.30
    },
    'c6': {
        'nome': 'C6 Bank',
        'taxa_juros_sfh': 0.0949,   # 9.49% ao ano
        'taxa_juros_sfi': 0.1149,   # 11.49% ao ano
        'entrada_minima': 0.20,     # 20%
        'prazo_maximo': 360,        # 30 anos
        'idade_maxima': 75,
        'comprometimento_maximo': 0.30
    }
}

def calcular_parcela_price(valor_financiado, taxa_mensal, prazo_meses):
    """Calcula a parcela usando a Tabela Price"""
    if taxa_mensal == 0:
        return valor_financiado / prazo_meses
    
    fator = (1 + taxa_mensal) ** prazo_meses
    parcela = valor_financiado * (taxa_mensal * fator) / (fator - 1)
    return parcela

def calcular_parcela_sac(valor_financiado, taxa_mensal, prazo_meses):
    """Calcula a primeira parcela usando SAC"""
    amortizacao = valor_financiado / prazo_meses
    juros_primeira_parcela = valor_financiado * taxa_mensal
    primeira_parcela = amortizacao + juros_primeira_parcela
    return primeira_parcela

def determinar_modalidade(valor_imovel, renda_familiar, banco_codigo):
    """Determina a modalidade de financiamento"""
    banco = BANCOS_DATA.get(banco_codigo, {})
    
    # Verifica se é elegível para MCMV
    if (banco_codigo in ['caixa', 'bb'] and 
        renda_familiar <= banco.get('renda_maxima_mcmv', 0) and 
        valor_imovel <= banco.get('valor_maximo_mcmv', 0)):
        return 'mcmv'
    elif valor_imovel <= 1500000:  # Limite do SFH
        return 'sfh'
    else:
        return 'sfi'

def calcular_custos_adicionais(valor_imovel):
    """Calcula custos adicionais específicos para Campina Grande - PB"""
    # ITBI - 2% do valor do imóvel
    itbi = valor_imovel * 0.02
    
    # Registro de imóvel - aproximadamente 1% do valor
    registro = valor_imovel * 0.01
    
    # Avaliação do imóvel
    avaliacao = min(2000, valor_imovel * 0.002)
    
    # Seguro MIP (Morte e Invalidez Permanente) - aproximadamente 0.5% do valor financiado ao ano
    # Seguro DFI (Danos Físicos do Imóvel) - aproximadamente 0.3% do valor do imóvel ao ano
    
    return {
        'itbi': itbi,
        'registro': registro,
        'avaliacao': avaliacao,
        'total_inicial': itbi + registro + avaliacao
    }

@simulador_bp.route('/simular', methods=['POST'])
def simular_financiamento():
    try:
        data = request.get_json()
        
        # Dados do imóvel
        valor_imovel = float(data.get('valor_imovel', 0))
        tipo_imovel = data.get('tipo_imovel', 'casa')
        imovel_novo = data.get('imovel_novo', True)
        
        # Dados do cliente
        idade = int(data.get('idade', 30))
        estado_civil = data.get('estado_civil', 'solteiro')
        dependentes = int(data.get('dependentes', 0))
        renda_bruta = float(data.get('renda_bruta', 0))
        tipo_renda = data.get('tipo_renda', 'clt')
        outros_financiamentos = float(data.get('outros_financiamentos', 0))
        
        # Dados do financiamento
        valor_entrada = float(data.get('valor_entrada', 0))
        usa_fgts = data.get('usa_fgts', False)
        valor_fgts = float(data.get('valor_fgts', 0)) if usa_fgts else 0
        prazo_anos = int(data.get('prazo_anos', 30))
        banco_codigo = data.get('banco', 'caixa')
        sistema_amortizacao = data.get('sistema_amortizacao', 'price')
        
        # Validações básicas
        if valor_imovel <= 0 or renda_bruta <= 0:
            return jsonify({'erro': 'Valor do imóvel e renda devem ser maiores que zero'}), 400
        
        if banco_codigo not in BANCOS_DATA:
            return jsonify({'erro': 'Banco não encontrado'}), 400
        
        banco = BANCOS_DATA[banco_codigo]
        
        # Verifica idade máxima
        idade_final = idade + prazo_anos
        if idade_final > banco['idade_maxima']:
            return jsonify({
                'erro': f'Idade final ({idade_final} anos) excede o limite do banco ({banco["idade_maxima"]} anos)'
            }), 400
        
        # Calcula valor total da entrada (dinheiro + FGTS)
        entrada_total = valor_entrada + valor_fgts
        
        # Verifica entrada mínima
        entrada_minima_requerida = valor_imovel * banco['entrada_minima']
        if entrada_total < entrada_minima_requerida:
            return jsonify({
                'erro': f'Entrada insuficiente. Mínimo: R$ {entrada_minima_requerida:,.2f}'
            }), 400
        
        # Calcula valor a ser financiado
        valor_financiado = valor_imovel - entrada_total
        
        # Determina modalidade de financiamento
        modalidade = determinar_modalidade(valor_imovel, renda_bruta, banco_codigo)
        
        # Seleciona taxa de juros baseada na modalidade
        if modalidade == 'mcmv':
            taxa_anual = banco.get('taxa_juros_mcmv', banco.get('taxa_juros_sfh', 0.10))
        elif modalidade == 'sfh':
            taxa_anual = banco.get('taxa_juros_sfh', 0.10)
        else:
            taxa_anual = banco.get('taxa_juros_sfi', 0.12)
        
        taxa_mensal = taxa_anual / 12
        prazo_meses = prazo_anos * 12
        
        # Calcula parcela baseada no sistema de amortização
        if sistema_amortizacao == 'sac':
            parcela = calcular_parcela_sac(valor_financiado, taxa_mensal, prazo_meses)
        else:
            parcela = calcular_parcela_price(valor_financiado, taxa_mensal, prazo_meses)
        
        # Verifica comprometimento de renda
        renda_liquida_estimada = renda_bruta * 0.75  # Estimativa de desconto de 25%
        comprometimento_atual = outros_financiamentos / renda_liquida_estimada if renda_liquida_estimada > 0 else 0
        comprometimento_total = (parcela + outros_financiamentos) / renda_liquida_estimada if renda_liquida_estimada > 0 else 0
        
        comprometimento_maximo = banco['comprometimento_maximo']
        
        if comprometimento_total > comprometimento_maximo:
            return jsonify({
                'erro': f'Comprometimento de renda ({comprometimento_total:.1%}) excede o limite ({comprometimento_maximo:.1%})'
            }), 400
        
        # Calcula custos adicionais
        custos_adicionais = calcular_custos_adicionais(valor_imovel)
        
        # Calcula CET (Custo Efetivo Total) - aproximação
        valor_total_pago = parcela * prazo_meses
        juros_totais = valor_total_pago - valor_financiado
        cet_anual = ((valor_total_pago / valor_financiado) ** (1/prazo_anos) - 1)
        
        # Calcula seguros anuais
        seguro_mip_anual = valor_financiado * 0.005  # 0.5% ao ano
        seguro_dfi_anual = valor_imovel * 0.003      # 0.3% ao ano
        
        # Monta resposta
        resultado = {
            'sucesso': True,
            'banco': {
                'codigo': banco_codigo,
                'nome': banco['nome']
            },
            'imovel': {
                'valor': valor_imovel,
                'tipo': tipo_imovel,
                'novo': imovel_novo
            },
            'financiamento': {
                'modalidade': modalidade,
                'modalidade_nome': {
                    'mcmv': 'Minha Casa Minha Vida',
                    'sfh': 'Sistema Financeiro de Habitação',
                    'sfi': 'Sistema Financeiro Imobiliário'
                }[modalidade],
                'valor_financiado': valor_financiado,
                'entrada_total': entrada_total,
                'entrada_dinheiro': valor_entrada,
                'entrada_fgts': valor_fgts,
                'prazo_anos': prazo_anos,
                'prazo_meses': prazo_meses,
                'taxa_juros_anual': taxa_anual,
                'taxa_juros_mensal': taxa_mensal,
                'sistema_amortizacao': sistema_amortizacao
            },
            'parcela': {
                'valor': parcela,
                'primeira_parcela': parcela,  # Para SAC seria diferente
                'sistema': sistema_amortizacao.upper()
            },
            'custos': {
                'valor_total_pago': valor_total_pago,
                'juros_totais': juros_totais,
                'cet_anual': cet_anual,
                'itbi': custos_adicionais['itbi'],
                'registro': custos_adicionais['registro'],
                'avaliacao': custos_adicionais['avaliacao'],
                'custos_iniciais_total': custos_adicionais['total_inicial'],
                'seguro_mip_anual': seguro_mip_anual,
                'seguro_dfi_anual': seguro_dfi_anual
            },
            'analise_renda': {
                'renda_bruta': renda_bruta,
                'renda_liquida_estimada': renda_liquida_estimada,
                'outros_financiamentos': outros_financiamentos,
                'comprometimento_atual': comprometimento_atual,
                'comprometimento_com_financiamento': comprometimento_total,
                'comprometimento_maximo_banco': comprometimento_maximo,
                'aprovado': comprometimento_total <= comprometimento_maximo
            },
            'cliente': {
                'idade': idade,
                'idade_final': idade_final,
                'estado_civil': estado_civil,
                'dependentes': dependentes,
                'tipo_renda': tipo_renda
            }
        }
        
        return jsonify(resultado)
        
    except Exception as e:
        return jsonify({'erro': f'Erro interno: {str(e)}'}), 500

@simulador_bp.route('/bancos', methods=['GET'])
def listar_bancos():
    """Lista todos os bancos disponíveis"""
    bancos = []
    for codigo, dados in BANCOS_DATA.items():
        bancos.append({
            'codigo': codigo,
            'nome': dados['nome'],
            'entrada_minima': dados['entrada_minima'],
            'prazo_maximo': dados['prazo_maximo'],
            'idade_maxima': dados['idade_maxima']
        })
    
    return jsonify({'bancos': bancos})

@simulador_bp.route('/comparar', methods=['POST'])
def comparar_bancos():
    """Compara simulação entre múltiplos bancos"""
    try:
        data = request.get_json()
        bancos_selecionados = data.get('bancos', list(BANCOS_DATA.keys()))
        
        # Remove o campo 'banco' dos dados para evitar conflito
        dados_simulacao = {k: v for k, v in data.items() if k != 'bancos'}
        
        resultados = []
        
        for banco_codigo in bancos_selecionados:
            if banco_codigo in BANCOS_DATA:
                # Adiciona o banco aos dados da simulação
                dados_simulacao['banco'] = banco_codigo
                
                # Simula para este banco
                with simulador_bp.test_request_context('/simular', method='POST', json=dados_simulacao):
                    resultado = simular_financiamento()
                    
                    if resultado[1] == 200:  # Status code 200 = sucesso
                        resultado_json = resultado[0].get_json()
                        resultados.append(resultado_json)
                    else:
                        # Adiciona erro para este banco
                        erro_json = resultado[0].get_json()
                        resultados.append({
                            'sucesso': False,
                            'banco': {
                                'codigo': banco_codigo,
                                'nome': BANCOS_DATA[banco_codigo]['nome']
                            },
                            'erro': erro_json.get('erro', 'Erro desconhecido')
                        })
        
        # Ordena resultados por valor da parcela (sucessos primeiro)
        resultados_sucesso = [r for r in resultados if r.get('sucesso', False)]
        resultados_erro = [r for r in resultados if not r.get('sucesso', False)]
        
        resultados_sucesso.sort(key=lambda x: x.get('parcela', {}).get('valor', float('inf')))
        
        return jsonify({
            'comparacao': resultados_sucesso + resultados_erro,
            'total_bancos': len(resultados),
            'bancos_aprovados': len(resultados_sucesso)
        })
        
    except Exception as e:
        return jsonify({'erro': f'Erro na comparação: {str(e)}'}), 500

@simulador_bp.route('/documentacao', methods=['POST'])
def calcular_documentacao():
    """Calcula custos de documentação para Campina Grande - PB"""
    try:
        data = request.get_json()
        valor_imovel = float(data.get('valor_imovel', 0))
        
        if valor_imovel <= 0:
            return jsonify({'erro': 'Valor do imóvel deve ser maior que zero'}), 400
        
        custos = calcular_custos_adicionais(valor_imovel)
        
        # Adiciona detalhes específicos de Campina Grande
        resultado = {
            'valor_imovel': valor_imovel,
            'custos': {
                'itbi': {
                    'valor': custos['itbi'],
                    'percentual': 2.0,
                    'descricao': 'Imposto sobre Transmissão de Bens Imóveis - Campina Grande/PB'
                },
                'registro': {
                    'valor': custos['registro'],
                    'percentual': 1.0,
                    'descricao': 'Registro do imóvel no Cartório de Registro de Imóveis'
                },
                'avaliacao': {
                    'valor': custos['avaliacao'],
                    'descricao': 'Avaliação do imóvel por engenheiro credenciado'
                },
                'total': custos['total_inicial']
            },
            'observacoes': [
                'Valores aproximados baseados na legislação de Campina Grande/PB',
                'ITBI pode ter isenções para alguns casos específicos',
                'Custos de cartório podem variar entre cartórios',
                'Recomenda-se consultar o cartório específico para valores exatos'
            ]
        }
        
        return jsonify(resultado)
        
    except Exception as e:
        return jsonify({'erro': f'Erro no cálculo: {str(e)}'}), 500

@simulador_bp.route('/glossario', methods=['GET'])
def glossario():
    """Retorna glossário de termos imobiliários"""
    termos = {
        'ITBI': 'Imposto sobre Transmissão de Bens Imóveis. Tributo municipal cobrado na compra de imóveis.',
        'MCMV': 'Minha Casa Minha Vida. Programa habitacional do governo federal com juros subsidiados.',
        'SFH': 'Sistema Financeiro de Habitação. Modalidade de financiamento para imóveis até R$ 1,5 milhão.',
        'SFI': 'Sistema Financeiro Imobiliário. Modalidade para imóveis acima do limite do SFH.',
        'CET': 'Custo Efetivo Total. Inclui juros e todas as despesas do financiamento.',
        'SAC': 'Sistema de Amortização Constante. Parcelas decrescentes com amortização fixa.',
        'PRICE': 'Tabela Price. Sistema de parcelas fixas com amortização crescente.',
        'MIP': 'Morte e Invalidez Permanente. Seguro obrigatório que quita o financiamento em caso de morte ou invalidez.',
        'DFI': 'Danos Físicos do Imóvel. Seguro que cobre danos ao imóvel financiado.',
        'FGTS': 'Fundo de Garantia do Tempo de Serviço. Pode ser usado como entrada ou amortização.',
        'CRECI': 'Conselho Regional de Corretores de Imóveis. Órgão que regulamenta a profissão.',
        'Escritura': 'Documento que formaliza a transferência de propriedade do imóvel.',
        'Matrícula': 'Registro único do imóvel no Cartório de Registro de Imóveis.',
        'Habite-se': 'Documento que atesta que a construção está apta para habitação.',
        'IPTU': 'Imposto Predial e Territorial Urbano. Tributo municipal anual sobre imóveis.',
        'Alienação Fiduciária': 'Garantia do financiamento onde o banco fica com a propriedade até a quitação.',
        'Amortização': 'Parte da parcela que reduz o saldo devedor do financiamento.',
        'Juros': 'Parte da parcela correspondente ao custo do dinheiro emprestado.',
        'Saldo Devedor': 'Valor ainda devido do financiamento.',
        'Quitação': 'Pagamento total do financiamento, liberando o imóvel de ônus.'
    }
    
    return jsonify({'glossario': termos})

<!-- end list -->
@simulador_bp.route('/bancos')
def get_bancos():
    bancos_nomes = [data['nome'] for data in BANCOS_DATA.values()]
    return jsonify({'bancos': bancos_nomes})
