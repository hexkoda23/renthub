import { Card } from '../../components/ui';
import { GoogleAuthButton } from '../../components/auth/GoogleAuthButton';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { Link } from 'react-router-dom';

export const Register: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center my-12">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-sora">Create Account</h1>
          <p className="text-neutral-500">Join RentHub today</p>
        </div>
        
        <RegisterForm />
        
        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-neutral-300"></div>
          <span className="flex-shrink-0 mx-4 text-neutral-400 text-sm">Or</span>
          <div className="flex-grow border-t border-neutral-300"></div>
        </div>
        
        <GoogleAuthButton />
        
        <p className="mt-6 text-center text-sm text-neutral-600">
          Already have an account? <Link to="/login" className="text-primary font-medium">Log in</Link>
        </p>
      </Card>
    </div>
  );
};
