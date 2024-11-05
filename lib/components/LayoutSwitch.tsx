'use client';

import { ReactElement, useEffect, useState } from 'react';
import { LayoutDashboard, LayoutGrid } from 'lucide-react';
import { usePreferences } from '@/lib/components/providers/PreferencesProvider';

const LayoutSwitch = (): ReactElement => {
  const { preferences, updatePreference, loading } = usePreferences();
  const [isToggled, setIsToggled] = useState<boolean>(false);

  useEffect(() => {
    if (loading) return;

    const layoutPreference = preferences.find(
      (preference) => preference.preferenceName === 'gallery-pref_columnResourceLayout'
    );

    if (!layoutPreference) {
      updatePreference({
        preferenceName: 'gallery-pref_columnResourceLayout',
        value: false,
      });
    } else {
      setIsToggled(layoutPreference.value);
    }
  }, [loading, preferences, updatePreference]);

  const handleToggle = async () => {
    updatePreference({
      preferenceName: 'gallery-pref_columnResourceLayout',
      value: !isToggled,
    })
  }

  return (
    <label className="flex cursor-pointer gap-2">
      <LayoutGrid />
      <input type="checkbox" onChange={handleToggle} checked={isToggled} className="toggle checked:text-primary" />
      <LayoutDashboard />
    </label>
  );
}

export { LayoutSwitch };
