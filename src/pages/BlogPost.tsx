import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Loader2, UserRound } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Post {
  title: string;
  content: string;
  excerpt: string | null;
  published_at: string | null;
  profiles: {
    full_name: string;
  } | null;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      const { data } = await supabase
        .from("blog_posts")
        .select(`
          title,
          content,
          excerpt,
          published_at,
          profiles (full_name)
        `)
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      setPost(data);
      setLoading(false);
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-2xl py-20 text-center">
        <h1 className="text-4xl font-extrabold">Conteúdo não encontrado</h1>
        <p className="mt-4 text-muted-foreground">Este artigo pode ter sido removido ou ainda não está publicado.</p>
        <Button asChild className="mt-8"><Link to="/blog">Voltar aos conteúdos</Link></Button>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-4xl py-6 md:py-12">
      <Button variant="ghost" asChild className="mb-8 -ml-4">
        <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" />Voltar aos conteúdos</Link>
      </Button>

      <Badge>Conhecimento aberto</Badge>
      <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">{post.title}</h1>
      {post.excerpt && <p className="mt-6 text-xl leading-8 text-muted-foreground">{post.excerpt}</p>}

      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-y py-5 text-sm text-muted-foreground">
        {post.profiles?.full_name && (
          <span className="inline-flex items-center gap-2"><UserRound className="h-4 w-4" />{post.profiles.full_name}</span>
        )}
        {post.published_at && (
          <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{format(new Date(post.published_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
        )}
      </div>

      <div className="prose prose-slate mt-10 max-w-none whitespace-pre-wrap text-base leading-8 text-foreground md:text-lg">
        {post.content}
      </div>

      <div className="mt-14 rounded-3xl bg-primary-light/60 p-8">
        <h2 className="text-2xl font-extrabold">Conhecimento deve gerar prática</h2>
        <p className="mt-3 leading-7 text-muted-foreground">
          Os conteúdos da Inclu@tech informam e convidam à reflexão, mas não substituem avaliação clínica, orientação jurídica ou desenho institucional adequado a cada contexto.
        </p>
        <Button asChild className="mt-6"><Link to="/participar">Conheça as formas de participar</Link></Button>
      </div>
    </article>
  );
};

export default BlogPost;
