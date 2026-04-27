import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

export const GoogleAuthButton: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  
  return (
    <Button variant="secondary" className="w-full" onClick={signInWithGoogle}>
     Continue with Google
    </Button>
  );
};
