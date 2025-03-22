import useSWR from 'swr';
import { HouseholdsByUserId } from '@/utils/supabase/queries';

interface MembershipsResponse {
  memberships: HouseholdsByUserId;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useMembershipList() {
  const { data, error, isLoading } = useSWR<MembershipsResponse>(
    '/api/households/memberships',
    fetcher
  );

  return {
    memberships: data?.memberships,
    isLoading,
    isError: error,
  };
}
