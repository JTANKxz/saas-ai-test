
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<"individual" | "business">("business");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    responsibleName: "",
    email: "",
    phone: "",
    whatsapp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    if (accountType === "business" && !formData.companyName) {
      toast({
        title: "Erro de validação",
        description: "O nome da empresa é obrigatório para contas empresariais.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Registration data:", { accountType, ...formData });

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo ao EFS Gastronomy Hub.",
      });
      
      // Redirect to categories (dashboard) after registration
      navigate("/categories");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro ao tentar criar sua conta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center">
            <span className="text-3xl font-bold text-gastronomy-600">EFS</span>
            <span className="ml-1 text-xl font-medium text-gray-600">Gastronomy</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Crie sua conta</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ou{" "}
            <Link to="/login" className="font-medium text-gastronomy-600 hover:text-gastronomy-500">
              entre com sua conta existente
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Criar Conta</CardTitle>
            <CardDescription>
              Preencha os campos abaixo para criar sua conta na plataforma.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <Tabs defaultValue="business" onValueChange={(value) => setAccountType(value as "individual" | "business")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="individual">Pessoa Física</TabsTrigger>
                  <TabsTrigger value="business">Empresa</TabsTrigger>
                </TabsList>
                
                <TabsContent value="individual" className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="Seu nome completo"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome da Empresa (Opcional)</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="Nome do seu negócio (se houver)"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="business" className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="responsibleName">Nome do Responsável *</Label>
                    <Input
                      id="responsibleName"
                      name="responsibleName"
                      required
                      placeholder="Nome do responsável pela empresa"
                      value={formData.responsibleName}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Nome da Empresa *</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      required
                      placeholder="Nome do seu estabelecimento"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp *</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  placeholder="(00) 00000-0000"
                  value={formData.whatsapp}
                  onChange={handleChange}
                />
                <p className="text-sm text-muted-foreground">
                  Este número receberá os pedidos dos clientes via WhatsApp.
                </p>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Plano Inicial</Label>
                <RadioGroup defaultValue="freemium">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="freemium" id="freemium" />
                    <Label htmlFor="freemium" className="font-normal">
                      Freemium (3 dias de teste gratuito)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="font-normal">
                      VIP Mensal (R$ 99,90/mês)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="annual" id="annual" />
                    <Label htmlFor="annual" className="font-normal">
                      VIP Anual (R$ 899,90/ano - economia de 25%)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-gastronomy-500 hover:bg-gastronomy-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Criando conta..." : "Criar Conta"}
              </Button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Ao criar uma conta, você concorda com nossos{" "}
                <Link to="/terms" className="text-gastronomy-600 hover:text-gastronomy-500">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link to="/privacy" className="text-gastronomy-600 hover:text-gastronomy-500">
                  Política de Privacidade
                </Link>
                .
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
