import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Clock, Trash2, Mail } from 'lucide-react';
import { SupportTicket } from '../types';

interface SupportTicketsViewProps {
  tickets: SupportTicket[];
  onUpdateStatus: (id: string, status: SupportTicket['status']) => void;
  onDeleteTicket: (id: string) => void;
}

export default function SupportTicketsView({ tickets, onUpdateStatus, onDeleteTicket }: SupportTicketsViewProps) {
  const [search, setSearch] = useState('');

  const filtered = tickets.filter(t => 
    t.user.toLowerCase().includes(search.toLowerCase()) ||
    t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-sans">Hỗ Trợ Người Dùng</h1>
        <p className="text-slate-500 text-sm font-medium">Tiếp nhận báo lỗi, khiếu nại và phản hồi tư pháp từ đội ngũ Gia Sư và Học Viên địa bàn Đà Nẵng.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <div className="mb-6 relative max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <Search className="w-4 h-4" />
          </span>
          <input 
            type="text" 
            placeholder="Tìm theo khách hàng, chủ đề phản ánh..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:bg-white transition"
          />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="py-4 px-5">ID Ticket</th>
                <th className="py-4 px-5">Khách Hàng</th>
                <th className="py-4 px-5">Vai trò</th>
                <th className="py-4 px-5">Nội dung phản ánh</th>
                <th className="py-4 px-5">Độ ưu tiên</th>
                <th className="py-4 px-5">Trạng thái</th>
                <th className="py-4 px-5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 text-xs font-semibold text-slate-600 transition">
                    <td className="py-4 px-5 font-mono text-slate-400">{t.id}</td>
                    <td className="py-4 px-5 text-slate-950 font-extrabold">{t.user}</td>
                    <td className="py-4 px-5">
                      <span className={`py-0.5 px-2 rounded-lg text-[9px] font-bold uppercase ${
                        t.role === 'Gia sư' ? 'bg-brand-orange-50 text-brand-orange-600' : 'bg-brand-green-50 text-brand-green-600'
                      }`}>
                        {t.role}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-medium max-w-xs truncate">{t.subject}</td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        t.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {t.priority === 'High' ? 'Nghiêm trọng' : t.priority === 'Medium' ? 'Trung bình' : 'Thấp'}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
                        t.status === 'Open' ? 'bg-red-50 text-red-600 border border-red-150' : t.status === 'InProgress' ? 'bg-brand-orange-50 text-brand-orange-500 border border-brand-orange-100' : 'bg-brand-green-50 text-brand-green-500 border border-brand-green-150'
                      }`}>
                        {t.status === 'Open' ? 'Chưa Xử Lý' : t.status === 'InProgress' ? 'Đang Giải Quyết' : 'Đã Đóng'}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex justify-end gap-1.5">
                        <select
                          value={t.status}
                          onChange={(e) => onUpdateStatus(t.id, e.target.value as any)}
                          className="bg-slate-50 border border-slate-200 text-[10px] font-bold py-1 px-1.5 rounded-lg"
                        >
                          <option value="Open">Chưa xử lý</option>
                          <option value="InProgress">Đang xử lý</option>
                          <option value="Closed">Đã giải quyết</option>
                        </select>
                        <button
                          onClick={() => onDeleteTicket(t.id)}
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
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-bold text-xs">
                    Không tìm thấy yêu cầu hỗ trợ nào.
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
