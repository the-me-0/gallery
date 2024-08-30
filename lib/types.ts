type ResourceType = 'image' | 'video';

interface Resource {
  type: ResourceType;
  src: string;
  thumbnailSrc: string;
  private: boolean;
  title: string;
}

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
  type ResourceType,
  type Resource,
  imageExtensions,
  videoExtensions,
  type PreferenceName,
  type Preference,
  type PreferencesContextType,
};
