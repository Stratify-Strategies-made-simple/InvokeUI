import React, { useState } from "react";

// ─── Tool Definitions ─────────────────────────────────────────────────────────
const TOOLS = [
  {
    id: "vscode",
    name: "VS Code",
    tagline: "AI-powered code completions in your editor",
    description:
      "Connect Invoke to your VS Code workspace. Surface your best prompts right inside the editor and use them as Copilot context or snippet templates.",
    icon: (
      <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none">
        <path
          d="M74.9 5.9L39.4 37.5 17.6 20.4 5 26.9v46.2l12.6 6.5L39.4 62.5l35.5 31.6L95 83.3V16.7L74.9 5.9z"
          fill="#007ACC"
        />
        <path
          d="M74.9 83.3L39.4 62.5 17.6 79.6l-12.6-6.5V26.9l12.6-6.5 21.8 17.1L74.9 16.7"
          fill="#1ba1e2"
          opacity="0.6"
        />
        <path d="M39.4 50L17.6 20.4l-12.6 6.5 21.8 23.1z" fill="white" opacity="0.3" />
        <path d="M39.4 50L17.6 79.6l-12.6-6.5 21.8-23.1z" fill="white" opacity="0.3" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500",
    cardColor: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
    badge: "Editor",
    status: "available",
    mcpConfig: `{
  "mcpServers": {
    "invoke": {
      "command": "npx",
      "args": ["-y", "@invoke/mcp-server"],
      "env": {
        "INVOKE_API_KEY": "your_api_key_here"
      }
    }
  }
}`,
    steps: [
      "Install the Invoke extension from the VS Code Marketplace",
      'Open Command Palette (Ctrl+Shift+P) → "Invoke: Connect Workspace"',
      "Paste your API key from Invoke Settings → API Keys",
      'Press (Ctrl+Shift+I) anywhere to open the Invoke prompt picker',
    ],
    configFile: ".vscode/settings.json",
    docsUrl: "https://code.visualstudio.com/docs",
  },
  {
    id: "github",
    name: "GitHub",
    tagline: "Sync prompts with your repositories",
    description:
      "Store your Invoke Spaces as GitHub repositories. Version control your prompts, collaborate via pull requests, and trigger workflows on prompt changes.",
    icon: (
      <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: "from-gray-700 to-gray-900",
    cardColor: "bg-gray-50 border-gray-200",
    iconBg: "bg-gray-100",
    badge: "Version Control",
    status: "available",
    mcpConfig: `{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_your_token_here"
      }
    }
  }
}`,
    steps: [
      "Go to GitHub → Settings → Developer settings → Personal access tokens",
      'Generate a token with "repo" and "read:org" scopes',
      "In Invoke Settings, navigate to Integrations → GitHub",
      "Paste the token and select the repo to sync your Spaces",
    ],
    configFile: "~/.cursor/mcp.json or C:\\Users\\<you>\\AppData\\Roaming\\Code\\User\\settings.json",
    docsUrl: "https://github.com",
  },
  {
    id: "figma",
    name: "Figma",
    tagline: "AI design prompts for your components",
    description:
      "Use Invoke Spaces inside Figma. Generate copy, design prompts, and creative briefs directly from your design files using your saved prompt library.",
    icon: (
      <svg viewBox="0 0 38 57" className="w-8 h-8" fill="none">
        <path d="M19 28.5A9.5 9.5 0 1028.5 19 9.5 9.5 0 0019 28.5z" fill="#1ABCFE" />
        <path d="M9.5 57A9.5 9.5 0 0019 47.5V38H9.5a9.5 9.5 0 000 19z" fill="#0ACF83" />
        <path d="M0 28.5A9.5 9.5 0 009.5 38H19V19H9.5A9.5 9.5 0 000 28.5z" fill="#A259FF" />
        <path d="M0 9.5A9.5 9.5 0 009.5 19H19V0H9.5A9.5 9.5 0 000 9.5z" fill="#F24E1E" />
        <path d="M19 0v19h9.5a9.5 9.5 0 000-19H19z" fill="#FF7262" />
      </svg>
    ),
    color: "from-purple-500 to-pink-500",
    cardColor: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100",
    badge: "Design",
    status: "available",
    mcpConfig: `{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@figma/mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your_figma_token_here"
      }
    }
  }
}`,
    steps: [
      "Open Figma → Account Settings → Personal access tokens",
      'Click "Generate new token" and copy it',
      "In the Invoke Figma Plugin, paste the token to authenticate",
      "Browse your Invoke Spaces directly from the Figma plugin panel",
    ],
    configFile: "Figma Plugin Settings",
    docsUrl: "https://www.figma.com",
  },
  {
    id: "cursor",
    name: "Cursor",
    tagline: "Native MCP support for AI-first coding",
    description:
      "Cursor has native MCP support. Connect Invoke as an MCP server and your entire prompt library becomes available as context for every AI conversation in Cursor.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="8" fill="#1a1a1a" />
        <path d="M8 20L20 8l12 12-12 12z" fill="white" opacity="0.9" />
        <path d="M20 8v24" stroke="#6366f1" strokeWidth="2" />
      </svg>
    ),
    color: "from-indigo-600 to-violet-600",
    cardColor: "bg-indigo-50 border-indigo-100",
    iconBg: "bg-indigo-100",
    badge: "AI Editor",
    status: "available",
    mcpConfig: `{
  "mcpServers": {
    "invoke": {
      "command": "npx",
      "args": ["-y", "@invoke/mcp-server@latest"],
      "env": {
        "INVOKE_API_KEY": "your_api_key_here",
        "INVOKE_WORKSPACE": "your_workspace_id"
      }
    }
  }
}`,
    steps: [
      "Open Cursor Settings → Features → MCP",
      'Click "Add Server" and select "Custom"',
      "Paste the MCP config JSON shown below",
      "Restart Cursor — your Invoke prompts appear in every chat",
    ],
    configFile: "~/.cursor/mcp.json",
    docsUrl: "https://cursor.sh",
  },
  {
    id: "notion",
    name: "Notion",
    tagline: "Sync your knowledge base with prompts",
    description:
      "Connect Notion pages and databases to Invoke. Pull context from your Notion workspace into AI conversations, or push generated content back into your docs.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="6" fill="white" />
        <path
          d="M8 9.5C8 8.1 9.1 7 10.5 7H26l6 6v17.5c0 1.4-1.1 2.5-2.5 2.5h-19C9.1 33 8 31.9 8 30.5V9.5z"
          fill="#f7f6f3"
          stroke="#e8e7e3"
        />
        <path d="M26 7v6h6" stroke="#e8e7e3" />
        <path d="M13 15h14M13 20h14M13 25h8" stroke="#37352f" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: "from-gray-800 to-gray-600",
    cardColor: "bg-stone-50 border-stone-200",
    iconBg: "bg-stone-100",
    badge: "Docs",
    status: "coming_soon",
    mcpConfig: `{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notion/mcp-server"],
      "env": {
        "NOTION_API_KEY": "secret_your_key_here"
      }
    }
  }
}`,
    steps: [
      "Go to notion.so/my-integrations and create a new integration",
      "Copy the Internal Integration Token",
      "Share your target Notion pages with the integration",
      "Add the MCP config to your editor settings",
    ],
    configFile: "~/.cursor/mcp.json",
    docsUrl: "https://notion.so",
  },
  {
    id: "slack",
    name: "Slack",
    tagline: "Share prompts directly in your workspace",
    description:
      "Install the Invoke Slack bot to share, search, and run prompts from any Slack channel. Works with slash commands and native Slack AI features.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect x="4" y="4" width="10" height="10" rx="3" fill="#E01E5A" />
        <rect x="4" y="16" width="10" height="10" rx="3" fill="#36C5F0" />
        <rect x="16" y="4" width="10" height="10" rx="3" fill="#2EB67D" />
        <rect x="16" y="16" width="10" height="10" rx="3" fill="#ECB22E" />
        <rect x="26" y="4" width="10" height="10" rx="3" fill="#36C5F0" />
        <rect x="26" y="16" width="10" height="10" rx="3" fill="#E01E5A" />
        <rect x="4" y="26" width="10" height="10" rx="3" fill="#2EB67D" />
        <rect x="16" y="26" width="10" height="10" rx="3" fill="#ECB22E" />
      </svg>
    ),
    color: "from-green-500 to-teal-500",
    cardColor: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
    badge: "Communication",
    status: "coming_soon",
    mcpConfig: `{
  "mcpServers": {
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-token",
        "SLACK_TEAM_ID": "T0XXXXXXXXX"
      }
    }
  }
}`,
    steps: [
      "Visit api.slack.com/apps and create a new Slack App",
      "Under OAuth & Permissions, add bot token scopes: channels:read, chat:write",
      "Install the app to your workspace and copy the Bot User OAuth Token",
      "Add the token to your MCP config",
    ],
    configFile: "~/.cursor/mcp.json",
    docsUrl: "https://slack.com",
  },
  {
    id: "linear",
    name: "Linear",
    tagline: "Connect issues to AI workflows",
    description:
      "Link Linear issues to your Invoke prompts. Automatically generate sprint summaries, PR descriptions, and bug reports using your saved prompt templates.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="8" fill="#5E6AD2" />
        <path
          d="M10 20L20 10l10 10-10 10z"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinejoin="round"
        />
        <circle cx="20" cy="20" r="4" fill="white" />
      </svg>
    ),
    color: "from-violet-500 to-purple-600",
    cardColor: "bg-violet-50 border-violet-100",
    iconBg: "bg-violet-100",
    badge: "Project Mgmt",
    status: "coming_soon",
    mcpConfig: `{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "lin_api_your_key_here"
      }
    }
  }
}`,
    steps: [
      "Go to Linear → Settings → API → Personal API Keys",
      "Create a new key with read/write permissions",
      "Add the MCP config to your editor",
      "Reference Linear issues directly in AI conversations",
    ],
    configFile: "~/.cursor/mcp.json",
    docsUrl: "https://linear.app",
  },
  {
    id: "browsertools",
    name: "Browser Tools",
    tagline: "Feed live web data into your prompts",
    description:
      "Capture screenshots, read page content, and analyse console logs. Give your AI assistant real browser context so your prompts are grounded in live data.",
    icon: (
      <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
        <rect width="40" height="40" rx="8" fill="#f97316" />
        <rect x="6" y="10" width="28" height="20" rx="3" stroke="white" strokeWidth="2" />
        <path d="M6 15h28" stroke="white" strokeWidth="2" />
        <circle cx="10" cy="12.5" r="1.5" fill="white" />
        <circle cx="14" cy="12.5" r="1.5" fill="white" />
        <circle cx="18" cy="12.5" r="1.5" fill="white" />
      </svg>
    ),
    color: "from-orange-500 to-red-500",
    cardColor: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-100",
    badge: "Browser",
    status: "available",
    mcpConfig: `{
  "mcpServers": {
    "browser-tools": {
      "command": "npx",
      "args": ["-y", "@agentdeskai/browser-tools-mcp@latest"]
    }
  }
}`,
    steps: [
      "Install the BrowserTools Chrome extension from the Chrome Web Store",
      "Add the MCP config to your editor (Cursor / VS Code / Claude Desktop)",
      "Open any webpage in Chrome",
      "Ask your AI to 'take a screenshot' or 'read the page' — it just works",
    ],
    configFile: "~/.cursor/mcp.json",
    docsUrl: "https://browsertools.agentdesk.ai",
  },
];

