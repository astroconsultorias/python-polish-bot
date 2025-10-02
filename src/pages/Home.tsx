import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, TrendingUp, Heart } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Para Talentos",
      description:
        "Crie seu perfil e conecte-se com empresas que valorizam a diversidade e inclusão.",
    },
    {
      icon: Briefcase,
      title: "Para Empresas",
      description:
        "Encontre talentos qualificados e construa equipes mais diversas e inovadoras.",
    },
    {
      icon: TrendingUp,
      title: "Crescimento",
      description:
        "Acesse oportunidades de desenvolvimento profissional e networking.",
    },
    {
      icon: Heart,
      title: "Inclusão Real",
      description:
        "Promovemos um ambiente onde todos têm oportunidades iguais de crescer.",
    },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-hero px-8 py-16 text-white shadow-xl md:px-16 md:py-24">
        <div className="relative z-10 max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Conectando Talentos Inclusivos a Oportunidades
          </h1>
          <p className="mb-8 text-lg text-white/90 md:text-xl">
            A plataforma que une pessoas neurodivergentes e com deficiência às
            empresas mais inclusivas do Rio Grande do Sul.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth?signup=true">Cadastre-se Gratuitamente</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/vagas">Ver Vagas</Link>
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      </section>

      {/* Features */}
      <section>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Por que escolher o Inclu@Tech?
          </h2>
          <p className="text-lg text-muted-foreground">
            Uma plataforma pensada para promover inclusão verdadeira
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="rounded-2xl bg-card p-8 shadow-lg md:p-12">
        <div className="grid gap-8 text-center md:grid-cols-3">
          <div>
            <div className="mb-2 text-4xl font-bold text-primary">500+</div>
            <div className="text-muted-foreground">Talentos Cadastrados</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-accent">100+</div>
            <div className="text-muted-foreground">Empresas Parceiras</div>
          </div>
          <div>
            <div className="mb-2 text-4xl font-bold text-success">1000+</div>
            <div className="text-muted-foreground">Conexões Realizadas</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-muted p-8 text-center md:p-12">
        <h2 className="mb-4 text-3xl font-bold text-foreground">
          Pronto para fazer a diferença?
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Junte-se a nós e faça parte de uma comunidade que valoriza a diversidade
        </p>
        <Button size="lg" asChild>
          <Link to="/auth?signup=true">Comece Agora</Link>
        </Button>
      </section>
    </div>
  );
};

export default Home;
