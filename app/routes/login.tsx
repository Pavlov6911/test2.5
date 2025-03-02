import { useState } from "react";
import { Link, useActionData, useNavigate } from "@remix-run/react";
import { signUpWithEmail, signInWithEmail } from "~/lib/supabase";
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const intent = formData.get("intent");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    switch (intent) {
      case "login":
        await signInWithEmail({ email, password });
        return redirect("/dashboard");
      case "register":
        await signUpWithEmail({ email, password });
        return { success: true, message: "Check your email for confirmation." };
      case "reset":
        // Implement password reset logic here (using Supabase) if needed
        return { success: true, message: "Password reset functionality not implemented yet." };
      default:
        return { success: false, message: "Invalid intent." };
    }
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"login" | "register" | "reset">("login");
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent, intent: string) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("intent", intent);
    // No need to manually call the action here, Remix handles it
  };

  const renderLoginForm = () => (
    <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
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
      {/* Removed username field */}
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
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
        name="email"
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
        {actionData?.message && (
          <p className={actionData.success ? "text-green-600" : "text-red-600"}>
            {actionData.message}
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

export function meta() {
  return [
    { title: "Login - FiveM Mod Marketplace" },
    {
      name: "description",
      content: "Login, register, or reset password for FiveM Mod Marketplace",
    },
  ];
}