// ─── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) =>
  status === "coming_soon" ? (
    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
      Coming Soon
    </span>
  ) : (
    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
      Available
    </span>
  );

// ─── Tool Card ────────────────────────────────────────────────────────────────
const ToolCard = ({ tool, onOpen }) => (
  <div
    onClick={() => tool.status !== "coming_soon" && onOpen(tool)}
    className={`group relative flex flex-col border rounded-2xl p-6 transition-all duration-300 cursor-pointer
      ${tool.status === "coming_soon"
        ? "opacity-60 cursor-not-allowed bg-gray-50 border-gray-200"
        : `${tool.cardColor} hover:shadow-xl hover:-translate-y-1`
      }`}
  >
    {/* Top row */}
    <div className="flex items-start justify-between mb-4">
      <div className={`w-14 h-14 rounded-2xl ${tool.iconBg} flex items-center justify-center shadow-sm`}>
        {tool.icon}
      </div>
      <StatusBadge status={tool.status} />
    </div>

    {/* Content */}
    <h3 className="text-lg font-bold text-gray-900 mb-1">{tool.name}</h3>
    <p className="text-sm font-medium text-gray-500 mb-3">{tool.tagline}</p>
    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">{tool.description}</p>

    {/* Footer */}
    <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
        {tool.badge}
      </span>
      {tool.status !== "coming_soon" && (
        <span className={`text-xs font-bold bg-gradient-to-r ${tool.color} bg-clip-text text-transparent group-hover:underline`}>
          Connect →
        </span>
      )}
    </div>
  </div>
);

