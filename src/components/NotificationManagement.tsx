import React, { useState } from 'react';
import { PastNotification } from '../types';
import { BellRing, Send, Clock, Users, Smartphone, Sparkles, CheckSquare, BarChart, Trash } from 'lucide-react';

interface NotificationProps {
  notifications: PastNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<PastNotification[]>>;
}

export default function NotificationManagement({ notifications, setNotifications }: NotificationProps) {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // New notification form state
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState<'Tất cả' | 'Học viên' | 'Gia sư'>('Tất cả');
  const [channels, setChannels] = useState({ push: true, email: false, sms: false });
  const [selectedNotificationStats, setSelectedNotificationStats] = useState<PastNotification | null>(notifications[0]);

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      alert("Vui lòng nhập tiêu đề và nội dung thông báo đầy đủ.");
      return;
    }

    const newNotif: PastNotification = {
      id: `nt-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      audience: audience,
      timeText: `Vừa xong, ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`,
      readCount: 1,
      totalCount: audience === 'Tất cả' ? 3500 : audience === 'Học viên' ? 2000 : 1500,
      statsPercent: 12
    };

    setNotifications(prev => [newNotif, ...prev]);
    setSelectedNotificationStats(newNotif);
    setSuccessMsg(`Thông báo "${title}" đã được quảng bá rộng rãi thành công tới đối tượng ${audience}!`);
    setTimeout(() => setSuccessMsg(null), 4500);

    // Reset fields
    setTitle('');
    setMessage('');
  };

  const handleDeleteNotif = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Xóa thông báo đã gửi này?")) {
      setNotifications(prev => prev.filter(n => n.id !== id));
      if (selectedNotificationStats?.id === id) {
        setSelectedNotificationStats(null);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex text-xs text-gray-400 font-medium mb-1.5">
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span className="text-tm-primary font-semibold">Quản lý thông báo</span>
          </nav>
          <h2 className="text-2xl font-bold font-display text-gray-900 tracking-tight flex items-center gap-2">
            Quản lý thông báo
            <span className="size-2 rounded-full bg-indigo-500" />
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Gửi thông báo đẩy (Push notification), thông báo hệ thống và SMS tự động tới Học viên & Gia sư theo phân loại.
          </p>
        </div>
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0037b0] text-white text-xs font-semibold px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-2 border border-indigo-150 animate-bounce">
          <Sparkles className="size-4 text-amber-300 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Grid container of editors and previews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: WYSIWYG Editor Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-1.5 text-gray-800 font-display font-bold text-sm">
            <BellRing className="size-4.5 text-tm-primary" />
            <span>Soạn thảo thông báo mới</span>
          </div>

          <form onSubmit={handleSendNotification} className="space-y-4">
            
            {/* Title */}
            <div>
              <label htmlFor="notif-title-input" className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Tiêu đề thông báo</label>
              <input
                id="notif-title-input"
                type="text"
                placeholder="Ví dụ: Ưu đãi 15% học phí lớp học Toán Lý Hóa tháng này"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={90}
                className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-tm-primary/20 focus:border-tm-primary"
                required
              />
            </div>

            {/* Content text */}
            <div>
              <label htmlFor="notif-content-input" className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Nội dung chi tiết</label>
              <textarea
                id="notif-content-input"
                rows={3}
                placeholder="Nội dung truyền đi không quá 250 ký tự..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={250}
                className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-tm-primary/20 focus:border-tm-primary"
                required
              />
            </div>

            {/* Target select and types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label id="audience-select-label" className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Đối tượng nhắm mục tiêu</label>
                <div className="grid grid-cols-3 bg-gray-100 p-1 rounded-xl" role="group" aria-labelledby="audience-select-label">
                  {(['Tất cả', 'Học viên', 'Gia sư'] as const).map((aud) => (
                    <button
                      type="button"
                      key={aud}
                      onClick={() => setAudience(aud)}
                      className={`py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        audience === aud ? 'bg-white text-tm-primary shadow-xs' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {aud}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold text-gray-400 uppercase mb-1.5">Kênh truyền tải tin</span>
                <div className="flex items-center space-x-3 h-10">
                  <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-medium text-gray-600">
                    <input
                      type="checkbox"
                      checked={channels.push}
                      onChange={(e) => setChannels({ ...channels, push: e.target.checked })}
                      className="rounded text-tm-primary focus:ring-tm-primary/10 border-gray-150"
                    />
                    <span>Push App</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-medium text-gray-600">
                    <input
                      type="checkbox"
                      checked={channels.email}
                      onChange={(e) => setChannels({ ...channels, email: e.target.checked })}
                      className="rounded text-tm-primary focus:ring-tm-primary/10 border-gray-150"
                    />
                    <span>Email</span>
                  </label>
                  <label className="flex items-center space-x-1.5 cursor-pointer text-xs font-medium text-gray-600">
                    <input
                      type="checkbox"
                      checked={channels.sms}
                      onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                      className="rounded text-tm-primary focus:ring-tm-primary/10 border-gray-150"
                    />
                    <span>SMS Brandname</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Form submit */}
            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setTitle('Nhắc nhở nộp báo cáo chuyên môn tháng 5');
                  setMessage('Gửi toàn bộ thành viên gia sư vui lòng hoàn tất báo cáo hoa hồng trước ngày 30. Trân trọng.');
                  setAudience('Gia sư');
                }}
                className="px-3 py-2 border border-gray-200 text-gray-500 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors"
              >
                Tải văn bản mẫu
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-tm-primary hover:bg-tm-primary-container text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Send className="size-3.5" />
                <span>Gửi thông báo</span>
              </button>
            </div>

          </form>

          {/* Interactive virtual mobile live simulator display */}
          <div className="border border-dashed border-gray-200 p-4 rounded-xl bg-slate-50/70 space-y-2">
            <span className="block text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
              <Smartphone className="size-3 text-indigo-500" />
              Giao diện xem trước trên thiết bị di động
            </span>
            
            <div className="bg-white rounded-xl shadow-md border border-gray-150 p-3.5 max-w-sm mx-auto flex items-start gap-3 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-tm-primary" />
              <div className="size-8 rounded-lg bg-indigo-50 flex items-center justify-center text-tm-primary shrink-0 border border-indigo-100">
                <BellRing className="size-4" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-tm-primary tracking-wider font-display">TutorMatch</span>
                  <span className="text-[9px] text-gray-400 font-medium">Bây giờ</span>
                </div>
                <h5 className="text-xs font-bold text-gray-800 leading-tight">
                  {title || "Tiêu đề thông điệp mới hiển thị ở đây..."}
                </h5>
                <p className="text-[11px] text-gray-500 leading-relaxed truncate">
                  {message || "Nội dung tóm tắt thông báo gửi đến điện thoại học viên..."}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Right column: Past Notifications List */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">LỊCH SỬ GỬI TIN ({notifications.length})</span>
            
            <div className="divide-y divide-gray-50 max-h-[300px] overflow-y-auto pr-1">
              {notifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => setSelectedNotificationStats(notif)}
                  className={`py-3 px-2 rounded-lg cursor-pointer transition-all flex items-start justify-between gap-2 text-left ${
                    selectedNotificationStats?.id === notif.id 
                      ? 'bg-indigo-50/40 border border-indigo-100' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="space-y-1">
                    <h5 className="text-xs font-semibold text-gray-800 line-clamp-1">{notif.title}</h5>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                      <span className="bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded font-sans">{notif.audience}</span>
                      <span>•</span>
                      <span>{notif.timeText}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDeleteNotif(notif.id, e)}
                    className="p-1 hover:bg-rose-50 rounded text-gray-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Sent Statistics Detail Panel */}
          {selectedNotificationStats && (
            <div className="bg-white rounded-2xl border border-gray-150 p-5 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#b45309] bg-amber-50 px-2 py-0.5 rounded border border-amber-100 flex items-center gap-1">
                  <BarChart className="size-3" />
                  Báo cáo tỷ lệ đọc
                </span>
                <span className="text-[10px] font-mono font-medium text-gray-400">NTF: {selectedNotificationStats.id.toUpperCase()}</span>
              </div>
              <p className="text-xs font-bold text-gray-800 leading-tight">
                {selectedNotificationStats.title}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500 font-semibold">
                  <span>Tỷ lệ hiển thị / click xem qua</span>
                  <span className="text-tm-primary">{selectedNotificationStats.statsPercent}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-tm-primary h-full rounded-full transition-all duration-300" 
                    style={{ width: `${selectedNotificationStats.statsPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-gray-400 font-mono">
                  <span>Thực tế mở: {selectedNotificationStats.readCount} lượt</span>
                  <span>Tổng nhắm: {selectedNotificationStats.totalCount} thiết bị</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
