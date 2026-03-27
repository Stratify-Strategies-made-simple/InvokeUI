import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

// ─── Admin Access Control ──────────────────────────────────────────────────────
// Add admin email(s) here. Only users with these emails can access this page.
const ADMIN_EMAILS = ["zoya.lpf20@gmail.com", "msajamadar@gmail.com"];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon, color }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-2xl font-black text-gray-900">{value}</p>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
    </div>
  </div>
);

const Badge = ({ children, color = "gray" }) => {
  const styles = {
    gray: "bg-gray-100 text-gray-700",
    green: "bg-emerald-100 text-emerald-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    purple: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${styles[color]}`}>
      {children}
    </span>
  );
};

// ─── Access Denied ────────────────────────────────────────────────────────────
const AccessDenied = ({ user }) => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
    <div className="text-center max-w-md">
      <div className="w-20 h-20 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl">🔒</span>
      </div>
      <h1 className="text-3xl font-black text-white mb-3">Access Denied</h1>
      <p className="text-gray-400 mb-2">
        This page is restricted to administrators only.
      </p>
      {user && (
        <p className="text-sm text-gray-600 mb-6">
          Signed in as: <span className="text-gray-400">{user.email}</span>
        </p>
      )}
      {!user && (
        <p className="text-sm text-gray-600 mb-6">You must be signed in as an admin.</p>
      )}
      <a
        href="/"
        className="inline-block px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors"
      >
        ← Back to Home
      </a>
    </div>
  </div>
);

// ─── Delete Confirm Modal ──────────────────────────────────────────────────────
const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-xl">🗑️</span>
      </div>
      <p className="text-center text-gray-800 font-medium mb-6">{message}</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold text-sm"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  </div>
);

