import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Trash2, Shield, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Profile {
  id: string;
  full_name: string;
  user_type: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  created_at: string;
}

interface UserRole {
  user_id: string;
  role: string;
}

export const UsersManagement = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: rolesData } = await supabase
      .from("user_roles")
      .select("user_id, role");

    setProfiles(profilesData || []);
    setUserRoles(rolesData || []);
    setIsLoading(false);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Tem certeza que deseja deletar este usuário?")) return;

    const { error } = await supabase.from("profiles").delete().eq("id", userId);

    if (error) {
      toast.error("Erro ao deletar usuário");
      console.error(error);
    } else {
      toast.success("Usuário deletado com sucesso!");
      fetchData();
    }
  };

  const handleMakeAdmin = async (userId: string) => {
    const { error } = await supabase
      .from("user_roles")
      .insert([{ user_id: userId, role: "admin" }]);

    if (error) {
      toast.error("Erro ao tornar usuário administrador");
      console.error(error);
    } else {
      toast.success("Usuário promovido a administrador!");
      fetchData();
    }
  };

  const handleRemoveAdmin = async (userId: string) => {
    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", "admin");

    if (error) {
      toast.error("Erro ao remover administrador");
      console.error(error);
    } else {
      toast.success("Privilégios de administrador removidos!");
      fetchData();
    }
  };

  const isAdmin = (userId: string) => {
    return userRoles.some((ur) => ur.user_id === userId && ur.role === "admin");
  };

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.user_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Gerenciar Usuários</h2>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Cidade/Estado</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProfiles.map((profile) => (
              <TableRow key={profile.id}>
                <TableCell className="font-medium">{profile.full_name}</TableCell>
                <TableCell>
                  <span className="capitalize">{profile.user_type}</span>
                </TableCell>
                <TableCell>
                  {profile.city && profile.state
                    ? `${profile.city}, ${profile.state}`
                    : "-"}
                </TableCell>
                <TableCell>
                  {isAdmin(profile.id) ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                      <Shield className="h-3 w-3" />
                      Admin
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-sm">Usuário</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {!isAdmin(profile.id) ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMakeAdmin(profile.id)}
                      >
                        <Shield className="h-4 w-4 mr-1" />
                        Tornar Admin
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveAdmin(profile.id)}
                      >
                        Remover Admin
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteUser(profile.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
