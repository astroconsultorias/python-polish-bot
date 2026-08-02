import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Building2, Calendar, HeartHandshake, Hospital, User } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  published_at: string | null;
  profiles: {
    full_name: string;
  } | null;
}

const editorialPillars = [
  { icon: Hospital, title: "Saúde e experiência", text: "Barreiras, previsibilidade, comunicação e práticas possíveis em jornadas de cuidado." },
  { icon: Building2, title: "Trabalho e organizações", text: "Ambientes sustentáveis, processos seletivos, acomodação e responsabilidade social." },
  { icon: HeartHandshake, title: "Empreendedorismo social", text: "Como combinar impacto, sustentabilidade econômica, participação e transparência." },
];

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select(`
            id,
            title,
            excerpt,
            slug,
            published_at,
            profiles (full_name)
          `)
          .eq("is_published", true)
          .order("published_at", { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Não foi possível carregar os conteúdos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="space-y-12 pb-10">
      <section className="relative overflow-hidden rounded-[2rem] bg-primary px-7 py-12 text-white shadow-2xl md:px-12 md:py-16">
        <div className="dot-grid absolute inset-0 opacity-10" aria-hidden="true" />
        <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <BookOpen className="mb-5 h-10 w-10" />
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/65">Conhecimento aberto</p>
            <h1 className="mt-4 text-4xl font-extrabold md:text-6xl">Conteúdo para compreender, questionar e agir.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
              Neuroinclusão, saúde, trabalho e empreendedorismo social explicados com profundidade, limites claros e compromisso com aplicação responsável.
            </p>
          </div>
          <Button variant="secondary" asChild className="font-bold"><Link to="/participar">Participar da construção<ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {editorialPillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Card key={pillar.title} className="bg-muted/45">
              <CardContent className="p-7">
                <Icon className="h-7 w-7 text-primary" />
                <h2 className="mt-5 text-xl font-extrabold">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{pillar.text}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {isLoading ? (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-72 animate-pulse rounded-3xl bg-muted" />)}
        </div>
      ) : posts.length === 0 ? (
        <Card className="rounded-3xl border-2 border-dashed">
          <CardContent className="py-16 text-center">
            <h2 className="text-2xl font-extrabold">Primeiros conteúdos em preparação</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg leading-7 text-muted-foreground">
              A publicação começará com textos derivados do Documento Mestre, da escuta institucional e dos aprendizados da construção do projeto. Não usaremos volume de postagem para substituir evidência ou trabalho real.
            </p>
            <Button variant="outline" asChild className="mt-6 border-2"><Link to="/sobre">Conhecer a base do projeto</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <section>
          <div className="mb-7 flex items-end justify-between gap-4">
            <div><p className="text-sm font-extrabold uppercase tracking-wider text-primary">Publicações</p><h2 className="mt-2 text-3xl font-extrabold">Ideias para transformar prática</h2></div>
            <p className="text-sm text-muted-foreground">{posts.length} {posts.length === 1 ? "conteúdo" : "conteúdos"}</p>
          </div>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <Card className="flex h-full flex-col rounded-3xl transition-all group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-xl">
                  <CardHeader>
                    <Badge variant="secondary" className="mb-2 w-fit">Artigo</Badge>
                    <CardTitle className="line-clamp-3 text-2xl leading-tight group-hover:text-primary">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-4 text-base leading-7">{post.excerpt || "Leia este conteúdo da Inclu@tech."}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {post.profiles && <span className="flex items-center gap-1"><User className="h-4 w-4" />{post.profiles.full_name}</span>}
                      {post.published_at && <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{format(new Date(post.published_at), "dd/MM/yyyy", { locale: ptBR })}</span>}
                    </div>
                    <span className="mt-6 inline-flex items-center text-sm font-extrabold text-primary">Ler conteúdo<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Blog;
