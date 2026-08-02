import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import KnotMark from "@/components/KnotMark";
import { Building2, CheckCircle2, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

const signUpSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  fullName: z.string().min(2, "Informe seu nome ou o nome do responsável"),
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().max(2, "Use a sigla do estado").default("RS"),
  userType: z.enum(["talent", "company"]),
});

const signInSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("RS");
  const [userType, setUserType] = useState<"talent" | "company">("talent");

  const defaultTab = searchParams.get("signup") === "true" ? "signup" : "signin";

  useEffect(() => {
    const requestedType = searchParams.get("type");
    if (requestedType === "company" || requestedType === "talent") {
      setUserType(requestedType);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) navigate("/perfil");
  }, [user, navigate]);

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = signUpSchema.parse({ email, password, fullName, phone, city, state, userType });
      const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/perfil`,
          data: {
            full_name: validatedData.fullName,
            phone: validatedData.phone,
            city: validatedData.city,
            state: validatedData.state.toUpperCase(),
            user_type: validatedData.userType,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast.error("Este e-mail já está cadastrado. Use a opção Entrar.");
        } else {
          toast.error(error.message);
        }
        return;
      }

      if (data.session) {
        toast.success("Conta criada. Vamos completar seu perfil.");
        navigate("/perfil");
      } else {
        toast.success("Conta criada. Verifique seu e-mail para confirmar o acesso.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) toast.error(error.errors[0].message);
      else toast.error("Não foi possível criar a conta");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = signInSchema.parse({ email, password });
      const { error } = await supabase.auth.signInWithPassword({
        email: validatedData.email,
        password: validatedData.password,
      });

      if (error) {
        toast.error(error.message.includes("Invalid login credentials") ? "E-mail ou senha incorretos" : error.message);
        return;
      }

      toast.success("Acesso realizado com sucesso");
      navigate("/perfil");
    } catch (error) {
      if (error instanceof z.ZodError) toast.error(error.errors[0].message);
      else toast.error("Não foi possível entrar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto grid min-h-[72vh] max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-white shadow-2xl md:p-12">
        <div className="dot-grid absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="relative z-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <KnotMark className="h-11 w-11" title="Símbolo Inclu@tech" />
          </div>
          <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.16em] text-white/65">Área da comunidade</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl">
            Oportunidade com autonomia. Inclusão com responsabilidade.
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/75">
            A plataforma conecta pessoas e organizações, mas preserva a essência do projeto: reduzir barreiras, tornar informações mais claras e construir relações que reconheçam competências e necessidades reais.
          </p>
          <div className="mt-8 space-y-4 text-sm text-white/80">
            <p className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />Seu perfil pode ser construído aos poucos.</p>
            <p className="flex gap-3"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />Informações sobre deficiência e acomodações ficam sob seu controle.</p>
            <p className="flex gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />Nenhum diagnóstico é exigido para criar uma conta.</p>
          </div>
        </div>
      </section>

      <Card className="border-0 shadow-xl ring-1 ring-border">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-extrabold">Bem-vindo à Inclu@tech</CardTitle>
          <CardDescription className="text-base leading-6">
            Entre no seu painel ou escolha como deseja participar da plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Entrar</TabsTrigger>
              <TabsTrigger value="signup">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="pt-5">
              <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">E-mail</Label>
                  <Input id="signin-email" type="email" autoComplete="email" placeholder="seu@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Senha</Label>
                  <Input id="signin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                </div>
                <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Acessar meu painel"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="pt-5">
              <form onSubmit={handleSignUp} className="space-y-5">
                <div className="space-y-3">
                  <Label>Como você participará?</Label>
                  <RadioGroup value={userType} onValueChange={(value) => setUserType(value as "talent" | "company")} className="grid gap-3 sm:grid-cols-2">
                    <label className={`cursor-pointer rounded-2xl border p-4 transition ${userType === "talent" ? "border-primary bg-primary-light/55" : "hover:bg-muted"}`}>
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="talent" id="talent" className="mt-1" />
                        <div>
                          <UserRound className="mb-2 h-5 w-5 text-primary" />
                          <span className="block font-extrabold">Pessoa ou talento</span>
                          <span className="mt-1 block text-xs leading-5 text-muted-foreground">Criar perfil profissional, consultar vagas e acompanhar candidaturas.</span>
                        </div>
                      </div>
                    </label>
                    <label className={`cursor-pointer rounded-2xl border p-4 transition ${userType === "company" ? "border-primary bg-primary-light/55" : "hover:bg-muted"}`}>
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value="company" id="company" className="mt-1" />
                        <div>
                          <Building2 className="mb-2 h-5 w-5 text-primary" />
                          <span className="block font-extrabold">Organização</span>
                          <span className="mt-1 block text-xs leading-5 text-muted-foreground">Apresentar a empresa, publicar vagas e acompanhar candidaturas.</span>
                        </div>
                      </div>
                    </label>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">{userType === "company" ? "Nome do responsável" : "Nome completo"}</Label>
                  <Input id="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">E-mail</Label>
                  <Input id="signup-email" type="email" autoComplete="email" placeholder="seu@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" type="tel" placeholder="(51) 99999-9999" value={phone} onChange={(event) => setPhone(event.target.value)} />
                  </div>
                  <div className="grid grid-cols-[1fr_72px] gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input id="city" value={city} onChange={(event) => setCity(event.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">UF</Label>
                      <Input id="state" value={state} onChange={(event) => setState(event.target.value)} maxLength={2} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Senha</Label>
                  <Input id="signup-password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                  <p className="text-xs text-muted-foreground">Use pelo menos 6 caracteres.</p>
                </div>

                <Button type="submit" className="w-full font-bold" disabled={isLoading}>
                  {isLoading ? "Criando conta..." : "Criar minha conta"}
                </Button>
                <p className="text-center text-xs leading-5 text-muted-foreground">
                  Ao criar a conta, você concorda com os Termos de Uso e a Política de Privacidade. Informações adicionais só serão solicitadas no contexto adequado.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
