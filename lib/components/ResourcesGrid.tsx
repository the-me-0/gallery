import { ReactElement } from 'react';
import { Resource } from '@/lib/types';
import { ResourceCard } from '@/lib/components/ResourceCard';

interface Props {
  resources: Array<Resource>
}

const ResourcesGrid = ({ resources }: Props): ReactElement => {
  return (
    <>
      {resources.map((resource) => (
        <ResourceCard
          fullImage={resource.fullImage}
          thumbnailImage={resource.thumbnailImage}
          type={resource.type}
          title={resource.title}
          key={resource.title}
          className='m-2' />
      ))}
    </>
  )
}

export { ResourcesGrid };
