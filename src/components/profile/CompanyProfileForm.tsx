import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const companyFormSchema = z.object({
  company_name: z.string().min(2, "Nome da empresa obrigatório"),
  cnpj: z.string().min(14, "CNPJ inválido").max(18).optional(),
  industry: z.string().optional(),
  company_size: z.string().optional(),
  website: z.string().url("URL inválida").optional().or(z.literal("")),
  description: z.string().max(1000, "Máximo 1000 caracteres").optional(),
  benefits: z.string().optional(),
  accessibility_practices: z.string().max(1000).optional(),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

export const CompanyProfileForm = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      company_name: "",
    },
  });

  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        const { data, error } = await supabase
          .from("companies")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error && error.code !== "PGRST116") throw error;

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
        toast.error("Erro ao carregar dados da empresa");
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
        company_name: values.company_name,
        cnpj: values.cnpj,
        industry: values.industry,
        company_size: values.company_size,
        website: values.website,
        description: values.description,
        benefits: values.benefits ? values.benefits.split(",").map(b => b.trim()) : [],
        accessibility_practices: values.accessibility_practices,
      };

      const { error } = await supabase
        .from("companies")
        .upsert([companyData], { onConflict: "user_id" });

      if (error) throw error;

      toast.success("Perfil da empresa atualizado com sucesso!");
    } catch (error) {
      console.error("Error saving company data:", error);
      toast.error("Erro ao salvar perfil da empresa");
    } finally {
      setSaving(false);
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
    <Card>
      <CardHeader>
        <CardTitle>Perfil da Empresa</CardTitle>
        <CardDescription>
          Complete o perfil da sua empresa para atrair os melhores talentos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="company_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da sua empresa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="00.000.000/0000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.suaempresa.com.br" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Setor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o setor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="saude">Saúde</SelectItem>
                        <SelectItem value="educacao">Educação</SelectItem>
                        <SelectItem value="financeiro">Financeiro</SelectItem>
                        <SelectItem value="varejo">Varejo</SelectItem>
                        <SelectItem value="industria">Indústria</SelectItem>
                        <SelectItem value="servicos">Serviços</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tamanho da Empresa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tamanho" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 funcionários</SelectItem>
                        <SelectItem value="11-50">11-50 funcionários</SelectItem>
                        <SelectItem value="51-200">51-200 funcionários</SelectItem>
                        <SelectItem value="201-500">201-500 funcionários</SelectItem>
                        <SelectItem value="501+">501+ funcionários</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobre a Empresa</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva sua empresa, sua missão e cultura organizacional..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefícios Oferecidos</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Vale alimentação, Plano de saúde, Home office (separados por vírgula)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accessibility_practices"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Práticas de Acessibilidade e Inclusão</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descreva as práticas de inclusão da sua empresa, adaptações no ambiente de trabalho, políticas de diversidade, etc..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Perfil da Empresa
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
