import { useState } from "react";
import { Calendar, Download, Thermometer, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data para demonstração
const aviariosOptions = [
  { id: 1, nome: "Aviário A1" },
  { id: 2, nome: "Aviário A2" },
  { id: 3, nome: "Aviário B1" }
];

const temperaturaData = [
  { hora: "00:00", temperatura: 23.5, meta: 24.0 },
  { hora: "02:00", temperatura: 23.2, meta: 24.0 },
  { hora: "04:00", temperatura: 22.8, meta: 24.0 },
  { hora: "06:00", temperatura: 23.1, meta: 24.0 },
  { hora: "08:00", temperatura: 24.2, meta: 24.0 },
  { hora: "10:00", temperatura: 25.1, meta: 24.0 },
  { hora: "12:00", temperatura: 25.8, meta: 24.0 },
  { hora: "14:00", temperatura: 26.2, meta: 24.0 },
  { hora: "16:00", temperatura: 25.9, meta: 24.0 },
  { hora: "18:00", temperatura: 25.3, meta: 24.0 },
  { hora: "20:00", temperatura: 24.8, meta: 24.0 },
  { hora: "22:00", temperatura: 24.1, meta: 24.0 }
];

export default function Temperatura() {
  const [aviarioSelecionado, setAviarioSelecionado] = useState<string>("1");
  const [dataInicio, setDataInicio] = useState<string>("2024-01-14");
  const [dataFim, setDataFim] = useState<string>("2024-01-15");

  const estatisticas = {
    temperaturaAtual: 24.8,
    temperaturaMedia: 24.2,
    temperaturaMinima: 22.8,
    temperaturaMaxima: 26.2
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Temperatura do Aviário</h1>
          <p className="text-muted-foreground mt-1">
            Monitoramento térmico em tempo real
          </p>
        </div>
        
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
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
              Temperatura Atual
            </CardTitle>
            <Thermometer className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {estatisticas.temperaturaAtual}°C
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Média do Período
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-status-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-success">
              {estatisticas.temperaturaMedia}°C
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mínima
            </CardTitle>
            <div className="w-4 h-4 rounded bg-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {estatisticas.temperaturaMinima}°C
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Máxima
            </CardTitle>
            <div className="w-4 h-4 rounded bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {estatisticas.temperaturaMaxima}°C
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico Principal */}
      <Card className="bg-gradient-card border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-primary" />
            Histórico de Temperatura - {aviariosOptions.find(a => a.id.toString() === aviarioSelecionado)?.nome}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={temperaturaData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="hora" 
                  className="text-xs"
                />
                <YAxis 
                  domain={['dataMin - 1', 'dataMax + 1']}
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
                  dataKey="temperatura" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  name="Temperatura Real"
                />
                <Line 
                  type="monotone" 
                  dataKey="meta" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  name="Meta"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-primary" />
              <span>Temperatura Real</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-muted-foreground border-dashed border-t-2" />
              <span>Meta (24°C)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}