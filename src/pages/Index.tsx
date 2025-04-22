
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/layout/MainLayout";

const Index = () => {
  const plans = [
    {
      name: "Freemium",
      price: "Grátis",
      duration: "3 dias",
      features: [
        "Cadastro de produtos ilimitado",
        "Gestão de categorias",
        "Cardápio digital básico",
        "Integração com WhatsApp"
      ]
    },
    {
      name: "VIP Mensal",
      price: "R$ 99,90",
      duration: "por mês",
      features: [
        "Todas as features do Freemium",
        "Relatórios avançados",
        "Gestão de funcionários",
        "Controle financeiro",
        "Suporte prioritário"
      ]
    },
    {
      name: "VIP Anual",
      price: "R$ 899,90",
      duration: "por ano",
      features: [
        "Todas as features do plano Mensal",
        "2 meses grátis",
        "Treinamento exclusivo",
        "Suporte 24/7"
      ]
    }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            EFS Gastronomy Hub
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gerencie seu estabelecimento gastronômico de forma simples e eficiente.
            Cardápios digitais, controle de pedidos e muito mais!
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="bg-gastronomy-500 hover:bg-gastronomy-600">
                Começar Agora
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Cardápio Digital</CardTitle>
              <CardDescription>
                Crie e gerencie seu cardápio digital de forma simples e rápida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600">
                <li>Categorias ilimitadas</li>
                <li>Upload de imagens</li>
                <li>Preços e descrições</li>
                <li>Atualização em tempo real</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pedidos via WhatsApp</CardTitle>
              <CardDescription>
                Receba pedidos diretamente no seu WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600">
                <li>Integração automática</li>
                <li>Pedidos formatados</li>
                <li>Comunicação direta</li>
                <li>Histórico de pedidos</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestão Completa</CardTitle>
              <CardDescription>
                Controle total do seu estabelecimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside text-gray-600">
                <li>Controle de estoque</li>
                <li>Gestão financeira</li>
                <li>Relatórios detalhados</li>
                <li>Gestão de funcionários</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Planos e Preços</h2>
          <p className="text-gray-600 mb-8">
            Escolha o plano ideal para o seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="border-2 hover:border-gastronomy-500 transition-all">
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-2xl font-bold text-gastronomy-500">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">/{plan.duration}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-gastronomy-500 mr-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className="block mt-6">
                  <Button className="w-full bg-gastronomy-500 hover:bg-gastronomy-600">
                    Começar Agora
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
