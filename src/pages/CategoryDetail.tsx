
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Pencil, Package, Tag, Calendar, Check, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/layout/DashboardLayout";

// Mock data for categories (same as before)
const initialCategories = [
  {
    id: 1,
    name: "Lanches",
    slug: "lanches",
    description: "Hambúrgueres, sanduíches, hot dogs",
    productCount: 24,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isActive: true,
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-10-22T14:45:00Z",
  },
  {
    id: 2,
    name: "Bebidas",
    slug: "bebidas",
    description: "Refrigerantes, sucos, cervejas, coquetéis",
    productCount: 18,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1257&q=80",
    isActive: true,
    createdAt: "2023-06-15T10:35:00Z",
    updatedAt: "2023-11-05T09:20:00Z",
  },
  {
    id: 3,
    name: "Sobremesas",
    slug: "sobremesas",
    description: "Doces, bolos, sorvetes, pudins",
    productCount: 12,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80",
    isActive: true,
    createdAt: "2023-06-15T10:40:00Z",
    updatedAt: "2023-09-18T16:30:00Z",
  },
  {
    id: 4,
    name: "Pratos Principais",
    slug: "pratos-principais",
    description: "Carnes, peixes, aves, massas",
    productCount: 15,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    isActive: true,
    createdAt: "2023-06-15T11:00:00Z",
    updatedAt: "2023-12-01T13:15:00Z",
  },
  {
    id: 5,
    name: "Aperitivos",
    slug: "aperitivos",
    description: "Petiscos, entradas, porções",
    productCount: 9,
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isActive: false,
    createdAt: "2023-07-10T09:15:00Z",
    updatedAt: "2023-11-20T10:45:00Z",
  },
  {
    id: 6,
    name: "Veganos",
    slug: "veganos",
    description: "Opções 100% vegetais",
    productCount: 7,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isActive: true,
    createdAt: "2023-08-05T14:20:00Z",
    updatedAt: "2023-12-10T11:30:00Z",
  },
];

// Mock data for products in this category
const mockProducts = [
  {
    id: 1,
    name: "X-Burguer",
    price: 18.9,
    description: "Pão, hambúrguer, queijo, alface, tomate e maionese",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    categoryId: 1,
  },
  {
    id: 2,
    name: "X-Bacon",
    price: 22.9,
    description: "Pão, hambúrguer, queijo, bacon, alface, tomate e maionese",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    categoryId: 1,
  },
  {
    id: 3,
    name: "X-Egg",
    price: 20.9,
    description: "Pão, hambúrguer, queijo, ovo, alface, tomate e maionese",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1560&q=80",
    categoryId: 1,
  },
  {
    id: 4,
    name: "X-Tudo",
    price: 26.9,
    description: "Pão, hambúrguer, queijo, bacon, ovo, presunto, alface, tomate e maionese",
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80",
    categoryId: 1,
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const CategoryDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Find category by ID in our mock data
        const categoryId = parseInt(id as string);
        const foundCategory = initialCategories.find(cat => cat.id === categoryId);
        
        if (foundCategory) {
          setCategory(foundCategory);
          
          // Get products for this category
          // In a real app, this would be a separate API call
          const categoryProducts = mockProducts.filter(product => product.categoryId === categoryId);
          setProducts(categoryProducts);
        } else {
          toast({
            title: "Categoria não encontrada",
            description: "A categoria que você está procurando não existe.",
            variant: "destructive",
          });
          navigate("/categories");
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os detalhes da categoria.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategoryDetails();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-gastronomy-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando detalhes da categoria...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!category) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <h2 className="text-2xl font-bold mb-2">Categoria não encontrada</h2>
          <p className="text-gray-500 mb-4">
            A categoria que você está procurando não existe ou foi removida.
          </p>
          <Button 
            onClick={() => navigate("/categories")}
            className="bg-gastronomy-500 hover:bg-gastronomy-600"
          >
            Voltar para Categorias
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/categories")}
              className="h-8 w-8 p-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
              <p className="text-gray-500">{category.description}</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate(`/categories/${category.id}/edit`)}
            className="bg-gastronomy-500 hover:bg-gastronomy-600"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Editar Categoria
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Detalhes da Categoria</CardTitle>
                <CardDescription>Informações sobre a categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-1 border-b">
                      <span className="text-sm font-medium text-gray-500">Status</span>
                      <div>
                        {category.isActive ? (
                          <Badge className="bg-culinary-500 flex items-center">
                            <Check className="mr-1 h-3 w-3" /> Ativo
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-gray-500 flex items-center">
                            <X className="mr-1 h-3 w-3" /> Inativo
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-sm font-medium text-gray-500">URL (Slug)</span>
                      <span className="text-sm">{category.slug}</span>
                    </div>
                    
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-sm font-medium text-gray-500">
                        <Package className="inline-block mr-1 h-4 w-4" /> Produtos
                      </span>
                      <Badge variant="outline" className="font-medium">
                        {category.productCount}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-sm font-medium text-gray-500">Criado em</span>
                      <span className="text-sm">{formatDate(category.createdAt)}</span>
                    </div>
                    
                    <div className="flex justify-between py-1 border-b">
                      <span className="text-sm font-medium text-gray-500">Última atualização</span>
                      <span className="text-sm">{formatDate(category.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Produtos nesta Categoria</CardTitle>
                    <CardDescription>
                      {products.length} produtos em {category.name}
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate("/products/new", { state: { categoryId: category.id } })}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Produto
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {products.length > 0 ? (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <p className="font-medium text-gastronomy-600">
                            R$ {product.price.toFixed(2).replace(".", ",")}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-sm text-gray-500 hover:text-gastronomy-500"
                            onClick={() => navigate(`/products/${product.id}`)}
                          >
                            Ver detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <Tag className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhum produto encontrado
                    </h3>
                    <p className="text-gray-500 max-w-md mb-6">
                      Esta categoria ainda não possui produtos cadastrados. Adicione produtos para exibi-los aqui.
                    </p>
                    <Button 
                      onClick={() => navigate("/products/new", { state: { categoryId: category.id } })}
                      className="bg-gastronomy-500 hover:bg-gastronomy-600"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Adicionar Primeiro Produto
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CategoryDetail;
