import { FilterPanel } from '@/lib/components/FilterPanel';
import getResources from '@/lib/actions/getResources';
import { ResourcesGrid } from '@/lib/components/ResourcesGrid';

export default async function Home() {
  const resources = await getResources();

  return (
    <main className='bg-base-300 h-full'>
      <FilterPanel />
      <ResourcesGrid resources={resources} />
    </main>
  );
}
