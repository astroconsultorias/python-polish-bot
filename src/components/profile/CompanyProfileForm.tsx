import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Building2, Loader2, ShieldCheck } from "lucide-react";

const companyFormSchema = z.object({
  company_name: z.string().min(2, "Informe o nome da organização"),
  cnpj: z.string().min(14, "CNPJ inválido").max(18, "CNPJ inválido").optional().or(z.literal("")),
  industry: z.string().optional(),
  company_size: z.string().optional(),
  website: z.string().url("Informe uma URL válida").optional().or(z.literal("")),
  description: z.string().max(1200, "Máximo 1200 caracteres").optional(),
  benefits: z.string().optional(),
  accessibility_practices: z.string().max(1500, "Máximo 1500 caracteres").optional(),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

export const CompanyProfileForm = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      company_name: "",
      cnpj: "",
      industry: "",
      company_size: "",
      website: "",
      description: "",
      benefits: "",
      accessibility_practices: "",
    },
  });

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        const { data, error } = await supabase
          .from("companies")
          .select("*")
          .eq("user_id", userId)
          .maybeSingle();

        if (error) throw error;
        if (data) {
          form.reset({
            company_name: data.company_name || "",
            cnpj: data.cnpj || "",
            industry: data.industry || "",
            company_size: data.company_size || "",
            website: data.website || "",
            description: data.description || "",
            benefits: data.benefits?.join(", ") || "",
            accessibility_practices: data.accessibility_practices || "",
          });
        }
      } catch (error) {
        console.error("Error loading company data:", error);
        toast.error("Não foi possível carregar o perfil da organização");
      } finally {
        setLoading(false);
      }
    };
    loadCompanyData();
  }, [userId, form]);

  const onSubmit = async (values: CompanyFormValues) => {
    setSaving(true);
    try {
      const companyData = {
        user_id: userId,
        company_name: values.company_name.trim(),
        cnpj: values.cnpj?.trim() || null,
        industry: values.industry || null,
        company_size: values.company_size || null,
        website: values.website || null,
        description: values.description?.trim() || null,
        benefits: values.benefits ? values.benefits.split(",").map((item) => item.trim()).filter(Boolean) : [],
        accessibility_practices: values.accessibility_practices?.trim() || null,
      };

      const { error } = await supabase
        .from("companies")
        .upsert([companyData], { onConflict: "user_id" });

      if (error) throw error;
      toast.success("Perfil da organização atualizado");
    } catch (error) {
      console.error("Error saving company data:", error);
      toast.error("Não foi possível salvar o perfil da organização");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary-light/45">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white"><Building2 className="h-6 w-6" /></div>
          <div>
            <CardTitle className="text-2xl">Identidade e compromisso da organização</CardTitle>
            <CardDescription className="mt-2 max-w-3xl text-sm leading-6">
              Um perfil completo ajuda as pessoas a compreenderem quem está contratando, quais condições são oferecidas e quais práticas de inclusão já existem. Descreva a realidade atual com honestidade — inclusive aquilo que ainda está em desenvolvimento.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
            <FormField control={form.control} name="company_name" render={({ field }) => (
              <FormItem><FormLabel>Nome da organização *</FormLabel><FormControl><Input placeholder="Nome público da empresa, instituição ou negócio" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <div className="grid gap-5 md:grid-cols-2">
              <FormField control={form.control} name="cnpj" render={({ field }) => (
                <FormItem><FormLabel>CNPJ <span className="font-normal text-muted-foreground">(opcional nesta fase)</span></FormLabel><FormControl><Input placeholder="00.000.000/0000-00" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="website" render={({ field }) => (
                <FormItem><FormLabel>Site ou página institucional</FormLabel><FormControl><Input placeholder="https://www.suaorganizacao.com.br" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField control={form.control} name="industry" render={({ field }) => (
                <FormItem><FormLabel>Setor de atuação</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione o setor" /></SelectTrigger></FormControl><SelectContent>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem><SelectItem value="saude">Saúde</SelectItem><SelectItem value="educacao">Educação</SelectItem><SelectItem value="financeiro">Financeiro</SelectItem><SelectItem value="varejo">Varejo</SelectItem><SelectItem value="industria">Indústria</SelectItem><SelectItem value="servicos">Serviços</SelectItem><SelectItem value="terceiro_setor">Terceiro setor</SelectItem><SelectItem value="outro">Outro</SelectItem>
                </SelectContent></Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="company_size" render={({ field }) => (
                <FormItem><FormLabel>Tamanho da equipe</FormLabel><Select onValueChange={field.onChange} value={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger></FormControl><SelectContent><SelectItem value="1-10">1 a 10 pessoas</SelectItem><SelectItem value="11-50">11 a 50 pessoas</SelectItem><SelectItem value="51-200">51 a 200 pessoas</SelectItem><SelectItem value="201-500">201 a 500 pessoas</SelectItem><SelectItem value="501+">Mais de 500 pessoas</SelectItem></SelectContent></Select><FormMessage /></FormItem>
              )} />
            </div>

            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Quem é a organização?</FormLabel><FormControl><Textarea placeholder="Explique o serviço prestado, propósito, cultura, rotina e o impacto que a organização busca gerar para clientes, trabalhadores e comunidade." className="min-h-36" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <FormField control={form.control} name="benefits" render={({ field }) => (
              <FormItem><FormLabel>Benefícios e condições oferecidas</FormLabel><FormControl><Input placeholder="Ex.: vale-alimentação, plano de saúde, horário flexível, apoio à formação (separados por vírgula)" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            <div className="rounded-3xl border bg-muted/35 p-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div><h3 className="font-extrabold">Práticas de acessibilidade e inclusão</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">Não é necessário parecer perfeita. Informe o que já existe, o que está em implantação e como a pessoa pode solicitar adaptações durante seleção e trabalho.</p></div>
              </div>
              <FormField control={form.control} name="accessibility_practices" render={({ field }) => (
                <FormItem className="mt-6"><FormLabel>Como a organização acolhe necessidades diversas?</FormLabel><FormControl><Textarea placeholder="Ex.: contato para solicitar acomodação, entrevistas com instruções antecipadas, flexibilidade, ambiente com menor estímulo, acessibilidade física ou revisão de comunicação." className="min-h-36 bg-white" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2"><Badge variant="secondary">Transparência gera confiança</Badge><Badge variant="outline">Perfil editável</Badge></div>
              <Button type="submit" disabled={saving} className="font-bold">{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Salvar perfil da organização</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
