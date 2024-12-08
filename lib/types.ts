const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
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
