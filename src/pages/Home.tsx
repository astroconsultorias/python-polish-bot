import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, TrendingUp, Heart } from "lucide-react";
import heroImage from "@/assets/hero-inclusao.jpg";
import featureTalentos from "@/assets/feature-talentos.jpg";
import featureEmpresas from "@/assets/feature-empresas.jpg";
import featureCrescimento from "@/assets/feature-crescimento.jpg";
import featureInclusao from "@/assets/feature-inclusao.jpg";

const Home = () => {
  const features = [
    {
      icon: Users,
      image: featureTalentos,
      title: "Para Talentos",
      description:
        "Crie seu perfil e conecte-se com empresas que valorizam a diversidade e inclusão.",
    },
    {
      icon: Briefcase,
      image: featureEmpresas,
      title: "Para Empresas",
      description:
        "Encontre talentos qualificados e construa equipes mais diversas e inovadoras.",
    },
    {
      icon: TrendingUp,
      image: featureCrescimento,
      title: "Crescimento",
      description:
        "Acesse oportunidades de desenvolvimento profissional e networking.",
    },
    {
      icon: Heart,
      image: featureInclusao,
      title: "Inclusão Real",
      description:
        "Promovemos um ambiente onde todos têm oportunidades iguais de crescer.",
    },
  ];

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl shadow-2xl">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Equipe diversa e inclusiva trabalhando em ambiente tecnológico" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        </div>
        <div className="relative z-10 px-8 py-20 md:px-16 md:py-32 lg:py-40">
          <div className="max-w-4xl">
            <h1 className="mb-8 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Conectando Talentos Inclusivos a Oportunidades
            </h1>
            <p className="mb-10 text-lg text-white/95 md:text-xl lg:text-2xl max-w-2xl leading-relaxed">
              A plataforma que une pessoas neurodivergentes e com deficiência às
              empresas mais inclusivas do Rio Grande do Sul.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="xl" variant="secondary" asChild className="shadow-xl">
                <Link to="/auth?signup=true">Cadastre-se Gratuitamente</Link>
              </Button>
              <Button size="xl" variant="outline" className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-sm shadow-xl" asChild>
                <Link to="/vagas">Ver Vagas Disponíveis</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
            Por que escolher o Inclu@Tech?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Uma plataforma pensada para promover inclusão verdadeira no mercado de trabalho
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="group overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:border-primary/50 hover:-translate-y-1">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={`${feature.title} - representação visual`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="rounded-3xl bg-gradient-card p-12 shadow-2xl md:p-16 border">
        <div className="grid gap-12 text-center md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-5xl md:text-6xl font-bold text-primary">500+</div>
            <div className="text-base font-medium text-muted-foreground">Talentos Cadastrados</div>
          </div>
          <div className="space-y-3">
            <div className="text-5xl md:text-6xl font-bold text-accent">100+</div>
            <div className="text-base font-medium text-muted-foreground">Empresas Parceiras</div>
          </div>
          <div className="space-y-3">
            <div className="text-5xl md:text-6xl font-bold text-success">1000+</div>
            <div className="text-base font-medium text-muted-foreground">Conexões Realizadas</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-3xl bg-gradient-hero p-12 text-center md:p-20 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        <div className="relative z-10">
          <h2 className="mb-6 text-3xl md:text-4xl font-bold text-white">
            Pronto para fazer a diferença?
          </h2>
          <p className="mb-10 text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed">
            Junte-se a nós e faça parte de uma comunidade que valoriza a diversidade e promove oportunidades reais
          </p>
          <Button size="xl" variant="secondary" asChild className="shadow-2xl">
            <Link to="/auth?signup=true">Comece Agora - É Grátis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
