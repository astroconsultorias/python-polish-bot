import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import KnotMark from "@/components/KnotMark";
import { LogOut, Menu, Shield, User, X } from "lucide-react";

const institutionalNavigation = [
  { name: "Projeto", hash: "#projeto" },
  { name: "Método", hash: "#metodo" },
  { name: "Impacto", hash: "#impacto" },
  { name: "Origem", hash: "#sobre" },
  { name: "Contato", hash: "#contato" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-white/95 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10" aria-label="Navegação principal">
          <Link to="/" className="group flex items-center gap-3" aria-label="Inclu@tech — página inicial">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-white shadow-lg transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
              <KnotMark className="h-8 w-9" title="Símbolo Nó que Desata" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-foreground">
              Inclu<span className="text-gradient">@tech</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {institutionalNavigation.map((item) => (
              <a
                key={item.name}
                href={sectionHref(item.hash)}
                className="text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            {user ? (
              <>
                {isAdmin && (
                  <Button variant="ghost" size="icon" asChild className="rounded-full" aria-label="Administração">
                    <Link to="/admin">
                      <Shield className="h-5 w-5" />
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" size="icon" asChild className="rounded-full" aria-label="Perfil">
                  <Link to="/perfil">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={signOut} className="rounded-full" aria-label="Sair">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" asChild className="border-2 font-bold">
                <Link to="/auth">Área da plataforma</Link>
              </Button>
            )}

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted lg:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted sm:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {mobileOpen && (
          <div id="mobile-navigation" className="border-t bg-white px-6 py-5 shadow-lg lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {institutionalNavigation.map((item) => (
                <a
                  key={item.name}
                  href={sectionHref(item.hash)}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  {item.name}
                </a>
              ))}
              <div className="mt-3 border-t pt-4 sm:hidden">
                {user ? (
                  <div className="grid gap-2">
                    {isAdmin && (
                      <Button variant="ghost" asChild className="justify-start">
                        <Link to="/admin">Administração</Link>
                      </Button>
                    )}
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to="/perfil">Meu perfil</Link>
                    </Button>
                    <Button variant="ghost" onClick={signOut} className="justify-start">
                      Sair
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" asChild className="w-full border-2 font-bold">
                    <Link to="/auth">Área da plataforma</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className={isHome ? "flex-1" : "container mx-auto flex-1 px-6 py-12"}>{children}</main>

      <footer className="mt-auto border-t bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left lg:px-10">
          <div>
            <div className="flex items-center justify-center gap-2 md:justify-start">
              <KnotMark className="h-7 w-9 text-primary" title="Símbolo Inclu@tech" />
              <span className="font-extrabold">Inclu@tech</span>
            </div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              Tecnologia social para neuroinclusão em saúde e, futuramente, no trabalho. Projeto em fase de estruturação e validação.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold text-muted-foreground md:justify-end">
            <Link to="/privacidade" className="transition-colors hover:text-primary">Privacidade</Link>
            <span aria-hidden="true">·</span>
            <Link to="/termos" className="transition-colors hover:text-primary">Termos</Link>
            <span aria-hidden="true">·</span>
            <a href="mailto:astroconsultorias@gmail.com" className="transition-colors hover:text-primary">Contato</a>
            <span className="basis-full text-xs font-normal md:basis-auto md:pl-3">© 2026 Inclu@tech</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
