import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, Mail, Phone, ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Application {
  id: string;
  status: string;
  cover_letter: string;
  created_at: string;
  jobs: {
    id: string;
    title: string;
    companies: {
      company_name: string;
    };
  };
  talents: {
    id: string;
    user_id: string;
  };
  profiles?: {
    full_name: string;
    phone: string | null;
    city: string | null;
  };
}

export const ApplicationsManager = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          status,
          cover_letter,
          created_at,
          talent_id,
          jobs (
            id,
            title,
            companies (
              company_name
            )
          ),
          talents (
            id,
            user_id
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Buscar perfis separadamente
      const applicationsWithProfiles = await Promise.all(
        (data || []).map(async (app) => {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("full_name, phone, city")
            .eq("id", app.talents.user_id)
            .single();

          return {
            ...app,
            profiles: profileData || undefined,
          };
        })
      );

      setApplications(applicationsWithProfiles);
    } catch (error) {
      console.error("Error loading applications:", error);
      toast.error("Erro ao carregar candidaturas");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status: newStatus })
        .eq("id", applicationId);

      if (error) throw error;

      toast.success("Status atualizado com sucesso!");
      loadApplications();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Erro ao atualizar status");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from("applications")
        .delete()
        .eq("id", deleteId);

      if (error) throw error;

      toast.success("Candidatura excluída com sucesso!");
      setDeleteId(null);
      loadApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Erro ao excluir candidatura");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aceita":
        return "bg-green-500";
      case "rejeitada":
        return "bg-red-500";
      case "em_analise":
        return "bg-blue-500";
      default:
        return "bg-yellow-500";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Gerenciar Candidaturas</CardTitle>
          <CardDescription>
            Visualize e gerencie todas as candidaturas da plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma candidatura encontrada
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidato</TableHead>
                    <TableHead>Vaga</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{application.profiles?.full_name || "Nome não informado"}</p>
                          <p className="text-sm text-muted-foreground">{application.profiles?.city || "Cidade não informada"}</p>
                        </div>
                      </TableCell>
                      <TableCell>{application.jobs.title}</TableCell>
                      <TableCell>{application.jobs.companies.company_name}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(application.created_at), "dd/MM/yyyy", { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={application.status}
                          onValueChange={(value) => updateStatus(application.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pendente">Pendente</SelectItem>
                            <SelectItem value="em_analise">Em Análise</SelectItem>
                            <SelectItem value="aceita">Aceita</SelectItem>
                            <SelectItem value="rejeitada">Rejeitada</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {application.profiles?.phone && (
                            <Button size="sm" variant="ghost">
                              <Phone className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setDeleteId(application.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta candidatura? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
