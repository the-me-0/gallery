import { FilterPanel } from '@/lib/components/FilterPanel';
import indexResources from '@/lib/actions/indexResources';
import { ResourcesGridWrapper } from '@/lib/components/ResourcesGridWrapper';
import getResources from '@/lib/actions/getResources';

export default async function Home() {
  const resources = await getResources();

  return (
    <main className='h-full bg-base-300'>
      <FilterPanel />
      <ResourcesGridWrapper resources={resources} />
    </main>
  );
}
