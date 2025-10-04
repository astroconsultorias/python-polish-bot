import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold text-foreground">
          Página não encontrada
        </h2>
        <p className="text-muted-foreground">
          A página que você está procurando não existe ou foi movida.
        </p>
      </div>
      <Button asChild>
        <Link to="/">
          <Home className="mr-2 h-4 w-4" />
          Voltar para Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
