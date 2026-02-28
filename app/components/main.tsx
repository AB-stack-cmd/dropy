"use client"
import { useState, useRef, useCallback } from "react";
import { Icon } from "./icons";

// ─── Types ────────────────────────────────────────────────────────────────────
type FileType = "folder" | "pdf" | "img" | "doc" | "zip" | "vid" | "audio";

interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: string;
  modified: string;
  items?: number;
}

interface Recipient {
  id: string;
  email: string;
}

// Icon.Map
// ─── Constants ────────────────────────────────────────────────────────────────
const FOLDERS: FileItem[] = [
  { id: "f1", name: "Design Assets", type: "folder", size: "2.3 GB", modified: "Feb 20", items: 148 },
  { id: "f2", name: "Project Docs", type: "folder", size: "456 MB", modified: "Feb 18", items: 34 },
  { id: "f3", name: "Client Deliverables", type: "folder", size: "1.1 GB", modified: "Feb 15", items: 22 },
];

const FILES: FileItem[] = [
  { id: "fi1", name: "Brand Guidelines.pdf", type: "pdf", size: "8.4 MB", modified: "Feb 20" },
  { id: "fi2", name: "Hero Banner.png", type: "img", size: "3.2 MB", modified: "Feb 19" },
  { id: "fi3", name: "Q1 Report.docx", type: "doc", size: "1.8 MB", modified: "Feb 18" },
  { id: "fi4", name: "Assets.zip", type: "zip", size: "24.6 MB", modified: "Feb 17" },
  { id: "fi5", name: "Product Demo.mp4", type: "vid", size: "112 MB", modified: "Feb 15" },
  { id: "fi6", name: "UI Mockups.png", type: "img", size: "5.7 MB", modified: "Feb 14" },
];

const NAV_ITEMS = [
  { label: "My Files", icon: <Icon.Grid className="w-4 h-4" />, badge: null },
  { label: "Shared With Me", icon: <Icon.Users className="w-4 h-4" />, badge: "3" },
  { label: "Sent", icon: <Icon.Send className="w-4 h-4" />, badge: null },
  { label: "Starred", icon: <Icon.Star className="w-4 h-4" />, badge: null },
];

const FOLDER_ITEMS = [
  { label: "Design Assets", icon: <Icon.Folder className="w-4 h-4" /> },
  { label: "Project Docs", icon: <Icon.Folder className="w-4 h-4" /> },
  { label: "Client Deliverables", icon: <Icon.Folder className="w-4 h-4" /> },
];

// ─── File Icon Helper ─────────────────────────────────────────────────────────
function FileTypeIcon({ type }: { type: FileType }) {
  const cfg: Record<FileType, { bg: string; color: string; icon: JSX.Element }> = {
    folder: { bg: "bg-amber-500/10", color: "text-amber-400", icon: <Icon.Folder className="w-6 h-6" /> },
    pdf:    { bg: "bg-rose-500/10",  color: "text-rose-400",  icon: <Icon.File className="w-6 h-6" /> },
    img:    { bg: "bg-teal-500/10",  color: "text-teal-400",  icon: <Icon.Image className="w-6 h-6" /> },
    doc:    { bg: "bg-blue-500/10",  color: "text-blue-400",  icon: <Icon.File className="w-6 h-6" /> },
    zip:    { bg: "bg-violet-500/10",color: "text-violet-400",icon: <Icon.File className="w-6 h-6" /> },
    vid:    { bg: "bg-orange-500/10",color: "text-orange-400",icon: <Icon.Video className="w-6 h-6" /> },
    audio:  { bg: "bg-pink-500/10",  color: "text-pink-400",  icon: <Icon.File className="w-6 h-6" /> },
  };
  const { bg, color, icon } = cfg[type];
  return (
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
      {icon}
    </div>
  );
}

