import { useState } from "react";
import { Calendar, Download, Scale, TrendingUp, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  ComposedChart,
  Bar
} from 'recharts';

// Mock data para demonstração
const aviariosOptions = [
  { id: 1, nome: "Aviário A1" },
  { id: 2, nome: "Aviário A2" },
  { id: 3, nome: "Aviário B1" }
];

const conversaoData = [
  { 
    semana: "Sem 1", 
    pesoMedio: 180, 
    consumoRacao: 220, 
    fcr: 1.22,
    ganhoSemanal: 180
  },
  { 
    semana: "Sem 2", 
    pesoMedio: 410, 
    consumoRacao: 520, 
    fcr: 1.27,
    ganhoSemanal: 230
  },
  { 
    semana: "Sem 3", 
    pesoMedio: 680, 
    consumoRacao: 890, 
    fcr: 1.31,
    ganhoSemanal: 270
  },
  { 
    semana: "Sem 4", 
    pesoMedio: 980, 
    consumoRacao: 1320, 
    fcr: 1.35,
    ganhoSemanal: 300
  },
  { 
    semana: "Sem 5", 
    pesoMedio: 1320, 
    consumoRacao: 1820, 
    fcr: 1.38,
    ganhoSemanal: 340
  },
  { 
    semana: "Sem 6", 
    pesoMedio: 1710, 
    consumoRacao: 2420, 
    fcr: 1.42,
    ganhoSemanal: 390
  }
];

export default function Conversao() {
  const [aviarioSelecionado, setAviarioSelecionado] = useState<string>("1");
  const [dataInicio, setDataInicio] = useState<string>("2024-01-01");
  const [dataFim, setDataFim] = useState<string>("2024-01-15");

  const ultimosDados = conversaoData[conversaoData.length - 1];
  const estatisticas = {
    fcrAtual: ultimosDados.fcr,
    pesoMedioAtual: ultimosDados.pesoMedio,
    consumoTotal: conversaoData.reduce((acc, item) => acc + item.consumoRacao, 0),
    ganhoMedioSemanal: conversaoData.reduce((acc, item) => acc + item.ganhoSemanal, 0) / conversaoData.length
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Conversão Peso x Ração</h1>
          <p className="text-muted-foreground mt-1">
            Análise de performance e eficiência alimentar
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
              FCR Atual
            </CardTitle>
            <Scale className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {estatisticas.fcrAtual}
            </div>
            <p className="text-xs text-muted-foreground">
              Meta: &lt; 1.40
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Peso Médio Atual
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-status-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-success">
              {estatisticas.pesoMedioAtual}g
            </div>
            <p className="text-xs text-muted-foreground">
              Por ave
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Consumo Total
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {(estatisticas.consumoTotal / 1000).toFixed(1)}kg
            </div>
            <p className="text-xs text-muted-foreground">
              Ração no período
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ganho Médio Semanal
            </CardTitle>
            <div className="w-4 h-4 rounded bg-status-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-success">
              {estatisticas.ganhoMedioSemanal.toFixed(0)}g
            </div>
            <p className="text-xs text-muted-foreground">
              Por ave/semana
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico Principal - Peso x Consumo */}
      <Card className="bg-gradient-card border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            Evolução Peso x Consumo de Ração - {aviariosOptions.find(a => a.id.toString() === aviarioSelecionado)?.nome}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={conversaoData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="semana" 
                  className="text-xs"
                />
                <YAxis 
                  yAxisId="peso"
                  orientation="left"
                  className="text-xs"
                />
                <YAxis 
                  yAxisId="racao"
                  orientation="right"
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
                  yAxisId="peso"
                  type="monotone" 
                  dataKey="pesoMedio" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                  name="Peso Médio (g)"
                />
                <Bar 
                  yAxisId="racao"
                  dataKey="consumoRacao" 
                  fill="hsl(var(--brand-accent))"
                  fillOpacity={0.6}
                  name="Consumo Ração (g)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráfico FCR */}
      <Card className="bg-gradient-card border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Índice de Conversão Alimentar (FCR)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={conversaoData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="semana" 
                  className="text-xs"
                />
                <YAxis 
                  domain={[1.1, 1.5]}
                  className="text-xs"
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="fcr" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 5 }}
                  name="FCR"
                />
                <Line 
                  type="monotone" 
                  dataKey={() => 1.40} 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Meta (1.40)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-amber-500" />
              <span>FCR Atual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-red-600 border-dashed border-t-2" />
              <span>Meta (1.40)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análise e Recomendações */}
      <Card className="bg-gradient-card border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Análise de Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Indicadores Positivos</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-success" />
                  Ganho de peso consistente semanalmente
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-success" />
                  FCR dentro da faixa esperada para a idade
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-success" />
                  Consumo de ração progressivo e estável
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Pontos de Atenção</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-warning" />
                  FCR aumentando nas últimas semanas
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-warning" />
                  Monitorar qualidade da ração
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-status-info" />
                  Avaliar ajustes na formulação
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}