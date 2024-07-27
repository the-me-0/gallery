'use client';

import { ReactElement, useEffect, useRef, useState } from 'react';
import { Resource } from '@/lib/types';
import { ResourceCard } from '@/lib/components/ResourceCard';
import { usePreferences } from '@/lib/components/providers/PreferencesProvider';

interface Props {
  resources: Array<Resource>
}

const ResourcesGrid = ({ resources }: Props): ReactElement => {
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
      <div className={`grid grid-cols-auto-fit`} ref={containerRef}>
        {!preferences.find((pref) => pref.preferenceName === 'gallery-pref_columnResourceLayout')?.value ?
          resources.map((resource) => (
            <ResourceCard fullImage={resource.fullImage} thumbnailImage={resource.thumbnailImage} type={resource.type}
                          title={resource.title} key={resource.title} className={'m-2'} />
          ))
          : (
            <>
              {Array.from({ length: columnCount }).map((_, i) => (
                <div className={'flex flex-col gap-4 box-border'}>
                  {resources.map((resource, j) => (j - i) % columnCount === 0 ? (
                    <ResourceCard fullImage={resource.fullImage} thumbnailImage={resource.thumbnailImage}
                                  type={resource.type}
                                  title={resource.title} key={resource.title} className={'my-[unset] mx-2'} />
                  ) : false)}
                </div>
              ))}
            </>
          )
        }
      </div>
      <p>TEST</p>
    </>
  )
}

export { ResourcesGrid };
