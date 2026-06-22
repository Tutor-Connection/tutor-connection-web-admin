import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, Heart, Users, Trash2, ArrowUpRight } from 'lucide-react';
import { ClassMatch } from '../types';

interface ClassesViewProps {
  classes: ClassMatch[];
  onDeleteClass: (classId: string) => void;
  onUpdateStatus: (classId: string, status: ClassMatch['status']) => void;
}

export default function ClassesView({ classes, onDeleteClass, onUpdateStatus }: ClassesViewProps) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<string>('All');

  const filteredMatches = classes.filter(c => {
    const matchesSearch = c.tutorName.toLowerCase().includes(search.toLowerCase()) || 
                          c.studentName.toLowerCase().includes(search.toLowerCase()) ||
                          c.subjectName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === 'All' || c.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Quản Lý Lớp Học</h1>
        <p className="text-slate-500 text-sm font-medium">Toàn bộ danh sách các lớp học gia sư đang được kết nối và vận hành trên khu vực miền Trung.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        {/* Toolbar controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Tìm theo gia sư, học viên, môn học..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 appearance-none cursor-pointer focus:outline-none"
            >
              <option value="All">Tất cả trạng thái</option>
              <option value="Active">Đang diễn ra</option>
              <option value="Pending">Đang chờ lớp</option>
              <option value="Completed">Đã hoàn thành</option>
              <option value="Cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="py-4 px-5">ID Lớp</th>
                <th className="py-4 px-5">Gia Sư Phụ Trách</th>
                <th className="py-4 px-5">Học Viên Đăng Ký</th>
                <th className="py-4 px-5">Môn Học</th>
                <th className="py-4 px-5">Học Phí / Buổi</th>
                <th className="py-4 px-2">Matching Rate</th>
                <th className="py-4 px-5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMatches.length > 0 ? (
                filteredMatches.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50 text-xs font-medium text-slate-600 transition">
                    <td className="py-4 px-5 font-mono text-slate-400">{c.id}</td>
                    <td className="py-4 px-5 font-bold text-slate-900">{c.tutorName}</td>
                    <td className="py-4 px-5 font-bold text-slate-800">{c.studentName}</td>
                    <td className="py-4 px-5">
                      <span className="bg-brand-primary-50 text-brand-primary-700 py-1 px-2.5 rounded-lg text-[10px] font-bold">
                        {c.subjectName}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-slate-900">{c.fee.toLocaleString()} VNĐ</td>
                    <td className="py-4 px-2 font-mono text-slate-900 font-bold">{c.rate}%</td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <select
                          value={c.status}
                          onChange={(e) => onUpdateStatus(c.id, e.target.value as any)}
                          className="bg-slate-50 border border-slate-200 text-[10px] font-bold py-1 px-2 rounded-lg"
                        >
                          <option value="Active">Đang dạy</option>
                          <option value="Pending">Chờ duyệt</option>
                          <option value="Completed">Hoàn thành</option>
                          <option value="Cancelled">Đã hủy</option>
                        </select>
                        
                        <button
                          onClick={() => {
                            if (confirm(`Bạn chắc chắn hủy liên kết học lớp [${c.id}]?`)) {
                              onDeleteClass(c.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-bold text-xs bg-slate-50/20">
                    Không tìm thấy lớp học nào khớp.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
