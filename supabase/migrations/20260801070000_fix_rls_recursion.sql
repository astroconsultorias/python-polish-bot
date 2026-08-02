-- Inclu@tech: remove recursive RLS dependencies between applications and talents.
-- Authorization checks run through private SECURITY DEFINER helpers so policies
-- can verify ownership without re-entering one another.

create schema if not exists private;

create or replace function private.owns_talent(_talent_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.talents t
    where t.id = _talent_id and t.user_id = auth.uid()
  );
$$;

create or replace function private.owns_company(_company_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.companies c
    where c.id = _company_id and c.user_id = auth.uid()
  );
$$;

create or replace function private.owns_job(_job_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.jobs j
    join public.companies c on c.id = j.company_id
    where j.id = _job_id and c.user_id = auth.uid()
  );
$$;

create or replace function private.company_can_read_talent(_talent_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.applications a
    join public.jobs j on j.id = a.job_id
    join public.companies c on c.id = j.company_id
    where a.talent_id = _talent_id and c.user_id = auth.uid()
  );
$$;

create or replace function private.company_can_read_profile(_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.talents t
    join public.applications a on a.talent_id = t.id
    join public.jobs j on j.id = a.job_id
    join public.companies c on c.id = j.company_id
    where t.user_id = _profile_id and c.user_id = auth.uid()
  );
$$;

revoke all on function private.owns_talent(uuid) from public, anon;
revoke all on function private.owns_company(uuid) from public, anon;
revoke all on function private.owns_job(uuid) from public, anon;
revoke all on function private.company_can_read_talent(uuid) from public, anon;
revoke all on function private.company_can_read_profile(uuid) from public, anon;

grant execute on function private.owns_talent(uuid) to authenticated;
grant execute on function private.owns_company(uuid) to authenticated;
grant execute on function private.owns_job(uuid) to authenticated;
grant execute on function private.company_can_read_talent(uuid) to authenticated;
grant execute on function private.company_can_read_profile(uuid) to authenticated;

drop policy if exists "inclutech_company_manage_own_jobs" on public.jobs;
create policy "inclutech_company_manage_own_jobs"
on public.jobs for all to authenticated
using (private.owns_company(company_id))
with check (private.owns_company(company_id));

drop policy if exists "inclutech_talent_read_own_applications" on public.applications;
create policy "inclutech_talent_read_own_applications"
on public.applications for select to authenticated
using (private.owns_talent(talent_id));

drop policy if exists "inclutech_talent_create_own_applications" on public.applications;
create policy "inclutech_talent_create_own_applications"
on public.applications for insert to authenticated
with check (private.owns_talent(talent_id));

drop policy if exists "inclutech_company_read_own_job_applications" on public.applications;
create policy "inclutech_company_read_own_job_applications"
on public.applications for select to authenticated
using (private.owns_job(job_id));

drop policy if exists "inclutech_company_update_own_job_applications" on public.applications;
create policy "inclutech_company_update_own_job_applications"
on public.applications for update to authenticated
using (private.owns_job(job_id))
with check (private.owns_job(job_id));

drop policy if exists "inclutech_company_read_applicant_talents" on public.talents;
create policy "inclutech_company_read_applicant_talents"
on public.talents for select to authenticated
using (user_id = auth.uid() or private.company_can_read_talent(id));

drop policy if exists "inclutech_company_read_applicant_profiles" on public.profiles;
create policy "inclutech_company_read_applicant_profiles"
on public.profiles for select to authenticated
using (id = auth.uid() or private.company_can_read_profile(id));
