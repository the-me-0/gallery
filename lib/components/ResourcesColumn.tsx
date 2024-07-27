'use client';

import { ReactElement } from 'react';
import { Resource } from '@/lib/types';
import { ResourceCard } from '@/lib/components/ResourceCard';

interface Props {
  resources: Array<Resource>;
  columnCount: number;
}

const ResourcesColumn = ({ resources, columnCount }: Props): ReactElement => {
  return (
    <>
      {Array.from({ length: columnCount }).map((_, i) => (
        <div className='flex flex-col gap-4 box-border' key={`column-layout-column_${i}`}>
          {resources.map((resource, j) => (j - i) % columnCount === 0 ? (
            <ResourceCard fullImage={resource.fullImage} thumbnailImage={resource.thumbnailImage}
                          type={resource.type}
                          title={resource.title} key={resource.title} className={'my-[unset] mx-2 max-h-96'} />
          ) : false)}
        </div>
     ))}
    </>
  )
}

export { ResourcesColumn };
