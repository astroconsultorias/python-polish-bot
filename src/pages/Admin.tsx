import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users, Briefcase, FileText, UserCog } from "lucide-react";
import { BlogManager } from "@/components/admin/BlogManager";
import { UsersManager } from "@/components/admin/UsersManager";
import { JobsManager } from "@/components/admin/JobsManager";
import { RolesManager } from "@/components/admin/RolesManager";

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAdmin();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Painel Administrativo</h1>
        <p className="text-muted-foreground">
          Gerencie usuários, vagas, posts do blog e permissões
        </p>
      </div>

      <Tabs defaultValue="blog" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="blog" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Blog</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Usuários</span>
          </TabsTrigger>
          <TabsTrigger value="jobs" className="gap-2">
            <Briefcase className="h-4 w-4" />
            <span className="hidden sm:inline">Vagas</span>
          </TabsTrigger>
          <TabsTrigger value="roles" className="gap-2">
            <UserCog className="h-4 w-4" />
            <span className="hidden sm:inline">Funções</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Posts do Blog</CardTitle>
              <CardDescription>
                Crie, edite e publique posts no blog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BlogManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Usuários</CardTitle>
              <CardDescription>
                Visualize e gerencie todos os usuários da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsersManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Vagas</CardTitle>
              <CardDescription>
                Visualize e gerencie todas as vagas de emprego
              </CardDescription>
            </CardHeader>
            <CardContent>
              <JobsManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Funções</CardTitle>
              <CardDescription>
                Atribua ou remova permissões de administrador
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RolesManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
