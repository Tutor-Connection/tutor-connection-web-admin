import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  CheckSquare, 
  TrendingUp, 
  ShieldCheck, 
  Settings, 
  LifeBuoy, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  GraduationCap,
  Wallet2,
  MessageSquare,
  ShieldAlert,
  BellRing,
  BarChart3
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onChangeTab: (tab: string) => void;
  onLogout: () => void;
  adminInfo: {
    name: string;
    avatar: string;
    role: string;
  };
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  reviewPendingCount?: number;
  postPendingCount?: number;
  modPendingCount?: number;
}

export default function Sidebar({ 
  currentTab, 
  onChangeTab, 
  onLogout, 
  adminInfo,
  isCollapsed,
  onToggleCollapse,
  reviewPendingCount = 0,
  postPendingCount = 0,
  modPendingCount = 0
}: SidebarProps) {

  const menuItems = [
    { id: 'dashboard', label: 'Bảng Điều Khiển', icon: LayoutDashboard },
    { id: 'users', label: 'Quản Lý Người Dùng', icon: Users, badge: 'Đã cập nhật' },
    { id: 'subjects', label: 'Quản Lý Môn Học', icon: BookOpen },
    { id: 'classes', label: 'Lớp Học Ghép Đôi', icon: TrendingUp },
    { id: 'kyc', label: 'Kiểm Duyệt KYC', icon: ShieldCheck, badge: '3 Mới' },
    { id: 'tickets', label: 'Hỗ Trợ Người Dùng', icon: LifeBuoy },
    { id: 'posts', label: 'Quản lý bài đăng', icon: FileText, badge: postPendingCount > 0 ? postPendingCount : undefined, badgeColor: 'bg-amber-500 text-white' },
    { id: 'console-classes', label: 'Quản lý lớp học', icon: GraduationCap },
    { id: 'revenue', label: 'Quản lý doanh thu', icon: Wallet2 },
    { id: 'reviews', label: 'Quản lý đánh giá', icon: MessageSquare, badge: reviewPendingCount > 0 ? reviewPendingCount : undefined, badgeColor: 'bg-tm-secondary text-white' },
    { id: 'moderation', label: 'Kiểm duyệt nội dung', icon: ShieldAlert, badge: modPendingCount > 0 ? modPendingCount : undefined, badgeColor: 'bg-rose-500 text-white' },
    { id: 'notifications', label: 'Quản lý thông báo', icon: BellRing },
    { id: 'console-reports', label: 'Báo cáo & Thống kê', icon: BarChart3 },
    { id: 'reports', label: 'Báo Cáo AI Insights', icon: Maximize2 },
    { id: 'settings', label: 'Cài Đặt Hệ Thống', icon: Settings },
  ];

  return (
    <aside 
      className={`bg-slate-900 text-slate-100 flex flex-col justify-between transition-all duration-300 relative border-r border-[#ffffff0a] shadow-2xl h-screen sticky top-0 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Brand logo header */}
      <div>
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-brand-primary-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-brand-primary-900">
              <span className="font-extrabold text-sm">T</span>
            </div>
            {!isCollapsed && (
              <div className="transition duration-300">
                <span className="font-extrabold text-base tracking-tight text-white block">TutorMatch</span>
                <span className="text-[9px] block text-brand-primary-300 uppercase tracking-widest font-bold">Admin Console</span>
              </div>
            )}
          </div>
          <button 
            onClick={onToggleCollapse}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="p-4 space-y-1.5 mt-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeTab(item.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left cursor-pointer transition-all duration-150 relative group ${
                  isActive 
                    ? 'bg-brand-primary-600 text-white font-bold shadow-lg shadow-brand-primary-800/15' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-100 font-medium'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <IconComponent className={`w-5 h-5 shrink-0 transition duration-150 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`} />
                  {!isCollapsed && (
                    <span className="text-xs tracking-wide">{item.label}</span>
                  )}
                </div>

                {!isCollapsed && item.badge && (
                  <span className={`text-[9px] font-bold py-0.5 px-2 rounded-full uppercase tracking-wider ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : item.badgeColor 
                        ? item.badgeColor
                        : item.id === 'kyc' 
                          ? 'bg-brand-orange-500/25 text-brand-orange-500' 
                          : 'bg-white/10 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {/* Tooltip in collapsed mode */}
                {isCollapsed && (
                  <div className="absolute left-22 py-1.5 px-3 rounded-lg bg-slate-950 text-white text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 z-50 shadow-md">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Admin User Profile footer matching Image 12 layout */}
      <div className="p-4 border-t border-white/5 bg-slate-950/20">
        <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
          <img 
            src={adminInfo.avatar} 
            alt="Admin Profile" 
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-brand-primary-500/20 shrink-0"
            referrerPolicy="no-referrer"
          />
          {!isCollapsed && (
            <div className="overflow-hidden">
              <span className="font-bold text-xs block text-white truncate">{adminInfo.name}</span>
              <span className="text-[10px] text-slate-500 block font-semibold truncate capitalize">{adminInfo.role}</span>
            </div>
          )}
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3.5 p-3.5 mt-3 text-slate-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl cursor-pointer transition text-left group"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-400 shrink-0" />
          {!isCollapsed && <span className="text-xs font-bold uppercase tracking-wider">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}
