import React, { useState } from 'react';
import { Save, ShieldCheck, Database, Key, Server, ToggleLeft, ToggleRight } from 'lucide-react';

export default function SettingsView() {
  const [commission, setCommission] = useState(15);
  const [systemAutoVerify, setSystemAutoVerify] = useState(false);
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Cài Đặt Hệ Thống</h1>
        <p className="text-slate-500 text-sm font-medium">Cấu hình các tham số vận hành lõi, cổng thanh toán và bảo mật tài khoản quản trị viên.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Param settings (Span 2) */}
        <form onSubmit={handleSave} className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
          <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
            <Server className="w-5.5 h-5.5 text-brand-primary-600" />
            <div>
              <h3 className="text-base font-extrabold text-slate-950">Chỉ số vận hành lõi</h3>
              <p className="text-slate-400 text-xs font-semibold">Điều chỉnh các cơ chế chiết khấu và tự động của TutorMatch</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Commission Rate Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-widest">Tỷ lệ hoa hồng kết nối (% Phí lớp học)</label>
                <span className="text-sm font-extrabold text-brand-primary-600 font-mono">{commission}% / Giao dịch</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="30" 
                value={commission}
                onChange={(e) => setCommission(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-primary-600"
              />
              <p className="text-[10px] text-slate-400 font-medium mt-1">Hệ thống áp dụng tự động khấu trừ khi phụ huynh chuyển khoản hoàn tất thông tin.</p>
            </div>

            {/* Verification Toggles */}
            <div className="flex items-center justify-between py-3 border-t border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-widest block">Tự động gợi ý kiểm duyệt bằng AI</span>
                <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Sử dụng Google Vision để phân tích trùng khớp họ tên trên CCCD và Thẻ sinh viên.</span>
              </div>
              <button 
                type="button"
                onClick={() => setSystemAutoVerify(!systemAutoVerify)}
                className="text-brand-primary-600 focus:outline-none cursor-pointer"
              >
                {systemAutoVerify ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
              </button>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <div>
                <span className="text-xs font-bold text-slate-800 uppercase tracking-widest block">Yêu cầu xác thực hai lớp (Admin MFA)</span>
                <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">Bắt buộc sử dụng Authenticator app hoặc vân tay sinh trắc để đăng nhập Console.</span>
              </div>
              <button 
                type="button"
                onClick={() => setMfaEnabled(!mfaEnabled)}
                className="text-brand-primary-600 focus:outline-none cursor-pointer"
              >
                {mfaEnabled ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10 text-slate-300" />}
              </button>
            </div>
          </div>

          {success && (
            <div className="p-3 bg-brand-green-50 rounded-xl border border-brand-green-100 text-brand-green-600 text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4.5 h-4.5" />
              Đã lưu thay đổi cấu hình cổng quản trị thành công!
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button 
              type="submit"
              className="px-4 py-2 bg-brand-primary-600 hover:bg-brand-primary-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow transition"
            >
              <Save className="w-4 h-4" />
              Lưu cấu hình
            </button>
          </div>
        </form>

        {/* Database Diagnostic logs (Span 1) */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Database className="w-5 h-5 text-purple-600" />
            <h3 className="text-sm font-extrabold text-slate-950">Chẩn đoán Database</h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex justify-between items-center font-medium">
              <span className="text-slate-500">Dung lượng ổ đĩa:</span>
              <strong className="text-slate-900 font-mono">1.24 GB / 10 GB</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex justify-between items-center font-medium">
              <span className="text-slate-500">Phiên bản PostgreSQL:</span>
              <strong className="text-slate-900 font-mono">v16.2 Enterprise</strong>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl flex justify-between items-center font-medium">
              <span className="text-slate-500">Cổng bảo mật SSL:</span>
              <strong className="text-brand-green-600 font-bold uppercase">Mã hóa AES-256</strong>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl text-[10px] text-slate-300 font-mono space-y-1 block border border-white/5 shadow-inner">
            <span className="text-brand-orange-500 font-bold block mb-1">PROD TERMINAL SYSTEM LOGS</span>
            <p>[15:45:10] admin_session initiated (IP: 192.168.1.10)</p>
            <p>[15:45:12] MBBank gateway ping succeeded: 15ms</p>
            <p>[15:46:01] database matching matrix routine completed successfully in 0.45s</p>
          </div>
        </div>

      </div>
    </div>
  );
}
