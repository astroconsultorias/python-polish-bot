import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import KnotMark from "@/components/KnotMark";
import { BriefcaseBusiness, LogIn, LogOut, Menu, Shield, UserRound, X } from "lucide-react";

const publicNavigation = [
  { name: "Início", to: "/" },
  { name: "O projeto", to: "/sobre" },
  { name: "Como funciona", to: "/sobre#metodo" },
  { name: "Oportunidades", to: "/vagas" },
  { name: "Conteúdos", to: "/blog" },
  { name: "Contato", to: "/participar" },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();
  const [mobileOpen, setMobileOpen] = useState(false);
  const fullWidth = location.pathname === "/" || location.pathname === "/participar";

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const linkClass = (path: string) => {
    const cleanPath = path.split("#")[0];
    const isActive = cleanPath === "/" ? location.pathname === "/" : location.pathname === cleanPath;

    return `rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
      isActive
        ? "bg-primary-light text-primary"
        : "text-muted-foreground hover:bg-muted hover:text-primary"
    }`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-[hsl(var(--background)/0.96)] backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-10 xl:px-16" aria-label="Navegação principal">
          <Link to="/" className="group flex items-center gap-3" aria-label="Inclu@tech — página inicial">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-lg transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
              <KnotMark className="h-8 w-8" title="Símbolo Inclu@tech: pessoa no centro e ambiente preparado" />
            </span>
            <span>
              <span className="block text-xl font-extrabold tracking-tight text-foreground">
                Inclu<span className="text-primary">@tech</span>
              </span>
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground 2xl:block">
                Tecnologia social para neuroinclusão
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-0 xl:flex">
            {publicNavigation.map((item) => (
              <Link key={item.to} to={item.to} className={linkClass(item.to)}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            {user ? (
              <>
                <Button variant="outline" size="sm" asChild className="border-2 font-bold">
                  <Link to="/perfil">
                    <BriefcaseBusiness className="mr-2 h-4 w-4" />
                    Meu painel
                  </Link>
                </Button>
                {isAdmin && (
                  <Button variant="ghost" size="icon" asChild className="rounded-full" aria-label="Administração">
                    <Link to="/admin"><Shield className="h-5 w-5" /></Link>
                  </Button>
                )}
                <Button variant="ghost" size="icon" onClick={signOut} className="rounded-full" aria-label="Sair">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="hidden font-bold md:inline-flex">
                  <Link to="/auth"><LogIn className="mr-2 h-4 w-4" />Entrar</Link>
                </Button>
                <Button size="sm" asChild className="bg-accent px-5 font-bold text-white hover:bg-accent/90">
                  <Link to="/participar">Quero colaborar</Link>
                </Button>
              </>
            )}

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted xl:hidden"
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
          <div id="mobile-navigation" className="border-t bg-background px-6 py-5 shadow-lg xl:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {publicNavigation.map((item) => (
                <Link key={item.to} to={item.to} className={linkClass(item.to)}>
                  {item.name}
                </Link>
              ))}

              <div className="mt-3 border-t pt-4">
                {user ? (
                  <div className="grid gap-2">
                    <Button variant="ghost" asChild className="justify-start">
                      <Link to="/perfil"><UserRound className="mr-2 h-4 w-4" />Meu painel</Link>
                    </Button>
                    {isAdmin && (
                      <Button variant="ghost" asChild className="justify-start">
                        <Link to="/admin"><Shield className="mr-2 h-4 w-4" />Administração</Link>
                      </Button>
                    )}
                    <Button variant="ghost" onClick={signOut} className="justify-start">
                      <LogOut className="mr-2 h-4 w-4" />Sair
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Button variant="outline" asChild className="border-2 font-bold">
                      <Link to="/auth">Entrar</Link>
                    </Button>
                    <Button asChild className="bg-accent font-bold text-white hover:bg-accent/90">
                      <Link to="/participar">Quero colaborar</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <main className={fullWidth ? "flex-1" : "container mx-auto flex-1 px-6 py-10 md:py-14"}>{children}</main>

      <footer className="mt-auto border-t bg-[hsl(var(--foreground))] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 md:grid-cols-[1.35fr_1fr_0.75fr] lg:px-10 xl:px-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <KnotMark className="h-7 w-7" title="Símbolo Inclu@tech" />
              </span>
              <span className="text-xl font-extrabold">Inclu@tech</span>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">
              Tecnologia social para reduzir barreiras em saúde e desenvolver caminhos mais humanos para trabalho, participação e geração de renda. Projeto em estruturação e validação responsável.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">Navegue</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/65">
              {publicNavigation.map((item) => (
                <Link key={item.to} to={item.to} className="transition-colors hover:text-white">{item.name}</Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">Transparência</h2>
            <div className="mt-4 grid gap-3 text-sm text-white/65">
              <Link to="/privacidade" className="transition-colors hover:text-white">Privacidade</Link>
              <Link to="/termos" className="transition-colors hover:text-white">Termos de uso</Link>
              <a href="mailto:astroconsultorias@gmail.com" className="transition-colors hover:text-white">Contato institucional</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-white/45">
          © 2026 Inclu@tech · Porto Alegre, Brasil · Nenhuma parceria institucional é presumida sem autorização formal.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
