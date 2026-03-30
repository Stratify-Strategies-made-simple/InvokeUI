import React, { useState } from "react";
import { X, Copy, Check, ExternalLink, Terminal, Zap } from "lucide-react";

// ─── Tool Data ──────────────────────────────────────────────────────────────

const TOOLS = [
  {
    id: "vscode",
    name: "VS Code",
    tagline: "AI-powered code editing",
    description:
      "Connect VS Code to your AI workflows with MCP. Get intelligent code completions, automated refactoring, and prompt-driven development directly inside your editor.",
    gradient: "from-[#0078d4] to-[#005a9e]",
    iconBg: "#0078d4",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M74.5 7.5L38.5 40.5L16.5 24L7.5 29V71L16.5 76L38.5 60L74.5 92.5L92.5 83.5V16.5L74.5 7.5Z" fill="white"/>
        <path d="M74.5 7.5L38.5 40.5L16.5 24L7.5 29L38.5 50L7.5 71L16.5 76L38.5 60L74.5 92.5L92.5 83.5V16.5L74.5 7.5Z" fill="white" fillOpacity="0.3"/>
      </svg>
    ),
    badge: "Editor",
    badgeColor: "bg-blue-100 text-blue-700",
    config: `{
  "mcpServers": {
    "invoke": {
      "command": "npx",
      "args": ["-y", "@invoke/mcp-server"],
      "env": {
        "INVOKE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}`,
    configFile: ".vscode/mcp.json",
    steps: [
      "Install the Invoke MCP extension from VS Code Marketplace",
      'Open Command Palette → "MCP: Configure Server"',
      "Paste the config JSON below into your workspace .vscode/mcp.json",
      "Restart VS Code and authenticate with your Invoke account",
      "Start using @invoke in Copilot Chat to access your prompts",
    ],
    docsUrl: "https://code.visualstudio.com/docs/copilot/chat/mcp-servers",
  },
  {
    id: "figma",
    name: "Figma",
    tagline: "Design-to-prompt workflows",
    description:
      "Bridge the gap between design and AI. Use MCP to generate design descriptions, extract component specs, and turn Figma designs into structured AI prompts automatically.",
    gradient: "from-[#f24e1e] to-[#a259ff]",
    iconBg: "#f24e1e",
    icon: (
      <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
        <path d="M19 28.5C19 24.36 22.36 21 26.5 21C30.64 21 34 24.36 34 28.5C34 32.64 30.64 36 26.5 36C22.36 36 19 32.64 19 28.5Z" fill="white"/>
        <path d="M4 43.5C4 39.36 7.36 36 11.5 36H19V43.5C19 47.64 15.64 51 11.5 51C7.36 51 4 47.64 4 43.5Z" fill="white" fillOpacity="0.8"/>
        <path d="M19 6V21H26.5C30.64 21 34 17.64 34 13.5C34 9.36 30.64 6 26.5 6H19Z" fill="white" fillOpacity="0.8"/>
        <path d="M4 13.5C4 17.64 7.36 21 11.5 21H19V6H11.5C7.36 6 4 9.36 4 13.5Z" fill="white" fillOpacity="0.6"/>
        <path d="M4 28.5C4 32.64 7.36 36 11.5 36H19V21H11.5C7.36 21 4 24.36 4 28.5Z" fill="white" fillOpacity="0.7"/>
      </svg>
    ),
    badge: "Design",
    badgeColor: "bg-orange-100 text-orange-700",
    config: `{
  "mcp": {
    "servers": {
      "invoke-figma": {
        "command": "npx",
        "args": ["@invoke/figma-mcp"],
        "env": {
          "INVOKE_API_KEY": "YOUR_API_KEY_HERE",
          "FIGMA_ACCESS_TOKEN": "YOUR_FIGMA_TOKEN"
        }
      }
    }
  }
}`,
    configFile: "figma-mcp.config.json",
    steps: [
      "Install the Invoke plugin from the Figma Community",
      "Open a Figma file → Plugins → Invoke MCP Bridge",
      "Generate your Figma Personal Access Token in account settings",
      "Add the config JSON to your project root",
      "Run npx @invoke/figma-mcp to start the bridge server",
    ],
    docsUrl: "https://www.figma.com/developers/mcp",
  },
  {
    id: "github",
    name: "GitHub",
    tagline: "PR & code review automation",
    description:
      "Supercharge your GitHub workflow with MCP. Auto-generate PR descriptions, code review prompts, commit message templates, and issue summaries using your saved Invoke spaces.",
    gradient: "from-[#24292e] to-[#57606a]",
    iconBg: "#24292e",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    badge: "DevOps",
    badgeColor: "bg-gray-100 text-gray-700",
    config: `# .github/mcp-config.yml
mcp:
  server: "@invoke/github-mcp"
  api_key: \${{ secrets.INVOKE_API_KEY }}
  features:
    - pr_descriptions
    - commit_messages
    - code_review
    - issue_summaries`,
    configFile: ".github/mcp-config.yml",
    steps: [
      "Install the Invoke GitHub App from the GitHub Marketplace",
      'Grant repository access in Settings → GitHub Apps → "Configure"',
      "Add INVOKE_API_KEY to your repository secrets",
      "Create .github/mcp-config.yml with the config below",
      "MCP will now auto-generate PR descriptions on every pull request",
    ],
    docsUrl: "https://docs.github.com/en/copilot/using-github-copilot/using-mcp-with-github-copilot",
  },
  {
    id: "cursor",
    name: "Cursor",
    tagline: "AI-first editor integration",
    description:
      "Cursor's built-in MCP support makes connecting Invoke seamless. Access your entire prompt library directly from Cursor's AI chat panel for a fully personalized coding experience.",
    gradient: "from-[#6c5ce7] to-[#a29bfe]",
    iconBg: "#6c5ce7",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <rect width="24" height="24" rx="4" fill="white" fillOpacity="0.15"/>
        <path d="M4 12L12 4L20 12L12 20L4 12Z" fill="white" fillOpacity="0.9"/>
        <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="white"/>
        <circle cx="12" cy="12" r="2" fill="#6c5ce7"/>
      </svg>
    ),
    badge: "Editor",
    badgeColor: "bg-purple-100 text-purple-700",
    config: `{
  "mcpServers": {
    "invoke": {
      "command": "npx",
      "args": ["-y", "@invoke/mcp-server@latest"],
      "env": {
        "INVOKE_API_KEY": "YOUR_API_KEY_HERE",
        "INVOKE_WORKSPACE": "your-workspace-id"
      }
    }
  }
}`,
    configFile: "~/.cursor/mcp.json",
    steps: [
      "Open Cursor Settings → Features → MCP",
      'Click "Add New MCP Server"',
      "Paste the config JSON or use the guided setup wizard",
      "Enter your Invoke API key when prompted",
      "Access your prompts via @invoke in Cursor's AI chat",
    ],
    docsUrl: "https://docs.cursor.com/context/model-context-protocol",
  },
  {
    id: "notion",
    name: "Notion",
    tagline: "Knowledge base + AI prompts",
    description:
      "Sync your Notion pages and databases with Invoke. Turn meeting notes into AI prompts, generate content from page templates, and keep your team's knowledge base and prompt library in perfect sync.",
    gradient: "from-[#2f3437] to-[#37352f]",
    iconBg: "#2f3437",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
      </svg>
    ),
    badge: "Productivity",
    badgeColor: "bg-yellow-100 text-yellow-700",
    config: `{
  "mcpServers": {
    "notion-invoke": {
      "command": "npx",
      "args": ["-y", "@invoke/notion-mcp"],
      "env": {
        "NOTION_API_KEY": "secret_YOUR_NOTION_KEY",
        "INVOKE_API_KEY": "YOUR_API_KEY_HERE",
        "NOTION_DATABASE_ID": "YOUR_DATABASE_ID"
      }
    }
  }
}`,
    configFile: "mcp.json",
    steps: [
      "Create a Notion integration at notion.so/my-integrations",
      "Share your database with the integration",
      "Copy your Notion internal integration secret",
      "Add both NOTION_API_KEY and INVOKE_API_KEY to the config",
      "Run the MCP server to start syncing pages as prompts",
    ],
    docsUrl: "https://developers.notion.com/docs/mcp",
  },
  {
    id: "slack",
    name: "Slack",
    tagline: "Team AI workflows in channels",
    description:
      "Bring AI prompts directly into your Slack workspace. Use the Invoke Slack bot to share prompts with channels, trigger AI workflows from messages, and collaborate on prompt improvements as a team.",
    gradient: "from-[#4a154b] to-[#611f69]",
    iconBg: "#4a154b",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
      </svg>
    ),
    badge: "Collaboration",
    badgeColor: "bg-pink-100 text-pink-700",
    config: `# Slack App Manifest (app.json)
{
  "display_information": {
    "name": "Invoke MCP Bot"
  },
  "features": {
    "slash_commands": [{
      "command": "/invoke",
      "url": "https://your-server.com/slack/invoke",
      "description": "Run an Invoke prompt"
    }]
  },
  "settings": {
    "mcp_endpoint": "npx @invoke/slack-mcp",
    "invoke_api_key": "YOUR_API_KEY_HERE"
  }
}`,
    configFile: "slack-app.json",
    steps: [
      "Go to api.slack.com/apps and create a new Slack App",
      "Enable bot token scopes: chat:write, commands, channels:read",
      "Install the app to your workspace and copy the Bot Token",
      "Deploy the Invoke Slack MCP server (or use our hosted option)",
      "Use /invoke [prompt-name] in any channel to run prompts",
    ],
    docsUrl: "https://api.slack.com/docs/mcp",
  },
  {
    id: "linear",
    name: "Linear",
    tagline: "Issue tracking + AI automation",
    description:
      "Connect Linear with Invoke to auto-generate issue descriptions, sprint planning prompts, and technical specifications. Turn your backlog into an AI-powered workflow engine.",
    gradient: "from-[#5e6ad2] to-[#3f3f8f]",
    iconBg: "#5e6ad2",
    icon: (
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M1.22541 61.5228c-.2225-.9485.90748-1.5459 1.59638-.857l36.5099 36.5099c.6889.6889.0915 1.8188-.857 1.5963C20.0515 94.4522 5.54779 79.9485 1.22541 61.5228zM.00189135 46.8891c-.01764375.3726.13985635.7331.42645635.9997l51.7233 51.7233c.2666.2866.6271.4441.9997.4264 2.3842-.1126 4.7147-.3818 6.9966-.7989.5659-.1026.7541-.7971.3312-1.2199L1.91282 39.892c-.42284-.4228-1.117-.2346-1.21993.3312-.41712 2.2819-.68625 4.6124-.79898 6.9966zM4.8016 32.0125c-.16969.3605-.09722.7857.18103 1.0639l62.1377 62.1376c.2782.2783.7034.3507 1.0639.1811 1.8949-.8934 3.7434-1.8873 5.5371-2.9778.3317-.1997.3971-.6519.1411-.9371L7.73666 26.4752c-.28526-.3152-.73751-.2498-.93713.1411-1.09048 1.7937-2.08438 3.6422-2.97793 5.5372zM13.0814 20.9772c-.2461.2461-.2873.6337-.0952.9258C31.8401 49.8658 50.1342 68.1599 78.0971 86.9138c.2921.1921.6797.1509.9258-.0952 1.2436-1.2436 2.4416-2.532 3.5929-3.8617.2027-.2334.1899-.5854-.0273-.8026L18.7413 17.3967c-.2172-.2173-.5693-.23-.8026-.0273-1.3297 1.1513-2.6181 2.3493-3.8573 3.5078zM25.3941 12.7573c-.2707.1806-.3826.5164-.2717.8189 8.4316 22.9905 36.9207 54.2072 60.7287 60.7287.3025.1109.6383-.001.8189-.2717.9938-1.4883 1.9349-3.0063 2.84-4.5514.1543-.2677.0875-.6033-.1638-.7944C67.8405 51.8443 48.1557 32.1596 29.7768 10.0758c-.1912-.2512-.5267-.318-.7944-.1638-1.5451.9051-3.0631 1.8462-4.5514 2.84-2.4416 3.593z" fill="white"/>
      </svg>
    ),
    badge: "Project Mgmt",
    badgeColor: "bg-indigo-100 text-indigo-700",
    config: `{
  "mcpServers": {
    "linear-invoke": {
      "command": "npx",
      "args": ["-y", "@invoke/linear-mcp@latest"],
      "env": {
        "LINEAR_API_KEY": "lin_api_YOUR_LINEAR_KEY",
        "INVOKE_API_KEY": "YOUR_API_KEY_HERE",
        "LINEAR_TEAM_ID": "YOUR_TEAM_ID"
      }
    }
  }
}`,
    configFile: "mcp.json",
    steps: [
      "Go to Linear Settings → API → Personal API Keys",
      'Create a new key with "Issues: Read & Write" permissions',
      "Copy your Team ID from Settings → General",
      "Add both LINEAR_API_KEY and INVOKE_API_KEY to the config",
      "The MCP server will now auto-populate issues with AI-generated descriptions",
    ],
    docsUrl: "https://developers.linear.app/docs/graphql/mcp",
  },
];

