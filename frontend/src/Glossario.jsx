import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { BookOpen, Search } from 'lucide-react'

function Glossario() {
  const [searchTerm, setSearchTerm] = useState('')
  const [glossario, setGlossario] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarGlossario()
  }, [])

  const carregarGlossario = async () => {
    try {
      const response = await fetch('https://kkh7ikcgqo86.manus.space/api/glossario')
      const data = await response.json()
      setGlossario(data.glossario || {})
    } catch (error) {
      console.error('Erro ao carregar glossário:', error)
      // Fallback com glossário local
      setGlossario({
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
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredTerms = Object.entries(glossario).filter(([termo, definicao]) =>
    termo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    definicao.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categorias = {
    'Financiamento': ['MCMV', 'SFH', 'SFI', 'CET', 'SAC', 'PRICE', 'MIP', 'DFI', 'FGTS', 'Amortização', 'Juros', 'Saldo Devedor', 'Quitação', 'Alienação Fiduciária'],
    'Documentação': ['ITBI', 'Escritura', 'Matrícula', 'Habite-se', 'IPTU'],
    'Profissional': ['CRECI']
  }

  const getCategoria = (termo) => {
    for (const [categoria, termos] of Object.entries(categorias)) {
      if (termos.includes(termo)) {
        return categoria
      }
    }
    return 'Outros'
  }

  const getCategoriaColor = (categoria) => {
    const colors = {
      'Financiamento': 'bg-blue-100 text-blue-800',
      'Documentação': 'bg-green-100 text-green-800',
      'Profissional': 'bg-purple-100 text-purple-800',
      'Outros': 'bg-gray-100 text-gray-800'
    }
    return colors[categoria] || colors['Outros']
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Glossário Imobiliário</h1>
        <p className="text-gray-600">Termos e definições do mercado imobiliário e financeiro</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Buscar Termo</span>
          </CardTitle>
          <CardDescription>
            Digite o termo que deseja consultar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Ex: ITBI, MCMV, SAC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredTerms.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm ? 'Nenhum termo encontrado para sua busca.' : 'Digite um termo para buscar.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredTerms.map(([termo, definicao]) => (
            <Card key={termo} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{termo}</h3>
                  <Badge className={getCategoriaColor(getCategoria(termo))}>
                    {getCategoria(termo)}
                  </Badge>
                </div>
                <p className="text-gray-700 leading-relaxed">{definicao}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {!searchTerm && (
        <Card>
          <CardHeader>
            <CardTitle>Categorias</CardTitle>
            <CardDescription>
              Explore os termos por categoria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(categorias).map(([categoria, termos]) => (
                <div key={categoria} className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">{categoria}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {termos.length} termo{termos.length !== 1 ? 's' : ''}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {termos.slice(0, 3).map((termo) => (
                      <Badge key={termo} variant="outline" className="text-xs">
                        {termo}
                      </Badge>
                    ))}
                    {termos.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{termos.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Dicas de Uso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Busca Inteligente</p>
                <p className="text-xs text-gray-600">
                  A busca funciona tanto no nome do termo quanto na definição
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Categorias</p>
                <p className="text-xs text-gray-600">
                  Os termos são organizados por categorias para facilitar a navegação
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Atualização</p>
                <p className="text-xs text-gray-600">
                  O glossário é atualizado regularmente com novos termos
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Glossario

