import React from 'react';
import { ShieldAlert, BookOpen, GraduationCap, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface WelcomeViewProps {
  onSelectRole: (role: 'Admin' | 'Tutor' | 'Student') => void;
  onLogout: () => void;
  userRole: 'Admin' | 'Tutor' | 'Student';
}

export default function WelcomeView({ onSelectRole, onLogout, userRole }: WelcomeViewProps) {
  return (
    <div id="welcomePage" className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-6 sm:px-12 md:px-16 font-sans">
      {/* Top logo */}
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-brand-primary-600 flex items-center justify-center text-white shadow">
            <span className="font-extrabold text-base">T</span>
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-brand-primary-900">TutorMatch</span>
            <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-wider">Education Hub</span>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl border border-slate-200 transition duration-150 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Đăng xuất
        </button>
      </div>

      {/* Main selection content */}
      <div className="max-w-5xl mx-auto w-full my-auto text-center">
        <div className="mb-12">
          <span className="px-3.5 py-1.5 bg-brand-primary-50 text-brand-primary-700 text-xs font-bold rounded-full border border-brand-primary-100 uppercase tracking-widest inline-block mb-3.5">
            Cổng Kết Nối Phân Vai
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Chào mừng bạn đến với TutorMatch
          </h1>
          <p className="text-slate-500 font-medium text-base max-w-xl mx-auto">
            Hệ thống cơ sở dữ liệu kết nối thông minh dành cho Đơn vị Quản trị viên, Đội ngũ Gia sư và Học sinh miền Trung.
          </p>
        </div>

        {/* Roles Grid - matches Image 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
          {/* Admin Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col justify-between relative group">
            {userRole === 'Admin' && (
              <div className="absolute top-4 right-4 bg-brand-primary-100 text-brand-primary-700 p-1 rounded-full border border-brand-primary-200">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
            <div className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary-50 flex items-center justify-center text-brand-primary-600 mb-6 group-hover:scale-110 transition duration-300">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hệ thống Quản Trị</h3>
              <p className="text-slate-400 text-xs font-semibold mb-3 uppercase tracking-wider">Super Administrator</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Truy cập toàn bộ chức năng kiểm duyệt, duyệt tài liệu KYC, thay đổi danh mục môn học, phân tích bản đồ mật độ nhu cầu.
              </p>
            </div>
            <div className="p-8 pt-0">
              <button
                onClick={() => onSelectRole('Admin')}
                className="w-full py-3 px-4 bg-brand-primary-600 hover:bg-brand-primary-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-primary-500/10 cursor-pointer transition uppercase"
              >
                Access Console
              </button>
            </div>
          </div>

          {/* Tutor Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col justify-between relative group">
            {userRole === 'Tutor' && (
              <div className="absolute top-4 right-4 bg-brand-orange-100 text-brand-orange-600 p-1 rounded-full border border-brand-orange-50">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
            <div className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-brand-orange-50 flex items-center justify-center text-brand-orange-500 mb-6 group-hover:scale-110 transition duration-300">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Trung tâm Gia Sư</h3>
              <p className="text-brand-orange-600 text-xs font-semibold mb-3 uppercase tracking-wider">Professional Tutor</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Theo dõi lớp học ghép đôi, kiểm tra trạng thái xác minh hồ sơ tư pháp, rút hoa hồng, cập nhật kỹ năng chuyên môn giảng dạy.
              </p>
            </div>
            <div className="p-8 pt-0">
              <button
                onClick={() => onSelectRole('Tutor')}
                className="w-full py-3 px-4 bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-orange-500/10 cursor-pointer transition uppercase"
              >
                Access Dashboard
              </button>
            </div>
          </div>

          {/* Student Card */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col justify-between relative group">
            {userRole === 'Student' && (
              <div className="absolute top-4 right-4 bg-brand-green-100 text-brand-green-500 p-1 rounded-full border border-brand-green-50">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
            <div className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-brand-green-50 flex items-center justify-center text-brand-green-500 mb-6 group-hover:scale-110 transition duration-300">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Hồ sơ Học Viên</h3>
              <p className="text-brand-green-600 text-xs font-semibold mb-3 uppercase tracking-wider">Student & Parent</p>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Đặt lịch, tìm kiếm các môn học thuộc khoa tự nhiên hữu cơ lý thuyết, kết nối trực tiếp đến gia sư uy tín được phê duyệt.
              </p>
            </div>
            <div className="p-8 pt-0">
              <button
                onClick={() => onSelectRole('Student')}
                className="w-full py-3 px-4 bg-brand-green-500 hover:bg-brand-green-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-green-500/10 cursor-pointer transition uppercase"
              >
                Access Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="max-w-5xl mx-auto w-full text-center mt-12 pt-6 border-t border-slate-100">
        <p className="text-xs text-slate-400 font-medium font-mono">
          &copy; 2026 TutorMatch Core System Admin v4.2.0 • Secured TLS 1.3
        </p>
      </div>
    </div>
  );
}
