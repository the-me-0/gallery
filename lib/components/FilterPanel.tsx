import { ReactElement } from 'react';
import { LayoutSwitch } from '@/lib/components/LayoutSwitch';

const FilterPanel = (): ReactElement | null => {
  return (
    <section className='flex justify-end p-4 text-primary'>
      <LayoutSwitch />
    </section>
  );
};

export { FilterPanel };
