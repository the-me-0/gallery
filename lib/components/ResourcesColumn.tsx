'use client';

import { ReactElement } from 'react';
import { Resource, ResourceThumbnail } from '@prisma/client';
import { ResourceCard } from '@/lib/components/ResourceCard';

interface Props {
  resources: Array<Resource & { thumbnail: ResourceThumbnail }>;
  columnCount: number;
}

const ResourcesColumn = ({ resources, columnCount }: Props): ReactElement => {
  return (
    <>
      {Array.from({ length: columnCount }).map((_, i) => (
        <div
          className='box-border flex flex-col gap-4'
          key={`column-layout-column_${i}`}
        >
          {resources.map((resource, j) =>
            (j - i) % columnCount === 0 ? (
              <ResourceCard
                src={resource.location}
                thumbnailSrc={resource.thumbnail.location}
                type={resource.type}
                name={resource.name}
                key={resource.name}
                className={'mx-2 my-[unset] max-h-96'}
              />
            ) : (
              false
            )
          )}
        </div>
      ))}
    </>
  );
};

export { ResourcesColumn };
