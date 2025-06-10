import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Calculator, Home, FileText, BookOpen, Settings, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import './App.css'

// Componentes das páginas
import Dashboard from './components/Dashboard'
import Simulador from './components/Simulador'
import Documentacao from './components/Documentacao'
import Glossario from './components/Glossario'
import Configuracoes from './components/Configuracoes'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const menuItems = [
    { icon: Home, label: 'Início', path: '/' },
    { icon: Calculator, label: 'Simulador', path: '/simulador' },
    { icon: FileText, label: 'Documentação', path: '/documentacao' },
    { icon: BookOpen, label: 'Glossário', path: '/glossario' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' }
  ]

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-blue-900 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Simulador Imobiliário</h1>
                  <p className="text-xs text-blue-200">Diego Correia</p>
                </div>
              </div>
              
              {/* Status de conexão */}
              <div className="flex items-center space-x-3">
                <Badge variant={isOnline ? "default" : "destructive"} className="text-xs">
                  {isOnline ? "Online" : "Offline"}
                </Badge>
                
                {/* Menu mobile */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-white hover:bg-blue-800"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar Desktop */}
          <nav className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:pt-16">
            <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <nav className="mt-5 flex-1 px-2 space-y-1">
                  {menuItems.map((item) => (
                    <a
                      key={item.path}
                      href={item.path}
                      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </nav>

          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="md:hidden fixed inset-0 z-40 flex">
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsMenuOpen(false)} />
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <nav className="mt-5 px-2 space-y-1">
                    {menuItems.map((item) => (
                      <a
                        key={item.path}
                        href={item.path}
                        className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo Principal */}
          <main className="md:pl-64 flex flex-col flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/simulador" element={<Simulador />} />
                  <Route path="/documentacao" element={<Documentacao />} />
                  <Route path="/glossario" element={<Glossario />} />
                  <Route path="/configuracoes" element={<Configuracoes />} />
                </Routes>
              </div>
            </div>
          </main>
        </div>

        {/* Bottom Navigation Mobile */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            {menuItems.slice(0, 4).map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="flex flex-col items-center py-2 px-3 text-xs text-gray-600 hover:text-blue-600"
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </Router>
  )
}

export default App

