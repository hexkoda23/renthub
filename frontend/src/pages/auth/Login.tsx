import { Link, Navigate } from "react-router-dom";
import { LoginForm } from "../../components/auth/LoginForm";
import { useAuthStore } from "../../store/authStore";

export const Login = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-neutral-100">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-2xl font-bold text-white">R</span>
            </div>
            <span className="text-2xl font-bold font-sora">Rent<span className="text-primary">Hub</span></span>
          </Link>
          <h2 className="text-2xl font-bold text-neutral-900 font-sora">Welcome back</h2>
          <p className="text-sm text-neutral-500 mt-2">Discover properties and advisor insights.</p>
        </div>

        <LoginForm />

        <div className="mt-8 text-center text-sm text-neutral-500">
          Not joined yet? {" "}
          <Link to="/register" className="text-primary font-bold hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
