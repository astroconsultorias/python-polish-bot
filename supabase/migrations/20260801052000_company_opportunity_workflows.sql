-- Inclu@tech: company self-service policies
-- Enables each authenticated organization to manage only its own vacancies
-- and review only applications submitted to those vacancies.

alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.talents enable row level security;
alter table public.profiles enable row level security;

-- Public visitors may read active vacancies. Authenticated companies may also
-- read their own paused vacancies from the management dashboard.
drop policy if exists "inclutech_public_and_owner_read_jobs" on public.jobs;
create policy "inclutech_public_and_owner_read_jobs"
on public.jobs
for select
using (
  coalesce(is_active, false) = true
  or exists (
    select 1
    from public.companies company
    where company.id = jobs.company_id
      and company.user_id = auth.uid()
  )
);

-- A company can create, edit, publish, pause and delete only vacancies linked
-- to the company profile owned by the authenticated user.
drop policy if exists "inclutech_company_manage_own_jobs" on public.jobs;
create policy "inclutech_company_manage_own_jobs"
on public.jobs
for all
to authenticated
using (
  exists (
    select 1
    from public.companies company
    where company.id = jobs.company_id
      and company.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.companies company
    where company.id = jobs.company_id
      and company.user_id = auth.uid()
  )
);

-- Talents can read their own applications.
drop policy if exists "inclutech_talent_read_own_applications" on public.applications;
create policy "inclutech_talent_read_own_applications"
on public.applications
for select
to authenticated
using (
  exists (
    select 1
    from public.talents talent
    where talent.id = applications.talent_id
      and talent.user_id = auth.uid()
  )
);

-- Talents can submit applications using only their own professional profile.
drop policy if exists "inclutech_talent_create_own_applications" on public.applications;
create policy "inclutech_talent_create_own_applications"
on public.applications
for insert
to authenticated
with check (
  exists (
    select 1
    from public.talents talent
    where talent.id = applications.talent_id
      and talent.user_id = auth.uid()
  )
);

-- A company can read applications only for vacancies it owns.
drop policy if exists "inclutech_company_read_own_job_applications" on public.applications;
create policy "inclutech_company_read_own_job_applications"
on public.applications
for select
to authenticated
using (
  exists (
    select 1
    from public.jobs job
    join public.companies company on company.id = job.company_id
    where job.id = applications.job_id
      and company.user_id = auth.uid()
  )
);

-- A company can update the stage only for applications to its vacancies.
drop policy if exists "inclutech_company_update_own_job_applications" on public.applications;
create policy "inclutech_company_update_own_job_applications"
on public.applications
for update
to authenticated
using (
  exists (
    select 1
    from public.jobs job
    join public.companies company on company.id = job.company_id
    where job.id = applications.job_id
      and company.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.jobs job
    join public.companies company on company.id = job.company_id
    where job.id = applications.job_id
      and company.user_id = auth.uid()
  )
);

-- A company may read the professional profile of a person only after that
-- person has applied to one of the company's vacancies.
drop policy if exists "inclutech_company_read_applicant_talents" on public.talents;
create policy "inclutech_company_read_applicant_talents"
on public.talents
for select
to authenticated
using (
  user_id = auth.uid()
  or exists (
    select 1
    from public.applications application
    join public.jobs job on job.id = application.job_id
    join public.companies company on company.id = job.company_id
    where application.talent_id = talents.id
      and company.user_id = auth.uid()
  )
);

-- Basic profile data is available to the applicant and to a company only when
-- an application relationship exists.
drop policy if exists "inclutech_company_read_applicant_profiles" on public.profiles;
create policy "inclutech_company_read_applicant_profiles"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
  or exists (
    select 1
    from public.talents talent
    join public.applications application on application.talent_id = talent.id
    join public.jobs job on job.id = application.job_id
    join public.companies company on company.id = job.company_id
    where talent.user_id = profiles.id
      and company.user_id = auth.uid()
  )
);