// ─── Spaces Table ──────────────────────────────────────────────────────────────
const SpacesTable = ({ spaces, onDelete, onToggleVisibility }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const filtered = spaces
    .filter(
      (s) =>
        s.title?.toLowerCase().includes(search.toLowerCase()) ||
        s.author?.toLowerCase().includes(search.toLowerCase()) ||
        s.category?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "likes") return (b.likes || 0) - (a.likes || 0);
      if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search spaces..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none"
        >
          <option value="createdAt">Newest</option>
          <option value="likes">Most Liked</option>
          <option value="title">A–Z</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">Space</th>
              <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">Visibility</th>
              <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">Likes</th>
              <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-gray-400 text-sm">
                  No spaces found
                </td>
              </tr>
            ) : (
              filtered.map((space) => (
                <tr key={space.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${space.gradient || "from-indigo-500 to-purple-500"} flex items-center justify-center text-white text-xs font-black`}>
                        {space.title?.charAt(0) || "?"}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 max-w-[160px] truncate">{space.title}</p>
                        <p className="text-xs text-gray-400 max-w-[160px] truncate">{space.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{space.author}</td>
                  <td className="px-4 py-3">
                    <Badge color="blue">{space.category}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge color={space.visibility === "private" ? "amber" : "green"}>
                      {space.visibility || "public"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-700">❤️ {space.likes || 0}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {space.createdAt ? new Date(space.createdAt).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleVisibility(space)}
                        title={space.visibility === "private" ? "Make Public" : "Make Private"}
                        className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors text-base"
                      >
                        {space.visibility === "private" ? "🔓" : "🔒"}
                      </button>
                      <button
                        onClick={() => onDelete(space)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-base"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 font-medium">
        Showing {filtered.length} of {spaces.length} spaces
      </div>
    </div>
  );
};

// ─── Users Table ───────────────────────────────────────────────────────────────
const UsersSection = ({ spaces }) => {
  const userMap = {};
  spaces.forEach((s) => {
    if (!s.userId) return;
    if (!userMap[s.userId]) {
      userMap[s.userId] = {
        name: s.author,
        image: s.authorImage,
        uid: s.userId,
        spaces: 0,
        totalLikes: 0,
        lastActive: s.createdAt,
      };
    }
    userMap[s.userId].spaces += 1;
    userMap[s.userId].totalLikes += s.likes || 0;
    if (s.createdAt > userMap[s.userId].lastActive) {
      userMap[s.userId].lastActive = s.createdAt;
    }
  });
  const users = Object.values(userMap).sort((a, b) => b.spaces - a.spaces);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-black text-gray-900">Active Users ({users.length})</h3>
        <p className="text-xs text-gray-400 mt-0.5">Derived from spaces data</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">Spaces</th>
              <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">Total Likes</th>
              <th className="px-4 py-3 text-xs font-black text-gray-500 uppercase tracking-wider">Last Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-gray-400 text-sm">No users yet</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.uid} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.image || `https://api.dicebear.com/9.x/avataaars/svg?seed=${u.uid}`}
                        alt={u.name}
                        className="w-8 h-8 rounded-full border border-gray-200 bg-gray-100"
                        onError={(e) => { e.target.src = `https://api.dicebear.com/9.x/avataaars/svg?seed=${u.uid}`; }}
                      />
                      <span className="font-bold text-gray-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-700">{u.spaces}</td>
                  <td className="px-4 py-3 font-bold text-gray-700">❤️ {u.totalLikes}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {u.lastActive ? new Date(u.lastActive).toLocaleDateString() : "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Categories Section ────────────────────────────────────────────────────────
const CategoriesSection = ({ categories, spaces, onDeleteCategory }) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="p-4 border-b border-gray-100">
      <h3 className="font-black text-gray-900">Categories ({categories.length})</h3>
    </div>
    <div className="divide-y divide-gray-50">
      {categories.map((cat) => {
        const count = spaces.filter((s) => s.category === cat.name).length;
        return (
          <div key={cat.id || cat.name} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="text-lg">{cat.isMain ? "📌" : "🏷️"}</span>
              <div>
                <p className="font-bold text-gray-800 text-sm">{cat.name}</p>
                <p className="text-xs text-gray-400">{count} space{count !== 1 ? "s" : ""}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge color={cat.isMain ? "blue" : "gray"}>{cat.isMain ? "Default" : "Custom"}</Badge>
              {!cat.isMain && (
                <button
                  onClick={() => onDeleteCategory(cat.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-base"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage({ user }) {
  const [spaces, setSpaces] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [confirmModal, setConfirmModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [promptCounts, setPromptCounts] = useState({});

  const isAdmin = user && ADMIN_EMAILS.includes(user.email);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Load spaces
  useEffect(() => {
    if (!isAdmin) return;
    const q = query(collection(db, "public_spaces"), orderBy("createdAt", "desc"), limit(200));
    return onSnapshot(q, (snap) => {
      setSpaces(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, [isAdmin]);

  // Load categories
  useEffect(() => {
    if (!isAdmin) return;
    const MAIN_CATS = [
      { name: "All", isMain: true, id: "m-all" },
      { name: "Planning", isMain: true, id: "m-plan" },
      { name: "Finance", isMain: true, id: "m-fin" },
      { name: "Business", isMain: true, id: "m-biz" },
    ];
    const q = query(collection(db, "public_categories"));
    return onSnapshot(q, (snap) => {
      const custom = snap.docs.map((d) => ({ id: d.id, name: d.data().name, isMain: false }));
      setCategories([...MAIN_CATS, ...custom]);
    });
  }, [isAdmin]);

  // Load prompt counts per space
  useEffect(() => {
    if (!isAdmin || spaces.length === 0) return;
    const fetchCounts = async () => {
      const counts = {};
      await Promise.all(
        spaces.slice(0, 50).map(async (s) => {
          const snap = await getDocs(collection(db, "public_spaces", s.id, "prompts"));
          counts[s.id] = snap.size;
        })
      );
      setPromptCounts(counts);
    };
    fetchCounts();
  }, [isAdmin, spaces.length]);

  const handleDeleteSpace = (space) => {
    setConfirmModal({
      message: `Delete "${space.title}"? This cannot be undone.`,
      onConfirm: async () => {
        await deleteDoc(doc(db, "public_spaces", space.id));
        setConfirmModal(null);
        showToast("Space deleted");
      },
    });
  };

  const handleToggleVisibility = async (space) => {
    const newVis = space.visibility === "private" ? "public" : "private";
    await updateDoc(doc(db, "public_spaces", space.id), { visibility: newVis });
    showToast(`Space set to ${newVis}`);
  };

  const handleDeleteCategory = (id) => {
    setConfirmModal({
      message: "Delete this category? Spaces using it will keep their current category label.",
      onConfirm: async () => {
        await deleteDoc(doc(db, "public_categories", id));
        setConfirmModal(null);
        showToast("Category deleted");
      },
    });
  };

  if (!user || !isAdmin) return <AccessDenied user={user} />;

  const totalPrompts = Object.values(promptCounts).reduce((a, b) => a + b, 0);
  const totalLikes = spaces.reduce((a, s) => a + (s.likes || 0), 0);
  const uniqueUsers = new Set(spaces.map((s) => s.userId).filter(Boolean)).size;
  const publicSpaces = spaces.filter((s) => !s.visibility || s.visibility === "public").length;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "spaces", label: `Spaces (${spaces.length})` },
    { id: "users", label: `Users (${uniqueUsers})` },
    { id: "categories", label: `Categories (${categories.length})` },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Sidebar + Content Layout */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-56 min-h-screen bg-gray-900 border-r border-gray-800 fixed left-0 top-0 z-10 flex flex-col">
          <div className="p-5 border-b border-gray-800">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">⚡</span>
              <span className="font-black text-white text-lg">Invoke</span>
            </div>
            <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Admin Panel</span>
          </div>

          <nav className="p-3 flex-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold mb-1 transition-colors ${activeTab === tab.id
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={user.photoURL || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.uid}`}
                alt={user.displayName}
                className="w-7 h-7 rounded-full border border-gray-700"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{user.displayName}</p>
                <p className="text-[10px] text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <a
              href="/"
              className="block text-center text-xs text-gray-500 hover:text-white py-1 transition-colors"
            >
              ← Back to App
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-56 flex-1 p-8 min-h-screen">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 text-sm">Loading admin data…</p>
              </div>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h1 className="text-2xl font-black text-white mb-1">Dashboard Overview</h1>
                    <p className="text-gray-400 text-sm">Real-time data from Firestore</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Total Spaces" value={spaces.length} icon="📋" color="bg-indigo-600" />
                    <StatCard label="Total Users" value={uniqueUsers} icon="👤" color="bg-purple-600" />
                    <StatCard label="Prompts Loaded" value={totalPrompts} icon="✏️" color="bg-cyan-600" />
                    <StatCard label="Total Likes" value={totalLikes} icon="❤️" color="bg-rose-600" />
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard label="Public Spaces" value={publicSpaces} icon="🌐" color="bg-emerald-600" />
                    <StatCard label="Private Spaces" value={spaces.length - publicSpaces} icon="🔒" color="bg-amber-600" />
                    <StatCard label="Categories" value={categories.length} icon="🏷️" color="bg-blue-600" />
                    <StatCard label="Admins" value={ADMIN_EMAILS.length} icon="🛡️" color="bg-red-600" />
                  </div>

                  {/* Recent Spaces */}
                  <div>
                    <h2 className="text-lg font-black text-white mb-4">Recent Spaces</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {spaces.slice(0, 6).map((s) => (
                        <div key={s.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-indigo-600 transition-colors">
                          <div className="flex items-start justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.gradient || "from-indigo-500 to-purple-500"} flex items-center justify-center text-white font-black`}>
                              {s.title?.charAt(0)}
                            </div>
                            <Badge color={s.visibility === "private" ? "amber" : "green"}>
                              {s.visibility || "public"}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-white text-sm mb-1 truncate">{s.title}</h3>
                          <p className="text-gray-500 text-xs mb-3 line-clamp-2">{s.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{s.author}</span>
                            <span>❤️ {s.likes || 0}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Spaces Tab */}
              {activeTab === "spaces" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-black text-white mb-1">All Spaces</h1>
                    <p className="text-gray-400 text-sm">Manage, delete, or toggle visibility of spaces</p>
                  </div>
                  <SpacesTable
                    spaces={spaces}
                    onDelete={handleDeleteSpace}
                    onToggleVisibility={handleToggleVisibility}
                  />
                </div>
              )}

              {/* Users Tab */}
              {activeTab === "users" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-black text-white mb-1">Users</h1>
                    <p className="text-gray-400 text-sm">Unique users who have created at least one space</p>
                  </div>
                  <UsersSection spaces={spaces} />
                </div>
              )}

              {/* Categories Tab */}
              {activeTab === "categories" && (
                <div className="space-y-6">
                  <div>
                    <h1 className="text-2xl font-black text-white mb-1">Categories</h1>
                    <p className="text-gray-400 text-sm">Default categories cannot be deleted</p>
                  </div>
                  <CategoriesSection
                    categories={categories}
                    spaces={spaces}
                    onDeleteCategory={handleDeleteCategory}
                  />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Confirm Modal */}
      {confirmModal && (
        <ConfirmModal
          message={confirmModal.message}
          onConfirm={confirmModal.onConfirm}
          onCancel={() => setConfirmModal(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 right-6 px-5 py-3 rounded-xl text-white text-sm font-bold shadow-2xl z-[400] flex items-center gap-2 ${toast.type === "error" ? "bg-red-600" : "bg-emerald-600"}`}>
          {toast.type === "error" ? "❌" : "✅"} {toast.msg}
        </div>
      )}
    </div>
  );
}
