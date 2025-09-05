import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login - em produção, integrar com Supabase
    if (email && password) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-lg">
              <Monitor className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Avix</h1>
              <p className="text-sm text-muted-foreground">Smart Poultry Monitoring</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground">
            Faça login para acessar seu painel
          </p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm animate-scale-in">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-card-foreground">
              Entrar
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Digite seu e-mail e senha para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-card-foreground">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-card-foreground">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <input type="checkbox" className="rounded border-input" />
                  <span>Lembrar de mim</span>
                </label>
                <a 
                  href="#" 
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Esqueci minha senha
                </a>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 text-base font-medium"
                disabled={!email || !password}
              >
                Entrar
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <a 
                  href="#" 
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Cadastre-se
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground animate-fade-in">
          © 2024 Avix. Todos os direitos reservados.
        </div>
      </div>
    </div>
  );
};

export default Login;