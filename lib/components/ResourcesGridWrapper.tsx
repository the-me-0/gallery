'use client';

import { ReactElement, useEffect, useRef, useState } from 'react';
import { Resource, ResourceThumbnail } from '@prisma/client';
import { usePreferences } from '@/lib/components/providers/PreferencesProvider';
import { ResourcesColumn } from '@/lib/components/ResourcesColumn';
import { ResourcesGrid } from '@/lib/components/ResourcesGrid';

interface Props {
  resources: Array<Resource & { thumbnail: ResourceThumbnail }>;
}

const gap = 10; // pixels, the gap between columns

const ResourcesGridWrapper = ({ resources }: Props): ReactElement => {
  const { preferences } = usePreferences();
  const [columnCount, setColumnCount] = useState(4);
  const [columnWidth, setColumnWidth] = useState(200);
  const containerRef = useRef(null);

  useEffect(() => {
    const calculateColumns = () => {
      if (containerRef.current) {
        // @ts-ignore
        const containerWidth = containerRef.current.offsetWidth;
        const minColumnWidth = 250;
        const columns = Math.floor(containerWidth / minColumnWidth);

        const totalGap = gap * (columns + 1);
        const columnWidth = (containerWidth - totalGap) / columns;

        setColumnWidth(columnWidth);

        setColumnCount(columns);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      calculateColumns();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
      calculateColumns();
    }

    const containerRefCurrent = containerRef.current;

    return () => {
      if (containerRefCurrent) {
        resizeObserver.unobserve(containerRefCurrent);
      }
    };
  }, []);

  return (
    <div className='w-full' ref={containerRef}>
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
