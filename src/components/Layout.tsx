import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { Home, Briefcase, Users, BookOpen, LogOut, User, Shield } from "lucide-react";
import logo from "@/assets/logo.png";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { isAdmin } = useAdmin();

  const navigation = [
    { name: "Início", href: "/", icon: Home },
    { name: "Vagas", href: "/vagas", icon: Briefcase },
    { name: "Sobre", href: "/sobre", icon: Users },
    { name: "Blog", href: "/blog", icon: BookOpen },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-sm">
        <nav className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="Inclu@Tech" className="h-14 w-auto transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold text-foreground hidden sm:inline">Inclu@Tech</span>
          </Link>

          <div className="flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive(item.href)
                      ? "text-primary bg-primary-light"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden lg:inline">{item.name}</span>
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  isActive("/admin")
                    ? "text-primary bg-primary-light"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Shield className="h-4 w-4" />
                <span className="hidden lg:inline">Admin</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="icon" asChild className="rounded-full">
                  <Link to="/perfil">
                    <User className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={signOut} className="rounded-full">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Entrar</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth?signup=true">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-6 py-12">{children}</main>

      {/* Footer */}
      <footer className="mt-auto border-t bg-gradient-subtle">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={logo} alt="Inclu@Tech" className="h-10 w-auto" />
                <h3 className="text-lg font-bold text-foreground">
                  Inclu@Tech
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Conectando talentos neurodivergentes e pessoas com deficiência a empresas
                inclusivas no Rio Grande do Sul.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wide">Links Rápidos</h4>
              <ul className="space-y-3 text-sm">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/termos"
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacidade"
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold text-foreground uppercase tracking-wide">Contato</h4>
              <p className="text-sm text-muted-foreground mb-2">
                contato@incluatech.com.br
              </p>
              <p className="text-sm text-muted-foreground">
                Rio Grande do Sul, Brasil
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© 2025 Inclu@Tech. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
