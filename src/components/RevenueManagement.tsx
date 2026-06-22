import React, { useState, useMemo } from 'react';
import { CommissionPayment } from '../types';
import { Wallet, Landmark, ArrowUpRight, ArrowDownRight, Check, AlertTriangle, Calendar, FileDown, Plus } from 'lucide-react';

interface RevenueProps {
  payments: CommissionPayment[];
  setPayments: React.Dispatch<React.SetStateAction<CommissionPayment[]>>;
  searchQuery: string;
}

export default function RevenueManagement({ payments, setPayments, searchQuery }: React.PropsWithChildren<RevenueProps>) {
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    tutorName: '',
    studentName: '',
    tuition: 500,
    commissionRate: 12,
    dueDate: '2024-06-25'
  });

  const totalTuition = useMemo(() => payments.reduce((sum, p) => sum + p.tuition, 0), [payments]);
  const totalCommission = useMemo(() => payments.reduce((sum, p) => sum + p.commissionAmount, 0), [payments]);
  const paidCommission = useMemo(() => payments.filter(p => p.status === 'PAID').reduce((sum, p) => sum + p.commissionAmount, 0), [payments]);
  const pendingCommission = useMemo(() => payments.filter(p => p.status === 'PENDING').reduce((sum, p) => sum + p.commissionAmount, 0), [payments]);

  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const matchSearch =
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.studentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = filterStatus === 'ALL' || p.status === filterStatus;
      
      return matchSearch && matchStatus;
    });
  }, [payments, searchQuery, filterStatus]);

  const handleToggleStatus = (id: string) => {
    setPayments(prev => prev.map(p => {
      if (p.id === id) {
        let nextStatus: CommissionPayment['status'] = 'PENDING';
        if (p.status === 'PENDING') nextStatus = 'PAID';
        else if (p.status === 'PAID') nextStatus = 'OVERDUE';
        else nextStatus = 'PAID';
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const handleAddNewCommission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayment.tutorName || !newPayment.studentName) {
      alert("Vui lòng điện đầy đủ thông tin gia sư và học sinh");
      return;
    }
    const amount = Math.round((newPayment.tuition * newPayment.commissionRate) / 100);
    const added: CommissionPayment = {
      id: `#TM-9${Math.floor(100 + Math.random() * 900)}`,
      tutorName: newPayment.tutorName,
      studentName: newPayment.studentName,
      tuition: Number(newPayment.tuition),
      commissionRate: Number(newPayment.commissionRate),
      commissionAmount: amount,
      dueDate: newPayment.dueDate,
      status: 'PENDING'
    };
    setPayments(prev => [added, ...prev]);
    setShowAddForm(false);
    setNewPayment({ tutorName: '', studentName: '', tuition: 500, commissionRate: 12, dueDate: '2024-06-25' });
  };

  return (
    <div className="space-y-6">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex text-xs text-gray-400 font-medium mb-1.5">
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span className="text-tm-primary font-semibold">Quản lý doanh thu</span>
          </nav>
          <h2 className="text-2xl font-bold font-display text-gray-900 tracking-tight flex items-center gap-2">
            Quản lý doanh thu & Hoa hồng
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Theo dõi dòng tiền học phí, tỷ lệ trích hoa hồng TutorMatch và trạng thái đóng tiền từ gia sư.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-[#0037b0] hover:bg-tm-primary-container text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all"
          >
            <Plus className="size-4" />
            <span>Thêm hóa đơn</span>
          </button>
          <button
            onClick={() => alert("Đã xuất danh sách sao kê tài chính PDF thành công!")}
            className="bg-indigo-50 hover:bg-indigo-100 text-tm-primary text-xs font-semibold px-4 py-2.5 rounded-xl border border-indigo-100 flex items-center gap-2 transition-all"
          >
            <FileDown className="size-4" />
            <span>Sao kê</span>
          </button>
        </div>
      </div>

      {/* Grid containing core finance states */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Tuition Card */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">TỔNG GIAO DỊCH</span>
            <span className="font-display font-extrabold text-2xl text-gray-900 block mt-2">
              ${totalTuition.toLocaleString()} USD
            </span>
            <span className="text-[10px] text-gray-400 font-medium mt-1 inline-block">Mức học phí lưu chuyển</span>
          </div>
          <div className="size-11 rounded-xl bg-indigo-50 text-tm-primary flex items-center justify-center">
            <Landmark className="size-5" />
          </div>
        </div>

        {/* Total Commission rate */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">HOA HỒNG HỆ THỐNG</span>
            <span className="font-display font-extrabold text-2xl text-tm-primary block mt-2">
              ${totalCommission.toLocaleString()} USD
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-flex items-center gap-0.5">
              <ArrowUpRight className="size-3" /> Thu về bình quân 12.5%
            </span>
          </div>
          <div className="size-11 rounded-xl bg-amber-50 text-tm-secondary flex items-center justify-center">
            <Wallet className="size-5" />
          </div>
        </div>

        {/* Paid Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">ĐÃ ĐỐI SOÁT</span>
            <span className="font-display font-extrabold text-2xl text-emerald-600 block mt-2">
              ${paidCommission.toLocaleString()} USD
            </span>
            <span className="text-[10px] text-gray-400 font-medium mt-1 inline-block">Lợi nhuận ròng thực nhận</span>
          </div>
          <div className="size-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Check className="size-5" />
          </div>
        </div>

        {/* Unpaid Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">GIAO DỊCH CHỜ DUYỆT</span>
            <span className="font-display font-extrabold text-2xl text-amber-500 block mt-2">
              ${pendingCommission.toLocaleString()} USD
            </span>
            <span className="text-[10px] text-gray-400 font-medium mt-1 inline-block">Số dư hoa hồng đang giữ hàng</span>
          </div>
          <div className="size-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <AlertTriangle className="size-5" />
          </div>
        </div>

      </div>

      {/* Add commission dialogue */}
      {showAddForm && (
        <form onSubmit={handleAddNewCommission} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4 animate-in slide-in-from-top-3 duration-200">
          <h4 className="font-display font-bold text-sm text-gray-800">Tạo Yêu Cầu Thu Phí Lớp Học Mới</h4>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label htmlFor="input-new-tutor" className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Tên Gia Sư</label>
              <input
                id="input-new-tutor"
                type="text"
                placeholder="Ví dụ: Elena Rodriguez"
                value={newPayment.tutorName}
                onChange={(e) => setNewPayment({ ...newPayment, tutorName: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-gray-700"
                required
              />
            </div>
            <div>
              <label htmlFor="input-new-student" className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Tên Học Viên</label>
              <input
                id="input-new-student"
                type="text"
                placeholder="Ví dụ: Tommy L."
                value={newPayment.studentName}
                onChange={(e) => setNewPayment({ ...newPayment, studentName: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-gray-700"
                required
              />
            </div>
            <div>
              <label htmlFor="input-new-tuition" className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Học Phí ($)</label>
              <input
                id="input-new-tuition"
                type="number"
                value={newPayment.tuition}
                onChange={(e) => setNewPayment({ ...newPayment, tuition: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-gray-700"
                required
              />
            </div>
            <div>
              <label htmlFor="input-new-commission" className="block text-[10px] uppercase font-bold text-gray-400 mb-1">Tỷ lệ trích (%)</label>
              <input
                id="input-new-commission"
                type="number"
                value={newPayment.commissionRate}
                onChange={(e) => setNewPayment({ ...newPayment, commissionRate: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs text-gray-700"
                required
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Tạo Ngay
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-500 font-semibold px-2 py-1.5 rounded-lg text-xs"
              >
                Hủy
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Table controls */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Table header control tabs */}
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <span className="font-display font-semibold text-sm text-gray-800">Danh Sách Đối Soát Phiên Giao Dịch</span>
          <div className="flex items-center space-x-1">
            {['ALL', 'PAID', 'PENDING', 'OVERDUE'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                  filterStatus === status 
                    ? 'bg-tm-primary text-white' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {status === 'ALL' ? 'Tất cả' : status}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-gray-500">
            <thead className="bg-[#f8faff] text-xs font-bold uppercase text-gray-600 border-b border-gray-100">
              <tr>
                <th scope="col" className="px-6 py-4 w-32">Mã Giao Dịch</th>
                <th scope="col" className="px-6 py-4">Gia Sư Đóng</th>
                <th scope="col" className="px-6 py-4">Học Viên Liên Kết</th>
                <th scope="col" className="px-6 py-4">Học Phí Lớp</th>
                <th scope="col" className="px-6 py-4 text-center">Tỷ Lệ</th>
                <th scope="col" className="px-6 py-4">Doanh Thu Thu Về</th>
                <th scope="col" className="px-6 py-4">Hạn Thanh Toán</th>
                <th scope="col" className="px-6 py-4 text-center">Trạng Thái</th>
                <th scope="col" className="px-6 py-4 text-center">Đổi Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-sans">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-indigo-50/5 transition-colors">
                  
                  {/* ID */}
                  <td className="px-6 py-4 font-mono text-xs font-bold text-gray-400">
                    {p.id}
                  </td>

                  {/* Tutor */}
                  <td className="px-6 py-4 font-semibold text-gray-800 text-xs">
                    {p.tutorName}
                  </td>

                  {/* Student */}
                  <td className="px-6 py-4 text-gray-600 text-xs text-medium">
                    {p.studentName}
                  </td>

                  {/* Tuition */}
                  <td className="px-6 py-4 font-mono text-xs text-gray-600">
                    ${p.tuition} USD
                  </td>

                  {/* Rate */}
                  <td className="px-6 py-4 font-mono text-xs text-center font-bold text-gray-400">
                    {p.commissionRate}%
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-mono text-xs font-bold text-tm-secondary">
                    ${p.commissionAmount} USD
                  </td>

                  {/* Grace period */}
                  <td className="px-6 py-4 text-xs font-medium text-gray-500">
                    {p.dueDate}
                  </td>

                  {/* Status Badging */}
                  <td className="px-6 py-4 text-center">
                    {p.status === 'PAID' && (
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-100">
                        ĐÃ THU
                      </span>
                    )}
                    {p.status === 'PENDING' && (
                      <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-amber-100">
                        CHỜ ĐÓNG
                      </span>
                    )}
                    {p.status === 'OVERDUE' && (
                      <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-md border border-rose-100">
                        QUÁ HẠN
                      </span>
                    )}
                  </td>

                  {/* Quick Toggle Action */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(p.id)}
                      className="text-xs bg-gray-50 border border-gray-200 hover:border-tm-primary text-gray-600 hover:text-tm-primary px-3 py-1 rounded-lg transition-colors cursor-pointer"
                      title="Chuyển chu kỳ trạng thái hóa đơn"
                    >
                      Xoay
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Visual Charting Representation matching standard analytics dashboards */}
      <div id="revenue-visual-bar" className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
        <div>
          <h4 className="font-display font-semibold text-sm text-gray-800">Biểu đồ ước tính dòng tiền hoa hồng hàng tháng</h4>
          <p className="text-[11px] text-gray-400">Thu thập dữ liệu doanh thu dựa trên lịch học của 6 tháng gần nhất</p>
        </div>
        <div className="grid grid-cols-6 gap-4 h-48 items-end pt-6 px-4">
          {[
            { month: 'Tháng 1', amt: 450, color: 'bg-tm-primary/80' },
            { month: 'Tháng 2', amt: 580, color: 'bg-indigo-600/80' },
            { month: 'Tháng 3', amt: 390, color: 'bg-indigo-400/80' },
            { month: 'Tháng 4', amt: 720, color: 'bg-tm-primary/95' },
            { month: 'Tháng 5', amt: 850, color: 'bg-gradient-to-t from-tm-primary to-indigo-500' },
            { month: 'Tháng 6', amt: 940, color: 'bg-tm-primary' },
          ].map((bar, index) => (
            <div key={index} className="flex flex-col items-center gap-2 group">
              <span className="text-[10px] font-mono font-bold text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                ${bar.amt}
              </span>
              <div 
                className={`w-full rounded-t-lg transition-all duration-300 group-hover:scale-x-[1.05] shadow-inner ${bar.color}`}
                style={{ height: `${(bar.amt / 1000) * 120}px` }}
              />
              <span className="text-[10px] font-semibold text-gray-400 font-display">{bar.month}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
