'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { PreferencesContextType, Preference } from '@/lib/types';

// TODO: Add DB support for preferences (in case a user switch support, his preferences are not lost)

// TODO: add a "usePreference(preferenceName: string): Preference" hook to ease the load on components

export const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined)

export default function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<Array<Preference>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const items = { ...localStorage };
    const itemKeys = Object.keys(items);

    let allPreferences: Array<Preference> = [];

    itemKeys.filter((key: string) => key.startsWith('gallery-pref_')).forEach((key: string) => {
      // @ts-ignore (we assured that key starts with the right string, but its content might not be right. We have to ignore this warning)
      allPreferences.push({ preferenceName: key, value: items[key] === 'true' });
    })

    setPreferences(allPreferences);
    setLoading(false);
  }, []);

  const updatePreference = useCallback((preference: Preference) => {
    const oldPreference = preferences.filter((prefItem) => prefItem.preferenceName !== preference.preferenceName);
    const newPreferences = [...oldPreference, preference];
    setPreferences(newPreferences);

    localStorage.setItem(preference.preferenceName, JSON.stringify(preference.value));
  }, [preferences]);

  return <PreferencesContext.Provider value={{preferences, updatePreference, loading}}>{children}</PreferencesContext.Provider>
}

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
