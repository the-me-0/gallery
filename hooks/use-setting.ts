import { useState, useEffect } from 'react';
import { PreferenceSetting } from '@/lib/types';
// import axios from 'axios';

// TODO: add API (DB) support to store the setting on the user's profile

const useSetting = (settingName: PreferenceSetting) => {
  const [setting, setSetting] = useState<boolean | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSetting = async () => {
      try {
        const cachedSetting = localStorage.getItem(settingName);
        if (cachedSetting !== null) {
          setSetting(JSON.parse(cachedSetting));
          // setLoading(false);
        } else {
          // const response = await axios.get('/api/setting');
          // const value = response.data?.value || false;
          // localStorage.setItem('mySetting', JSON.stringify(value));
          // setSetting(value);
          // setLoading(false);

          setSetting(false); // <<< TEMPORARY
        }
      } catch (error) {
        console.error('Error fetching setting:', error);
        // setLoading(false);
      }
    };

    fetchSetting();
  }, []);

  const updateSetting = async (settingName: PreferenceSetting, value: boolean) => {
    try {
      // await axios.put('/api/setting', { value });
      localStorage.setItem(settingName, JSON.stringify(value));
      setSetting(value);
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  };

  return { setting, updateSetting }; // also return "loading", that way we can have a "toast" saying "loading preferences..."
};

export default useSetting;
