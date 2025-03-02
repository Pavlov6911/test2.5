import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { signOut, supabase } from "~/lib/supabase";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return { user };
};

export default function DashboardRemixPage() {
  const { user } = useLoaderData<typeof loader>();

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/login"; // Force a full page reload
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-gray-800 text-white w-64">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm">Welcome, {user?.email}</p>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-700">
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <h2 className="text-xl font-semibold mt-4">Dashboard Content</h2>
        <p>This is your main dashboard content area.</p>
      </main>
    </div>
  );
}
