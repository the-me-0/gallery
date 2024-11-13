import { db } from '@/lib/db';

export const getProfileByUsername = async (username: string) => {
  try {
    const profile = await db.profile.findUnique({
      where: {
        username,
      },
    });
    return profile;
  } catch (error) {
    return null;
  }
}

export const getProfileById = async (id: string) => {
  try {
    const profile = await db.profile.findUnique({
      where: {
        id,
      },
    });
    return profile;
  } catch (error) {
    return null;
  }
}