// ─── Modal Component ─────────────────────────────────────────────────────────

const ToolModal = ({ tool, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("setup");

  const handleCopy = () => {
    navigator.clipboard.writeText(tool.config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
        style={{ animation: "modalIn 0.25s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        {/* Modal Header */}
        <div className={`bg-gradient-to-br ${tool.gradient} p-8 relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-8 -right-8 w-40 h-40 bg-white rounded-full" />
            <div className="absolute -bottom-12 -left-4 w-32 h-32 bg-white rounded-full" />
          </div>
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: `${tool.iconBg}cc`, backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}
              >
                {tool.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{tool.name}</h2>
                <p className="text-white/70 text-sm mt-0.5">{tool.tagline}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="relative mt-5 text-white/80 text-sm leading-relaxed">{tool.description}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 pt-4">
          {["setup", "config"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 text-sm font-bold capitalize transition-all border-b-2 -mb-px ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {tab === "setup" ? "Setup Steps" : "MCP Config"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[340px] overflow-y-auto">
          {activeTab === "setup" ? (
            <ol className="space-y-4">
              {tool.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5"
                    style={{ background: `linear-gradient(135deg, ${tool.iconBg}, ${tool.iconBg}99)`, color: "white" }}
                  >
                    {i + 1}
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed">{step}</p>
                </li>
              ))}
              {tool.docsUrl && (
                <li className="pt-2">
                  <a
                    href={tool.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View official documentation
                  </a>
                </li>
              )}
            </ol>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="font-mono">{tool.configFile}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    copied
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
                >
                  {copied ? (
                    <><Check className="w-3.5 h-3.5" /> Copied!</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> Copy</>
                  )}
                </button>
              </div>
              <pre className="bg-gray-950 text-green-400 rounded-xl p-4 text-xs overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
                {tool.config}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gray-900 hover:bg-black text-white rounded-2xl text-sm font-bold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Tool Card Component ─────────────────────────────────────────────────────

const ToolCard = ({ tool, onClick }) => (
  <button
    onClick={onClick}
    className="group text-left bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    {/* Card top gradient strip */}
    <div className={`h-2 bg-gradient-to-r ${tool.gradient}`} />

    <div className="p-7">
      {/* Icon + Badge row */}
      <div className="flex items-start justify-between mb-5">
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {tool.icon}
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${tool.badgeColor}`}>
          {tool.badge}
        </span>
      </div>

      {/* Text */}
      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-500 mb-1 font-medium">{tool.tagline}</p>
      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{tool.description}</p>

      {/* CTA */}
      <div className="mt-5 flex items-center gap-2 text-indigo-600 text-xs font-bold">
        <Zap className="w-3.5 h-3.5" />
        <span>View MCP Setup</span>
        <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</span>
      </div>
    </div>
  </button>
);

// ─── Page Component ───────────────────────────────────────────────────────────

const ToolsPage = () => {
  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .tool-card-animate {
          animation: fadeUp 0.5s ease both;
        }
      `}</style>

      {/* Hero */}
      <div className="relative overflow-hidden bg-white border-b border-gray-100 pt-16 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-indigo-50 to-transparent rounded-full opacity-60 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold mb-6">
            <Zap className="w-4 h-4" />
            MCP Integrations
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-5 leading-tight">
            Connect Invoke to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
              your tools
            </span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Use the Model Context Protocol (MCP) to integrate your Invoke prompt
            library with the tools your team already loves. Click any card for
            step-by-step setup instructions.
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TOOLS.map((tool, i) => (
            <div
              key={tool.id}
              className="tool-card-animate"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <ToolCard tool={tool} onClick={() => setSelectedTool(tool)} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-8 w-48 h-48 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-32 h-32 bg-white rounded-full blur-2xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl font-extrabold mb-3">Need a custom integration?</h2>
            <p className="text-indigo-100 mb-6 max-w-md mx-auto">
              Our MCP SDK supports any tool that speaks the Model Context Protocol.
              Build your own connector in minutes.
            </p>
            <a
              href="https://modelcontextprotocol.io/introduction"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-7 py-3.5 rounded-full hover:bg-indigo-50 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Read the MCP Docs
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedTool && (
        <ToolModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
      )}
    </div>
  );
};

export default ToolsPage;
