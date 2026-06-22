import React, { useState } from 'react';
import { BarChart3, TrendingUp, HelpCircle, FileDown, Activity, Sparkles, Filter, CheckCircle } from 'lucide-react';

export default function ReportsAndStats() {
  const [reportType, setReportType] = useState('HOA_HONG');
  const [dateRange, setDateRange] = useState('Q2-2024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);

  const stats = [
    { label: 'Doanh Số Commission', value: '$2,480', sub: 'Thực nhận chu kỳ Q2', pct: '+14%', color: 'text-tm-primary' },
    { label: 'Tỷ Lệ Kết Nối Thành Công', value: '84.2%', sub: 'Tăng 3.1% từ Q1', pct: '+3.1%', color: 'text-emerald-600' },
    { label: 'Tổng Tin Tuyển Mới', value: '254 tin', sub: 'Đóng/Mở linh hoạt', pct: '+8%', color: 'text-indigo-600' },
    { label: 'Đánh Giá Giáo Viên', value: '4.85 ★', sub: 'Xét trên 120 lời bình', pct: '+0.1%', color: 'text-amber-600' }
  ];

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGeneratedResult(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResult(`
CHÚ THÍCH BÁO CÁO PHÂN TÍCH - CHU KỲ ${dateRange.toUpperCase()}
----------------------------------------------------
1. ĐĂNG BÀI & KẾT NỐI:
Tổng số bài đăng mới tiếp nhận là 254 tin. Hệ thống tự động ghép đôi (Matching Engine) khớp nối 128 lớp học thử, đạt tỷ lệ kết nối 84.2% lý tưởng.

2. DOANH THU HOA HỒNG:
Phát sinh tổng hoa hồng phải thu ước đạt $2,480 USD. Hiện tại đã đối soát hoàn tất $1,540 USD (62%), còn lại $940 USD đang trong hạn thu phí.

3. KIỂM DUYỆT & LỌC SPAM:
AI Spam Filter đã chặn đứng 14 nỗ lực công khai SĐT hiển thị trái phép. Tỷ lệ mâu thuẫn đánh giá tích cực/1 sao giảm đáng kể 45% nhờ cập nhật UI cảnh báo nhầm lẫn của học viên.

Khuyến nghị quản trị: Đẩy mạnh quảng bá các gói Gia Sư Premium trong học kỳ tới để tối ưu KPI doanh số hoa hồng đại lý đạt mức mục tiêu đề ra tại khu vực phía Bắc.
      `);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex text-xs text-gray-400 font-medium mb-1.5">
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span className="text-tm-primary font-semibold">Báo cáo & Thống kê</span>
          </nav>
          <h2 className="text-2xl font-bold font-display text-gray-900 tracking-tight flex items-center gap-2">
            Báo cáo & Thống kê thông minh
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Tổng hợp dữ liệu hiệu suất vận hành hệ thống, biến động doanh thu, kết quả matching kết nối gia sư dạy kèm.
          </p>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-wider">
              <span>{s.label}</span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-0.5">
                <TrendingUp className="size-3" />
                <span>{s.pct}</span>
              </span>
            </div>
            <div className="mt-4">
              <span className={`font-display font-extrabold text-2xl ${s.color} block`}>{s.value}</span>
              <p className="text-[10px] text-gray-500 mt-1 font-medium">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Reports workspace container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column form generator */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-1.5 text-gray-800 font-display font-bold text-sm">
            <BarChart3 className="size-4.5 text-tm-primary" />
            <span>Tham số xuất báo cáo</span>
          </div>

          <form onSubmit={handleCreateReport} className="space-y-4">
            
            <div>
              <label htmlFor="report-type-select" className="block text-xs font-medium text-gray-500 mb-1.5">Loại nội dung rà soát chính</label>
              <select
                id="report-type-select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-sm text-gray-700"
              >
                <option value="HOA_HONG">Đối soát Hoa hồng & Công nợ</option>
                <option value="KET_NOI">Hiệu suất và Tỷ lệ ghép lớp học viên</option>
                <option value="SPAM">Báo cáo Kiểm duyệt từ khóa & Spam</option>
              </select>
            </div>

            <div>
              <label htmlFor="report-period-select" className="block text-xs font-medium text-gray-500 mb-1.5">Mốc chu kỳ thời gian</label>
              <select
                id="report-period-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-sm text-gray-700"
              >
                <option value="Tháng 5">Tháng này (5/2024)</option>
                <option value="Q1-2024">Quý 1 năm 2024</option>
                <option value="Q2-2024">Quý 2 năm 2024 (Hiện tại)</option>
                <option value="Toàn khóa">Toàn bộ lịch sử hệ thống</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className={`w-full py-2.5 rounded-xl text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isGenerating ? 'bg-indigo-350 cursor-wait' : 'bg-tm-primary hover:bg-tm-primary-container shadow-md'
              }`}
            >
              <Activity className="size-3.5 animate-spin" style={{ display: isGenerating ? 'inline' : 'none' }} />
              <span>{isGenerating ? 'Đang tổng hợp dữ liệu...' : 'Khởi tạo báo cáo ngay'}</span>
            </button>

          </form>
        </div>

        {/* Right column result terminal layout */}
        <div className="lg:col-span-8 bg-[#1e293b] rounded-2xl border border-gray-800 p-6 shadow-2xl relative text-left">
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-mono">Report Generator Active</span>
          </div>

          <h3 className="text-gray-200 font-display font-semibold text-xs uppercase tracking-wider mb-4 text-left">
            KÊNH TRỰC QUAN GIAO DIỆN BÁO CÁO CÔNG VIỆC
          </h3>

          {generatedResult ? (
            <div className="space-y-4 animate-in fade-in duration-200">
              <pre className="text-xs text-emerald-300 font-mono leading-relaxed whitespace-pre-wrap select-all bg-[#0f172a] p-4 rounded-xl border border-gray-800 text-left">
                {generatedResult}
              </pre>
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => {
                    alert("Đang định đạng file in PDF. Đồng thời gửi bản sao tới Email admin@tutormatch.vn.");
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileDown className="size-3.5" />
                  Xuất file báo cáo
                </button>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center space-y-3">
              <HelpCircle className="size-10 text-slate-600 mx-auto" />
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Chưa có báo cáo nào được kết xuất. Vui lòng nhấn vào nút <span className="text-indigo-400 font-bold">"Khởi tạo báo cáo ngay"</span> ở khung lọc bên cạnh để ra kết quả tức thì.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
