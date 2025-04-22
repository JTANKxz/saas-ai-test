
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Login attempt:", formData);

      // Mock successful login - in a real app, this would verify credentials with a server
      if (formData.email && formData.password) {
        toast({
          title: "Login bem-sucedido!",
          description: "Bem-vindo ao EFS Gastronomy Hub.",
        });
        
        // Redirect to dashboard after login
        navigate("/categories");
      } else {
        toast({
          title: "Erro de login",
          description: "Por favor, preencha todos os campos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Erro de login",
        description: "Ocorreu um erro ao tentar fazer login. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center">
            <span className="text-3xl font-bold text-gastronomy-600">EFS</span>
            <span className="ml-1 text-xl font-medium text-gray-600">Gastronomy</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Entre na sua conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{" "}
            <Link to="/register" className="font-medium text-gastronomy-600 hover:text-gastronomy-500">
              cadastre-se para uma nova conta
            </Link>
          </p>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Entre com suas credenciais para acessar o painel.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-gastronomy-600 hover:text-gastronomy-500"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
            
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-gastronomy-500 hover:bg-gastronomy-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Ao entrar, você concorda com nossos{" "}
            <Link to="/terms" className="font-medium text-gastronomy-600 hover:text-gastronomy-500">
              Termos de Serviço
            </Link>{" "}
            e{" "}
            <Link to="/privacy" className="font-medium text-gastronomy-600 hover:text-gastronomy-500">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
