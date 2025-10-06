-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update blog_posts RLS policies for admin management
DROP POLICY IF EXISTS "Posts publicados são visíveis por todos" ON public.blog_posts;

CREATE POLICY "Posts publicados são visíveis por todos"
ON public.blog_posts
FOR SELECT
USING (is_published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem criar posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem atualizar posts"
ON public.blog_posts
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem deletar posts"
ON public.blog_posts
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update profiles RLS for admin management
CREATE POLICY "Admins podem deletar perfis"
ON public.profiles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update talents RLS for admin management
CREATE POLICY "Admins podem deletar talentos"
ON public.talents
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update companies RLS for admin management
CREATE POLICY "Admins podem deletar empresas"
ON public.companies
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Update jobs RLS for admin viewing inactive jobs
DROP POLICY IF EXISTS "Vagas são visíveis por todos" ON public.jobs;

CREATE POLICY "Vagas são visíveis por todos"
ON public.jobs
FOR SELECT
USING (
  is_active = true 
  OR public.has_role(auth.uid(), 'admin')
  OR EXISTS (
    SELECT 1 FROM companies 
    WHERE companies.id = jobs.company_id 
    AND companies.user_id = auth.uid()
  )
);

-- Update applications RLS for admin management
CREATE POLICY "Admins podem ver todas candidaturas"
ON public.applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem deletar candidaturas"
ON public.applications
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));