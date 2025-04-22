
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayout";
import CategoryForm from "@/components/forms/CategoryForm";

const AddCategory = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Category added:", data);
      
      toast({
        title: "Categoria criada com sucesso!",
        description: `A categoria "${data.name}" foi adicionada ao seu catálogo.`,
      });
      
      navigate("/categories");
    } catch (error) {
      console.error("Error adding category:", error);
      
      toast({
        title: "Erro ao criar categoria",
        description: "Ocorreu um erro ao adicionar a categoria. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <h1 className="text-3xl font-bold tracking-tight">Nova Categoria</h1>
            <p className="text-gray-500">
              Crie uma nova categoria para organizar seus produtos no cardápio
            </p>
          </div>
        </div>

        <CategoryForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </DashboardLayout>
  );
};

export default AddCategory;
