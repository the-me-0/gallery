const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];

type PreferenceName = 'gallery-pref_columnResourceLayout' | 'gallery-pref_columnResourceSize';

interface Preference {
  preferenceName: PreferenceName;
  value: boolean | number;
}

interface PreferencesContextType {
  preferences: Array<Preference>;
  updatePreference: (preference: Preference) => void;
  loading: boolean;
}

type ValidationResult<T> =
  | { status: 'failed'; message: string }
  | { status: 'success'; data: T };

export {
  imageExtensions,
  videoExtensions,
  type PreferenceName,
  type Preference,
  type PreferencesContextType,
  type ValidationResult,
};
