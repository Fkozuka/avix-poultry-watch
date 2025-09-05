import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Thermometer, 
  Flame, 
  Scale,
  Calendar,
  Clock
} from "lucide-react";

const Relatorio = () => {
  // Dados fictícios para demonstração
  const dadosConsolidados = {
    temperatura: {
      media: 26.5,
      minima: 22.1,
      maxima: 31.2,
      status: "normal"
    },
    aquecedor: {
      tempoLigado: "14h 32min",
      consumo: "245 kWh",
      eficiencia: "87%",
      status: "ativo"
    },
    conversao: {
      pesoMedio: 2.8,
      racaoConsumida: 156.7,
      conversaoAlimentar: 1.89,
      status: "otimo"
    }
  };

  const alertas = [
    { tipo: "warning", mensagem: "Temperatura acima da média nas últimas 2 horas", tempo: "2h atrás" },
    { tipo: "info", mensagem: "Aquecedor desligado automaticamente", tempo: "4h atrás" },
    { tipo: "success", mensagem: "Meta de conversão alimentar atingida", tempo: "6h atrás" }
  ];

  const exportarRelatorio = () => {
    // Aqui seria implementada a lógica de exportação
    console.log("Exportando relatório...");
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Análise consolidada dos dados do aviário
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Últimas 24h
          </Badge>
          <Button onClick={exportarRelatorio} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperatura</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dadosConsolidados.temperatura.media}°C</div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              <span>Min: {dadosConsolidados.temperatura.minima}°C</span>
              <span className="mx-2">•</span>
              <span>Max: {dadosConsolidados.temperatura.maxima}°C</span>
            </div>
            <Badge 
              variant={dadosConsolidados.temperatura.status === "normal" ? "default" : "destructive"} 
              className="mt-2"
            >
              {dadosConsolidados.temperatura.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aquecedor</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dadosConsolidados.aquecedor.eficiencia}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <Clock className="w-3 h-3 mr-1" />
              <span>Tempo ativo: {dadosConsolidados.aquecedor.tempoLigado}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Consumo: {dadosConsolidados.aquecedor.consumo}
            </div>
            <Badge 
              variant={dadosConsolidados.aquecedor.status === "ativo" ? "default" : "secondary"} 
              className="mt-2"
            >
              {dadosConsolidados.aquecedor.status}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversão</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dadosConsolidados.conversao.conversaoAlimentar}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-2">
              <TrendingDown className="w-3 h-3 mr-1 text-green-500" />
              <span>Peso médio: {dadosConsolidados.conversao.pesoMedio}kg</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Ração: {dadosConsolidados.conversao.racaoConsumida}kg
            </div>
            <Badge 
              variant={dadosConsolidados.conversao.status === "otimo" ? "default" : "secondary"} 
              className="mt-2"
            >
              {dadosConsolidados.conversao.status}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Alertas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Alertas Recentes
          </CardTitle>
          <CardDescription>
            Eventos importantes das últimas 24 horas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertas.map((alerta, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alerta.tipo === 'warning' ? 'bg-yellow-500' :
                  alerta.tipo === 'info' ? 'bg-blue-500' : 'bg-green-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alerta.mensagem}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {alerta.tempo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seção de Análise de Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Semanal</CardTitle>
            <CardDescription>
              Comparativo dos últimos 7 dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Temperatura Média</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">+2.1%</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Eficiência Aquecedor</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">+5.3%</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm">Conversão Alimentar</span>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">-3.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Metas e Objetivos</CardTitle>
            <CardDescription>
              Status das metas estabelecidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Temperatura Ideal</span>
                  <Badge variant="default">Atingida</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Eficiência Energética</span>
                  <Badge variant="default">Atingida</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Conversão Alimentar</span>
                  <Badge variant="secondary">Em progresso</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Relatorio;