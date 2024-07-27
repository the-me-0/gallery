'use client';

import { ReactElement, useEffect } from 'react';
import { Resource } from '@/lib/types';
import { ResourceCard } from '@/lib/components/ResourceCard';
import { usePreferences } from '@/lib/components/providers/PreferencesProvider';

interface Props {
  resources: Array<Resource>
}

const ResourcesGrid = ({ resources }: Props): ReactElement => {
  const { preferences } = usePreferences();

  return (
    <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4 h-64'>
      {!preferences.find((pref) => pref.preferenceName === 'gallery-pref_columnResourceLayout')?.value ?
        resources.map((resource) => (
          <ResourceCard fullImage={resource.fullImage} thumbnailImage={resource.thumbnailImage} type={resource.type}
                        title={resource.title} key={resource.title} />
        ))
        : (
          <>
            <div className={'flex flex-col gap-4'}>
              {resources.map((resource, index) => index % 5 === 0 ? (
                <ResourceCard fullImage={resource.fullImage} thumbnailImage={resource.thumbnailImage}
                              type={resource.type}
                              title={resource.title} key={resource.title} className={'my-[unset]'} />
              ) : false)}
            </div>
            <div className={'flex flex-col gap-4'}>
              {resources.map((resource, index) => (index - 1) % 5 === 0 ? (
                <ResourceCard fullImage={resource.fullImage} thumbnailImage={resource.thumbnailImage}
                              type={resource.type}
                              title={resource.title} key={resource.title} className={'my-[unset]'} />
              ) : false)}
            </div>
            <div className={'flex flex-col gap-4'}>
              {resources.map((resource, index) => (index - 2) % 5 === 0 ? (
                <ResourceCard fullImage={resource.fullImage} thumbnailImage={resource.thumbnailImage}
                              type={resource.type}
                              title={resource.title} key={resource.title} className={'my-[unset]'} />
              ) : false)}
            </div>
            <div className={'flex flex-col gap-4'}>
              {resources.map((resource, index) => (index - 3) % 5 === 0 ? (
                <ResourceCard fullImage={resource.fullImage} thumbnailImage={resource.thumbnailImage}
                              type={resource.type}
                              title={resource.title} key={resource.title} className={'my-[unset]'} />
              ) : false)}
            </div>
            <div className={'flex flex-col gap-4'}>
              {resources.map((resource, index) => (index - 4) % 5 === 0 ? (
                <ResourceCard fullImage={resource.fullImage} thumbnailImage={resource.thumbnailImage}
                              type={resource.type}
                              title={resource.title} key={resource.title} className={'my-[unset]'} />
              ) : false)}
            </div>
          </>
        )
      }
    </div>
  )
}

export { ResourcesGrid };
