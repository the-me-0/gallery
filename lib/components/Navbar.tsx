'use client';

import Link from 'next/link';
import React, { useTransition } from 'react';
import { Profile } from '@prisma/client';
import toast from 'react-hot-toast';
import { generateSponsorship } from '../actions/generateSponsorship';
import { startIndexationWorker } from '@/lib/actions/startIndexationWorker';
import { IndexationFollower } from '@/lib/indexationScript/IndexationFollower';

interface NavbarProps {
  profile: Profile;
}

const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  const [isPendingSponsorshipLink, startTransitionSponsorshipLink] =
    useTransition();

  const handleSponsorshipLinkCreation = () => {
    startTransitionSponsorshipLink(() => {
      generateSponsorship().then((result) => {
        if (!result) {
          toast.error('Failed to generate sponsorship link. Please try again.');
          console.error(
            'Failed to generate sponsorship link. Seem to be auth error.'
          );
        } else if (result.status === 'success') {
          toast.success('Successfully generated sponsorship link. 🎉');
          // copy to clipboard
          navigator.clipboard.writeText(result.data);
        } else {
          toast.error(result.message);
        }
      });
    });
  };

  // TODO: handle disable button when indexation is in progress
  const handleIndexation = () => {
    startIndexationWorker().then(() => {
      toast.loading(IndexationFollower, { id: 'indexation' });
    });
  };

  return (
    <div className='navbar bg-base-200'>
      <div className='flex-1'>
        <a className='btn btn-ghost font-sacramento text-4xl text-neutral'>
          Gallery
        </a>
      </div>
      <div className='flex-none gap-2'>
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='avatar btn btn-circle btn-ghost'
          >
            <div className='w-10 rounded-full'>
              <img
                alt='Tailwind CSS Navbar component'
                src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow'
          >
            {profile.role === 'ADMIN' && (
              <li>
                <button
                  disabled={isPendingSponsorshipLink}
                  onClick={() => handleSponsorshipLinkCreation()}
                >
                  Invite a friend
                </button>
              </li>
            )}
            {profile.role === 'ADMIN' && (
              <li>
                <button onClick={() => handleIndexation()}>
                  Index resources
                </button>
              </li>
            )}
            <li>
              <Link href='/logout'>Log out</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
