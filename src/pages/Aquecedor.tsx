import { useState } from "react";
import { Calendar, Download, Flame, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data para demonstração
const aviariosOptions = [
  { id: 1, nome: "Aviário A1" },
  { id: 2, nome: "Aviário A2" },
  { id: 3, nome: "Aviário B1" }
];

const aquecedorData = [
  { 
    hora: "00:00", 
    fornalha: 85.2, 
    saida: 72.1, 
    chamine: 45.8 
  },
  { 
    hora: "02:00", 
    fornalha: 88.5, 
    saida: 75.3, 
    chamine: 48.2 
  },
  { 
    hora: "04:00", 
    fornalha: 92.1, 
    saida: 78.9, 
    chamine: 52.1 
  },
  { 
    hora: "06:00", 
    fornalha: 89.7, 
    saida: 76.2, 
    chamine: 49.8 
  },
  { 
    hora: "08:00", 
    fornalha: 91.3, 
    saida: 77.8, 
    chamine: 51.2 
  },
  { 
    hora: "10:00", 
    fornalha: 87.9, 
    saida: 74.5, 
    chamine: 47.9 
  },
  { 
    hora: "12:00", 
    fornalha: 90.8, 
    saida: 77.1, 
    chamine: 50.6 
  },
  { 
    hora: "14:00", 
    fornalha: 93.2, 
    saida: 79.4, 
    chamine: 53.1 
  }
];

export default function Aquecedor() {
  const [aviarioSelecionado, setAviarioSelecionado] = useState<string>("1");
  const [dataInicio, setDataInicio] = useState<string>("2024-01-14");
  const [dataFim, setDataFim] = useState<string>("2024-01-15");

  const estatisticas = {
    fornalhaMedia: 89.8,
    saidaMedia: 76.4,
    chamineMedia: 49.8,
    tempoOperacao: 18.5
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sistema de Aquecimento</h1>
          <p className="text-muted-foreground mt-1">
            Monitoramento das temperaturas do aquecedor
          </p>
        </div>
        
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Filtros */}
      <Card className="bg-gradient-card border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Filtros de Consulta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Aviário
              </label>
              <Select value={aviarioSelecionado} onValueChange={setAviarioSelecionado}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o aviário" />
                </SelectTrigger>
                <SelectContent>
                  {aviariosOptions.map((aviario) => (
                    <SelectItem key={aviario.id} value={aviario.id.toString()}>
                      {aviario.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Data Inicial
              </label>
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Data Final
              </label>
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Temp. Fornalha (Média)
            </CardTitle>
            <Flame className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {estatisticas.fornalhaMedia}°C
            </div>
            <p className="text-xs text-muted-foreground">
              Faixa ideal: 85-95°C
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Temp. Saída (Média)
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {estatisticas.saidaMedia}°C
            </div>
            <p className="text-xs text-muted-foreground">
              Faixa ideal: 70-80°C
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Temp. Chaminé (Média)
            </CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {estatisticas.chamineMedia}°C
            </div>
            <p className="text-xs text-muted-foreground">
              Faixa ideal: 40-60°C
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tempo em Operação
            </CardTitle>
            <div className="w-4 h-4 rounded bg-status-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-success">
              {estatisticas.tempoOperacao}h
            </div>
            <p className="text-xs text-muted-foreground">
              Últimas 24 horas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico Principal */}
      <Card className="bg-gradient-card border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Flame className="w-5 h-5 text-primary" />
            Histórico de Temperaturas - {aviariosOptions.find(a => a.id.toString() === aviarioSelecionado)?.nome}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={aquecedorData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="hora" 
                  className="text-xs"
                />
                <YAxis 
                  domain={[0, 100]}
                  className="text-xs"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="fornalha" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                  name="Temperatura da Fornalha"
                />
                <Line 
                  type="monotone" 
                  dataKey="saida" 
                  stroke="#ea580c" 
                  strokeWidth={2}
                  dot={{ fill: '#ea580c', strokeWidth: 2, r: 4 }}
                  name="Temperatura de Saída"
                />
                <Line 
                  type="monotone" 
                  dataKey="chamine" 
                  stroke="#6b7280" 
                  strokeWidth={2}
                  dot={{ fill: '#6b7280', strokeWidth: 2, r: 4 }}
                  name="Temperatura da Chaminé"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Alertas/Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="status-ok border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-success" />
              Sistema de Combustão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Operando dentro dos parâmetros normais. 
              Eficiência energética: 87%
            </p>
          </CardContent>
        </Card>

        <Card className="status-ok border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-success" />
              Distribuição de Calor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Temperatura de saída estável. 
              Ventilação funcionando corretamente.
            </p>
          </CardContent>
        </Card>

        <Card className="status-ok border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-success" />
              Exaustão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Chaminé com tiragem adequada. 
              Sem bloqueios detectados.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}