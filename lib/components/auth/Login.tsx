'use client';

import { LoginSchema } from '@/lib/schemas/authSchemas';
import Link from 'next/link';
import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '@/lib/actions/login';
import { ChevronRight } from 'lucide-react';

const Login: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // clear messages
    setError('');

    startTransition(() => {
      login(values).then((data: any) => {
        setError(data?.error || '');
      });
    });
  };

  return (
    <div className='h-80 w-96'>
      <div className='hw-full card relative overflow-hidden bg-base-100 shadow-xl'>
        <div className='wavy-background z-0'>
          <div className='wave -one bg-neutral-400'></div>
          <div className='wave -two bg-base-300'></div>
        </div>

        <form
          className='hw-full card-body absolute z-10 items-center gap-6'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h2 className='card-title'>Login</h2>
          {/* Username input */}
          <div className='w-full'>
            <label className='input input-bordered flex w-full items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-4 w-4 opacity-70'
              >
                <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
              </svg>
              <input
                className='w-full'
                type='text'
                disabled={isPending}
                placeholder='Username'
                {...form.register('username')}
              />
            </label>
            {form.formState.errors.username && (
              <div className='absolute -bottom-[3.25rem] flex items-center gap-2 text-sm text-red-500'>
                <ChevronRight size={18} />
                <span>This field is required</span>
              </div>
            )}
          </div>

          {/* Password input */}
          <div className='w-full'>
            <label className='input input-bordered flex w-full items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                fill='currentColor'
                className='h-4 w-4 opacity-70'
              >
                <path
                  fillRule='evenodd'
                  d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                  clipRule='evenodd'
                />
              </svg>
              <input
                className='w-full'
                type='password'
                disabled={isPending}
                placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
                {...form.register('password')}
              />
            </label>
            {form.formState.errors.password && (
              <div className='absolute -bottom-[3.25rem] flex items-center gap-2 text-sm text-red-500'>
                <ChevronRight size={18} />
                <span>This field is required</span>
              </div>
            )}
          </div>

          <div className='card-actions w-full items-center justify-around'>
            <Link href='/auth/register' className=''>
              You don&apos;t have an account ?
            </Link>
            <button
              className='btn btn-secondary rounded-full'
              disabled={isPending}
            >
              Connect
            </button>
          </div>
        </form>
      </div>
      {error && <div className='alert alert-error'>{error}</div>}
    </div>
  );
};

export { Login };
