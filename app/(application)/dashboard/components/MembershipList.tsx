'use client';

import HouseholdCard from './HouseholdCard';
import { useHouseholdMemberships } from '@/app/hooks/useHouseholdMemberships';

export default function MembershipList() {
  const { memberships, membershipsLoading, membershipsError } =
    useHouseholdMemberships();

  if (membershipsLoading) {
    return (
      <ul className='flex flex-col gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, index) => (
          <li
            key={index}
            className='my-4 w-full h-36 bg-neutral-800 animate-pulse rounded-md'
          ></li>
        ))}
      </ul>
    );
  }
  if (membershipsError) {
    return <div>Error loading households. Please try again.</div>;
  }

  return (
    <ul
      className={`my-4 flex flex-col gap-4  ${
        memberships?.length === 0
          ? 'border border-neutral-800 border-dashed rounded-md p-6'
          : ''
      } sm:grid sm:grid-cols-2 md:grid-cols-3`}
    >
      {memberships?.map(membership => (
        <HouseholdCard key={membership.id} household={membership.household} />
      ))}
    </ul>
  );
}
