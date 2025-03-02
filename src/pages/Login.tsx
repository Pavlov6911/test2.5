import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpWithEmail, signInWithEmail } from "~/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"login" | "register" | "reset">("login");
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent, intent: string) => {
    e.preventDefault();
    setMessage(null);
    
    try {
      switch (intent) {
        case "login":
          await signInWithEmail({ email, password });
          navigate("/dashboard");
          break;
        case "register":
          await signUpWithEmail({ email, password });
          setMessage({ 
            success: true, 
            text: "Check your email for confirmation." 
          });
          break;
        case "reset":
          // Implement password reset logic here
          setMessage({ 
            success: true, 
            text: "Password reset functionality not implemented yet." 
          });
          break;
        default:
          setMessage({ 
            success: false, 
            text: "Invalid intent." 
          });
      }
    } catch (error: any) {
      setMessage({ 
        success: false, 
        text: error.message || "An error occurred" 
      });
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Login
      </button>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={(e) => handleSubmit(e, "register")} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Create Account
      </button>
    </form>
  );

  const renderResetPasswordForm = () => (
    <form onSubmit={(e) => handleSubmit(e, "reset")} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
      >
        Reset Password
      </button>
    </form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="flex border rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab("login")}
              className={`px-4 py-2 ${
                activeTab === "login"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`px-4 py-2 ${
                activeTab === "register"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setActiveTab("reset")}
              className={`px-4 py-2 ${
                activeTab === "reset"
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              Reset
            </button>
          </div>
        </div>

        {activeTab === "login" && renderLoginForm()}
        {activeTab === "register" && renderRegisterForm()}
        {activeTab === "reset" && renderResetPasswordForm()}
        
        {message && (
          <p className={`mt-4 ${message.success ? "text-green-600" : "text-red-600"}`}>
            {message.text}
          </p>
        )}

        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
