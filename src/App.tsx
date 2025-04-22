
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import CategoryDetail from "./pages/CategoryDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard" element={<Index />} /> {/* Placeholder - to be implemented */}
              
              {/* Category Management Routes */}
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/new" element={<AddCategory />} />
              <Route path="/categories/:id" element={<CategoryDetail />} />
              <Route path="/categories/:id/edit" element={<EditCategory />} />
              
              {/* Products, Orders, and other routes will be added here later */}
              <Route path="/products" element={<NotFound />} /> {/* Placeholder - to be implemented */}
              <Route path="/products/new" element={<NotFound />} /> {/* Placeholder - to be implemented */}
              <Route path="/products/:id" element={<NotFound />} /> {/* Placeholder - to be implemented */}
              
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
