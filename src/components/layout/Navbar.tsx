
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-gastronomy-600">EFS</span>
                <span className="ml-1 text-lg font-medium text-gray-600">Gastronomy</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-600 hover:text-gastronomy-500 hover:border-gastronomy-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Início
              </Link>
              <Link
                to="/plans"
                className="border-transparent text-gray-600 hover:text-gastronomy-500 hover:border-gastronomy-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Planos
              </Link>
              <Link
                to="/about"
                className="border-transparent text-gray-600 hover:text-gastronomy-500 hover:border-gastronomy-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Sobre
              </Link>
              <Link
                to="/contact"
                className="border-transparent text-gray-600 hover:text-gastronomy-500 hover:border-gastronomy-500 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Contato
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link to="/login">
              <Button variant="outline" className="mr-3">
                Entrar
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gastronomy-500 hover:bg-gastronomy-600">
                Cadastre-se
              </Button>
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gastronomy-500"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Abrir menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-gray-600 hover:bg-gastronomy-50 hover:text-gastronomy-500 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/plans"
              className="text-gray-600 hover:bg-gastronomy-50 hover:text-gastronomy-500 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Planos
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:bg-gastronomy-50 hover:text-gastronomy-500 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:bg-gastronomy-50 hover:text-gastronomy-500 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Link to="/login" className="block w-full">
                  <Button variant="outline" className="w-full mb-2">
                    Entrar
                  </Button>
                </Link>
                <Link to="/register" className="block w-full">
                  <Button className="w-full bg-gastronomy-500 hover:bg-gastronomy-600">
                    Cadastre-se
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