// ─── Connection Modal ──────────────────────────────────────────────────────────
const ConnectionModal = ({ tool, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyConfig = () => {
    navigator.clipboard.writeText(tool.mcpConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className={`bg-gradient-to-r ${tool.color} p-6 rounded-t-3xl relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              {tool.icon}
            </div>
            <div>
              <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">MCP Integration</p>
              <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{tool.description}</p>

          {/* Steps */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-[10px] font-black text-indigo-600">1</span>
              Setup Steps
            </h3>
            <ol className="space-y-2.5">
              {tool.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="min-w-[22px] h-[22px] mt-0.5 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-black">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* MCP Config */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">MCP Config</h3>
              <button
                onClick={copyConfig}
                className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                {copied ? (
                  <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> Copied!</>
                ) : (
                  <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy</>
                )}
              </button>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
              <p className="text-xs text-gray-400 mb-2 font-mono">Add to: {tool.configFile}</p>
              <pre className="text-xs text-green-400 font-mono whitespace-pre leading-relaxed">
                {tool.mcpConfig}
              </pre>
            </div>
          </div>

          {/* Docs link */}
          <a
            href={tool.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r ${tool.color} text-white font-bold text-sm hover:opacity-90 transition-opacity`}
          >
            Open {tool.name} Docs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ToolsPage() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [filter, setFilter] = useState("all");

  const filters = [
    { label: "All Tools", value: "all" },
    { label: "Available", value: "available" },
    { label: "Coming Soon", value: "coming_soon" },
  ];

  const filtered = filter === "all" ? TOOLS : TOOLS.filter((t) => t.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 opacity-70" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
          {/* MCP pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-indigo-100 rounded-full shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-widest">
              Model Context Protocol
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
            Connect{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Invoke
            </span>{" "}
            to your tools
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Plug your prompt library into VS Code, Figma, GitHub, and more using
            the{" "}
            <span className="font-bold text-gray-700">Model Context Protocol</span>.
            Your AI, everywhere you work.
          </p>

          {/* Stats row */}
          <div className="flex items-center justify-center gap-8 mt-10">
            {[
              { label: "Integrations", value: "8+" },
              { label: "MCP Protocol", value: "v1.0" },
              { label: "Setup Time", value: "< 2 min" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-gray-900">{s.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What is MCP? */}
      <div className="max-w-3xl mx-auto px-4 mb-12">
        <div className="bg-indigo-950 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-800 rounded-full -mr-16 -mt-16 opacity-40" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase text-indigo-300 mb-4">
              What is MCP?
            </div>
            <h2 className="text-2xl font-bold mb-3">Model Context Protocol</h2>
            <p className="text-indigo-200 leading-relaxed text-sm">
              MCP is an open standard that lets AI models connect to external tools and data sources. Instead of copy-pasting prompts between apps, you configure once — and your entire Invoke library appears as live context in your AI editor, browser, and beyond.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {["Configure once", "Works everywhere", "Open standard"].map((t) => (
                <div key={t} className="bg-white/10 rounded-xl px-3 py-2 text-xs font-bold text-center text-white">
                  ✓ {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-bold border transition-all ${
                filter === f.value
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onOpen={setSelectedTool} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white border border-gray-200 rounded-2xl px-8 py-6 shadow-sm">
            <p className="text-sm font-bold text-gray-500 mb-2">Want to request an integration?</p>
            <a
              href="mailto:zoya.lpf20@gmail.com"
              className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:underline"
            >
              Contact us →
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedTool && (
        <ConnectionModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
      )}
    </div>
  );
}
