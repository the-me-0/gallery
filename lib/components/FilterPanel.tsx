import React, { ReactElement } from 'react';
import { LayoutSwitch } from '@/lib/components/LayoutSwitch';
import { ColumnSize } from '@/lib/components/ColumnSize';

const FilterPanel = (): ReactElement | null => {
  return (
    <section className='flex justify-end p-4 text-primary gap-8'>
      <LayoutSwitch />
      <ColumnSize />
    </section>
  );
};

export { FilterPanel };
