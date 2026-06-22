import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  ShieldAlert, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  UserMinus, 
  CheckCircle,
  MoreVertical,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { User, UserDetails } from '../types';

interface UserManagementViewProps {
  users: User[];
  onSelectUser: (user: User) => void;
  onAddUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onUpdateStatus: (userId: string, status: User['status']) => void;
}

export default function UserManagementView({ 
  users, 
  onSelectUser, 
  onAddUser, 
  onDeleteUser, 
  onUpdateStatus 
}: UserManagementViewProps) {
  const [activeTab, setActiveTabTab] = useState<'All' | 'Tutor' | 'Student' | 'Admin'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  // New User state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Tutor' | 'Student' | 'Admin'>('Tutor');
  const [newUserGender, setNewUserGender] = useState('Nam');
  const [newUserAddress, setNewUserAddress] = useState('Đà Nẵng');
  const [newUserBio, setNewUserBio] = useState('Chào mọi người, tôi là gia sư mới.');

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail || !newUserPhone) {
      alert('Vui lòng điền các thông tin cơ bản bắt buộc!');
      return;
    }

    const created: User = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: newUserName,
      email: newUserEmail,
      phone: newUserPhone,
      role: newUserRole,
      status: 'Active',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      avatarUrl: newUserGender === 'Nam' 
        ? "https://lh3.googleusercontent.com/aida-public/AB6AXuAmWaeSU8SczCVfWjF4xLbrx-VkBOIQxegUEabC4NC8xJXccFgihn008Im5XsBydPPib0vG3b5JCEDaMWy4Vg1EIYWBIwog_L2Df0FrMtCKhuHEfjGx8azJDO8VJyiz6IEJVfghjgp1dzMv6cQm4KJaBPzXftF5jC7LNMXlrkgBqxfWUlaLPjdC3rLy10sg4pcnkHpE7nWfCXlC6MJ-U1WRaYU6q6JyISo1EJinMFVAX1-wu2h7cfjvLGzmRoZLgvmYwsHoSOmzEHAr"
        : "https://lh3.googleusercontent.com/aida-public/AB6AXuACy5C9n36PR-73IfG_qeSGf6kJn3F7qx5zoyw7LXpwOoampdJ2bSZJ9tBVFCCivJUs9oyCnz0N6Ya2gpAU9jbn7eOfN2rBut0sOUlUTUsxQulxKJgeLCEIy-v5jn3VJbUc4zSCOvDzwrLa0QuRCW1BNhcZ_BSBff24RODd7E2gPpaB0dQElspoXHsv5AJjgF4Y8OdoScTwJMnn9epXhedGMpN3K5o74zFz1hXpX1eNlpzyFXnX6NqOYvCI-BBmeAjs1mF6OzJ5jWne",
      parent: newUserRole === 'Student' ? 'Phụ huynh học viên' : undefined,
      classCount: newUserRole === 'Student' ? 1 : undefined,
      gradeLevel: newUserRole === 'Student' ? 'Lớp 11' : undefined,
      details: {
        accountInfo: {
          username: newUserEmail.split('@')[0],
          registrationDate: new Date().toLocaleDateString('vi-VN'),
          lastLogin: "Chưa đăng nhập",
          secureLevel: "Trung bình"
        },
        personalInfo: {
          gender: newUserGender,
          dob: "01/01/2000",
          address: newUserAddress,
          education: "Đại học Sư phạm",
          specialization: "Sư phạm Toán học",
          skills: ["Giảng dạy căn bản"],
          bio: newUserBio
        },
        activityHistory: [
          { action: "Khởi tạo tài khoản", timestamp: new Date().toLocaleString('vi-VN'), ipAddress: "127.0.0.1", details: "Hệ thống tự động kích hoạt" }
        ],
        adminNotes: "Tài khoản tạo mới bằng tay từ admin."
      }
    };

    onAddUser(created);
    setIsAddUserOpen(false);
    // Reset state
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    setNewUserBio('Chào mọi người, tôi là thành viên mới.');
  };

  // Filter users based on tab and criteria
  const filteredUsers = users.filter((u) => {
    const matchesTab = activeTab === 'All' || u.role === activeTab;
    const matchesQuery = 
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesTab && matchesQuery && matchesStatus;
  });

  // Calculate quick stats from current users database
  const totalCount = users.length;
  const tutorsCount = users.filter(u => u.role === 'Tutor').length;
  const studentsCount = users.filter(u => u.role === 'Student').length;
  const pendingCount = users.filter(u => u.status === 'Pending').length;

  return (
    <div id="userManagementView" className="space-y-8 animate-fadeIn font-sans">
      {/* 4 KPI summary cards at top matching Image 6 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider mb-1">Tổng Người Dùng</span>
            <span className="text-2xl font-extrabold text-[#0f172a] tracking-tight">{totalCount * 123 + 456}</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brand-primary-50 text-brand-primary-600 flex items-center justify-center border border-brand-primary-100">
            <Users className="w-5.5 h-5.5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider mb-1">Gia Sư Đăng Ký</span>
            <span className="text-2xl font-extrabold text-[#0f172a] tracking-tight">{tutorsCount * 85 + 120}</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brand-orange-50 text-brand-orange-500 flex items-center justify-center border border-brand-orange-100">
            <UserCheck className="w-5.5 h-5.5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider mb-1">Yêu Cầu Chờ Duyệt (KYC)</span>
            <span className="text-2xl font-extrabold text-[#0f172a] tracking-tight">{pendingCount + 139}</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center border border-pink-100">
            <SlidersHorizontal className="w-5.5 h-5.5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider mb-1">Trạng thái hệ thống</span>
            <span className="text-sm font-extrabold text-brand-green-600 uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-green-500 animate-pulse" />
              Ổn Định
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brand-green-50 text-brand-green-500 flex items-center justify-center border border-brand-green-100">
            <ShieldAlert className="w-5.5 h-5.5" />
          </div>
        </div>
      </div>

      {/* Main Table Layout Panel */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 overflow-hidden">
        {/* Header toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Sub-tabs selection filter */}
          <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-200/55 self-start">
            {[
              { id: 'All', label: 'Tất cả' },
              { id: 'Tutor', label: 'Gia sư' },
              { id: 'Student', label: 'Học viên' },
              { id: 'Admin', label: 'Ban Quản Trị' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabTab(tab.id as any)}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-brand-primary-700 shadow-md border-b-2 border-brand-primary-600/35'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAddUserOpen(true)}
            className="flex items-center justify-center gap-1 px-4 py-2.5 bg-brand-primary-600 hover:bg-brand-primary-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-brand-primary-500/10 hover:-translate-y-0.5 transition cursor-pointer self-stretch md:self-auto"
          >
            <Plus className="w-4 h-4" />
            Thêm người dùng mới
          </button>
        </div>

        {/* Filter inputs toolbar matching Image 7 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
          {/* Search */}
          <div className="relative md:col-span-2">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm nhanh họ tên, số điện thoại, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary-500/10 focus:border-brand-primary-500 transition"
            />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Filter className="w-4 h-4" />
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary-500/10 focus:border-brand-primary-500 transition cursor-pointer"
            >
              <option value="All">Tất cả trạng thái</option>
              <option value="Active">Đang hoạt động</option>
              <option value="Pending">Chờ duyệt</option>
              <option value="Suspended">Đang khóa</option>
            </select>
          </div>

          <div className="flex items-center justify-end text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Tìm thấy: <span className="text-brand-primary-600 font-mono text-xs">{filteredUsers.length}</span> tài khoản
            </span>
          </div>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            {/* Dynamic Column Headers depending on Tutor vs Student tabs */}
            {activeTab !== 'Student' ? (
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
                  <th className="py-4 px-5">ID</th>
                  <th className="py-4 px-5">Người dùng</th>
                  <th className="py-4 px-5">Thông Tin Liên Hệ</th>
                  <th className="py-4 px-5">Vai trò</th>
                  <th className="py-4 px-5">Trạng thái</th>
                  <th className="py-4 px-5">Ngày tạo</th>
                  <th className="py-4 px-5 text-right">Hành động</th>
                </tr>
              </thead>
            ) : (
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase tracking-widest">
                  <th className="py-4 px-5">ID</th>
                  <th className="py-4 px-5">Học viên / Học sinh</th>
                  <th className="py-4 px-5">Phụ huynh</th>
                  <th className="py-4 px-5">Thông tin liên hệ</th>
                  <th className="py-4 px-5">Lớp hiện tại</th>
                  <th className="py-4 px-5">Số lớp học</th>
                  <th className="py-4 px-5">Trạng thái</th>
                  <th className="py-4 px-5 text-right">Hành động</th>
                </tr>
              </thead>
            )}

            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u) => {
                  const isStudent = u.role === 'Student';
                  return (
                    <tr 
                      key={u.id} 
                      className="hover:bg-slate-50/50 text-xs font-medium text-slate-600 transition"
                    >
                      {/* ID */}
                      <td className="py-4 px-5 font-mono text-slate-400 font-semibold">{u.id}</td>

                      {/* Name / User Info block */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <img 
                            src={u.avatarUrl} 
                            alt={u.name} 
                            className="w-9 h-9 rounded-xl object-cover ring-2 ring-slate-100"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span 
                              onClick={() => onSelectUser(u)}
                              className="font-extrabold text-slate-900 block cursor-pointer hover:text-brand-primary-600 hover:underline transition text-sm"
                            >
                              {u.name}
                            </span>
                            <span className="text-slate-400 text-xs block font-mono mt-0.5">{u.details.accountInfo?.username}</span>
                          </div>
                        </div>
                      </td>

                      {/* Conditional display logic based on column configuration */}
                      {activeTab !== 'Student' ? (
                        <>
                          {/* Liên hệ */}
                          <td className="py-4 px-5">
                            <span className="text-slate-800 font-bold block">{u.phone}</span>
                            <span className="text-slate-400 block font-normal mt-0.5">{u.email}</span>
                          </td>
                          {/* Vai trò */}
                          <td className="py-4 px-5">
                            <span className={`inline-flex py-1 px-2.5 rounded-lg text-[9px] font-bold uppercase tracking-wider ${
                              u.role === 'Admin' 
                                ? 'bg-purple-100 text-purple-700' 
                                : u.role === 'Tutor' 
                                  ? 'bg-brand-orange-100 text-brand-orange-600' 
                                  : 'bg-brand-green-100 text-brand-green-600'
                            }`}>
                              {u.role === 'Admin' ? 'Admin' : u.role === 'Tutor' ? 'Gia sư' : 'Học viên'}
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          {/* Phụ huynh (Student specific view matching Image 15) */}
                          <td className="py-4 px-5 font-bold text-slate-700">{u.parent || 'Bố mẹ tự liên hệ'}</td>
                          {/* SĐT Học viên */}
                          <td className="py-4 px-5">
                            <span className="text-slate-800 font-bold block">{u.phone}</span>
                            <span className="text-slate-400 block font-normal mt-0.5">{u.email}</span>
                          </td>
                          {/* Lớp */}
                          <td className="py-4 px-5 text-slate-800 font-bold">{u.gradeLevel || 'Lớp 12'}</td>
                          {/* Số lớp kết nối */}
                          <td className="py-4 px-5 font-mono text-slate-900 font-bold pr-8">{u.classCount || 1} Lớp</td>
                        </>
                      )}

                      {/* Trạng thái */}
                      <td className="py-4 px-5">
                        <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border ${
                          u.status === 'Active' 
                            ? 'bg-brand-green-50 text-brand-green-600 border-brand-green-100' 
                            : u.status === 'Pending' 
                              ? 'bg-brand-orange-50 text-brand-orange-500 border-brand-orange-100' 
                              : 'bg-red-50 text-red-600 border-red-100'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            u.status === 'Active' ? 'bg-brand-green-500' : u.status === 'Pending' ? 'bg-brand-orange-500' : 'bg-red-500'
                          }`} />
                          {u.status === 'Active' ? 'Đang hoạt động' : u.status === 'Pending' ? 'Chờ duyệt' : 'Tạm khóa'}
                        </span>
                      </td>

                      {/* Ngày tạo (Only if All/Tutor layout) */}
                      {activeTab !== 'Student' && (
                        <td className="py-4 px-5 text-slate-400 font-bold">{u.createdAt}</td>
                      )}

                      {/* Hành động */}
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View details */}
                          <button
                            onClick={() => onSelectUser(u)}
                            className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-950 transition cursor-pointer"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* Quick lock toggle */}
                          <button
                            onClick={() => onUpdateStatus(u.id, u.status === 'Active' ? 'Suspended' : 'Active')}
                            className={`p-1.5 rounded-lg transition cursor-pointer ${
                              u.status === 'Active' 
                                ? 'bg-red-50 hover:bg-red-100 text-red-500' 
                                : 'bg-brand-green-50 hover:bg-brand-green-100 text-brand-green-500'
                            }`}
                            title={u.status === 'Active' ? 'Khóa tài khoản' : 'Mở khóa'}
                          >
                            <UserMinus className="w-4 h-4" />
                          </button>

                          {/* Delete profile */}
                          <button
                            onClick={() => {
                              if (confirm(`Bạn chắc chắn muốn xóa hồ sơ người dùng [${u.name}] ra khỏi máy chủ?`)) {
                                onDeleteUser(u.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition cursor-pointer"
                            title="Xóa vĩnh viễn"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-bold text-xs bg-slate-50/20">
                    Không tìm thấy thành viên khớp với điều kiện lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Overlay Drawer / Modal for ADD NEW USER */}
      {isAddUserOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden flex flex-col justify-between">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
                <Plus className="w-5 h-5 text-brand-primary-500" />
                Thêm Tài Khoản Quản Trị / Thành Viên
              </h3>
              <button 
                onClick={() => setIsAddUserOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Họ và Tên</label>
                <input 
                  type="text" 
                  value={newUserName} 
                  required
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="Ví dụ: Lê Minh Hoàng"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary-500/20 focus:border-brand-primary-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Số điện thoại</label>
                  <input 
                    type="tel" 
                    value={newUserPhone} 
                    required
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    placeholder="Ví dụ: 0914 999 888"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary-500/20 focus:border-brand-primary-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email liên lạc</label>
                  <input 
                    type="email" 
                    value={newUserEmail} 
                    required
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="leminhhoang@gmail.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary-500/20 focus:border-brand-primary-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Vai trò</label>
                  <select 
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-extrabold text-xs text-slate-600 focus:outline-none focus:border-brand-primary-500 transition"
                  >
                    <option value="Tutor">Gia sư</option>
                    <option value="Student">Học viên / Học sinh</option>
                    <option value="Admin">Nhân viên Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Giới tính</label>
                  <select 
                    value={newUserGender}
                    onChange={(e) => setNewUserGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-extrabold text-xs text-slate-600 focus:outline-none focus:border-brand-primary-500 transition"
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Địa chỉ (Địa bàn hoạt động)</label>
                <input 
                  type="text" 
                  value={newUserAddress} 
                  onChange={(e) => setNewUserAddress(e.target.value)}
                  placeholder="Ví dụ: Liên Chiểu, Đà Nẵng"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-brand-primary-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Giới thiệu tóm tắt năng lực</label>
                <textarea 
                  value={newUserBio} 
                  onChange={(e) => setNewUserBio(e.target.value)}
                  className="w-full min-h-[70px] p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-brand-primary-500 transition"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 pr-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-brand-primary-600 hover:bg-brand-primary-700 text-white rounded-xl font-bold text-xs cursor-pointer shadow"
                >
                  Kích hoạt hồ sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
