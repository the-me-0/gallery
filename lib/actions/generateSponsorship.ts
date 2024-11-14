'use server';

import type { ValidationResult } from "@/lib/types";
import { currentProfile } from "@/lib/current-profile";
import { Role } from "@prisma/client";
import { db } from "../db";
import { randomBytes } from "crypto";

const generateSponsorship = async (): Promise<ValidationResult<string> | null> => {
  const profile = await currentProfile();

  if (profile.status !== 'success') {
    return null;
  }

  if (profile.data.role !== Role.ADMIN) {
    return {
      status: 'failed',
      message: 'You are not authorized to generate a sponsorship.'
    };
  }

  // Generate sponsorship here
  const sponsorship = await db.sponsorship.create({
    data: {
      profileId: profile.data.id,
      key: randomBytes(16).toString('hex')
    }
  });

  console.log('=~='.repeat(12));
  console.log('Generated sponsorship:', sponsorship);
  console.log('=~='.repeat(12));

  return {
    status: 'success',
    data: sponsorship.key,
  };
}

export {generateSponsorship};
