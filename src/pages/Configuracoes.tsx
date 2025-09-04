import { useState } from "react";
import { 
  Settings, 
  User, 
  Building2, 
  Bell, 
  Palette, 
  Globe,
  Save,
  Plus,
  Edit,
  Trash2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// Mock data para demonstração
const aviariosData = [
  {
    id: 1,
    nome: "Aviário A1",
    codigo: "A001",
    localizacao: "Setor Norte",
    capacidade: 15000,
    status: "Ativo"
  },
  {
    id: 2,
    nome: "Aviário A2", 
    codigo: "A002",
    localizacao: "Setor Norte",
    capacidade: 12000,
    status: "Ativo"
  },
  {
    id: 3,
    nome: "Aviário B1",
    codigo: "B001", 
    localizacao: "Setor Sul",
    capacidade: 18000,
    status: "Ativo"
  }
];

export default function Configuracoes() {
  const [nomeUsuario, setNomeUsuario] = useState("Usuário Demo");
  const [emailUsuario, setEmailUsuario] = useState("demo@avix.com");
  const [nomeGranja, setNomeGranja] = useState("Minha Granja");
  const [notificacoes, setNotificacoes] = useState({
    emailAlertas: true,
    smsAlertas: false,
    relatoriosDiarios: true,
    manutencao: true
  });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as configurações do sistema e da sua conta
          </p>
        </div>
        
        <Button className="bg-gradient-primary text-white shadow-brand">
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      {/* Tabs de Configurações */}
      <Tabs defaultValue="perfil" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="perfil" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="aviarios" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Aviários
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="aparencia" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Aparência
          </TabsTrigger>
        </TabsList>

        {/* Aba Perfil */}
        <TabsContent value="perfil" className="space-y-6">
          <Card className="bg-gradient-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={nomeUsuario}
                    onChange={(e) => setNomeUsuario(e.target.value)}
                    placeholder="Digite seu nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={emailUsuario}
                    onChange={(e) => setEmailUsuario(e.target.value)}
                    placeholder="Digite seu e-mail"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="granja">Nome da Granja/Empresa</Label>
                <Input
                  id="granja"
                  value={nomeGranja}
                  onChange={(e) => setNomeGranja(e.target.value)}
                  placeholder="Digite o nome da sua granja"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="idioma">Idioma</Label>
                <Select defaultValue="pt-br">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-br">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Português (Brasil)
                      </div>
                    </SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                Alterar Senha
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Configurar Autenticação em Dois Fatores
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Aviários */}
        <TabsContent value="aviarios" className="space-y-6">
          <Card className="bg-gradient-card border-0 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Gerenciar Aviários
              </CardTitle>
              <Button className="bg-gradient-primary text-white">
                <Plus className="w-4 h-4 mr-2" />
                Novo Aviário
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aviariosData.map((aviario) => (
                  <div 
                    key={aviario.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-foreground">
                          {aviario.nome}
                        </h3>
                        <Badge variant="secondary">
                          {aviario.codigo}
                        </Badge>
                        <Badge variant="outline" className="status-ok">
                          {aviario.status}
                        </Badge>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        <span>{aviario.localizacao} • </span>
                        <span>Capacidade: {aviario.capacidade.toLocaleString('pt-BR')} aves</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Notificações */}
        <TabsContent value="notificacoes" className="space-y-6">
          <Card className="bg-gradient-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Preferências de Notificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Alertas por E-mail</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber alertas de temperatura e sistema por e-mail
                    </p>
                  </div>
                  <Switch 
                    checked={notificacoes.emailAlertas}
                    onCheckedChange={(checked) => 
                      setNotificacoes({...notificacoes, emailAlertas: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Alertas por SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber alertas críticos por mensagem de texto
                    </p>
                  </div>
                  <Switch 
                    checked={notificacoes.smsAlertas}
                    onCheckedChange={(checked) => 
                      setNotificacoes({...notificacoes, smsAlertas: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Relatórios Diários</Label>
                    <p className="text-sm text-muted-foreground">
                      Receber relatório diário de performance dos aviários
                    </p>
                  </div>
                  <Switch 
                    checked={notificacoes.relatoriosDiarios}
                    onCheckedChange={(checked) => 
                      setNotificacoes({...notificacoes, relatoriosDiarios: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">Avisos de Manutenção</Label>
                    <p className="text-sm text-muted-foreground">
                      Lembretes sobre manutenção preventiva dos equipamentos
                    </p>
                  </div>
                  <Switch 
                    checked={notificacoes.manutencao}
                    onCheckedChange={(checked) => 
                      setNotificacoes({...notificacoes, manutencao: checked})
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba Aparência */}
        <TabsContent value="aparencia" className="space-y-6">
          <Card className="bg-gradient-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                Personalização da Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="font-medium">Tema e Paleta de Cores</Label>
                  <p className="text-sm text-muted-foreground">
                    Escolha o tema e as cores que melhor se adequam à sua preferência
                  </p>
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <span className="text-sm text-muted-foreground">
                      Use o botão ao lado para alternar entre temas e paletas
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <Label className="font-medium">Formato de Data</Label>
                  <Select defaultValue="dd-mm-yyyy">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd-mm-yyyy">DD/MM/AAAA</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM/DD/AAAA</SelectItem>
                      <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <Label className="font-medium">Formato de Moeda</Label>
                  <Select defaultValue="brl">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brl">Real Brasileiro (R$)</SelectItem>
                      <SelectItem value="usd">Dólar Americano ($)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <Label className="font-medium">Densidade da Interface</Label>
                  <Select defaultValue="padrao">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compacta">Compacta</SelectItem>
                      <SelectItem value="padrao">Padrão</SelectItem>
                      <SelectItem value="confortavel">Confortável</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Visualização</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                As configurações de aparência são aplicadas automaticamente e 
                ficam salvas para suas próximas sessões no sistema.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}