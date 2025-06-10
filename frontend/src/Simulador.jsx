import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Calculator, Building, DollarSign, Calendar, User, FileText, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

const API_BASE_URL = 'https://kkh7ikcgqo86.manus.space/api'

function Simulador() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState(null)
  const [bancos, setBancos] = useState([])
  const [comparacao, setComparacao] = useState(null)

  // Dados do formulário
  const [formData, setFormData] = useState({
    // Dados do imóvel
    valor_imovel: '',
    tipo_imovel: 'casa',
    imovel_novo: true,
    
    // Dados do cliente
    idade: '',
    estado_civil: 'solteiro',
    dependentes: 0,
    renda_bruta: '',
    tipo_renda: 'clt',
    outros_financiamentos: 0,
    
    // Dados do financiamento
    valor_entrada: '',
    usa_fgts: false,
    valor_fgts: 0,
    prazo_anos: 30,
    banco: 'caixa',
    sistema_amortizacao: 'price'
  })

  useEffect(() => {
    carregarBancos()
  }, [])

  const carregarBancos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/bancos`)
      const data = await response.json()
      setBancos(data.bancos || [])
    } catch (error) {
      console.error('Erro ao carregar bancos:', error)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setErro(null)
  }

  const simularFinanciamento = async () => {
    setLoading(true)
    setErro(null)
    
    try {
      const response = await fetch(`${API_BASE_URL}/simular`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setResultado(data)
        setStep(4)
      } else {
        setErro(data.erro || 'Erro na simulação')
      }
    } catch (error) {
      setErro('Erro de conexão. Verifique sua internet.')
    } finally {
      setLoading(false)
    }
  }

  const compararBancos = async () => {
    setLoading(true)
    setErro(null)
    
    try {
      const response = await fetch(`${API_BASE_URL}/comparar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          bancos: ['caixa', 'bb', 'bradesco', 'itau', 'santander', 'inter', 'c6']
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setComparacao(data)
        setStep(5)
      } else {
        setErro(data.erro || 'Erro na comparação')
      }
    } catch (error) {
      setErro('Erro de conexão. Verifique sua internet.')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatPercent = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2
    }).format(value)
  }

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building className="w-5 h-5" />
          <span>Dados do Imóvel</span>
        </CardTitle>
        <CardDescription>Etapa 1 de 3 - Informações sobre o imóvel</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="valor_imovel">Valor do Imóvel (R$)</Label>
          <Input
            id="valor_imovel"
            type="number"
            placeholder="350000"
            value={formData.valor_imovel}
            onChange={(e) => handleInputChange('valor_imovel', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="tipo_imovel">Tipo do Imóvel</Label>
          <Select value={formData.tipo_imovel} onValueChange={(value) => handleInputChange('tipo_imovel', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="casa">Casa</SelectItem>
              <SelectItem value="apartamento">Apartamento</SelectItem>
              <SelectItem value="terreno">Terreno</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="imovel_novo">Condição do Imóvel</Label>
          <Select value={formData.imovel_novo.toString()} onValueChange={(value) => handleInputChange('imovel_novo', value === 'true')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Novo</SelectItem>
              <SelectItem value="false">Usado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          className="w-full" 
          onClick={() => setStep(2)}
          disabled={!formData.valor_imovel}
        >
          Próximo
        </Button>
      </CardContent>
    </Card>
  )

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Dados do Cliente</span>
        </CardTitle>
        <CardDescription>Etapa 2 de 3 - Informações pessoais e financeiras</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="idade">Idade</Label>
            <Input
              id="idade"
              type="number"
              placeholder="35"
              value={formData.idade}
              onChange={(e) => handleInputChange('idade', e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="estado_civil">Estado Civil</Label>
            <Select value={formData.estado_civil} onValueChange={(value) => handleInputChange('estado_civil', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                <SelectItem value="casado">Casado(a)</SelectItem>
                <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                <SelectItem value="viuvo">Viúvo(a)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="renda_bruta">Renda Bruta Familiar (R$)</Label>
          <Input
            id="renda_bruta"
            type="number"
            placeholder="6000"
            value={formData.renda_bruta}
            onChange={(e) => handleInputChange('renda_bruta', e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="tipo_renda">Tipo de Renda</Label>
          <Select value={formData.tipo_renda} onValueChange={(value) => handleInputChange('tipo_renda', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clt">CLT</SelectItem>
              <SelectItem value="autonomo">Autônomo</SelectItem>
              <SelectItem value="mei">MEI</SelectItem>
              <SelectItem value="servidor">Servidor Público</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => setStep(1)}>
            Voltar
          </Button>
          <Button 
            className="flex-1" 
            onClick={() => setStep(3)}
            disabled={!formData.idade || !formData.renda_bruta}
          >
            Próximo
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5" />
          <span>Dados do Financiamento</span>
        </CardTitle>
        <CardDescription>Etapa 3 de 3 - Condições do financiamento</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="valor_entrada">Valor da Entrada (R$)</Label>
          <Input
            id="valor_entrada"
            type="number"
            placeholder="70000"
            value={formData.valor_entrada}
            onChange={(e) => handleInputChange('valor_entrada', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="prazo_anos">Prazo (anos)</Label>
            <Select value={formData.prazo_anos.toString()} onValueChange={(value) => handleInputChange('prazo_anos', parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 anos</SelectItem>
                <SelectItem value="20">20 anos</SelectItem>
                <SelectItem value="25">25 anos</SelectItem>
                <SelectItem value="30">30 anos</SelectItem>
                <SelectItem value="35">35 anos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="banco">Banco</Label>
            <Select value={formData.banco} onValueChange={(value) => handleInputChange('banco', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {bancos.map((banco) => (
                  <SelectItem key={banco.codigo} value={banco.codigo}>
                    {banco.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label htmlFor="sistema_amortizacao">Sistema de Amortização</Label>
          <Select value={formData.sistema_amortizacao} onValueChange={(value) => handleInputChange('sistema_amortizacao', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Tabela Price (Parcelas Fixas)</SelectItem>
              <SelectItem value="sac">SAC (Parcelas Decrescentes)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {erro && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{erro}</AlertDescription>
          </Alert>
        )}
        
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => setStep(2)}>
            Voltar
          </Button>
          <Button 
            className="flex-1" 
            onClick={simularFinanciamento}
            disabled={loading || !formData.valor_entrada}
          >
            {loading ? 'Simulando...' : 'Simular'}
          </Button>
          <Button 
            variant="outline"
            onClick={compararBancos}
            disabled={loading || !formData.valor_entrada}
          >
            Comparar Bancos
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderResultado = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Resultado da Simulação</span>
          </CardTitle>
          <CardDescription>
            {resultado.banco.nome} • {resultado.financiamento.modalidade_nome}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Parcela Mensal</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(resultado.parcela.valor)}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Valor Financiado</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(resultado.financiamento.valor_financiado)}
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Taxa de Juros</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatPercent(resultado.financiamento.taxa_juros_anual)}
              </p>
            </div>
          </div>
          
          <Tabs defaultValue="resumo" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="resumo">Resumo</TabsTrigger>
              <TabsTrigger value="custos">Custos</TabsTrigger>
              <TabsTrigger value="analise">Análise</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resumo" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Prazo</p>
                  <p className="font-semibold">{resultado.financiamento.prazo_anos} anos</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sistema</p>
                  <p className="font-semibold">{resultado.financiamento.sistema_amortizacao.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Entrada Total</p>
                  <p className="font-semibold">{formatCurrency(resultado.financiamento.entrada_total)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CET (a.a.)</p>
                  <p className="font-semibold">{formatPercent(resultado.custos.cet_anual)}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="custos" className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>ITBI</span>
                  <span>{formatCurrency(resultado.custos.itbi)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Registro</span>
                  <span>{formatCurrency(resultado.custos.registro)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avaliação</span>
                  <span>{formatCurrency(resultado.custos.avaliacao)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seguro MIP (anual)</span>
                  <span>{formatCurrency(resultado.custos.seguro_mip_anual)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seguro DFI (anual)</span>
                  <span>{formatCurrency(resultado.custos.seguro_dfi_anual)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total Pago</span>
                  <span>{formatCurrency(resultado.custos.valor_total_pago)}</span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analise" className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Renda Bruta</span>
                  <span>{formatCurrency(resultado.analise_renda.renda_bruta)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Comprometimento Atual</span>
                  <span>{formatPercent(resultado.analise_renda.comprometimento_atual)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Comprometimento com Financiamento</span>
                  <span>{formatPercent(resultado.analise_renda.comprometimento_com_financiamento)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Limite do Banco</span>
                  <span>{formatPercent(resultado.analise_renda.comprometimento_maximo_banco)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status</span>
                  <Badge variant={resultado.analise_renda.aprovado ? "default" : "destructive"}>
                    {resultado.analise_renda.aprovado ? "Aprovado" : "Reprovado"}
                  </Badge>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex space-x-4 mt-6">
            <Button variant="outline" onClick={() => setStep(1)}>
              Nova Simulação
            </Button>
            <Button onClick={compararBancos} disabled={loading}>
              Comparar Bancos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderComparacao = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Comparação de Bancos</span>
          </CardTitle>
          <CardDescription>
            {comparacao?.bancos_aprovados} de {comparacao?.total_bancos} bancos aprovaram o financiamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {comparacao?.comparacao.map((resultado, index) => (
              <Card key={index} className={resultado.sucesso ? "border-green-200" : "border-red-200"}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{resultado.banco.nome}</h3>
                      {resultado.sucesso ? (
                        <div className="space-y-1">
                          <p className="text-sm text-gray-600">
                            Parcela: <span className="font-semibold">{formatCurrency(resultado.parcela.valor)}</span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Taxa: <span className="font-semibold">{formatPercent(resultado.financiamento.taxa_juros_anual)}</span>
                          </p>
                          <p className="text-sm text-gray-600">
                            Modalidade: <span className="font-semibold">{resultado.financiamento.modalidade_nome}</span>
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-red-600">{resultado.erro}</p>
                      )}
                    </div>
                    <Badge variant={resultado.sucesso ? "default" : "destructive"}>
                      {resultado.sucesso ? "Aprovado" : "Reprovado"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Button variant="outline" onClick={() => setStep(1)} className="w-full mt-6">
            Nova Simulação
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Simulador de Financiamento</h1>
        <p className="text-gray-600">Simule financiamentos de múltiplos bancos</p>
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
      {step === 4 && renderResultado()}
      {step === 5 && renderComparacao()}
    </div>
  )
}

export default Simulador

