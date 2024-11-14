import { Login } from '@/lib/components/auth/Login';
import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className='fl-center h-screen bg-base-100'>
      <Login />
    </div>
  );
};

export default LoginPage;
