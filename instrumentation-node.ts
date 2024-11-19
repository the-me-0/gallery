import crypto from 'crypto';
import { db } from '@/lib/db';

const register = async () => {
  const profiles = await db.profile.count();
  const sponsorships = await db.sponsorship.count();

  if (!profiles && !sponsorships) {
    // Then we need to create a new sponsorship key
    console.log('No profile in DB. Creating sponsorship key...');

    const generatedKey = crypto.randomBytes(16).toString('hex');

    const sponsorship = await db.sponsorship.create({
      data: {
        key: generatedKey,
      },
    });

    console.log('New sponsorship key generated:', sponsorship.key);
  } else if (!profiles && sponsorships) {
    const sponsorship = await db.sponsorship.findFirst();

    console.log('Old sponsorship found:', sponsorship?.key);
  }

  console.log('Gallery project initialized. Enjoy !');
  console.log('=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~');
};

export { register };
