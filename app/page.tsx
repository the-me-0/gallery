import { Navbar } from '@/lib/components/Navbar';
import { ResourceCard } from '@/lib/components/ResourceCard';
import { FilterPanel } from '@/lib/components/FilterPanel';
import getResources from '@/lib/actions/getResources';

export default async function Home() {
  const resources = await getResources();

  return (
    <main className='bg-base-300 h-full'>
      <Navbar />
      <FilterPanel />
      <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4 h-64'>
        {resources.map((resource) => (
          <ResourceCard fullImage={resource.fullImage} thumbnailImage={resource.thumbnailImage} type={resource.type} title={resource.title} key={resource.title} />
        ))}
      </div>
    </main>
  );
}