// ─── File Card ────────────────────────────────────────────────────────────────
function FileCard({ file, selected, onToggle }: { file: FileItem; selected: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      className={`relative bg-[#161920] border rounded-xl p-4 cursor-pointer transition-all duration-200 group
        ${selected
          ? "border-blue-500 bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.12)]"
          : "border-[#2a2f3d] hover:border-blue-500/50 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
        }`}
    >
      {/* Check badge */}
      <div className={`absolute top-2.5 right-2.5 w-5 h-5 rounded-md bg-blue-500 flex items-center justify-center transition-all duration-150
        ${selected ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}>
        <Icon.Check className="w-3 h-3 text-white" />
      </div>

      <div className="mb-3">
        <FileTypeIcon type={file.type} />
      </div>
      <div className="text-sm font-medium text-[#e8eaf2] truncate mb-1">{file.name}</div>
      <div className="text-xs text-[#6b7280]">
        {file.items ? `${file.items} items · ` : ""}{file.size} · {file.modified}
      </div>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ visible, title, sub }: { visible: boolean; title: string; sub: string }) {
  return (
    <div className={`fixed top-20 right-6 z-[200] bg-[#161920] border border-[#2a2f3d] rounded-xl p-4 flex items-center gap-3
      shadow-2xl min-w-[280px] transition-all duration-300
      ${visible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}`}>
      <div className="w-8 h-8 rounded-lg bg-teal-500/15 flex items-center justify-center flex-shrink-0">
        <Icon.Check className="w-4 h-4 text-teal-400" />
      </div>
      <div>
        <div className="text-sm font-bold text-[#e8eaf2]">{title}</div>
        <div className="text-xs text-[#6b7280] mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

// ─── Send Panel ───────────────────────────────────────────────────────────────
function SendPanel({
  open, onClose, selectedFiles, onRemoveFile,
  recipients, onAddRecipient, onRemoveRecipient,
  onSend,
}: {
  open: boolean;
  onClose: () => void;
  selectedFiles: FileItem[];
  onRemoveFile: (id: string) => void;
  recipients: Recipient[];
  onAddRecipient: (email: string) => void;
  onRemoveRecipient: (id: string) => void;
  onSend: () => void;
}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [notify, setNotify] = useState(true);
  const [passwordProtect, setPasswordProtect] = useState(false);
  const [sending, setSending] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && email.trim().includes("@")) {
      onAddRecipient(email.trim());
      setEmail("");
    }
  };

  const handleSend = () => {
    let finalEmail = email.trim();
    if (finalEmail.includes("@")) { onAddRecipient(finalEmail); setEmail(""); }
    setSending(true);
    setTimeout(() => { setSending(false); onSend(); setMessage(""); }, 1800);
  };

  return (
    <>
      {/* Backdrop */}
      {open && <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />}

      <aside className={`fixed right-0 top-[65px] bottom-0 w-[360px] bg-[#161920] border-l border-[#2a2f3d]
        flex flex-col z-50 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2f3d]">
          <h2 className="text-lg font-extrabold text-[#e8eaf2] tracking-tight">Send Files</h2>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#1e222c] border border-[#2a2f3d] flex items-center justify-center text-[#6b7280] hover:text-[#e8eaf2] transition-colors">
            <Icon.X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Files */}
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-[#6b7280] mb-2">
              Files to Send
            </label>
            <div className="space-y-2 mb-3">
              {selectedFiles.length === 0 ? (
                <p className="text-sm text-[#6b7280] py-2">No files selected. Click files to select them.</p>
              ) : selectedFiles.map((f) => (
                <div key={f.id} className="flex items-center gap-3 bg-[#1e222c] border border-[#2a2f3d] rounded-xl px-3 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    <Icon.File className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[#e8eaf2] truncate">{f.name}</div>
                    <div className="text-xs text-[#6b7280]">{f.size}</div>
                  </div>
                  <button onClick={() => onRemoveFile(f.id)}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[#6b7280] hover:bg-rose-500/10 hover:text-rose-400 transition-colors">
                    <Icon.X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-[#6b7280] mb-2">
              Recipients
            </label>
            {recipients.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {recipients.map((r) => (
                  <span key={r.id} className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/25 rounded-full px-3 py-1 text-xs text-blue-400">
                    {r.email}
                    <button onClick={() => onRemoveRecipient(r.id)} className="opacity-60 hover:opacity-100">✕</button>
                  </span>
                ))}
              </div>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter email address…"
              className="w-full bg-[#1e222c] border border-[#2a2f3d] rounded-lg px-3.5 py-2.5 text-sm text-[#e8eaf2] placeholder-[#6b7280] outline-none focus:border-blue-500 transition-colors"
            />
            <p className="text-[11px] text-[#6b7280] mt-1.5">Press Enter to add multiple recipients</p>
          </div>

          {/* Message */}
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-[#6b7280] mb-2">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a note for the recipient…"
              rows={3}
              className="w-full bg-[#1e222c] border border-[#2a2f3d] rounded-lg px-3.5 py-2.5 text-sm text-[#e8eaf2] placeholder-[#6b7280] outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setPasswordProtect(!passwordProtect)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all
                ${passwordProtect ? "border-blue-500 bg-blue-500/8 text-blue-400" : "border-[#2a2f3d] text-[#6b7280] hover:border-blue-500/50 hover:text-[#e8eaf2]"}`}>
              <Icon.Lock className="w-3.5 h-3.5" /> Password
            </button>
            <button onClick={() => setNotify(!notify)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all
                ${notify ? "border-blue-500 bg-blue-500/8 text-blue-400" : "border-[#2a2f3d] text-[#6b7280] hover:border-blue-500/50 hover:text-[#e8eaf2]"}`}>
              <Icon.Bell className="w-3.5 h-3.5" /> Notify me
            </button>
          </div>

          {/* Expiry */}
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-[#6b7280] mb-2">
              Link Expiry
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["7 Days", "14 Days", "30 Days", "Never"] as const).map((opt) => (
                <button key={opt}
                  className="bg-[#1e222c] border border-[#2a2f3d] rounded-lg px-3 py-2 text-sm text-[#6b7280] hover:border-blue-500/50 hover:text-[#e8eaf2] transition-colors text-left">
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Download Limit */}
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-[#6b7280] mb-2">
              Download Limit
            </label>
            <select className="w-full bg-[#1e222c] border border-[#2a2f3d] rounded-lg px-3.5 py-2.5 text-sm text-[#e8eaf2] outline-none focus:border-blue-500 transition-colors cursor-pointer">
              <option>Unlimited</option>
              <option>1 download</option>
              <option>5 downloads</option>
              <option>10 downloads</option>
              <option>25 downloads</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#2a2f3d]">
          <button
            onClick={handleSend}
            disabled={sending}
            className={`w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-white text-[15px] tracking-wide transition-all duration-200
              ${sending ? "bg-teal-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(59,130,246,0.35)]"}`}>
            {sending ? (
              <><span className="animate-spin">⏳</span> Sending…</>
            ) : (
              <><Icon.Send className="w-5 h-5" /> Send Files</>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function DropShare() {
  const [activeNav, setActiveNav] = useState("My Files");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sendPanelOpen, setSendPanelOpen] = useState(false);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [toast, setToast] = useState({ visible: false, title: "", sub: "" });
  const [isDragging, setIsDragging] = useState(false);
  const [folders, setFolders] = useState<FileItem[]>(FOLDERS);
  const [files] = useState<FileItem[]>(FILES);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allItems = [...folders, ...files];
  const selectedFiles = allItems.filter((f) => selectedIds.has(f.id));

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearSelection = () => setSelectedIds(new Set());

  const showToast = (title: string, sub: string) => {
    setToast({ visible: true, title, sub });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3500);
  };

  const addRecipient = (email: string) => {
    setRecipients((prev) => [...prev, { id: Date.now().toString(), email }]);
  };

  const removeRecipient = (id: string) => {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  const removeFileFromSend = (id: string) => {
    setSelectedIds((prev) => { const next = new Set(prev); next.delete(id); return next; });
  };

  const handleSend = () => {
    const count = selectedFiles.length;
    setSendPanelOpen(false);
    clearSelection();
    setRecipients([]);
    showToast(`${count} file${count !== 1 ? "s" : ""} sent!`, "Recipients have been notified via email.");
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((f) => {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      const type: FileType = ["png","jpg","jpeg","webp"].includes(ext) ? "img"
        : ext === "pdf" ? "pdf"
        : ["doc","docx"].includes(ext) ? "doc"
        : ["mp4","mov"].includes(ext) ? "vid"
        : ["zip","rar"].includes(ext) ? "zip"
        : "doc";
      const size = f.size > 1024 * 1024
        ? (f.size / 1024 / 1024).toFixed(1) + " MB"
        : (f.size / 1024).toFixed(0) + " KB";
      const newFile: FileItem = { id: `uploaded-${Date.now()}-${f.name}`, name: f.name, type, size, modified: "Just now" };
      setSelectedIds((prev) => new Set([...prev, newFile.id]));
    });
    setSendPanelOpen(true);
  }, []);

  const handleNewFolder = () => {
    const name = prompt("Folder name:");
    if (!name) return;
    const newFolder: FileItem = { id: `folder-${Date.now()}`, name, type: "folder", size: "—", modified: "Just now", items: 0 };
    setFolders((prev) => [...prev, newFolder]);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0d0f14] text-[#e8eaf2] font-[system-ui]">
      {/* NAV */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#161920] border-b border-[#2a2f3d] sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Icon.Logo />
          </div>
          <span className="text-xl font-extrabold tracking-tight">DropShare</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSendPanelOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all hover:-translate-y-px">
            <Icon.Send className="w-4 h-4" /> Send Files
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-sm font-bold cursor-pointer">
            JD
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-60 bg-[#161920] border-r border-[#2a2f3d] flex flex-col py-5 overflow-y-auto flex-shrink-0">
          <p className="px-5 mb-1 text-[10px] font-bold tracking-widest uppercase text-[#6b7280]">Navigation</p>
          {NAV_ITEMS.map(({ label, icon, badge }) => (
            <button key={label} onClick={() => setActiveNav(label)}
              className={`relative flex items-center gap-3 px-5 py-2.5 text-sm transition-colors text-left
                ${activeNav === label
                  ? "text-blue-400 bg-blue-500/8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-blue-500 before:rounded-r"
                  : "text-[#6b7280] hover:text-[#e8eaf2] hover:bg-[#1e222c]"}`}>
              {icon} {label}
              {badge && <span className="ml-auto bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
            </button>
          ))}

          <p className="px-5 mt-4 mb-1 text-[10px] font-bold tracking-widest uppercase text-[#6b7280]">Folders</p>
          {FOLDER_ITEMS.map(({ label, icon }) => (
            <button key={label} onClick={() => setActiveNav(label)}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors text-left
                ${activeNav === label ? "text-blue-400 bg-blue-500/8" : "text-[#6b7280] hover:text-[#e8eaf2] hover:bg-[#1e222c]"}`}>
              <span className="text-amber-400">{icon}</span> {label}
            </button>
          ))}

          <p className="px-5 mt-4 mb-1 text-[10px] font-bold tracking-widest uppercase text-[#6b7280]">Account</p>
          <button className="flex items-center gap-3 px-5 py-2.5 text-sm text-[#6b7280] hover:text-[#e8eaf2] hover:bg-[#1e222c] transition-colors">
            <Icon.Settings className="w-4 h-4" /> Settings
          </button>

          {/* Storage */}
          <div className="mx-5 mt-auto pt-6">
            <div className="flex justify-between text-xs text-[#6b7280] mb-2">
              <span>Storage</span><span>62%</span>
            </div>
            <div className="h-1 bg-[#2a2f3d] rounded-full overflow-hidden">
              <div className="h-full w-[62%] bg-gradient-to-r from-blue-500 to-teal-400 rounded-full" />
            </div>
            <p className="text-[11px] text-[#6b7280] mt-1.5">12.4 GB of 20 GB used</p>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-7 py-4 bg-[#161920] border-b border-[#2a2f3d]">
            <div className="flex items-center gap-1.5 text-sm text-[#6b7280] flex-1">
              <span className="hover:text-[#e8eaf2] cursor-pointer transition-colors">My Files</span>
              <span className="text-[#2a2f3d]">›</span>
              <span className="text-[#e8eaf2] font-medium">All Files</span>
            </div>
            <div className="flex items-center gap-2 bg-[#1e222c] border border-[#2a2f3d] rounded-lg px-3 py-2 w-52">
              <Icon.Search className="w-3.5 h-3.5 text-[#6b7280] flex-shrink-0" />
              <input type="text" placeholder="Search files…"
                className="bg-transparent text-sm text-[#e8eaf2] placeholder-[#6b7280] outline-none w-full" />
            </div>
            <button onClick={handleNewFolder}
              className="flex items-center gap-1.5 px-3 py-2 bg-transparent border border-[#2a2f3d] rounded-lg text-sm text-[#6b7280] hover:text-[#e8eaf2] hover:bg-[#1e222c] transition-colors">
              <Icon.Folder className="w-4 h-4" /> New Folder
            </button>
            <button onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 bg-transparent border border-[#2a2f3d] rounded-lg text-sm text-[#6b7280] hover:text-[#e8eaf2] hover:bg-[#1e222c] transition-colors">
              <Icon.Upload className="w-4 h-4" /> Upload
            </button>
            <input ref={fileInputRef} type="file" multiple className="hidden" />
            <div className="flex bg-[#1e222c] border border-[#2a2f3d] rounded-lg overflow-hidden">
              {(["grid", "list"] as const).map((mode) => (
                <button key={mode} onClick={() => setViewMode(mode)}
                  className={`p-2 transition-colors ${viewMode === mode ? "bg-[#2a2f3d] text-[#e8eaf2]" : "text-[#6b7280] hover:text-[#e8eaf2]"}`}>
                  {mode === "grid" ? <Icon.Grid className="w-4 h-4" /> : <Icon.List className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-7 py-6">
            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer mb-7 transition-all duration-200
                ${isDragging ? "border-blue-500 bg-blue-500/5" : "border-[#2a2f3d] hover:border-blue-500/50 hover:bg-blue-500/3"}`}>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4">
                <Icon.Upload className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="font-bold text-base mb-2 text-[#e8eaf2]">Drop files or folders here</h3>
              <p className="text-sm text-[#6b7280]">Or <span className="text-blue-400 cursor-pointer">browse files</span> from your computer</p>
            </div>

            {/* Folders Section */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#6b7280]">Folders</p>
            </div>
            <div className={`mb-8 ${viewMode === "grid" ? "grid grid-cols-[repeat(auto-fill,minmax(176px,1fr))] gap-3" : "flex flex-col gap-2"}`}>
              {folders.map((f) => (
                <FileCard key={f.id} file={f} selected={selectedIds.has(f.id)} onToggle={() => toggleSelect(f.id)} />
              ))}
            </div>

            {/* Files Section */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold tracking-widest uppercase text-[#6b7280]">Recent Files</p>
            </div>
            <div className={`${viewMode === "grid" ? "grid grid-cols-[repeat(auto-fill,minmax(176px,1fr))] gap-3" : "flex flex-col gap-2"}`}>
              {files.map((f) => (
                <FileCard key={f.id} file={f} selected={selectedIds.has(f.id)} onToggle={() => toggleSelect(f.id)} />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Floating action bar */}
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 z-40 bg-[#161920] border border-[#2a2f3d] rounded-2xl px-5 py-3.5 flex items-center gap-4
        shadow-2xl min-w-[360px] transition-all duration-300
        ${selectedIds.size > 0 ? "translate-y-0 opacity-100 bottom-7" : "translate-y-20 opacity-0 pointer-events-none"}`}>
        <span className="text-sm font-bold">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-md mr-2">{selectedIds.size}</span>
          item{selectedIds.size !== 1 ? "s" : ""} selected
        </span>
        <div className="flex gap-2 ml-auto">
          <button onClick={clearSelection}
            className="px-4 py-1.5 rounded-lg border border-[#2a2f3d] text-sm text-[#6b7280] hover:text-[#e8eaf2] hover:bg-[#1e222c] transition-colors">
            Clear
          </button>
          <button onClick={() => setSendPanelOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors">
            <Icon.Send className="w-3.5 h-3.5" /> Send
          </button>
        </div>
      </div>

      {/* Send Panel */}
      <SendPanel
        open={sendPanelOpen}
        onClose={() => setSendPanelOpen(false)}
        selectedFiles={selectedFiles}
        onRemoveFile={removeFileFromSend}
        recipients={recipients}
        onAddRecipient={addRecipient}
        onRemoveRecipient={removeRecipient}
        onSend={handleSend}
      />

      {/* Toast */}
      <Toast visible={toast.visible} title={toast.title} sub={toast.sub} />
    </div>
  );
}