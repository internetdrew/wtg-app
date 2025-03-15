import React, { useMemo } from 'react';
import { formatDistance } from 'date-fns';
import ItemNamePopover from './ItemNamePopover';
import ItemCardStatusSelect from './ItemCardStatusSelect';
import { Household } from '@/utils/supabase/queries';
import { updateItemStatus } from '@/app/actions/items';
import { Enums } from '@/database.types';

type ItemStatus = Enums<'ITEM_STATUS'>;
type Item = Household['items'][number];

interface ItemCardProps {
  item: Item;
  householdId: string;
}

const ItemCard = ({ item, householdId }: ItemCardProps) => {
  const formattedDate = useMemo(() => {
    return formatDistance(new Date(item.last_updated_at), new Date(), {
      addSuffix: true,
      includeSeconds: true,
    });
  }, [item.last_updated_at]);

  const handleStatusChange = async (item: Item, newStatus: ItemStatus) => {
    try {
      const result = await updateItemStatus({
        itemId: item.id,
        status: newStatus,
        householdId: householdId,
      });

      if (result.success) {
        // Toast will go here.
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <li
      key={item.id}
      className='flex flex-col bg-neutral-100 p-6 rounded-xl text-neutral-900'
    >
      <header className='flex items-start justify-between mb-6'>
        <div>
          <div className='flex items-center gap-2'>
            <span className='text-lg font-medium'>{item.name}</span>
            <ItemNamePopover item={item} />
          </div>
          <ItemCardStatusSelect
            value={item.status}
            onChange={newStatus =>
              handleStatusChange(item, newStatus as ItemStatus)
            }
          />
        </div>
      </header>

      <div className='flex mt-auto text-sm text-neutral-600'>
        <span>
          {` Updated ${formattedDate} by ${item.last_updated_by.full_name}`}
        </span>
      </div>
    </li>
  );
};

export default ItemCard;
