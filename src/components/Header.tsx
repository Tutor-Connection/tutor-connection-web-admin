import React, { useState } from 'react';
import { Search, Bell, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  title: string;
  subtitle: string;
}

export default function Header({ searchQuery, setSearchQuery, title, subtitle }: HeaderProps) {
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Học viên Nguyễn Lan vừa đăng tin học Toán 12 mới.', time: '5 phút trước', read: false },
    { id: 2, text: 'Hệ thống AI vừa gắn cờ 1 đánh giá mâu thuẫn điểm số.', time: '2 giờ trước', read: false },
    { id: 3, text: 'Yêu cầu rút tiền commission từ gia sư Thorne đang chờ duyệt.', time: '1 ngày trước', read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 sticky top-0 z-40 flex items-center justify-between shadow-sm">
      {/* Search Input bar */}
      <div className="w-96 relative">
        <label htmlFor="top-search" className="sr-only">Tìm kiếm bảng điều khiển</label>
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
          <Search className="size-4" />
        </div>
        <input
          id="top-search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Tìm kiếm bài đăng, lớp học, nội dung bôi đậm..."
          className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-800 pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-tm-primary/20 focus:border-tm-primary transition-all placeholder:text-gray-400"
        />
      </div>

      {/* Right User actions */}
      <div className="flex items-center space-x-6">
        
        {/* Quick developer tip indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs text-tm-primary font-medium">
          <Sparkles className="size-3 text-indigo-500 animate-pulse" />
          <span>Hệ thống Live Preview</span>
        </div>

        {/* Support help button */}
        <button
          id="btn-help-header"
          className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          title="Trợ giúp & Hướng dẫn sử dụng Admin Console"
          onClick={() => alert("Chào mừng tới TutorMatch Admin Console! Bạn có thể chuyển đổi giữa các tab ở cột bên trái để kiểm duyệt bài đăng, lớp học, doanh thu, đánh giá, và gửi thông báo theo thời gian thực.")}
        >
          <HelpCircle className="size-5" />
        </button>

        {/* Notifications and indicator bell */}
        <div className="relative">
          <button
            id="btn-notification-bell"
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg relative transition-all cursor-pointer"
          >
            <Bell className="size-5" />
            {unreadCount > 0 && (
              <span id="unread-badge-dot" className="absolute top-1 right-1 size-2 bg-rose-500 rounded-full border border-white animate-ping" />
            )}
          </button>

          {/* Popover overlay for notifications */}
          {showNotificationDropdown && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <span className="font-semibold text-xs text-gray-800 font-display">Thông báo gần đây</span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[10px] text-tm-primary hover:underline font-semibold flex items-center gap-1"
                  >
                    <CheckCircle2 className="size-3" /> Đánh dấu đã đọc
                  </button>
                )}
              </div>
              <div className="divide-y divide-gray-50 max-h-64 overflow-y-auto">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`p-3 text-xs leading-relaxed hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-indigo-50/40' : ''}`}>
                    <p className="text-gray-700 font-medium">{notif.text}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">{notif.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Card component */}
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-100">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800 leading-tight font-display">Admin User</p>
            <p className="text-[10px] text-gray-400 font-medium">Super Administrator</p>
          </div>
          <div className="size-10 rounded-full border border-gray-200 overflow-hidden shadow-inner bg-slate-50 relative group">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Admin Profile Avatar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full border border-white" />
          </div>
        </div>

      </div>
    </header>
  );
}
