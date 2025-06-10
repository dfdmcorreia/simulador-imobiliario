import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Alert, AlertDescription } from '@/components/ui/alert.jsx'
import { Settings, User, Bell, Database, Info, CheckCircle } from 'lucide-react'

function Configuracoes() {
  const [config, setConfig] = useState({
    nomeCorretor: 'Diego Correia',
    creci: '',
    telefone: '',
    email: '',
    cidade: 'Campina Grande',
    estado: 'PB',
    notificacoes: true,
    modoOffline: true,
    salvarSimulacoes: true,
    tema: 'claro'
  })
  
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Carrega configurações do localStorage
    const savedConfig = localStorage.getItem('simulador-config')
    if (savedConfig) {
      setConfig({ ...config, ...JSON.parse(savedConfig) })
    }
  }, [])

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }))
    setSaved(false)
  }

  const salvarConfiguracoes = () => {
    localStorage.setItem('simulador-config', JSON.stringify(config))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const limparDados = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados salvos? Esta ação não pode ser desfeita.')) {
      localStorage.clear()
      setConfig({
        nomeCorretor: 'Diego Correia',
        creci: '',
        telefone: '',
        email: '',
        cidade: 'Campina Grande',
        estado: 'PB',
        notificacoes: true,
        modoOffline: true,
        salvarSimulacoes: true,
        tema: 'claro'
      })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const exportarDados = () => {
    const dados = {
      configuracoes: config,
      simulacoes: JSON.parse(localStorage.getItem('simulacoes-salvas') || '[]'),
      dataExportacao: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `simulador-dados-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-600">Personalize o aplicativo conforme suas necessidades</p>
      </div>

      {saved && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Configurações salvas com sucesso!
          </AlertDescription>
        </Alert>
      )}

      {/* Informações Pessoais */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Informações Pessoais</span>
          </CardTitle>
          <CardDescription>
            Configure suas informações profissionais
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nomeCorretor">Nome do Corretor</Label>
              <Input
                id="nomeCorretor"
                value={config.nomeCorretor}
                onChange={(e) => handleConfigChange('nomeCorretor', e.target.value)}
                placeholder="Diego Correia"
              />
            </div>
            
            <div>
              <Label htmlFor="creci">CRECI</Label>
              <Input
                id="creci"
                value={config.creci}
                onChange={(e) => handleConfigChange('creci', e.target.value)}
                placeholder="CRECI-PB 12345-F"
              />
            </div>
            
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={config.telefone}
                onChange={(e) => handleConfigChange('telefone', e.target.value)}
                placeholder="(83) 9 9999-9999"
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={config.email}
                onChange={(e) => handleConfigChange('email', e.target.value)}
                placeholder="diego@exemplo.com"
              />
            </div>
            
            <div>
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                value={config.cidade}
                onChange={(e) => handleConfigChange('cidade', e.target.value)}
                placeholder="Campina Grande"
              />
            </div>
            
            <div>
              <Label htmlFor="estado">Estado</Label>
              <Input
                id="estado"
                value={config.estado}
                onChange={(e) => handleConfigChange('estado', e.target.value)}
                placeholder="PB"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferências do Aplicativo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Preferências do Aplicativo</span>
          </CardTitle>
          <CardDescription>
            Configure o comportamento do aplicativo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações</Label>
              <p className="text-sm text-gray-600">
                Receber notificações sobre atualizações de taxas
              </p>
            </div>
            <Switch
              checked={config.notificacoes}
              onCheckedChange={(checked) => handleConfigChange('notificacoes', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Modo Offline</Label>
              <p className="text-sm text-gray-600">
                Permitir simulações básicas sem internet
              </p>
            </div>
            <Switch
              checked={config.modoOffline}
              onCheckedChange={(checked) => handleConfigChange('modoOffline', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Salvar Simulações</Label>
              <p className="text-sm text-gray-600">
                Salvar automaticamente as simulações realizadas
              </p>
            </div>
            <Switch
              checked={config.salvarSimulacoes}
              onCheckedChange={(checked) => handleConfigChange('salvarSimulacoes', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Gerenciamento de Dados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="w-5 h-5" />
            <span>Gerenciamento de Dados</span>
          </CardTitle>
          <CardDescription>
            Gerencie os dados salvos no aplicativo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={exportarDados} variant="outline">
              Exportar Dados
            </Button>
            
            <Button onClick={limparDados} variant="destructive">
              Limpar Todos os Dados
            </Button>
          </div>
          
          <div className="text-sm text-gray-600">
            <p>• <strong>Exportar:</strong> Baixa um arquivo JSON com todas as suas configurações e simulações</p>
            <p>• <strong>Limpar:</strong> Remove todos os dados salvos localmente (não pode ser desfeito)</p>
          </div>
        </CardContent>
      </Card>

      {/* Sobre o Aplicativo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="w-5 h-5" />
            <span>Sobre o Aplicativo</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Versão</p>
              <p className="text-sm text-gray-600">1.0.0</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Desenvolvido para</p>
              <p className="text-sm text-gray-600">Diego Correia</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Localização</p>
              <p className="text-sm text-gray-600">Campina Grande, Paraíba</p>
            </div>
            
            <div>
              <p className="text-sm font-medium">Última Atualização</p>
              <p className="text-sm text-gray-600">{new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Funcionalidades</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Simulação de financiamento para 7 bancos</li>
              <li>• Calculadora de documentação para Campina Grande/PB</li>
              <li>• Glossário completo de termos imobiliários</li>
              <li>• Comparação entre múltiplos bancos</li>
              <li>• Funcionamento offline (parcial)</li>
              <li>• Interface responsiva para mobile e desktop</li>
            </ul>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Bancos Suportados</h3>
            <div className="flex flex-wrap gap-2">
              {['Caixa Econômica Federal', 'Banco do Brasil', 'Bradesco', 'Itaú', 'Santander', 'Banco Inter', 'C6 Bank'].map((banco) => (
                <span key={banco} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {banco}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botão Salvar */}
      <div className="flex justify-end">
        <Button onClick={salvarConfiguracoes} className="w-full md:w-auto">
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}

export default Configuracoes

