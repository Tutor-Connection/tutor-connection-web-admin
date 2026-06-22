import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { DollarSign, ArrowUpRight, TrendingUp, CheckCircle } from 'lucide-react';

const REVENUE_DATA = [
  { name: 'Tháng 1', income: 420 },
  { name: 'Tháng 2', income: 512 },
  { name: 'Tháng 3', income: 480 },
  { name: 'Tháng 4', income: 640 },
  { name: 'Tháng 5', income: 720 },
  { name: 'Tháng 6', income: 850 },
];

export default function RevenueView() {
  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Thống Kê Tài Chính</h1>
          <p className="text-slate-500 text-sm font-medium font-sans">Phân tích sao kê dòng tiền chuyển khoản học phí, chiết khấu hoa hồng và giải ngân gia sư.</p>
        </div>
        
        <div className="bg-white border border-slate-100 p-4 rounded-2xl text-right self-start">
          <span className="text-slate-400 text-[10px] block font-bold uppercase mb-1">Doanh thu tích lũy năm nay</span>
          <span className="text-2xl font-extrabold text-brand-green-500 font-mono">3,622M VNĐ</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Income Chart (Span 2) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-950 font-sans">Xu hướng dòng tiền hoa hồng</h3>
              <p className="text-slate-400 text-xs font-semibold">Tỷ lệ tăng trưởng doanh thu ròng tích trữ</p>
            </div>
            <div className="bg-brand-green-50 text-brand-green-600 border border-brand-green-150 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              Tăng 18.2%
            </div>
          </div>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#008a5a" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#008a5a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={11} stroke="#94a3b8" tickLine={false} axisLine={false} />
                <YAxis fontSize={11} stroke="#94a3b8" tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="income" stroke="#008a5a" strokeWidth={2.5} fillOpacity={1} fill="url(#colorInc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bank statement panel (Span 1) */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-slate-950 font-sans">Cổng liên kết MBBank Pay</h3>
          <p className="text-slate-400 text-xs font-semibold">Giao dịch thu nhận tự động thời gian thực</p>

          <div className="space-y-3">
            {[
              { label: 'Nguyễn Văn Minh nộp hoa hồng', amount: '+750,000đ', time: '14:35', status: 'Success' },
              { label: 'Phụ huynh Phạm Hùng Sơn nộp toán học', amount: '+3,000,000đ', time: '12:10', status: 'Success' },
              { label: 'Gia sư Nguyễn Thu Hà rút hoa hồng', amount: '-1,200,000đ', time: '11:15', status: 'Success' },
              { label: 'Phụ huynh Trần Thị Lan nộp học phí lý', amount: '+2,500,000đ', time: '09:40', status: 'Success' }
            ].map((st, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex justify-between items-center text-xs font-semibold">
                <div>
                  <span className="text-slate-900 block truncate max-w-[170px]">{st.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{st.time} hôm nay</span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className={`font-mono font-bold ${st.amount.startsWith('+') ? 'text-brand-green-600' : 'text-brand-orange-500'}`}>{st.amount}</span>
                  <span className="text-[9px] text-[#007048] font-extrabold block mt-0.5">Thành công</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
