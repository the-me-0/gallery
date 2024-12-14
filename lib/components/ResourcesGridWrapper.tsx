'use client';

import { ReactElement, useEffect, useState } from 'react';
import { Resource, ResourceThumbnail } from '@prisma/client';
import { usePreferences } from '@/lib/components/providers/PreferencesProvider';
import { ResourcesColumn } from '@/lib/components/ResourcesColumn';
import { ResourcesGrid } from '@/lib/components/ResourcesGrid';

interface Props {
  resources: Array<Resource & { thumbnail: ResourceThumbnail }>;
}

const gap = 10; // pixels, the gap between columns

const ResourcesGridWrapper = ({ resources }: Props): ReactElement | null => {
  const { preferences } = usePreferences();
  const [columnCount, setColumnCount] = useState<number | null>(null);
  const [columnWidth, setColumnWidth] = useState(200);

  useEffect(() => {
    const sizePreference = preferences.find(
      (preference) =>
        preference.preferenceName === 'gallery-pref_columnResourceSize'
    );

    const containerWidth = window.innerWidth;
    const minColumnWidth = sizePreference?.value || 250;
    // @ts-ignore
    const columns = Math.floor(containerWidth / minColumnWidth);

    const totalGap = gap * (columns + 1);
    const columnWidth = (containerWidth - totalGap) / columns;

    setColumnWidth(columnWidth);

    setColumnCount(columns);
  }, [preferences]);

  if (!columnCount) return null;

  return (
    <div className='w-full'>
      {!preferences.find(
        (pref) => pref.preferenceName === 'gallery-pref_columnResourceLayout'
      )?.value ? (
        <ResourcesGrid
          resources={resources}
          columnCount={columnCount}
          columnWidth={columnWidth}
          gap={`${gap}px`}
        />
      ) : (
        <ResourcesColumn
          resources={resources}
          columnCount={columnCount}
          columnWidth={columnWidth}
          gap={`${gap}px`}
        />
      )}
    </div>
  );
};

export { ResourcesGridWrapper };
