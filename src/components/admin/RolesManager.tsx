import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  profiles: {
    full_name: string;
  };
}

export const RolesManager = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState("");

  const fetchRoles = async () => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("*")
        .eq("role", "admin")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      // Fetch profile names separately
      const rolesWithNames = await Promise.all((data || []).map(async (role) => {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", role.user_id)
          .single();
        
        return {
          ...role,
          profiles: { full_name: profile?.full_name || "Desconhecido" }
        };
      }));
      
      setRoles(rolesWithNames);
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Erro ao carregar funções");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Find user by email
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", email.trim())
        .single();

      if (profileError || !profiles) {
        toast.error("Usuário não encontrado. Use o ID do usuário.");
        setIsLoading(false);
        return;
      }

      const { error } = await supabase
        .from("user_roles")
        .insert([{ user_id: profiles.id, role: "admin" }]);

      if (error) throw error;

      toast.success("Administrador adicionado com sucesso!");
      setIsDialogOpen(false);
      setEmail("");
      fetchRoles();
    } catch (error: any) {
      console.error("Error adding admin:", error);
      toast.error(error.message || "Erro ao adicionar administrador");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveAdmin = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover esta permissão de administrador?")) return;

    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Permissão removida com sucesso!");
      fetchRoles();
    } catch (error) {
      console.error("Error removing admin:", error);
      toast.error("Erro ao remover permissão");
    }
  };

  if (isLoading && roles.length === 0) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Administrador
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Administrador</DialogTitle>
            <DialogDescription>
              Informe o ID do usuário para torná-lo administrador
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddAdmin} className="space-y-4">
            <div>
              <Label htmlFor="email">ID do Usuário</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="UUID do usuário"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Adicionar
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>ID do Usuário</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell className="font-medium">
                {role.profiles.full_name}
              </TableCell>
              <TableCell className="font-mono text-sm">{role.user_id}</TableCell>
              <TableCell>
                {format(new Date(role.created_at), "dd/MM/yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveAdmin(role.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
