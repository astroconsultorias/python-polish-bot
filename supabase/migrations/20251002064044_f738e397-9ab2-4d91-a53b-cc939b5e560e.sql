-- Criar enum para tipos de deficiência
CREATE TYPE disability_type AS ENUM (
  'visual',
  'auditiva',
  'fisica',
  'intelectual',
  'psicossocial',
  'multipla',
  'neurodivergencia',
  'outro'
);

-- Criar enum para níveis de escolaridade
CREATE TYPE education_level AS ENUM (
  'fundamental_incompleto',
  'fundamental_completo',
  'medio_incompleto',
  'medio_completo',
  'superior_incompleto',
  'superior_completo',
  'pos_graduacao',
  'mestrado',
  'doutorado'
);

-- Criar enum para tipos de usuário
CREATE TYPE user_type AS ENUM ('talent', 'company', 'admin');

-- Tabela de perfis de usuários (dados públicos)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type user_type NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  state TEXT DEFAULT 'RS',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de talentos (pessoas com deficiência/neurodivergentes)
CREATE TABLE public.talents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  age INTEGER,
  disability_types disability_type[],
  disability_description TEXT,
  education_level education_level,
  course TEXT,
  professional_experience TEXT,
  skills TEXT[],
  linkedin_url TEXT,
  portfolio_url TEXT,
  availability TEXT,
  preferred_work_model TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Tabela de empresas
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  cnpj TEXT,
  industry TEXT,
  company_size TEXT,
  website TEXT,
  description TEXT,
  accessibility_practices TEXT,
  benefits TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Tabela de vagas
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  responsibilities TEXT,
  location TEXT,
  work_model TEXT,
  salary_range TEXT,
  benefits TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabela de candidaturas
CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.jobs(id) ON DELETE CASCADE,
  talent_id UUID NOT NULL REFERENCES public.talents(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pendente',
  cover_letter TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(job_id, talent_id)
);

-- Tabela de posts do blog
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published_at TIMESTAMPTZ,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies para profiles (usuários podem ver todos, mas só editar o próprio)
CREATE POLICY "Perfis são visíveis por todos"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir seu próprio perfil"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policies para talents
CREATE POLICY "Talentos são visíveis por todos"
  ON public.talents FOR SELECT
  USING (true);

CREATE POLICY "Talentos podem criar seu próprio perfil"
  ON public.talents FOR INSERT
  WITH CHECK (auth.uid() = (SELECT id FROM public.profiles WHERE id = user_id));

CREATE POLICY "Talentos podem atualizar seu próprio perfil"
  ON public.talents FOR UPDATE
  USING (auth.uid() = (SELECT id FROM public.profiles WHERE id = user_id));

-- Policies para companies
CREATE POLICY "Empresas são visíveis por todos"
  ON public.companies FOR SELECT
  USING (true);

CREATE POLICY "Empresas podem criar seu próprio perfil"
  ON public.companies FOR INSERT
  WITH CHECK (auth.uid() = (SELECT id FROM public.profiles WHERE id = user_id));

CREATE POLICY "Empresas podem atualizar seu próprio perfil"
  ON public.companies FOR UPDATE
  USING (auth.uid() = (SELECT id FROM public.profiles WHERE id = user_id));

-- Policies para jobs
CREATE POLICY "Vagas são visíveis por todos"
  ON public.jobs FOR SELECT
  USING (is_active = true OR EXISTS (
    SELECT 1 FROM public.companies 
    WHERE companies.id = jobs.company_id 
    AND companies.user_id = auth.uid()
  ));

CREATE POLICY "Empresas podem criar vagas"
  ON public.jobs FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.companies 
    WHERE companies.id = company_id 
    AND companies.user_id = auth.uid()
  ));

CREATE POLICY "Empresas podem atualizar suas vagas"
  ON public.jobs FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.companies 
    WHERE companies.id = company_id 
    AND companies.user_id = auth.uid()
  ));

CREATE POLICY "Empresas podem deletar suas vagas"
  ON public.jobs FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM public.companies 
    WHERE companies.id = company_id 
    AND companies.user_id = auth.uid()
  ));

-- Policies para applications
CREATE POLICY "Candidaturas são visíveis pelo talento e pela empresa"
  ON public.applications FOR SELECT
  USING (
    auth.uid() = (SELECT user_id FROM public.talents WHERE id = talent_id)
    OR auth.uid() = (SELECT user_id FROM public.companies WHERE id = (SELECT company_id FROM public.jobs WHERE id = job_id))
  );

CREATE POLICY "Talentos podem criar candidaturas"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = (SELECT user_id FROM public.talents WHERE id = talent_id));

CREATE POLICY "Empresas podem atualizar status das candidaturas"
  ON public.applications FOR UPDATE
  USING (auth.uid() = (SELECT user_id FROM public.companies WHERE id = (SELECT company_id FROM public.jobs WHERE id = job_id)));

-- Policies para blog_posts
CREATE POLICY "Posts publicados são visíveis por todos"
  ON public.blog_posts FOR SELECT
  USING (is_published = true);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_talents_updated_at BEFORE UPDATE ON public.talents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger para criar profile automaticamente após signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, user_type, full_name, phone, city, state)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'user_type')::user_type, 'talent'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'city',
    COALESCE(NEW.raw_user_meta_data->>'state', 'RS')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();