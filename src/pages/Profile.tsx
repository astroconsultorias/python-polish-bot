import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Briefcase, FileCheck2, LayoutDashboard, Loader2, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import KnotMark from "@/components/KnotMark";
import { TalentProfileForm } from "@/components/profile/TalentProfileForm";
import { CompanyProfileForm } from "@/components/profile/CompanyProfileForm";
import { ApplicationsList } from "@/components/profile/ApplicationsList";
import { CompanyJobsManager } from "@/components/profile/CompanyJobsManager";
import { CompanyApplicationsManager } from "@/components/profile/CompanyApplicationsManager";

interface ProfileData {
  id: string;
  full_name: string;
  phone: string | null;
  city: string | null;
  state: string | null;
  user_type: "talent" | "company" | "admin";
}

const Profile = () => {
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("id, full_name, phone, city, state, user_type")
          .eq("id", user.id)
          .maybeSingle();
        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [user]);

  const completion = useMemo(() => {
    if (!profile) return 0;
    const values = [profile.full_name, profile.phone, profile.city, profile.state];
    return Math.round((values.filter(Boolean).length / values.length) * 100);
  }, [profile]);

  if (authLoading || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-lg text-center">
          <CardHeader>
            <CardTitle>Perfil ainda não disponível</CardTitle>
            <CardDescription>
              A conta foi autenticada, mas os dados básicos não foram localizados. Saia e entre novamente; se o problema continuar, entre em contato com a equipe.
            </CardDescription>
          </CardHeader>
          <CardContent><Button onClick={() => navigate("/auth")}>Voltar ao acesso</Button></CardContent>
        </Card>
      </div>
    );
  }

  const isTalent = profile.user_type === "talent";
  const isCompany = profile.user_type === "company";
  const roleLabel = isTalent ? "Pessoa ou talento" : isCompany ? "Organização" : "Administração";

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary p-7 text-white shadow-xl md:p-10">
        <div className="dot-grid absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/10 sm:flex">
              <KnotMark className="h-14 w-14" title="Símbolo Inclu@tech" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-white/15 text-white hover:bg-white/15">{roleLabel}</Badge>
                {isAdmin && <Badge className="bg-accent text-accent-foreground">Administrador</Badge>}
              </div>
              <h1 className="mt-4 text-3xl font-extrabold md:text-5xl">Olá, {profile.full_name.split(" ")[0]}.</h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
                Este é o seu espaço para organizar informações, oportunidades e relações com mais clareza e autonomia.
              </p>
            </div>
          </div>

          <div className="min-w-[220px] rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>Dados básicos</span><span>{completion}%</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-accent" style={{ width: `${completion}%` }} />
            </div>
            <p className="mt-3 text-xs leading-5 text-white/65">Complete o perfil profissional ou institucional nas abas abaixo.</p>
          </div>
        </div>
      </section>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-2xl bg-muted p-1.5">
          <TabsTrigger value="overview" className="gap-2 whitespace-nowrap"><LayoutDashboard className="h-4 w-4" />Visão geral</TabsTrigger>
          {isTalent && <TabsTrigger value="professional" className="gap-2 whitespace-nowrap"><UserRound className="h-4 w-4" />Perfil profissional</TabsTrigger>}
          {isTalent && <TabsTrigger value="applications" className="gap-2 whitespace-nowrap"><FileCheck2 className="h-4 w-4" />Candidaturas</TabsTrigger>}
          {isCompany && <TabsTrigger value="organization" className="gap-2 whitespace-nowrap"><Building2 className="h-4 w-4" />Organização</TabsTrigger>}
          {isCompany && <TabsTrigger value="jobs" className="gap-2 whitespace-nowrap"><Briefcase className="h-4 w-4" />Vagas</TabsTrigger>}
          {isCompany && <TabsTrigger value="candidates" className="gap-2 whitespace-nowrap"><FileCheck2 className="h-4 w-4" />Candidaturas</TabsTrigger>}
          {isAdmin && <TabsTrigger value="admin-info" className="gap-2 whitespace-nowrap"><ShieldCheck className="h-4 w-4" />Administração</TabsTrigger>}
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card>
              <CardHeader>
                <CardTitle>Informações da conta</CardTitle>
                <CardDescription>Dados utilizados para identificação e contato na plataforma.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-2xl bg-muted/50 p-4">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">E-mail</p>
                  <p className="mt-2 break-all font-semibold">{user?.email}</p>
                </div>
                <div className="rounded-2xl bg-muted/50 p-4">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Nome</p>
                  <p className="mt-2 font-semibold">{profile.full_name || "Não informado"}</p>
                </div>
                <div className="rounded-2xl bg-muted/50 p-4">
                  <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-muted-foreground"><Phone className="h-3.5 w-3.5" />Telefone</p>
                  <p className="mt-2 font-semibold">{profile.phone || "Não informado"}</p>
                </div>
                <div className="rounded-2xl bg-muted/50 p-4">
                  <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-muted-foreground"><MapPin className="h-3.5 w-3.5" />Localização</p>
                  <p className="mt-2 font-semibold">{profile.city ? `${profile.city}${profile.state ? `/${profile.state}` : ""}` : "Não informada"}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary-light/45">
              <CardHeader>
                <CardTitle>{isTalent ? "Próximos passos" : isCompany ? "Ative sua participação" : "Gestão da plataforma"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                {isTalent && (
                  <>
                    <p>1. Complete competências, experiências e preferências.</p>
                    <p>2. Consulte vagas e leia todas as condições antes de se candidatar.</p>
                    <p>3. Acompanhe o status das candidaturas neste painel.</p>
                    <Button asChild className="mt-2 w-full"><Link to="/vagas">Explorar vagas</Link></Button>
                  </>
                )}
                {isCompany && (
                  <>
                    <p>1. Apresente a organização e suas práticas atuais.</p>
                    <p>2. Publique vagas com linguagem objetiva e condições transparentes.</p>
                    <p>3. Mantenha as pessoas informadas sobre cada etapa.</p>
                    <Button asChild className="mt-2 w-full"><Link to="/participar">Princípios de participação</Link></Button>
                  </>
                )}
                {isAdmin && (
                  <>
                    <p>Gerencie conteúdo, usuários, oportunidades, candidaturas e permissões no painel administrativo.</p>
                    <Button asChild className="mt-2 w-full"><Link to="/admin">Abrir administração</Link></Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {isTalent && (
          <TabsContent value="professional" className="mt-6"><TalentProfileForm userId={user!.id} /></TabsContent>
        )}
        {isTalent && (
          <TabsContent value="applications" className="mt-6"><ApplicationsList userId={user!.id} /></TabsContent>
        )}
        {isCompany && (
          <TabsContent value="organization" className="mt-6"><CompanyProfileForm userId={user!.id} /></TabsContent>
        )}
        {isCompany && (
          <TabsContent value="jobs" className="mt-6"><CompanyJobsManager userId={user!.id} /></TabsContent>
        )}
        {isCompany && (
          <TabsContent value="candidates" className="mt-6"><CompanyApplicationsManager userId={user!.id} /></TabsContent>
        )}
        {isAdmin && (
          <TabsContent value="admin-info" className="mt-6">
            <Card><CardContent className="py-10 text-center"><ShieldCheck className="mx-auto h-12 w-12 text-primary" /><h2 className="mt-4 text-2xl font-extrabold">Painel administrativo protegido</h2><p className="mx-auto mt-3 max-w-xl text-muted-foreground">Acesse os controles globais para revisar usuários, vagas, candidaturas, conteúdos e permissões.</p><Button asChild className="mt-6"><Link to="/admin">Acessar administração</Link></Button></CardContent></Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Profile;
