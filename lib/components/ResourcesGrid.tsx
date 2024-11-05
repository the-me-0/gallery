import { ReactElement } from 'react';
import { Resource, ResourceThumbnail } from '@prisma/client';
import { ResourceCard } from '@/lib/components/ResourceCard';

interface Props {
  resources: Array<Resource & { thumbnail: ResourceThumbnail }>;
}

const ResourcesGrid = ({ resources }: Props): ReactElement => {
  return (
    <>
      {resources.map((resource) => (
        <ResourceCard
          src={resource.location}
          thumbnailSrc={resource.thumbnail.location}
          type={resource.type}
          name={resource.name}
          key={resource.name}
          className='m-2'
        />
      ))}
    </>
  );
};

export { ResourcesGrid };
