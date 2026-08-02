import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import KnotMark from "@/components/KnotMark";
import { ArrowLeft, Briefcase, Home } from "lucide-react";

const NotFound = () => (
  <div className="flex min-h-[65vh] items-center justify-center py-10">
    <div className="w-full max-w-3xl rounded-[2rem] border bg-white p-8 text-center shadow-xl md:p-14">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28%] bg-primary text-white">
        <KnotMark className="h-14 w-14" title="Símbolo Inclu@tech" />
      </div>
      <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.18em] text-primary">Erro 404</p>
      <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">Este caminho ainda não existe.</h1>
      <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
        O endereço pode ter sido alterado, removido ou digitado incorretamente. Escolha uma das rotas abaixo para continuar.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild><Link to="/"><Home className="mr-2 h-4 w-4" />Página inicial</Link></Button>
        <Button variant="outline" asChild className="border-2"><Link to="/vagas"><Briefcase className="mr-2 h-4 w-4" />Ver vagas</Link></Button>
        <Button variant="ghost" onClick={() => window.history.back()}><ArrowLeft className="mr-2 h-4 w-4" />Voltar</Button>
      </div>
    </div>
  </div>
);

export default NotFound;
