'use client';

import { ReactElement, useEffect, useRef, useState } from 'react';
import { Resource } from '@/lib/types';
import { usePreferences } from '@/lib/components/providers/PreferencesProvider';
import { ResourcesGrid } from '@/lib/components/ResourcesGrid';
import { ResourcesColumn } from '@/lib/components/ResourcesColumn';

interface Props {
  resources: Array<Resource>
}

const ResourcesGridWrapper = ({ resources }: Props): ReactElement => {
  const { preferences } = usePreferences();
  const [columnCount, setColumnCount] = useState(2);
  const containerRef = useRef(null);

  useEffect(() => {
    const calculateColumns = () => {
      if (containerRef.current) {
        // @ts-ignore
        const containerWidth = containerRef.current.offsetWidth;
        const minColumnWidth = 200; // This should match the minmax value in your CSS
        const columns = Math.floor(containerWidth / minColumnWidth);
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

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div>Current column count: {columnCount}</div>
      <div className='grid grid-cols-auto-fit' ref={containerRef}>
        {!preferences.find((pref) => pref.preferenceName === 'gallery-pref_columnResourceLayout')?.value ? (
            <ResourcesGrid resources={resources} />
        ) : (
          <ResourcesColumn resources={resources} columnCount={columnCount} />
        )}
      </div>
    </>
  )
}

export { ResourcesGridWrapper };
