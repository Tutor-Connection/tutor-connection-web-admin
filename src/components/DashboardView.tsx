import React from 'react';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Zap, 
  ArrowUpRight, 
  Clock, 
  TrendingUp,
  CircleDot
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { ClassMatch } from '../types';

interface DashboardViewProps {
  classes: ClassMatch[];
  onNavigateTab: (tab: string) => void;
  usersCount: number;
}

const REVENUE_DATA = [
  { name: 'T1', revenue: 420 },
  { name: 'T2', revenue: 510 },
  { name: 'T3', revenue: 480 },
  { name: 'T4', revenue: 640 },
  { name: 'T5', revenue: 720 },
  { name: 'T6', revenue: 850 },
];

const SUBJECT_POPULARITY_DATA = [
  { name: 'Toán giải tích', value: 35, color: '#005cf5' },
  { name: 'Vật lý đại cương', value: 25, color: '#fd761a' },
  { name: 'Tiếng Anh IELTS', value: 20, color: '#008a5a' },
  { name: 'Hóa học hữu cơ', value: 12, color: '#a855f7' },
  { name: 'Môn học khác', value: 8, color: '#64748b' },
];

export default function DashboardView({ classes, onNavigateTab, usersCount }: DashboardViewProps) {
  
  const stats = [
    { 
      title: 'Tổng Người Dùng', 
      value: '12,482', 
      change: '+12.5%', 
      isPositive: true,
      icon: Users,
      colorClass: 'bg-brand-primary-50 text-brand-primary-600 border-brand-primary-100'
    },
    { 
      title: 'Lớp Học Hoạt Động', 
      value: '1,240', 
      change: '+8.2%', 
      isPositive: true,
      icon: BookOpen,
      colorClass: 'bg-brand-orange-50 text-brand-orange-500 border-brand-orange-100'
    },
    { 
      title: 'Doanh Thu Tháng', 
      value: '850M VNĐ', 
      change: '+18.4%', 
      isPositive: true,
      icon: DollarSign,
      colorClass: 'bg-brand-green-50 text-brand-green-500 border-brand-green-100'
    },
    { 
      title: 'Tỷ Lệ Kết Nối', 
      value: '94.2%', 
      change: '+2.1%', 
      isPositive: true,
      icon: Zap,
      colorClass: 'bg-purple-50 text-purple-600 border-purple-100'
    },
  ];

  return (
    <div id="dashboardView" className="space-y-8 animate-fadeIn font-sans">
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-brand-primary-600 font-bold uppercase tracking-widest block mb-1">Cơ sở dữ liệu miền trung</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Hello, Admin</h1>
          <p className="text-slate-500 text-sm font-medium">Báo cáo tình trạng hệ thống TutorMatch hôm nay</p>
        </div>
        
        {/* System Health Status Indicator */}
        <div className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm self-start">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-green-500"></span>
          </span>
          <div>
            <span className="text-xs font-extrabold text-slate-800 block leading-none">Hệ thống: Hoạt động ổn định</span>
            <span className="text-[10px] text-slate-400 font-mono block mt-1">CPU: 18% | PING: 12ms</span>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const StatIcon = stat.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.colorClass}`}>
                  <StatIcon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-extrabold py-1 px-2.5 rounded-full ${
                  stat.isPositive ? 'bg-brand-green-50 text-brand-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block mb-1">
                {stat.title}
              </span>
              <span className="text-2xl font-extrabold text-[#0f172a] tracking-tight">
                {stat.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Charts section matching Image 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Growth Bar chart (Span 2) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-950">Doanh Thu Tăng Trưởng (M VNĐ)</h3>
              <p className="text-slate-400 text-xs font-medium">Lịch sử thống kê nửa năm qua</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-brand-primary-500" />
              Tăng 18.4%
            </div>
          </div>
          
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ background: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  labelStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                  itemStyle={{ fontSize: '12px', color: '#38bdf8' }}
                />
                <Bar dataKey="revenue" fill="#005cf5" radius={[6, 6, 0, 0]} barSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Subjects doughnut chart (Span 1) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <h3 className="text-lg font-extrabold text-slate-950">Môn Học Phổ Biến</h3>
            <p className="text-slate-400 text-xs font-medium">Tỷ lệ nhu cầu theo lớp học hoạt động</p>
          </div>

          <div className="h-[220px] w-full relative flex items-center justify-center mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SUBJECT_POPULARITY_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {SUBJECT_POPULARITY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ background: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  itemStyle={{ fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Center Text of Doughnut */}
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-extrabold text-slate-900 leading-none">1,240</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Lớp Đang Dạy</span>
            </div>
          </div>

          {/* Custon Legends for clarity */}
          <div className="space-y-2 mt-4">
            {SUBJECT_POPULARITY_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                </div>
                <span className="text-slate-900 font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Classes section matching Image 5 footer table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-slate-950">Lớp Học Vừa Kết Nối</h3>
            <p className="text-slate-400 text-xs font-medium">Lịch sử kết nối tự động bằng cơ chế matching AI</p>
          </div>
          <button 
            onClick={() => onNavigateTab('classes')}
            className="text-xs font-bold text-brand-primary-600 hover:text-brand-primary-700 flex items-center gap-1 cursor-pointer"
          >
            Xem tất cả lớp học
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="py-4 px-5">ID</th>
                <th className="py-4 px-5">Gia sư</th>
                <th className="py-4 px-5">Học viên</th>
                <th className="py-4 px-5">Môn học</th>
                <th className="py-4 px-5">Học phí / Buổi</th>
                <th className="py-4 px-5">Ngày ghép</th>
                <th className="py-4 px-5">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classes.slice(0, 4).map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 text-xs font-medium text-slate-700 transition">
                  <td className="py-4 px-5 font-mono text-slate-400">{c.id}</td>
                  <td className="py-4 px-5 font-bold text-slate-900">{c.tutorName}</td>
                  <td className="py-4 px-5 text-slate-600">{c.studentName}</td>
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg text-[10px] font-bold">
                      {c.subjectName}
                    </span>
                  </td>
                  <td className="py-4 px-5 font-bold text-slate-900">
                    {c.fee.toLocaleString()}đ
                  </td>
                  <td className="py-4 px-5 text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      {c.date}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        c.status === 'Active' 
                          ? 'bg-brand-primary-50 text-brand-primary-600' 
                          : c.status === 'Pending'
                            ? 'bg-brand-orange-50 text-brand-orange-500'
                            : c.status === 'Completed'
                              ? 'bg-brand-green-50 text-brand-green-500'
                              : 'bg-red-50 text-red-600'
                      }`}>
                        <CircleDot className="w-2.5 h-2.5" />
                        {c.status === 'Active' ? 'Đang Dạy' : c.status === 'Pending' ? 'Đang Chờ' : c.status === 'Completed' ? 'Hoàn Tất' : 'Hủy bỏ'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
