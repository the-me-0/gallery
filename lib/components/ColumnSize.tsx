'use client';

import { ReactElement, useEffect, useState } from 'react';
import { Columns2, Columns4 } from 'lucide-react';
import { usePreferences } from '@/lib/components/providers/PreferencesProvider';

const minColumnSize = 200;
const maxColumnSize = 350;
const defaultColumnSize = 250;

const ColumnSize = (): ReactElement => {
  const { preferences, updatePreference, loading } = usePreferences();
  const [columnSize, setColumnSize] = useState<number>(defaultColumnSize);

  useEffect(() => {
    if (loading) return;

    const sizePreference = preferences.find(
      (preference) =>
        preference.preferenceName === 'gallery-pref_columnResourceSize'
    );

    if (!sizePreference) {
      updatePreference({
        preferenceName: 'gallery-pref_columnResourceSize',
        value: defaultColumnSize,
      });
    } else {
      // @ts-ignore
      setColumnSize(sizePreference.value);
    }
  }, [loading, preferences, updatePreference]);

  const handleValueChange = async (event: any) => {
    updatePreference({
      preferenceName: 'gallery-pref_columnResourceSize',
      value: event.target.value,
    });

    console.log('Column size changed to', event.target.value);
  };

  return (
    <label className='flex cursor-pointer gap-2'>
      <Columns4 />
      <input
        type="range"
        min={minColumnSize}
        max={maxColumnSize}
        step={10} // Ajuste par pas de 10
        value={columnSize}
        onChange={handleValueChange}
        className="w-full cursor-pointer accent-primary"
      />
      <Columns2 />
    </label>
  );
};

export { ColumnSize };
