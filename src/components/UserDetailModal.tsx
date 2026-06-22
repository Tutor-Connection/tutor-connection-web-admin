import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  BookOpen, 
  Code, 
  PenTool, 
  CheckCircle,
  Activity
} from 'lucide-react';
import { User as UserType } from '../types';

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onSaveNotes: (userId: string, notes: string) => void;
}

export default function UserDetailModal({ isOpen, onClose, user, onSaveNotes }: UserDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'account' | 'personal' | 'activity' | 'notes'>('account');
  const [notes, setNotes] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setNotes(user.details.adminNotes || '');
      setActiveTab('account');
      setSaveSuccess(false);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSaveNotes = () => {
    onSaveNotes(user.id, notes);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const statusColors = {
    Active: 'bg-brand-primary-50 text-brand-primary-600 border-brand-primary-100',
    Pending: 'bg-brand-orange-50 text-brand-orange-500 border-brand-orange-100',
    Suspended: 'bg-red-50 text-red-600 border-red-100',
    Unverified: 'bg-slate-100 text-slate-500 border-slate-200'
  };

  const statusText = {
    Active: 'Đang hoạt động',
    Pending: 'Chờ kiểm duyệt',
    Suspended: 'Tạm khóa',
    Unverified: 'Chưa xác thực'
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn select-none">
      <div 
        id="userDetailModal"
        className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[90vh] flex flex-col justify-between overflow-hidden"
      >
        {/* Header section matching Image 3 structure */}
        <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              id="userAvatar"
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-primary-600/10 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-slate-900">{user.name}</h3>
                <span className={`py-0.5 px-2.5 text-[10px] font-extrabold rounded-full border uppercase tracking-wider ${statusColors[user.status]}`}>
                  {statusText[user.status]}
                </span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-primary-500" />
                {user.role === 'Tutor' ? 'Gia sư chuyên nghiệp' : user.role === 'Student' ? 'Học viên hệ thống' : 'Quản trị viên'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection Row */}
        <div className="flex border-b border-slate-100 bg-white px-6">
          {[
            { id: 'account', label: 'Thông tin tài khoản' },
            { id: 'personal', label: 'Thông tin cá nhân' },
            { id: 'activity', label: 'Lịch sử hoạt động' },
            { id: 'notes', label: 'Ghi chú admin' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-4 text-xs font-extrabold border-b-2 tracking-wide transition-all -mb-[2px] cursor-pointer ${
                activeTab === tab.id 
                  ? 'border-brand-primary-600 text-brand-primary-600' 
                  : 'border-transparent text-slate-400 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto max-h-[55vh] bg-white">
          
          {/* TAB 1: ACCOUNTS */}
          {activeTab === 'account' && user.details.accountInfo && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest block mb-1">Tên đăng nhập</span>
                  <span className="text-slate-900 font-extrabold text-sm font-mono">@{user.details.accountInfo.username}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest block mb-1">Mã định danh USER</span>
                  <span className="text-[#0037b0] font-extrabold text-xs font-mono">{user.id}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest block mb-1">Ngày Tạo Tài Khoản</span>
                  <span className="text-slate-900 font-bold text-sm flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {user.details.accountInfo.registrationDate}
                  </span>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest block mb-1">Mức độ bảo mật</span>
                  <span className="text-brand-green-600 font-extrabold text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    {user.details.accountInfo.secureLevel}
                  </span>
                </div>
              </div>

              <div className="bg-brand-primary-50/50 p-4 rounded-xl border border-brand-primary-100 mt-2">
                <span className="text-[10px] block text-brand-primary-700 font-extrabold uppercase tracking-widest mb-1.5">Lần đăng nhập cuối</span>
                <span className="text-slate-700 font-semibold text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-primary-500 animate-ping" />
                  {user.details.accountInfo.lastLogin} (Địa chỉ IP: 192.168.1.10)
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: PERSONAL */}
          {activeTab === 'personal' && user.details.personalInfo && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Giới tính</label>
                  <p className="text-slate-800 text-xs font-bold py-2 px-3 bg-slate-50 border border-slate-100 rounded-lg">{user.details.personalInfo.gender}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Ngày sinh</label>
                  <p className="text-slate-800 text-xs font-bold py-2 px-3 bg-slate-50 border border-slate-100 rounded-lg">{user.details.personalInfo.dob}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Số điện thoại</label>
                  <p className="text-slate-800 text-xs font-bold py-2 px-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {user.phone}
                  </p>
                </div>
                <div>
                  <label className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Email</label>
                  <p className="text-slate-800 text-xs font-bold py-2 px-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {user.email}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Địa chỉ thường trú</label>
                <p className="text-slate-800 text-xs font-bold py-2 px-3 bg-slate-50 border border-slate-100 rounded-lg flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {user.details.personalInfo.address}
                </p>
              </div>

              {user.role === 'Tutor' && (
                <>
                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <div>
                      <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Học vấn & Bằng cấp</span>
                      <p className="text-slate-800 text-xs font-bold bg-brand-primary-50/15 py-2 px-3 border border-slate-100 rounded-lg flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-brand-primary-500" />
                        {user.details.personalInfo.education}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Chuyên ngành chính</span>
                      <p className="text-slate-800 text-xs font-bold py-2 px-3 bg-slate-50 border border-slate-100 rounded-lg">{user.details.personalInfo.specialization}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[10px] font-bold uppercase block mb-1.5">Kỹ năng phụ trách giảng dạy</span>
                    <div className="flex flex-wrap gap-1.5">
                      {user.details.personalInfo.skills?.map((skill, idx) => (
                        <span key={idx} className="bg-brand-primary-50 text-brand-primary-700 py-1 px-2.5 rounded-lg text-[10px] font-extrabold flex items-center gap-1">
                          <Code className="w-3 h-3 text-brand-primary-500" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="text-slate-400 text-[10px] font-bold uppercase block mb-1">Giới thiệu ngắn</label>
                <p className="text-slate-600 text-xs font-semibold py-2.5 px-3 bg-slate-50 border border-slate-100 rounded-lg leading-relaxed">
                  {user.details.personalInfo.bio || 'Chưa cập nhật phần tự bạch.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ACTIVITY HISTORY */}
          {activeTab === 'activity' && (
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Lịch sử sự kiện gần đây</span>
              {user.details.activityHistory && user.details.activityHistory.length > 0 ? (
                <div className="divide-y divide-slate-100 overflow-hidden border border-slate-100 rounded-xl">
                  {user.details.activityHistory.map((log, idx) => (
                    <div key={idx} className="p-3.5 hover:bg-slate-55 bg-slate-50/50 flex justify-between items-center text-xs font-medium">
                      <div>
                        <span className="text-slate-900 font-bold block">{log.action}</span>
                        <span className="text-slate-400 text-[10px] font-semibold block uppercase mt-0.5">{log.details}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-brand-primary-600 font-mono block text-[10px] font-bold">{log.ipAddress}</span>
                        <span className="text-slate-400 text-[10px] font-semibold block mt-0.5">{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400 font-bold">
                  Không tìm thấy lịch sử hoạt động cho người dùng này.
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ADMIN NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5" />
                  Nội dung ghi chú của Quản trị viên
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full min-h-[120px] p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary-500/20 focus:border-brand-primary-500 text-xs font-semibold leading-relaxed text-slate-700 bg-slate-50/50 focus:bg-white transition"
                  placeholder="Nhập ghi chú quản lý, nhắc nhở hoặc nhận xét về thành viên này..."
                />
              </div>

              {saveSuccess && (
                <div className="p-3 bg-brand-green-50 text-brand-green-600 rounded-xl border border-brand-green-100 text-xs font-bold flex items-center gap-2">
                  <CheckCircle className="w-4.5 h-4.5 text-brand-green-500" />
                  Đã cập nhật lưu ghi chú quản lý thành công!
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer buttons */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3.5">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 cursor-pointer transition"
          >
            Đóng Panel
          </button>
          
          {activeTab === 'notes' && (
            <button 
              type="button"
              onClick={handleSaveNotes}
              className="px-4 py-2.5 bg-brand-primary-600 hover:bg-brand-primary-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md shadow-brand-primary-500/10 hover:-translate-y-0.5 transition"
            >
              Cập Nhật Ghi Chú
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
