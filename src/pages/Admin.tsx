import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { BlogManagement } from "@/components/admin/BlogManagement";
import { UsersManagement } from "@/components/admin/UsersManagement";
import { Shield, Users, FileText } from "lucide-react";

const Admin = () => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Shield className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold">Painel Administrativo</h1>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>

          <TabsContent value="users">
            <UsersManagement />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Admin;
