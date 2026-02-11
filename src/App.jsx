import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  onSnapshot,
  query,
  limit,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import {
  LayoutGrid,
  FileText,
  Image as ImageIcon,
  Music,
  Tag,
  ChevronRight,
  Bookmark,
  Heart,
  Sparkles,
  Copy,
  Trash2,
  Plus,
  Search,
  FileSpreadsheet,
  Settings,
  Zap,
  Box,
  Database,
  LogOut,
  Check,
  X,
  MessageCircle,
  Send,
  Globe,
  Lock,
  Pencil,
  Shield,
  Users,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

// ------------------------------------------------------------------
// REUSABLE COMPONENTS
// ------------------------------------------------------------------

const Badge = ({ children, className = "" }) => (
  <span
    className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider flex items-center gap-1 ${className}`}
  >
    {children}
  </span>
);

const Notification = ({ message, type = "success", onClose }) => (
  <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up z-[60]">
    <div
      className={`p-1 rounded-full ${type === "success" ? "bg-green-500" : "bg-blue-500"}`}
    >
      {type === "success" ? (
        <Check className="w-3 h-3" />
      ) : (
        <FileSpreadsheet className="w-3 h-3" />
      )}
    </div>
    <span className="text-sm font-medium">{message}</span>
    <button onClick={onClose} className="ml-2 text-gray-400 hover:text-white">
      <X className="w-4 h-4" />
    </button>
  </div>
);

// ------------------------------------------------------------------
// PAGE COMPONENTS (Home, Privacy, Footer)
// ------------------------------------------------------------------

const HomePage = ({ onNavigate, onLogin }) => {
  return (
    <div className="animate-fade-in">
      <section className="relative overflow-hidden bg-white pt-16 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>The Knowledge Base for the AI Era</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
                Organize your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  AI Prompts
                </span>{" "}
                in one place.
              </h1>
              <p className="text-xl text-gray-500 mb-8 leading-relaxed max-w-lg">
                Stop losing your best prompts. Invoke helps teams and creators
                organize, discover, and share their AI workflows effectively.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate("spaces")}
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-200 flex items-center gap-2"
                >
                  Explore Spaces <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    console.log("Sign In clicked");
                    if (onLogin) onLogin();
                    else alert("Login function not connected");
                  }}
                  className="px-8 py-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full font-bold text-lg transition-all cursor-pointer relative z-30"
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-8 md:p-12 relative z-10">
                <img
                  src="https://api.dicebear.com/9.x/notionists/svg?seed=Work&backgroundColor=transparent"
                  alt="Team collaborating"
                  className="w-full h-auto drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to master AI
            </h2>
            <p className="text-lg text-gray-500">
              Simplify your workflow with tools designed for the modern creator.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Centralized Library
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Save prompts from ChatGPT, Midjourney, and more into structured,
                searchable Spaces.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Driven
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Discover workflows from other experts. Fork, edit, and improve
                prompts together.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                AI Enhancement
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Use our integrated tools to automatically refine and improve
                your prompt structure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-500">Last updated: February 2026</p>
      </div>

      <div className="prose prose-indigo max-w-none text-gray-600">
        <p className="lead text-xl text-gray-700 mb-8">
          At Invoke, we take your privacy seriously. This policy describes how
          we collect, use, and handle your data.
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          1. Information We Collect
        </h3>
        <p className="mb-4">
          We collect account info, content you create (prompts, spaces), and
          usage data.
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
          2. Contact Us
        </h3>
        <p className="mb-8">
          If you have any questions, contact us at privacy@invoke-app.com.
        </p>
      </div>
    </div>
  );
};

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-[1400px] mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-orange-500 fill-current" />
              <span className="font-bold text-xl tracking-tight text-gray-900">
                Invoke
              </span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs">
              The ultimate platform for organizing and sharing AI prompts. Built
              for the future of work.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <button
                  onClick={() => onNavigate("spaces")}
                  className="hover:text-indigo-600 text-left"
                >
                  Spaces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("library")}
                  className="hover:text-indigo-600 text-left"
                >
                  Library
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <button
                  onClick={() => onNavigate("privacy")}
                  className="hover:text-indigo-600 text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="hover:text-indigo-600 text-left">
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ------------------------------------------------------------------
// OTHER COMPONENTS
// ------------------------------------------------------------------

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm the automated assistant.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I'm a demo bot! Ask me about features.", sender: "bot" },
      ]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 h-96 flex flex-col animate-scale-in mb-2 overflow-hidden">
          <div className="bg-gray-900 text-white p-4 font-bold flex items-center justify-between">
            <span>Invoke Assist</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === "user" ? "bg-indigo-600 text-white self-end rounded-tr-none" : "bg-white border border-gray-200 text-gray-800 self-start rounded-tl-none shadow-sm"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-indigo-600 text-white p-2 rounded-full"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3.5 bg-gray-900 text-white rounded-full shadow-lg"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

const DeleteModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 mb-6 text-sm">
            Are you sure? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NewSpaceModal = ({ isOpen, onClose, onSubmit, availableCategories }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Create New Space</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Space Name
            </label>
            <input
              name="title"
              required
              placeholder="e.g. My Amazing Project"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="2"
              placeholder="What is this space for?"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Category
              </label>
              <select
                name="category"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white"
              >
                {availableCategories.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
                {availableCategories.length <= 1 && (
                  <option value="Uncategorized">Uncategorized</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                Gradient Theme
              </label>
              <select
                name="gradient"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white"
              >
                <option value="from-blue-600 to-purple-600">
                  Blue & Purple
                </option>
                <option value="from-pink-500 to-rose-500">Pink & Rose</option>
                <option value="from-orange-500 to-red-500">Orange & Red</option>
                <option value="from-emerald-500 to-teal-600">
                  Emerald & Teal
                </option>
                <option value="from-indigo-500 to-cyan-500">
                  Indigo & Cyan
                </option>
                <option value="from-gray-700 to-gray-900">Dark Mode</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
              Visibility
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  defaultChecked
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="flex items-center gap-1.5 text-sm text-gray-700">
                  <Globe className="w-3 h-3" /> Public
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="flex items-center gap-1.5 text-sm text-gray-700">
                  <Lock className="w-3 h-3" /> Private
                </span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Space
          </button>
        </form>
      </div>
    </div>
  );
};

const AddPromptModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Add Prompt</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Prompt Content
            </label>
            <textarea
              name="content"
              required
              rows="4"
              placeholder="Enter your prompt here..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Prompt
          </button>
        </form>
      </div>
    </div>
  );
};

const EditPromptModal = ({ isOpen, onClose, onSubmit, initialContent }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Edit Prompt</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Prompt Content
            </label>
            <textarea
              name="content"
              defaultValue={initialContent}
              required
              rows="6"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm transition-all"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const NewCategoryModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900">Add Category</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Category Name
            </label>
            <input
              name="name"
              required
              placeholder="e.g. 3D Models"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

const ManageCategoriesModal = ({
  isOpen,
  onClose,
  categories,
  onUpdate,
  onDelete,
  user,
  hiddenCategoryNames,
  onToggleVisibility,
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  if (!isOpen) return null;

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
  };

  const handleSave = (id) => {
    onUpdate(id, editName);
    setEditingId(null);
    setEditName("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in flex flex-col max-h-[80vh]">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h3 className="font-bold text-gray-900">Manage Categories</h3>
            <p className="text-xs text-gray-500">
              Check boxes to show categories.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-2 overflow-y-auto flex-1 bg-gray-50/50">
          <div className="space-y-2">
            {categories
              .filter((cat) => cat.name !== "All")
              .map((cat) => {
                const isHidden = hiddenCategoryNames.has(cat.name);
                const isOwner = user && cat.createdBy === user.uid;
                return (
                  <div
                    key={cat.id || cat.name}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-all ${isHidden ? "bg-gray-50 border-gray-200 opacity-70" : "bg-white border-gray-200 shadow-sm"}`}
                  >
                    <div className="flex items-center gap-3 flex-1 overflow-hidden">
                      <input
                        type="checkbox"
                        checked={!isHidden}
                        onChange={() => onToggleVisibility(cat.name)}
                        className="w-5 h-5 border-2 border-gray-300 rounded text-indigo-600 cursor-pointer"
                      />
                      {editingId === cat.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1 px-2 py-1 text-sm border border-indigo-300 rounded"
                            autoFocus
                          />
                          <button
                            onClick={() => handleSave(cat.id)}
                            className="p-1 bg-green-500 text-white rounded"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1 bg-gray-300 text-gray-700 rounded"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`font-medium truncate ${isHidden ? "text-gray-500" : "text-gray-800"}`}
                        >
                          {cat.name}
                        </span>
                      )}
                    </div>
                    {!cat.isMain && !editingId && (
                      <div className="flex gap-1 ml-2 pl-2 border-l border-gray-100">
                        {isOwner ? (
                          <>
                            <button
                              onClick={() => startEdit(cat)}
                              className="p-1.5 text-gray-400 hover:text-indigo-600 rounded"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDelete(cat.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] text-gray-400 uppercase font-bold px-1">
                            Read-only
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

const SpaceCard = ({
  card,
  user,
  savedItems,
  toggleSave,
  handleDeleteClick,
  setSelectedSpace,
}) => {
  const isOwner = user && card.userId === user.uid;
  const isPrivate = card.visibility === "private";

  return (
    <div
      onClick={() => setSelectedSpace(card)}
      className={`group relative flex flex-col h-[240px] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl bg-gradient-to-br ${card.gradient}`}
    >
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className="flex gap-1 flex-wrap pr-8">
          <Badge className="bg-white/20 backdrop-blur-sm text-white">
            {card.category}
          </Badge>
          {isPrivate && (
            <Badge className="bg-black/40 backdrop-blur-sm text-yellow-300">
              <Lock className="w-2 h-2" />
            </Badge>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSave(card);
          }}
          className="p-1.5 rounded-full bg-black/10 hover:bg-white text-white hover:text-indigo-600 backdrop-blur-sm transition-colors"
        >
          <Bookmark
            className={`w-4 h-4 ${savedItems.some((i) => i.id === card.id) ? "fill-current" : ""}`}
          />
        </button>

        {isOwner && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick({ type: "space", id: card.id });
            }}
            className="absolute top-0 left-[-4px] p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: "auto", right: "35px" }}
          >
            <Trash2 className="w-3 h-3" />
          </button>
        )}
      </div>

      <div className="mt-auto p-5 text-white relative z-0">
        <h3 className="text-xl font-bold mb-1 leading-tight">{card.title}</h3>
        <p className="text-sm text-white/80 line-clamp-1 mb-4">
          {card.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-white/20">
          <div className="flex items-center gap-2">
            <img
              src={
                card.authorImage ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${card.author}`
              }
              className="w-5 h-5 rounded-full border border-white/30"
              alt="avatar"
            />
            <span className="text-xs font-bold text-white/90 truncate max-w-[100px]">
              {card.author}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 fill-white/20" /> {card.likes || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Header = ({
  user,
  searchQuery,
  setSearchQuery,
  currentView,
  setCurrentView,
  setSelectedSpace,
  handleLogin,
  handleLogout,
}) => {
  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 flex-1">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setCurrentView("home");
              setSelectedSpace(null);
            }}
          >
            <Zap className="w-5 h-5 text-orange-500 fill-current" />
            <span className="font-bold text-xl tracking-tight text-gray-900">
              Invoke
            </span>
          </div>

          <div className="hidden md:flex relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spaces, authors..."
              className="w-full pl-9 pr-4 py-1.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-indigo-500 transition-all bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => {
                setCurrentView("home");
                setSelectedSpace(null);
              }}
              className={`flex items-center gap-1.5 text-sm font-bold ${currentView === "home" ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentView("spaces");
                setSelectedSpace(null);
              }}
              className={`flex items-center gap-1.5 text-sm font-bold ${currentView === "spaces" ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
            >
              Spaces
            </button>
            <button
              onClick={() => {
                if (user) {
                  setCurrentView("library");
                  setSelectedSpace(null);
                } else alert("Please log in to view library");
              }}
              className={`flex items-center gap-1.5 text-sm font-bold ${currentView === "library" ? "text-gray-900" : "text-gray-500 hover:text-gray-900"}`}
            >
              Library
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-gray-900 leading-none">
                  {user.displayName}
                </div>
              </div>
              <img
                src={
                  user.photoURL ||
                  `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`
                }
                alt="User"
                className="w-8 h-8 rounded-full border border-gray-200"
              />
              <button
                onClick={handleLogout}
                className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-gray-900 hover:bg-black text-white px-5 py-2 rounded-full font-medium text-sm transition-transform active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

const MAIN_CATEGORIES = [
  { name: "All", icon: LayoutGrid, isMain: true, id: "main-all" },
  { name: "Image Gen", icon: ImageIcon, isMain: true, id: "main-img" },
  { name: "Text Gen", icon: FileText, isMain: true, id: "main-text" },
  { name: "Audio", icon: Music, isMain: true, id: "main-audio" },
];

// ------------------------------------------------------------------
// MAIN APP LOGIC
// ------------------------------------------------------------------
export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSpace, setSelectedSpace] = useState(null);

  const [spacePrompts, setSpacePrompts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [autoCorrect, setAutoCorrect] = useState(false);

  const [savedItems, setSavedItems] = useState([]);
  const [notification, setNotification] = useState(null);
  const [user, setUser] = useState(null);

  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState(MAIN_CATEGORIES);

  const [hiddenCategoryNames, setHiddenCategoryNames] = useState(() => {
    const saved = localStorage.getItem("invoke_hidden_categories");
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isManageCategoryModalOpen, setIsManageCategoryModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isAddPromptModalOpen, setIsAddPromptModalOpen] = useState(false);

  // Edit State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [promptToEdit, setPromptToEdit] = useState(null);

  const processingLikes = useRef(new Set());

  const toggleCategoryVisibility = (categoryName) => {
    setHiddenCategoryNames((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) newSet.delete(categoryName);
      else newSet.add(categoryName);
      localStorage.setItem(
        "invoke_hidden_categories",
        JSON.stringify([...newSet]),
      );
      return newSet;
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser),
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    const q = query(collection(db, "public_spaces"), limit(100));
    return onSnapshot(q, (snapshot) => {
      let newSpaces = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      newSpaces.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCards(newSpaces);
    });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "public_categories"));
    return onSnapshot(q, (snapshot) => {
      const customCats = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        icon: Tag,
        createdBy: doc.data().createdBy,
        isMain: false,
      }));
      customCats.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setCategories([...MAIN_CATEGORIES, ...customCats]);
    });
  }, []);

  useEffect(() => {
    if (!selectedSpace) return;
    const q = query(
      collection(db, "public_spaces", selectedSpace.id, "prompts"),
    );
    return onSnapshot(q, (snapshot) => {
      const prompts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      prompts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setSpacePrompts(prompts);
    });
  }, [selectedSpace]);

  useEffect(() => {
    if (!user) {
      setSavedItems([]);
      return;
    }
    const userRef = collection(db, "users", user.uid, "saved_prompts");
    return onSnapshot(userRef, (snapshot) => {
      setSavedItems(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      );
    });
  }, [user]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setNotification({ message: "Successfully logged in!", type: "success" });
    } catch (error) {
      setNotification({ message: "Login failed", type: "error" });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setNotification({ message: "Logged out", type: "info" });
    setCurrentView("home");
    setSelectedSpace(null);
  };

  const handleCreateSpace = async (e) => {
    e.preventDefault();
    if (!user)
      return setNotification({ message: "Please sign in", type: "info" });
    const formData = new FormData(e.target);
    const newSpace = {
      title: formData.get("title"),
      description: formData.get("description"),
      gradient: formData.get("gradient"),
      category: formData.get("category"),
      visibility: formData.get("visibility"),
      author: user.displayName || "Anonymous",
      authorImage: user.photoURL,
      userId: user.uid,
      likes: 0,
      likedBy: [],
      createdAt: new Date().toISOString(),
    };
    try {
      await addDoc(collection(db, "public_spaces"), newSpace);
      setNotification({
        message: "Space created successfully!",
        type: "success",
      });
      setIsModalOpen(false);
    } catch (error) {
      setNotification({ message: "Error creating space", type: "info" });
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!user)
      return setNotification({
        message: "Sign in to add categories",
        type: "info",
      });
    const formData = new FormData(e.target);
    const categoryName = formData.get("name");
    if (
      categories.some(
        (c) => c.name.toLowerCase() === categoryName.toLowerCase(),
      )
    )
      return setNotification({
        message: "Category already exists",
        type: "info",
      });
    try {
      await addDoc(collection(db, "public_categories"), {
        name: categoryName,
        createdAt: new Date().toISOString(),
        createdBy: user.uid,
      });
      setNotification({ message: "Category added!", type: "success" });
      setIsCategoryModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateCategory = async (id, newName) => {
    if (!user || !id || !newName) return;
    await updateDoc(doc(db, "public_categories", id), { name: newName });
    setNotification({ message: "Category updated", type: "success" });
  };

  const handleDeleteCategory = async (id) => {
    if (!user || !id) return;
    await deleteDoc(doc(db, "public_categories", id));
    setNotification({ message: "Category deleted", type: "success" });
  };

  const handleAddPrompt = async (e) => {
    e.preventDefault();
    if (!user || !selectedSpace) return;
    try {
      await addDoc(
        collection(db, "public_spaces", selectedSpace.id, "prompts"),
        {
          content: new FormData(e.target).get("content"),
          author: user.displayName || "Anonymous",
          userId: user.uid,
          createdAt: new Date().toISOString(),
        },
      );
      setNotification({ message: "Prompt added!", type: "success" });
      setIsAddPromptModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  // NEW: Update Prompt Logic
  const handleEditClick = (prompt) => {
    setPromptToEdit(prompt);
    setIsEditModalOpen(true);
  };

  const handleUpdatePrompt = async (e) => {
    e.preventDefault();
    if (!user || !promptToEdit) return;

    const newContent = new FormData(e.target).get("content");

    try {
      const promptRef = doc(
        db,
        "public_spaces",
        selectedSpace.id,
        "prompts",
        promptToEdit.id,
      );
      await updateDoc(promptRef, {
        content: newContent,
        updatedAt: new Date().toISOString(),
      });

      setNotification({
        message: "Prompt updated successfully",
        type: "success",
      });
      setIsEditModalOpen(false);
      setPromptToEdit(null);
    } catch (error) {
      console.error("Error updating prompt:", error);
      setNotification({ message: "Error updating prompt", type: "error" });
    }
  };

  const handleLike = async (space) => {
    if (!user)
      return setNotification({
        message: "Please sign in to like",
        type: "info",
      });
    if (processingLikes.current.has(space.id)) return;
    processingLikes.current.add(space.id);
    try {
      const wasLiked = space.likedBy?.includes(user.uid);
      const spaceRef = doc(db, "public_spaces", space.id);
      const newLikes = wasLiked
        ? (space.likes || 0) - 1
        : (space.likes || 0) + 1;
      const newLikedBy = wasLiked
        ? (space.likedBy || []).filter((id) => id !== user.uid)
        : [...(space.likedBy || []), user.uid];
      setCards((prev) =>
        prev.map((c) =>
          c.id === space.id
            ? { ...c, likes: newLikes, likedBy: newLikedBy }
            : c,
        ),
      );
      if (selectedSpace?.id === space.id)
        setSelectedSpace((prev) => ({
          ...prev,
          likes: newLikes,
          likedBy: newLikedBy,
        }));
      await updateDoc(spaceRef, {
        likes: increment(wasLiked ? -1 : 1),
        likedBy: wasLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });
    } finally {
      processingLikes.current.delete(space.id);
    }
  };

  const toggleSave = async (card) => {
    if (!user)
      return setNotification({ message: "Log in to save items", type: "info" });
    const isSaved = savedItems.some((item) => item.id === card.id);
    const docRef = doc(db, "users", user.uid, "saved_prompts", card.id);
    if (isSaved) {
      await deleteDoc(docRef);
      setNotification({ message: "Removed from Library", type: "info" });
    } else {
      await setDoc(docRef, {
        ...card,
        savedAt: new Date().toLocaleDateString(),
      });
      setNotification({ message: "Saved to Library", type: "success" });
    }
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      if (itemToDelete.type === "prompt") {
        await deleteDoc(
          doc(
            db,
            "public_spaces",
            selectedSpace.id,
            "prompts",
            itemToDelete.id,
          ),
        );
        setNotification({ message: "Prompt deleted", type: "success" });
      } else {
        await deleteDoc(doc(db, "public_spaces", itemToDelete.id));
        setNotification({ message: "Space deleted", type: "success" });
        if (selectedSpace?.id === itemToDelete.id) {
          setCurrentView("spaces");
          setSelectedSpace(null);
        }
      }
    } catch (e) {
      setNotification({ message: "Error deleting", type: "info" });
    }
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (
          !card.title.toLowerCase().includes(q) &&
          !card.description.toLowerCase().includes(q) &&
          !card.author.toLowerCase().includes(q)
        )
          return false;
      }
      if (selectedCategory !== "All" && card.category !== selectedCategory)
        return false;
      if (card.visibility === "public" || !card.visibility) return true;
      if (card.visibility === "private" && user && card.userId === user.uid)
        return true;
      return false;
    });
  }, [cards, selectedCategory, user, searchQuery]);

  const visibleCategories = categories.filter(
    (c) => !hiddenCategoryNames.has(c.name),
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <NewSpaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSpace}
        availableCategories={categories}
      />
      <NewCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={handleCreateCategory}
      />
      <ManageCategoriesModal
        isOpen={isManageCategoryModalOpen}
        onClose={() => setIsManageCategoryModalOpen(false)}
        categories={categories}
        onUpdate={handleUpdateCategory}
        onDelete={handleDeleteCategory}
        user={user}
        hiddenCategoryNames={hiddenCategoryNames}
        onToggleVisibility={toggleCategoryVisibility}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={
          itemToDelete?.type === "prompt" ? "Delete Prompt?" : "Delete Space?"
        }
      />
      <AddPromptModal
        isOpen={isAddPromptModalOpen}
        onClose={() => setIsAddPromptModalOpen(false)}
        onSubmit={handleAddPrompt}
      />
      <EditPromptModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdatePrompt}
        initialContent={promptToEdit?.content || ""}
      />

      <Header
        user={user}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentView={currentView}
        setCurrentView={setCurrentView}
        setSelectedSpace={setSelectedSpace}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />

      <main className="flex-1">
        {/* VIEW: HOME PAGE */}
        {!selectedSpace && currentView === "home" && (
          <HomePage onNavigate={setCurrentView} onLogin={handleLogin} />
        )}

        {/* VIEW: PRIVACY POLICY */}
        {!selectedSpace && currentView === "privacy" && <PrivacyPolicy />}

        {/* VIEW: SPACE DETAIL */}
        {selectedSpace && (
          <div className="max-w-[1400px] mx-auto px-4 py-8 animate-fade-in max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
              <button
                onClick={() => {
                  setSelectedSpace(null);
                  setCurrentView("spaces");
                }}
                className="hover:text-indigo-600 font-medium"
              >
                Spaces
              </button>
              <ChevronRight className="w-4 h-4" />
              <span>{selectedSpace.category}</span>
            </div>

            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${selectedSpace.gradient} text-white shadow-xl mb-8`}
            >
              <div className="relative p-8 md:p-12">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-white/20 backdrop-blur-sm border border-white/10">
                      {selectedSpace.category}
                    </Badge>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2 bg-black/20 px-2 py-1.5 rounded-full backdrop-blur-sm">
                      <button
                        onClick={() => setAutoCorrect(!autoCorrect)}
                        className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 ${autoCorrect ? "bg-green-400" : "bg-white/20"}`}
                      >
                        <div
                          className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-300 ${autoCorrect ? "translate-x-5" : "translate-x-0"}`}
                        />
                      </button>
                    </div>
                    <button
                      onClick={() => toggleSave(selectedSpace)}
                      className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm transition-colors border border-white/10"
                    >
                      <Bookmark
                        className={`w-5 h-5 ${savedItems.some((i) => i.id === selectedSpace.id) ? "fill-white" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                  {selectedSpace.title}
                </h1>
                <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
                  {selectedSpace.description}
                </p>

                <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        selectedSpace.authorImage ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedSpace.author}`
                      }
                      className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10"
                      alt="author"
                    />
                    <div>
                      <div className="text-xs text-white/60 uppercase font-bold tracking-wider">
                        Created By
                      </div>
                      <div className="font-medium">{selectedSpace.author}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLike(selectedSpace)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
                  >
                    <Heart
                      className={`w-4 h-4 ${selectedSpace.likedBy?.includes(user?.uid) ? "fill-red-500 text-red-500" : "text-white"}`}
                    />
                    <span className="font-bold">
                      {selectedSpace.likes || 0}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Prompts Collection
              </h2>
              <button
                onClick={() =>
                  user
                    ? setIsAddPromptModalOpen(true)
                    : setNotification({ message: "Login needed", type: "info" })
                }
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Prompt
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {spacePrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="group bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-gray-700 leading-relaxed font-mono text-sm whitespace-pre-wrap flex-1">
                      {prompt.content}
                    </p>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(prompt.content);
                          setNotification({
                            message: "Copied!",
                            type: "success",
                          });
                        }}
                        className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 rounded-lg"
                      >
                        <Copy className="w-4 h-4" />
                      </button>

                      {/* RE-ADDED EDIT & DELETE BUTTONS */}
                      {user && prompt.userId === user.uid && (
                        <>
                          <button
                            onClick={() => handleEditClick(prompt)}
                            className="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 rounded-lg"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteClick({
                                type: "prompt",
                                id: prompt.id,
                              })
                            }
                            className="p-2 text-gray-400 hover:text-red-600 bg-gray-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                    <span>Added by {prompt.author}</span>
                    <div className="flex items-center gap-3">
                      <button className="hover:text-indigo-600">
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <span>
                        {new Date(prompt.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- VIEW: SPACES GRID --- */}
        {!selectedSpace && currentView === "spaces" && (
          <div className="max-w-[1400px] mx-auto px-4 py-8">
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 rounded-lg text-white">
                    <LayoutGrid className="w-6 h-6" />
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">Spaces</h1>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg text-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> New Space
                  </button>
                  <button
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="px-4 py-2 border border-gray-200 text-gray-700 font-bold rounded-lg text-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Category
                  </button>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar items-center">
                <button
                  onClick={() => setIsManageCategoryModalOpen(true)}
                  className="p-2 bg-gray-100 border border-gray-200 text-gray-600 rounded-full"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-gray-200 mx-1 flex-shrink-0"></div>
                {visibleCategories.map((cat) => (
                  <button
                    key={cat.id || cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border ${selectedCategory === cat.name ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200"}`}
                  >
                    {cat.icon && cat.isMain && <cat.icon className="w-4 h-4" />}
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCards.length === 0 ? (
                <div className="py-24 text-center col-span-full border-2 border-dashed border-gray-200 rounded-2xl">
                  <Search className="w-8 h-8 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900">
                    No spaces found
                  </h3>
                </div>
              ) : (
                filteredCards.map((card) => (
                  <SpaceCard
                    key={card.id}
                    card={card}
                    user={user}
                    savedItems={savedItems}
                    toggleSave={toggleSave}
                    handleDeleteClick={handleDeleteClick}
                    setSelectedSpace={setSelectedSpace}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* --- VIEW: LIBRARY --- */}
        {!selectedSpace && currentView === "library" && (
          <div className="max-w-[1400px] mx-auto px-4 py-8 animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Library</h1>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 font-bold rounded-xl text-sm">
                <FileSpreadsheet className="w-4 h-4" /> Export CSV
              </button>
            </div>
            {savedItems.length === 0 ? (
              <div className="py-24 text-center bg-white rounded-3xl border border-gray-200">
                <Bookmark className="w-10 h-10 text-indigo-300 mx-auto mb-6" />
                <h3 className="text-xl font-bold">Library Empty</h3>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {savedItems.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:bg-gray-50 ${idx !== savedItems.length - 1 ? "border-b border-gray-100" : ""}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white font-bold`}
                      >
                        {item.title.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {item.title}
                        </h4>
                        <div className="flex gap-2 text-xs text-gray-500 mt-1">
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedSpace(item);
                          setCurrentView("spaces");
                        }}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-100"
                      >
                        Open
                      </button>
                      <button
                        onClick={() => toggleSave(item)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer onNavigate={setCurrentView} />

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <Chatbot />
    </div>
  );
}
