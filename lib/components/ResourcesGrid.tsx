import { ReactElement } from 'react';
import { Resource, ResourceThumbnail } from '@prisma/client';
import { ResourceCard } from '@/lib/components/ResourceCard';

interface ResourcesGridProps {
  resources: Array<Resource & { thumbnail: ResourceThumbnail }>;
  columnCount: number;
  columnWidth: number;
  gap: string; // gap between columns
}

const ResourcesGrid = ({
  resources,
  columnWidth,
  columnCount,
  gap,
}: ResourcesGridProps): ReactElement => {
  return (
    <div
      className='box-border grid'
      style={{
        gap: gap,
        marginLeft: `${gap}`,
        marginRight: `${gap}`,
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
      }}
    >
      {resources.map((resource) => (
        <ResourceCard
          resource={resource}
          key={resource.name}
          columnWidth={columnWidth}
          forcedAspectRatio={1 / 1}
        />
      ))}
    </div>
  );
};

export { ResourcesGrid };
