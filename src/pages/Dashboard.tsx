import { useState } from "react";
import { 
  Thermometer, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3,
  Activity,
  Calendar,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data para demonstração
const aviariosData = [
  {
    id: 1,
    nome: "Aviário A1",
    status: "ok",
    temperaturaAtual: 24.5,
    ultimoUpdate: "2024-01-15 14:30",
    capacidade: 15000,
    lotacao: 14200,
    temperaturas24h: [23.2, 23.8, 24.1, 24.5, 24.2, 23.9, 24.3, 24.5]
  },
  {
    id: 2,
    nome: "Aviário A2",
    status: "atencao",
    temperaturaAtual: 26.8,
    ultimoUpdate: "2024-01-15 14:25",
    capacidade: 12000,
    lotacao: 11800,
    temperaturas24h: [25.1, 25.8, 26.2, 26.8, 26.5, 26.1, 26.4, 26.8]
  },
  {
    id: 3,
    nome: "Aviário B1",
    status: "ok",
    temperaturaAtual: 23.8,
    ultimoUpdate: "2024-01-15 14:28",
    capacidade: 18000,
    lotacao: 17500,
    temperaturas24h: [22.9, 23.2, 23.5, 23.8, 23.6, 23.1, 23.4, 23.8]
  }
];

const getStatusConfig = (status: string) => {
  switch (status) {
    case "ok":
      return {
        label: "Normal",
        variant: "default" as const,
        icon: CheckCircle,
        className: "status-ok"
      };
    case "atencao":
      return {
        label: "Atenção",
        variant: "secondary" as const,
        icon: AlertTriangle,
        className: "status-warning"
      };
    case "alerta":
      return {
        label: "Alerta",
        variant: "destructive" as const,
        icon: AlertTriangle,
        className: "status-danger"
      };
    default:
      return {
        label: "Desconhecido",
        variant: "outline" as const,
        icon: Activity,
        className: ""
      };
  }
};

export default function Dashboard() {
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");

  const aviariosFiltrados = aviariosData.filter(aviario => {
    if (filtroStatus === "todos") return true;
    return aviario.status === filtroStatus;
  });

  const estatisticasGerais = {
    totalAviarios: aviariosData.length,
    aviariosOk: aviariosData.filter(a => a.status === "ok").length,
    aviariosAtencao: aviariosData.filter(a => a.status === "atencao").length,
    temperaturaMedia: (aviariosData.reduce((acc, a) => acc + a.temperaturaAtual, 0) / aviariosData.length).toFixed(1),
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral do monitoramento dos aviários
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filtrar status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os aviários</SelectItem>
              <SelectItem value="ok">Somente normais</SelectItem>
              <SelectItem value="atencao">Somente atenção</SelectItem>
              <SelectItem value="alerta">Somente alertas</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Relatórios
          </Button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Aviários
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {estatisticasGerais.totalAviarios}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Status Normal
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-status-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-success">
              {estatisticasGerais.aviariosOk}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Necessitam Atenção
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-status-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-warning">
              {estatisticasGerais.aviariosAtencao}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Temperatura Média
            </CardTitle>
            <Thermometer className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {estatisticasGerais.temperaturaMedia}°C
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grid dos Aviários */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Aviários ({aviariosFiltrados.length})
          </h2>
          <Badge variant="outline" className="text-xs">
            Última atualização: 14:30
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aviariosFiltrados.map((aviario) => {
            const statusConfig = getStatusConfig(aviario.status);
            const StatusIcon = statusConfig.icon;
            const percentualLotacao = ((aviario.lotacao / aviario.capacidade) * 100).toFixed(0);

            return (
              <Card key={aviario.id} className="bg-gradient-card border-0 shadow-md hover:shadow-lg transition-smooth group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-fast">
                        {aviario.nome}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Capacidade: {aviario.capacidade.toLocaleString('pt-BR')} aves
                      </p>
                    </div>
                    <Badge 
                      variant={statusConfig.variant}
                      className={`${statusConfig.className} flex items-center gap-1`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {statusConfig.label}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Temperatura atual */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Thermometer className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Temperatura</span>
                    </div>
                    <div className="text-lg font-bold text-foreground">
                      {aviario.temperaturaAtual}°C
                    </div>
                  </div>

                  {/* Lotação */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Lotação atual</span>
                    <span className="text-sm font-medium">
                      {aviario.lotacao.toLocaleString('pt-BR')} ({percentualLotacao}%)
                    </span>
                  </div>

                  {/* Mini gráfico (simulado) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Últimas 24h</span>
                      <TrendingUp className="w-3 h-3 text-status-success" />
                    </div>
                    <div className="flex items-end gap-1 h-8">
                      {aviario.temperaturas24h.map((temp, index) => {
                        const altura = ((temp - 20) / 10) * 100; // Normalizar para altura do gráfico
                        return (
                          <div 
                            key={index}
                            className="bg-primary/30 rounded-sm flex-1 transition-all hover:bg-primary/50"
                            style={{ height: `${Math.max(altura, 10)}%` }}
                            title={`${temp}°C`}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Último update */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                    <span>Última atualização</span>
                    <span>{aviario.ultimoUpdate}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {aviariosFiltrados.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">Nenhum aviário encontrado</h3>
            <p className="text-sm">
              Tente ajustar os filtros para ver mais resultados.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}