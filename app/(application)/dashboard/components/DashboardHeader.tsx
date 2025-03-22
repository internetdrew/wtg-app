'use client';

import React from 'react';
import HouseholdFormTriggers from './HouseholdFormTriggers';
import { useHouseholdMemberships } from '@/app/hooks/useHouseholdMemberships';
import { useUser } from '@/app/hooks/useUser';

const UserGreeting = () => {
  const { user, userLoading, userError } = useUser();

  if (userLoading) {
    return <div className='w-48 h-6 bg-neutral-500 animate-pulse'></div>;
  }

  if (userError) {
    return (
      <div className='text-lg font-bold'>
        Error loading user. Please try again.
      </div>
    );
  }

  return (
    <h1 className='text-xl font-bold'>Hi, {user?.user_metadata.full_name}!</h1>
  );
};

const HouseholdMembershipsStatus = () => {
  const { memberships, membershipsLoading, membershipsError } =
    useHouseholdMemberships();

  if (membershipsLoading) {
    return <div className='w-56 h-5 bg-neutral-500 animate-pulse'></div>;
  }

  if (membershipsError) {
    return <div>Error loading households. Please try again.</div>;
  }

  return (
    <div className='text-neutral-500'>
      {membershipsLoading ? (
        <div className='w-56 h-5 bg-neutral-500 animate-pulse'></div>
      ) : memberships?.length === 0 ? (
        <p>You&apos;re not part of any households yet!</p>
      ) : (
        <p>You&apos;re part of the following households:</p>
      )}
    </div>
  );
};

const DashboardHeader = () => {
  return (
    <>
      <UserGreeting />
      <p className='text-sm text-neutral-500'>
        You can create up to 3 households.
      </p>
      <HouseholdFormTriggers />
      <div className='mt-6'>
        <h2 className='text-lg font-bold'>Households</h2>
        <HouseholdMembershipsStatus />
      </div>
    </>
  );
};

export default DashboardHeader;
