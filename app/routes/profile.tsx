import { useState } from "react";
import type { User } from "~/models/user";
import { getRecommendations } from "~/models/recommendation";

// Mock data - in real app, this would come from your backend
const mockUser: User = {
  id: "1",
  username: "modder123",
  email: "modder@example.com",
  bio: "Passionate FiveM modder specializing in vehicle mods",
  downloadHistory: ["1", "2", "3"],
  preferences: {
    categories: ["Vehicles", "Scripts"],
    tags: ["police", "emergency", "roleplay"],
    gameStyle: ["roleplay", "realism"],
    fivemVersion: "latest",
    theme: "dark"
  },
  ratings: [
    { modId: "1", rating: 5, date: new Date().toISOString() },
    { modId: "2", rating: 4, date: new Date().toISOString() }
  ],
  activity: {
    lastLogin: new Date().toISOString(),
    totalDownloads: 45,
    totalReviews: 12,
    reputation: 128
  },
  wishlist: ["4", "5"],
  privacySettings: {
    profileVisibility: "public",
    showDownloadHistory: true,
    showServerAffiliations: true
  }
};

export default function ProfilePage() {
  const [user] = useState<User>(mockUser);
  const [activeTab, setActiveTab] = useState<'profile'|'history'|'preferences'|'privacy'>('profile');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {/* Profile Header */}
          <div className="border-b px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.username} className="h-full w-full rounded-full" />
                ) : (
                  user.username[0].toUpperCase()
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-gray-600">{user.email}</p>
                {user.bio && <p className="text-sm text-gray-500 mt-1">{user.bio}</p>}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Member since</div>
              <div className="font-medium">March 2023</div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-gray-50">
            <div className="text-center">
              <div className="text-xl font-bold">{user.activity.totalDownloads}</div>
              <div className="text-sm text-gray-500">Downloads</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{user.activity.totalReviews}</div>
              <div className="text-sm text-gray-500">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{user.wishlist.length}</div>
              <div className="text-sm text-gray-500">Wishlist</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">{user.activity.reputation}</div>
              <div className="text-sm text-gray-500">Reputation</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="border-b px-4">
            <nav className="flex space-x-4">
              {['profile', 'history', 'preferences', 'privacy'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-4">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Profile Settings</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      value={user.username}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      disabled
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      value={user.bio}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      rows={3}
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Download History</h2>
                <div className="space-y-2">
                  {user.downloadHistory.map((modId) => (
                    <div key={modId} className="border rounded p-3">
                      Mod ID: {modId}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Game Preferences</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Game Style</h4>
                      <div className="flex flex-wrap gap-2">
                        {user.preferences.gameStyle.map((style) => (
                          <span key={style} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {style}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">FiveM Version</h4>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {user.preferences.fivemVersion}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Preferred Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.categories.map((category) => (
                      <span key={category} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Preferred Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Theme Preference</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.preferences.theme === 'dark' 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.preferences.theme.charAt(0).toUpperCase() + user.preferences.theme.slice(1)} Mode
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Privacy Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={user.privacySettings.profileVisibility === 'public'}
                        className="rounded border-gray-300"
                        disabled
                      />
                      <span>Public Profile</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={user.privacySettings.showDownloadHistory}
                        className="rounded border-gray-300"
                        disabled
                      />
                      <span>Show Download History</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={user.privacySettings.showServerAffiliations}
                        className="rounded border-gray-300"
                        disabled
                      />
                      <span>Show Server Affiliations</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function meta() {
  return [
    { title: "User Profile - FiveM Mod Marketplace" },
    { name: "description", content: "Manage your FiveM Mod Marketplace profile" }
  ];
}
