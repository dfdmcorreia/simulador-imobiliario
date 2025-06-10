import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Calculator, FileText, BookOpen, TrendingUp, Users, Clock } from 'lucide-react'

function Dashboard() {
  const [welcomeMessage] = useState("Olá, Diego! Pronto para mais uma simulação?")

  const quickActions = [
    {
      title: "Nova Simulação",
      description: "Simule financiamentos de múltiplos bancos",
      icon: Calculator,
      color: "bg-blue-500",
      href: "/simulador"
    },
    {
      title: "Calcular Documentação",
      description: "ITBI, cartório e taxas de Campina Grande",
      icon: FileText,
      color: "bg-green-500",
      href: "/documentacao"
    },
    {
      title: "Consultar Glossário",
      description: "Termos imobiliários e financeiros",
      icon: BookOpen,
      color: "bg-purple-500",
      href: "/glossario"
    }
  ]

  const stats = [
    {
      title: "Simulações Hoje",
      value: "12",
      change: "+3",
      icon: Calculator
    },
    {
      title: "Clientes Atendidos",
      value: "8",
      change: "+2",
      icon: Users
    },
    {
      title: "Tempo Médio",
      value: "5min",
      change: "-1min",
      icon: Clock
    }
  ]

  const recentTips = [
    {
      title: "Taxa Selic em 10,75%",
      description: "Impacto nas taxas de financiamento imobiliário",
      time: "2h atrás"
    },
    {
      title: "MCMV 2025",
      description: "Novas regras para o programa habitacional",
      time: "1 dia atrás"
    },
    {
      title: "ITBI Campina Grande",
      description: "Alíquota mantida em 2% para 2025",
      time: "3 dias atrás"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Mensagem de Boas-vindas */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{welcomeMessage}</CardTitle>
          <CardDescription className="text-blue-100">
            Campina Grande, PB • {new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Ações Rápidas */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{action.description}</CardDescription>
                <Button className="w-full" onClick={() => window.location.href = action.href}>
                  Acessar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Estatísticas do Dia */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Estatísticas de Hoje</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} vs ontem</p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Dicas e Atualizações */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Dicas e Atualizações</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {recentTips.map((tip, index) => (
                <div key={index} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{tip.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{tip.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bancos Disponíveis */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Bancos Disponíveis</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
              {['Caixa', 'Banco do Brasil', 'Bradesco', 'Itaú', 'Santander', 'Inter', 'C6 Bank'].map((banco) => (
                <Badge key={banco} variant="outline" className="px-3 py-1">
                  {banco}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-3">
              7 bancos disponíveis para simulação • Taxas atualizadas diariamente
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard

