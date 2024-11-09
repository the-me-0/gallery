const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];

type PreferenceName = 'gallery-pref_columnResourceLayout';

interface Preference {
  preferenceName: PreferenceName;
  value: boolean;
}

interface PreferencesContextType {
  preferences: Array<Preference>;
  updatePreference: (preference: Preference) => void;
  loading: boolean;
}

export {
  imageExtensions,
  videoExtensions,
  type PreferenceName,
  type Preference,
  type PreferencesContextType,
};
