type ResourceType = 'image' | 'video';

interface Resource {
  type: ResourceType;
  location: string;
  private: boolean;
  title: string;
}

const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv'];

type PreferenceSetting = 'gridResourceLayout' | 'columnResourceLayout';

export {
  type ResourceType,
  type Resource,
  imageExtensions,
  videoExtensions,
  type PreferenceSetting,
};
