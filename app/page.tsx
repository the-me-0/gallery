import { FilterPanel } from '@/lib/components/FilterPanel';
import getResources from '@/lib/actions/getResources';
import { ResourcesGridWrapper } from '@/lib/components/ResourcesGridWrapper';

export default async function Home() {
  const resources = await getResources();

  return (
    <main className='bg-base-300 h-full'>
      <FilterPanel />
      <ResourcesGridWrapper resources={resources} />
    </main>
  );
}
