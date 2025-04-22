
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, XCircle, Image as ImageIcon } from "lucide-react";

interface CategoryFormProps {
  initialData?: {
    id?: number;
    name: string;
    slug: string;
    description: string;
    image: string;
    isActive: boolean;
  };
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

const CategoryForm = ({
  initialData = {
    name: "",
    slug: "",
    description: "",
    image: "",
    isActive: true,
  },
  onSubmit,
  isSubmitting = false,
}: CategoryFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData.image || null);
  
  const isEditing = !!initialData.id;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-generate slug from name if it's a new category
    if (name === "name" && !isEditing) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload the file to a server or cloud storage
    // For now, we'll just create a preview
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Categoria *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Lanches, Bebidas, Sobremesas"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Ex: lanches, bebidas, sobremesas"
                disabled={isEditing}
                className={isEditing ? "opacity-70" : ""}
              />
              {isEditing && (
                <p className="text-sm text-muted-foreground">
                  O slug não pode ser alterado após a criação.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva brevemente esta categoria de produtos"
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2 pt-4">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isActive">Categoria Ativa</Label>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Imagem da Categoria</Label>
            <Card className="border-dashed">
              <CardContent className="pt-6">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
                      onClick={removeImage}
                    >
                      <XCircle className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center border border-dashed rounded-lg h-64 bg-muted/30">
                    <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                    <div className="text-sm text-muted-foreground mb-4">
                      Arraste uma imagem ou clique para fazer upload
                    </div>
                    <div className="relative">
                      <Button type="button" variant="secondary">
                        <Upload className="h-4 w-4 mr-2" />
                        Escolher Imagem
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <p className="text-sm text-muted-foreground">
              Recomendado: Imagem com pelo menos 600x400px. Formatos: JPG, PNG
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/categories")}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="bg-gastronomy-500 hover:bg-gastronomy-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Salvando..." : isEditing ? "Atualizar Categoria" : "Criar Categoria"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
