import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { FileText, Calculator, AlertCircle } from 'lucide-react'

function Documentacao() {
  const [valorImovel, setValorImovel] = useState('')
  const [resultado, setResultado] = useState(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)

  const calcularDocumentacao = async () => {
    if (!valorImovel || valorImovel <= 0) {
      setErro('Digite um valor válido para o imóvel')
      return
    }

    setLoading(true)
    setErro(null)

    try {
      const response = await fetch('https://kkh7ikcgqo86.manus.space/api/documentacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valor_imovel: parseFloat(valorImovel)
        })
      })

      const data = await response.json()

      if (response.ok) {
        setResultado(data)
      } else {
        setErro(data.erro || 'Erro no cálculo')
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Calculadora de Documentação</h1>
        <p className="text-gray-600">Calcule os custos de ITBI, cartório e taxas para Campina Grande/PB</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-5 h-5" />
            <span>Calcular Custos</span>
          </CardTitle>
          <CardDescription>
            Digite o valor do imóvel para calcular os custos de documentação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="valor_imovel">Valor do Imóvel (R$)</Label>
            <Input
              id="valor_imovel"
              type="number"
              placeholder="350000"
              value={valorImovel}
              onChange={(e) => {
                setValorImovel(e.target.value)
                setErro(null)
              }}
            />
          </div>

          {erro && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{erro}</AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={calcularDocumentacao}
            disabled={loading || !valorImovel}
            className="w-full"
          >
            {loading ? 'Calculando...' : 'Calcular Custos'}
          </Button>
        </CardContent>
      </Card>

      {resultado && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Resultado dos Custos</span>
            </CardTitle>
            <CardDescription>
              Custos de documentação para imóvel de {formatCurrency(resultado.valor_imovel)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900">ITBI</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(resultado.custos.itbi.valor)}
                  </p>
                  <p className="text-sm text-blue-700">
                    {resultado.custos.itbi.percentual}% do valor do imóvel
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {resultado.custos.itbi.descricao}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-green-900">Registro</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(resultado.custos.registro.valor)}
                  </p>
                  <p className="text-sm text-green-700">
                    {resultado.custos.registro.percentual}% do valor do imóvel
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {resultado.custos.registro.descricao}
                  </p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-900">Avaliação</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatCurrency(resultado.custos.avaliacao.valor)}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    {resultado.custos.avaliacao.descricao}
                  </p>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="font-semibold text-gray-900">Total</h3>
                  <p className="text-2xl font-bold text-gray-800">
                    {formatCurrency(resultado.custos.total)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Custos iniciais totais
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Observações Importantes</h3>
                <ul className="space-y-1">
                  {resultado.observacoes.map((obs, index) => (
                    <li key={index} className="text-sm text-yellow-800 flex items-start">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {obs}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Informações sobre Documentação em Campina Grande/PB</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">ITBI - Imposto sobre Transmissão de Bens Imóveis</h3>
              <p className="text-sm text-gray-600">
                Alíquota de 2% sobre o valor do imóvel. Pago na Prefeitura de Campina Grande antes da escritura.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold">Registro de Imóvel</h3>
              <p className="text-sm text-gray-600">
                Aproximadamente 1% do valor do imóvel. Varia entre cartórios de registro de imóveis.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold">Avaliação do Imóvel</h3>
              <p className="text-sm text-gray-600">
                Necessária para financiamento. Valor varia conforme o imóvel, geralmente entre R$ 800 e R$ 2.000.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold">Documentos Necessários</h3>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>RG e CPF do comprador e vendedor</li>
                <li>Comprovante de renda</li>
                <li>Certidão de casamento (se aplicável)</li>
                <li>Matrícula atualizada do imóvel</li>
                <li>IPTU quitado</li>
                <li>Certidões negativas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Documentacao

