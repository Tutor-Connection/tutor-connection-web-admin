import React, { useState, useMemo } from 'react';
import { TutorClass } from '../types';
import { 
  GraduationCap, 
  Calendar, 
  Eye, 
  Filter, 
  RefreshCw, 
  ChevronRight, 
  Sparkles,
  TrendingUp,
  AlertCircle,
  Clock,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

interface ClassManagementProps {
  classes: TutorClass[];
  setClasses: React.Dispatch<React.SetStateAction<TutorClass[]>>;
  searchQuery: string;
}

export default function ClassManagement({ classes, setClasses, searchQuery }: ClassManagementProps) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateRange, setDateRange] = useState('01/01/2024 - 31/12/2024');
  const [selectedClass, setSelectedClass] = useState<TutorClass | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Filter logic
  const filteredClasses = useMemo(() => {
    return classes.filter(cls => {
      const matchSearch = 
        cls.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || cls.status === statusFilter;
      
      return matchSearch && matchStatus;
    });
  }, [classes, searchQuery, statusFilter]);

  const handleStatusChange = (id: string, newStatus: TutorClass['status']) => {
    setClasses(prev => prev.map(cls => {
      if (cls.id === id) {
        return { ...cls, status: newStatus };
      }
      return cls;
    }));
    triggerToast(`Đã thay đổi trạng thái lớp ${id} thành ${newStatus}`);
  };

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleExportReport = () => {
    alert("Đã tạo báo cáo thống kê tình trạng lớp học. Đang tự động xuất file PDF...");
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Description & Top actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex text-xs text-gray-400 font-medium mb-1.5">
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span className="text-tm-primary font-semibold">Quản lý lớp học</span>
          </nav>
          <h2 className="text-2xl font-bold font-display text-gray-900 tracking-tight flex items-center gap-2">
            Quản lý lớp học
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Theo dõi và quản lý các lớp học đang diễn ra, xếp hạng, lịch giảng dạy và thử nghiệm của học sinh.
          </p>
        </div>
        <button
          onClick={handleExportReport}
          className="bg-tm-primary hover:bg-tm-primary-container text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-tm-primary/10 transition-all cursor-pointer self-start md:self-center"
        >
          <FileSpreadsheet className="size-4" />
          <span>Xuất báo cáo</span>
        </button>
      </div>

      {/* Floating Status Notification Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e293b] border border-[#f59e0b]/20 text-white rounded-xl px-5 py-3.5 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-slide-in">
          <Clock className="size-4 text-[#f59e0b]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Filters Form matching image 2 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          
          <div className="md:col-span-4">
            <label htmlFor="filter-class-status" className="block text-xs font-medium text-gray-500 mb-1.5">Lọc theo trạng thái</label>
            <select
              id="filter-class-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-tm-primary/20 focus:border-tm-primary"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="ACTIVE">ACTIVE (Đang hoạt động)</option>
              <option value="TRIAL">TRIAL (Học thử)</option>
              <option value="PENDING">PENDING (Đang chờ)</option>
              <option value="CANCELLED">CANCELLED (Hủy lớp)</option>
              <option value="COMPLETED">COMPLETED (Đã kết thúc)</option>
            </select>
          </div>

          <div className="md:col-span-5">
            <label htmlFor="filter-class-date" className="block text-xs font-medium text-gray-500 mb-1.5">Khoảng thời gian lớp hoạt động</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Calendar className="size-4" />
              </span>
              <input
                id="filter-class-date"
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder="01/01/2024 - 31/12/2024"
                className="w-full bg-gray-50 border border-gray-150 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-tm-primary/20 focus:border-tm-primary"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <button
              onClick={() => triggerToast("Đã cập nhật bộ lọc theo khoảng thời gian và trạng thái lớp")}
              className="w-full bg-[#0037b0] hover:bg-tm-primary-container text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Filter className="size-3.5" />
              <span>Áp dụng bộ lọc</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Table Layer */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-gray-500">
            <thead className="bg-[#f8faff] border-b border-gray-100 text-xs font-bold uppercase text-gray-600">
              <tr>
                <th scope="col" className="px-6 py-4 w-28">ID Lớp</th>
                <th scope="col" className="px-6 py-4">Gia Sư</th>
                <th scope="col" className="px-6 py-4">Học Viên</th>
                <th scope="col" className="px-6 py-4">Môn Học</th>
                <th scope="col" className="px-6 py-4">Học Phí</th>
                <th scope="col" className="px-6 py-4">Bắt Đầu</th>
                <th scope="col" className="px-6 py-4 text-center">Trạng Thái</th>
                <th scope="col" className="px-6 py-4 text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-sans">
              {filteredClasses.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                    Không tìm thấy lớp học nào khớp với từ khóa tìm kiếm.
                  </td>
                </tr>
              ) : (
                filteredClasses.map((cls) => (
                  <tr key={cls.id} className="hover:bg-indigo-50/10 transition-colors">
                    
                    {/* ID */}
                    <td className="px-6 py-4 font-mono font-bold text-sm text-tm-primary focus-within:underline">
                      {cls.id}
                    </td>

                    {/* Tutor Name */}
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2.5">
                        <div className="size-7 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold flex items-center justify-center border border-purple-100">
                          {cls.tutorName.split(' ')[1]?.substring(0, 2).toUpperCase() || 'GS'}
                        </div>
                        <span className="font-semibold text-gray-800 text-xs">
                          {cls.tutorName}
                        </span>
                      </div>
                    </td>

                    {/* Student Name */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-700 text-xs">{cls.studentName}</p>
                      <p className="text-[10px] text-gray-400 font-medium">Học viên TutorMatch</p>
                    </td>

                    {/* Subject badge with custom pill styling matching screenshot */}
                    <td className="px-6 py-4">
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 font-semibold px-2.5 py-0.5 rounded-lg text-xs">
                        {cls.subject}
                      </span>
                    </td>

                    {/* Fee */}
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-gray-700">
                      {cls.fee}
                    </td>

                    {/* Start Date */}
                    <td className="px-6 py-4 text-xs font-medium text-gray-500">
                      {cls.startDate}
                    </td>

                    {/* State pill */}
                    <td className="px-6 py-4 text-center">
                      {cls.status === 'ACTIVE' && (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ACTIVE
                        </span>
                      )}
                      {cls.status === 'TRIAL' && (
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-tm-primary text-[10px] font-bold px-2.5 py-1 rounded-full border border-indigo-100">
                          <span className="size-1.5 rounded-full bg-blue-500" />
                          TRIAL
                        </span>
                      )}
                      {cls.status === 'PENDING' && (
                        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-100">
                          <span className="size-1.5 rounded-full bg-amber-500" />
                          PENDING
                        </span>
                      )}
                      {cls.status === 'CANCELLED' && (
                        <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-rose-100">
                          <span className="size-1.5 rounded-full bg-rose-500" />
                          CANCELLED
                        </span>
                      )}
                      {cls.status === 'COMPLETED' && (
                        <span className="inline-flex items-center gap-1.5 bg-teal-50 text-[#0f766e] text-[10px] font-bold px-2.5 py-1 rounded-full border border-teal-150">
                          <span className="size-1.5 rounded-full bg-teal-500" />
                          COMPLETED
                        </span>
                      )}
                    </td>

                    {/* Actions tools list */}
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        
                        {/* Interactive status cyclical changer */}
                        <div className="relative group/change">
                          <button
                            onClick={() => {
                              const options: Array<TutorClass['status']> = ['ACTIVE', 'TRIAL', 'PENDING', 'CANCELLED', 'COMPLETED'];
                              const nextIndex = (options.indexOf(cls.status) + 1) % options.length;
                              handleStatusChange(cls.id, options[nextIndex]);
                            }}
                            className="p-1.5 bg-gray-50 border border-gray-200 text-gray-500 hover:text-tm-primary rounded-lg hover:border-tm-primary/50 transition-all cursor-pointer"
                            title="Xoay nhanh Trạng Thái"
                          >
                            <RefreshCw className="size-3.5" />
                          </button>
                        </div>

                        {/* Details eye */}
                        <button
                          onClick={() => setSelectedClass(cls)}
                          className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-tm-primary hover:bg-indigo-100 transition-all cursor-pointer"
                          title="Xem thông tin chi tiết"
                        >
                          <Eye className="size-3.5" />
                        </button>

                        <button
                          onClick={() => alert(`Lịch học chi tiết của ${cls.id} diễn ra vào Thứ 2-4-6 hàng tuần vào lúc 19:00.`)}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-100 text-[#0f766e] transition-all cursor-pointer"
                          title="Lịch giảng dạy & Báo cáo nghỉ học"
                        >
                          <Calendar className="size-3.5" />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer dynamic label */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium">
            Đang hiển thị <span className="font-semibold text-gray-800">1 - {filteredClasses.length}</span> trong tổng số <span className="font-semibold text-gray-800">{classes.length}</span> lớp học của hệ thống
          </p>
          <div className="flex items-center space-x-1">
            <button className="px-3 py-1 text-xs font-semibold bg-tm-primary text-white rounded-lg">1</button>
            <button className="px-3 py-1 text-xs text-gray-400 hover:bg-gray-50 rounded-lg">2</button>
            <button className="px-3 py-1 text-xs text-gray-400 hover:bg-gray-50 rounded-lg">3</button>
            <span className="px-1 text-gray-400">...</span>
            <button className="px-2.5 py-1 text-xs text-gray-400 hover:bg-gray-50 border border-gray-200 rounded-lg font-semibold">26</button>
            <button className="px-2 py-1 text-xs text-gray-400 hover:bg-gray-50 rounded-lg">Sau</button>
          </div>
        </div>
      </div>

      {/* Stats Widgets Panel under table corresponding to Screenshot 2 */}
      <div id="classes-stats-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">LỚP ĐANG DIỄN RA</span>
            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1.5">
              <TrendingUp className="size-3" />
              <span>+12%</span>
            </span>
          </div>
          <div className="mt-4">
            <span className="font-display font-extrabold text-3xl text-gray-900 leading-tight">128</span>
            <p className="text-xs text-gray-500 mt-1">Lớp học đang phát sinh hoa hồng</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">YÊU CẦU CHỜ XỬ LÝ</span>
            <span className="text-amber-600 text-[10px] font-semibold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
              Chờ xếp lớp
            </span>
          </div>
          <div className="mt-4">
            <span className="font-display font-extrabold text-3xl text-gray-900 leading-tight">15</span>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Clock className="size-3 text-amber-500" />
              <span>Cập nhật lúc 08:00</span>
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">HOÀN THÀNH THÁNG NÀY</span>
            <span className="text-tm-primary text-[10px] font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              +8+
            </span>
          </div>
          <div className="mt-4">
            <span className="font-display font-extrabold text-3xl text-gray-900 leading-tight">42</span>
            <p className="text-xs text-gray-500 mt-1">Học viên đánh giá tích cực</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between border-l-4 border-l-rose-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider text-rose-600">TRANH CHẤP / KHIẾU NẠI</span>
            <span className="bg-rose-50 text-rose-600 text-[10px] font-semibold px-2 py-0.5 rounded-lg border border-rose-100 animate-pulse">
              Cần xử lý
            </span>
          </div>
          <div className="mt-4">
            <span className="font-display font-extrabold text-3xl text-rose-600 leading-tight">3</span>
            <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
              <AlertCircle className="size-3.5 text-rose-500" />
              Danh sách khiếu nại chưa giải quyết
            </p>
          </div>
        </div>

      </div>

      {/* Class detail viewing pop modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-tm-on-surface/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
            <button
              onClick={() => setSelectedClass(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <ChevronRight className="size-4 rotate-90" />
            </button>
            <h3 className="font-display font-bold text-lg text-gray-900 flex items-center gap-1.5">
              <GraduationCap className="size-5 text-tm-primary" />
              <span>Chi tiết Lớp {selectedClass.id}</span>
            </h3>
            <div className="mt-4 space-y-3.5 border-t border-gray-100 pt-4">
              <div className="flex justify-between">
                <span className="text-xs text-gray-400 font-medium">Gia sư đảm nhận:</span>
                <span className="text-xs font-semibold text-gray-800">{selectedClass.tutorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400 font-medium">Học viên kết nối:</span>
                <span className="text-xs font-semibold text-gray-800">{selectedClass.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400 font-medium">Chương trình/Môn học:</span>
                <span className="text-xs font-semibold text-gray-800">{selectedClass.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400 font-medium">Mức học phí:</span>
                <span className="text-xs font-bold text-tm-secondary">{selectedClass.fee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-gray-400 font-medium">Ngày kích hoạt:</span>
                <span className="text-xs text-gray-600 font-mono">{selectedClass.startDate}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-250 text-xs text-gray-600">
                Lớp học này đã được đối soát hoa hồng đầy đủ cho chu kỳ tháng. Phụ huynh đánh giá 5 sao đối với học thử ban đầu.
              </div>
            </div>
            <div className="mt-5 text-right">
              <button
                onClick={() => setSelectedClass(null)}
                className="px-4 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold hover:bg-emerald-200 transition-colors cursor-pointer"
              >
                Đồng ý đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
