import { createClient } from '@/utils/supabase/server';
import { QueryData } from '@supabase/supabase-js';

type SupabaseServerClientType = Awaited<ReturnType<typeof createClient>>;

export const getHouseholdByIdQuery = (
  supabaseClient: SupabaseServerClientType,
  id: string
) => {
  return supabaseClient
    .from('households')
    .select(
      `
          id,
          title,
          creator:creator_id(
            full_name,
            avatar_url
          ),
          created_at,
          updated_at
          `
    )
    .eq('id', id)
    .single();
};

export type Household = QueryData<ReturnType<typeof getHouseholdByIdQuery>>;

export const getHouseholdsByUserIdQuery = (
  supabaseClient: SupabaseServerClientType,
  userId: string
) => {
  return supabaseClient
    .from('household_members')
    .select(
      `
      id,
      household:household_id(
        id,
        title,
        creator:creator_id(
          full_name,
          avatar_url
        ),
        created_at,
        latest_item:household_items(
          last_updated_at
        )
      ),
      member_role
      `
    )
    .eq('member_id', userId)
    .order('last_updated_at', {
      referencedTable: 'household.household_items',
      ascending: false,
    })
    .limit(1, { referencedTable: 'household.household_items' });
};

export type HouseholdsByUserId = QueryData<
  ReturnType<typeof getHouseholdsByUserIdQuery>
>;

export const getHouseholdItemsByHouseholdIdQuery = (
  supabaseClient: SupabaseServerClientType,
  householdId: string
) => {
  return supabaseClient
    .from('household_items')
    .select(
      `
      id,
      name,
      status,
      notes,
      last_updated_at,
      last_updated_by(
        full_name,
        avatar_url
      )
      `
    )
    .eq('household_id', householdId)
    .order('last_updated_at', { ascending: false });
};

export type HouseholdItemsByHouseholdId = QueryData<
  ReturnType<typeof getHouseholdItemsByHouseholdIdQuery>
>;
