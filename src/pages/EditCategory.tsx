
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CategoryForm from "@/components/forms/CategoryForm";

// Mock data for categories (same as in Categories.tsx)
const initialCategories = [
  {
    id: 1,
    name: "Lanches",
    slug: "lanches",
    description: "Hambúrgueres, sanduíches, hot dogs",
    productCount: 24,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isActive: true,
  },
  {
    id: 2,
    name: "Bebidas",
    slug: "bebidas",
    description: "Refrigerantes, sucos, cervejas, coquetéis",
    productCount: 18,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1257&q=80",
    isActive: true,
  },
  {
    id: 3,
    name: "Sobremesas",
    slug: "sobremesas",
    description: "Doces, bolos, sorvetes, pudins",
    productCount: 12,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80",
    isActive: true,
  },
  {
    id: 4,
    name: "Pratos Principais",
    slug: "pratos-principais",
    description: "Carnes, peixes, aves, massas",
    productCount: 15,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    isActive: true,
  },
  {
    id: 5,
    name: "Aperitivos",
    slug: "aperitivos",
    description: "Petiscos, entradas, porções",
    productCount: 9,
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isActive: false,
  },
  {
    id: 6,
    name: "Veganos",
    slug: "veganos",
    description: "Opções 100% vegetais",
    productCount: 7,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    isActive: true,
  },
];

const EditCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Find category by ID in our mock data
        const categoryId = parseInt(id as string);
        const foundCategory = initialCategories.find(cat => cat.id === categoryId);
        
        if (foundCategory) {
          // Extract the fields needed for the form
          const { id, name, slug, description, image, isActive } = foundCategory;
          setCategory({ id, name, slug, description, image, isActive });
        } else {
          toast({
            title: "Categoria não encontrada",
            description: "A categoria que você está tentando editar não existe.",
            variant: "destructive",
          });
          navigate("/categories");
        }
      } catch (error) {
        console.error("Error fetching category:", error);
        toast({
          title: "Erro ao carregar dados",
          description: "Não foi possível carregar os dados da categoria.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [id, navigate]);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Category updated:", data);
      
      toast({
        title: "Categoria atualizada com sucesso!",
        description: `As alterações na categoria "${data.name}" foram salvas.`,
      });
      
      navigate("/categories");
    } catch (error) {
      console.error("Error updating category:", error);
      
      toast({
        title: "Erro ao atualizar categoria",
        description: "Ocorreu um erro ao salvar as alterações. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-gastronomy-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando dados da categoria...</p>
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
            A categoria que você está tentando editar não existe ou foi removida.
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
            <h1 className="text-3xl font-bold tracking-tight">Editar Categoria</h1>
            <p className="text-gray-500">
              Editar detalhes da categoria "{category.name}"
            </p>
          </div>
        </div>

        <CategoryForm 
          initialData={category} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </DashboardLayout>
  );
};

export default EditCategory;
