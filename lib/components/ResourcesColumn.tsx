'use client';

import { ReactElement } from 'react';
import { Resource, ResourceThumbnail } from '@prisma/client';
import { ResourceCard } from '@/lib/components/ResourceCard';

interface ResourcesColumnProps {
  resources: Array<Resource & { thumbnail: ResourceThumbnail }>;
  columnCount: number;
  columnWidth: number;
  gap: string; // gap between columns
}

interface ColumnWithHeight {
  column: Array<Resource & { thumbnail: ResourceThumbnail }>;
  height: number;
}

const distributeImagesInColumns = (
  resources: Array<Resource & { thumbnail: ResourceThumbnail }>,
  columnCount: number,
  columnWidth: number
): Array<ColumnWithHeight> => {
  const columns: Array<ColumnWithHeight> = Array.from(
    { length: columnCount },
    () => ({ column: [], height: 0 })
  );

  // Sort images by height
  // ~~~ this is commented as sorting (while it improves the UI's look) comes with the disadvantage of shuffling the order of the images
  // const sortedResources = resources.sort((a, b) => b.height - a.height);

  for (const resource of resources) {
    // find the column with the smallest height
    const smallestColumn = columns.reduce((acc, column) =>
      column.height < acc.height ? column : acc
    );
    smallestColumn.column.push(resource);

    const thumbnailHeightAtColumnWidth =
      (columnWidth / resource.width) * resource.height;

    // Update the height of the column
    smallestColumn.height += thumbnailHeightAtColumnWidth;
  }

  return columns;
};

const ResourcesColumn = ({
  resources,
  columnCount,
  columnWidth,
  gap,
}: ResourcesColumnProps): ReactElement => {
  const columns = distributeImagesInColumns(
    resources,
    columnCount,
    columnWidth
  );

  return (
    <div
      className='box-border flex'
      style={{ columnGap: gap, marginLeft: `${gap}`, marginRight: `${gap}` }}
    >
      {columns.map((columnWithHeight, index) => (
        <div
          key={index}
          className='flex flex-col gap-4'
          style={{ width: columnWidth }}
        >
          {columnWithHeight.column.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              columnWidth={columnWidth}
              forcedAspectRatio={resource.width / resource.height}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export { ResourcesColumn };
