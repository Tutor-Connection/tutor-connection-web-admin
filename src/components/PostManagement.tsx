import React, { useState, useMemo } from 'react';
import { TutorPost } from '../types';
import { Check, X, Eye, FileDown, Trash2, FilterX, HelpCircle, Sparkles } from 'lucide-react';

interface PostManagementProps {
  posts: TutorPost[];
  setPosts: React.Dispatch<React.SetStateAction<TutorPost[]>>;
  searchQuery: string;
}

export default function PostManagement({ posts, setPosts, searchQuery }: PostManagementProps) {
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [approvalFilter, setApprovalFilter] = useState('ALL');
  const [selectedPost, setSelectedPost] = useState<TutorPost | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return { ...post, approval: 'APPROVED' };
      }
      return post;
    }));
    triggerAlert(`Đã duyệt chấp thuận nội dung bài đăng ${id}`);
  };

  const handleReject = (id: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return { ...post, approval: 'REJECTED' };
      }
      return post;
    }));
    triggerAlert(`Đã từ chối kiểm duyệt và hạ bài đăng ${id}`);
  };

  const handleDelete = (id: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài đăng ${id} này không?`)) {
      setPosts(prev => prev.filter(post => post.id !== id));
      triggerAlert(`Đã xóa hoàn toàn bài đăng ${id} ra khỏi cơ sở dữ liệu`);
    }
  };

  const triggerAlert = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(null), 4000);
  };

  const clearFilters = () => {
    setFilterText('');
    setStatusFilter('ALL');
    setApprovalFilter('ALL');
  };

  // Combine parent header search + local filter text
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchLocalFilter = 
        post.title.toLowerCase().includes(filterText.toLowerCase()) ||
        post.studentName.toLowerCase().includes(filterText.toLowerCase()) ||
        post.id.toLowerCase().includes(filterText.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || post.status === statusFilter;
      const matchApproval = approvalFilter === 'ALL' || post.approval === approvalFilter;

      return matchSearch && matchLocalFilter && matchStatus && matchApproval;
    });
  }, [posts, searchQuery, filterText, statusFilter, approvalFilter]);

  const handleExportExcel = () => {
    alert("Đã khởi tạo xuất Excel chứa danh sách " + filteredPosts.length + " bài đăng được lọc thành công!");
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex text-xs text-gray-400 font-medium mb-1.5" aria-label="Breadcrumb">
            <span className="hover:text-gray-600">Admin</span>
            <span className="mx-2">/</span>
            <span className="text-tm-primary font-semibold">Quản lý bài đăng</span>
          </nav>
          <h2 className="text-2xl font-bold font-display text-gray-900 tracking-tight flex items-center gap-2">
            Quản lý bài đăng
            <span className="text-xs bg-indigo-100 text-tm-primary px-2 py-0.5 rounded-full font-sans font-medium">
              {posts.length} tin đăng
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Kiểm duyệt và quản lý các yêu cầu tìm gia sư từ học viên trong hệ thống TutorMatch.
          </p>
        </div>
        <button
          id="btn-export-excel"
          onClick={handleExportExcel}
          className="bg-indigo-50 hover:bg-indigo-100 text-tm-primary text-xs font-semibold px-4 py-2.5 rounded-xl border border-indigo-100/50 flex items-center justify-center gap-2 transition-all cursor-pointer self-start md:self-center"
        >
          <FileDown className="size-4" />
          <span>Xuất Excel</span>
        </button>
      </div>

      {/* Alert toast notification */}
      {alertMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-tm-inverse-surface text-tm-inverse-on-surface text-xs font-medium px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-2 border border-[#8b5cf6]/20 animate-bounce">
          <Sparkles className="size-4 text-emerald-400" />
          <span>{alertMessage}</span>
        </div>
      )}

      {/* Filters Form Panel Container */}
      <div id="filter-panel" className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="filter-search-posts" className="block text-xs font-medium text-gray-500 mb-1.5">Mô tả hoặc Tên học viên</label>
            <input
              id="filter-search-posts"
              type="text"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Tìm kiếm theo tiêu đề, học viên, ID..."
              className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-tm-primary/20 focus:border-tm-primary transition-all"
            />
          </div>

          <div>
            <label htmlFor="filter-status-select" className="block text-xs font-medium text-gray-500 mb-1.5">Trạng thái bài đăng</label>
            <select
              id="filter-status-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-tm-primary/20 focus:border-tm-primary transition-all cursor-pointer"
            >
              <option value="ALL">Tất cả</option>
              <option value="OPEN">OPEN (Đang mở)</option>
              <option value="MATCHED">MATCHED (Đã ghép)</option>
              <option value="CANCELLED">CANCELLED (Bị hủy)</option>
              <option value="EXPIRED">EXPIRED (Hết hạn)</option>
            </select>
          </div>

          <div>
            <label htmlFor="filter-approval-select" className="block text-xs font-medium text-gray-500 mb-1.5">Trạng thái kiểm duyệt</label>
            <div className="flex items-center gap-3">
              <select
                id="filter-approval-select"
                value={approvalFilter}
                onChange={(e) => setApprovalFilter(e.target.value)}
                className="w-full bg-gray-50 border border-gray-150 rounded-xl px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-tm-primary/20 focus:border-tm-primary transition-all cursor-pointer"
              >
                <option value="ALL">Tất cả</option>
                <option value="PENDING">PENDING (Chờ duyệt)</option>
                <option value="APPROVED">APPROVED (Chấp thuận)</option>
                <option value="REJECTED">REJECTED (Từ chối)</option>
              </select>

              {(filterText || statusFilter !== 'ALL' || approvalFilter !== 'ALL') && (
                <button
                  onClick={clearFilters}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl p-2.5 border border-rose-100 flex items-center justify-center transition-all cursor-pointer"
                  title="Xóa bộ lọc"
                >
                  <FilterX className="size-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Data List Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm text-gray-500">
            <thead className="bg-[#f8faff] border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-600">
              <tr>
                <th scope="col" className="px-6 py-4 w-24">ID</th>
                <th scope="col" className="px-6 py-4">Tiêu đề bài đăng</th>
                <th scope="col" className="px-6 py-4">Học viên</th>
                <th scope="col" className="px-6 py-4">Môn học</th>
                <th scope="col" className="px-6 py-4">Học phí (VNĐ)</th>
                <th scope="col" className="px-6 py-4 text-center">Trạng thái</th>
                <th scope="col" className="px-6 py-4 text-center">Kiểm duyệt</th>
                <th scope="col" className="px-6 py-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 font-sans">
              {filteredPosts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-400">
                     Không tìm thấy yêu cầu tìm gia sư nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-indigo-50/10 transition-colors">
                    
                    {/* ID Column */}
                    <td className="px-6 py-5 font-mono text-xs font-medium text-gray-400">
                      {post.id}
                    </td>

                    {/* Title and date detail */}
                    <td className="px-6 py-5">
                      <div className="max-w-xs md:max-w-md">
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="font-semibold text-tm-primary text-sm hover:underline text-left leading-snug font-display inline-block"
                        >
                          {post.title}
                        </button>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">
                          Ngày đăng: {post.date}
                        </p>
                      </div>
                    </td>

                    {/* Student badge */}
                    <td className="px-6 py-5">
                      <div className="flex items-center space-x-2.5">
                        <div className="size-7 rounded-full bg-blue-50 text-tm-primary text-xs font-semibold flex items-center justify-center border border-indigo-100">
                          {post.studentAvatar}
                        </div>
                        <span className="font-semibold text-gray-700 text-xs">
                          {post.studentName}
                        </span>
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-5">
                      <span className="text-xs font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg">
                        {post.subject}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-5 font-mono text-xs font-semibold text-gray-800">
                      {post.fee}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-5 text-center">
                      {post.status === 'OPEN' && (
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                          OPEN
                        </span>
                      )}
                      {post.status === 'MATCHED' && (
                        <span className="bg-blue-50 text-tm-primary text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                          MATCHED
                        </span>
                      )}
                      {post.status === 'CANCELLED' && (
                        <span className="bg-rose-50 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-100">
                          CANCELLED
                        </span>
                      )}
                      {post.status === 'EXPIRED' && (
                        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200">
                          EXPIRED
                        </span>
                      )}
                    </td>

                    {/* Approval verification state */}
                    <td className="px-6 py-5 text-center">
                      {post.approval === 'PENDING' && (
                        <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-amber-100 flex items-center justify-center gap-1 w-24 mx-auto animate-pulse">
                          PENDING
                        </span>
                      )}
                      {post.approval === 'APPROVED' && (
                        <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center justify-center gap-1 w-24 mx-auto">
                          APPROVED
                        </span>
                      )}
                      {post.approval === 'REJECTED' && (
                        <span className="bg-rose-50 text-rose-700 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-rose-100 flex items-center justify-center gap-1 w-24 mx-auto">
                          REJECTED
                        </span>
                      )}
                    </td>

                    {/* Actions panel */}
                    <td className="px-6 py-5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        
                        {/* Approval Tick */}
                        <button
                          onClick={() => handleApprove(post.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            post.approval === 'APPROVED' 
                              ? 'bg-emerald-100 border-emerald-200 text-emerald-700' 
                              : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-100 text-emerald-600'
                          }`}
                          title="Chấp thuận đăng bài"
                        >
                          <Check className="size-3.5" />
                        </button>

                        {/* Reject Cross */}
                        <button
                          onClick={() => handleReject(post.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            post.approval === 'REJECTED'
                              ? 'bg-rose-100 border-rose-200 text-rose-700'
                              : 'bg-rose-50 hover:bg-rose-100 border-rose-100 text-rose-600'
                          }`}
                          title="Từ chối/Hạ bài"
                        >
                          <X className="size-3.5" />
                        </button>

                        {/* Focus details Eye */}
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="p-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-tm-primary hover:bg-indigo-100 transition-all cursor-pointer"
                          title="Xem chi tiết bài đăng"
                        >
                          <Eye className="size-3.5" />
                        </button>

                        {/* Delete post */}
                        {post.status === 'CANCELLED' && (
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-150 text-rose-600 transition-all cursor-pointer"
                            title="Xóa bài đăng khỏi hệ thống"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Custom Interactive Table PaginationFooter matching Screenshot 1 */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium">
            Hiển thị <span className="font-semibold text-gray-700">1 - {filteredPosts.length}</span> trong số <span className="font-semibold text-gray-700">{filteredPosts.length}</span> kết quả được lọc
          </p>
          <div className="flex items-center space-x-1">
            <button className="px-2.5 py-1 text-xs text-gray-400 bg-gray-50 border border-gray-200 rounded-lg cursor-not-allowed">
              Trước
            </button>
            <button className="px-3 py-1 text-xs bg-tm-primary text-white font-semibold rounded-lg">
              1
            </button>
            <button className="px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded-lg">
              2
            </button>
            <span className="px-1 text-gray-400">...</span>
            <button className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-lg">
              25
            </button>
            <button className="px-2.5 py-1 text-xs text-gray-500 hover:bg-gray-100 border border-gray-200 rounded-lg">
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Interactive detail popup window (Modal) */}
      {selectedPost && (
        <div className="fixed inset-0 bg-tm-on-surface/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="size-5" />
            </button>
            
            <span className="text-[10px] uppercase tracking-wider bg-indigo-50 text-tm-primary font-bold px-2 py-0.5 rounded">
              Yêu cầu {selectedPost.id}
            </span>
            <h3 className="text-lg font-bold font-display text-gray-900 mt-2 leading-snug">
              {selectedPost.title}
            </h3>

            <div className="mt-4 space-y-3.5 border-t border-b border-gray-150 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-semibold">Học viên yêu cầu</span>
                  <p className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mt-1">
                    <span className="min-w-6 size-6 rounded-full bg-blue-100 text-tm-primary text-[10px] font-bold flex items-center justify-center">
                      {selectedPost.studentAvatar}
                    </span>
                    {selectedPost.studentName}
                  </p>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-semibold">Môn học</span>
                  <p className="text-sm font-semibold text-gray-700 mt-1">{selectedPost.subject}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-semibold">Học phí đề xuất</span>
                  <p className="text-sm font-bold text-tm-secondary mt-1">{selectedPost.fee}</p>
                </div>
                <div>
                  <span className="block text-[10px] text-gray-400 uppercase font-semibold">Thời gian đăng tin</span>
                  <p className="text-sm text-gray-600 mt-1">{selectedPost.date}</p>
                </div>
              </div>

              <div>
                <span className="block text-[10px] text-gray-400 uppercase font-semibold">Trạng thái xác thực</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    selectedPost.status === 'OPEN' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {selectedPost.status}
                  </span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    selectedPost.approval === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    KIỂM DUYỆT: {selectedPost.approval}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <span className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1">
                  <HelpCircle className="size-3 text-indigo-500" />
                  Ghi chú Admin kiểm duyệt
                </span>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Đảm bảo nội dung tin đăng không chứa số điện thoại hoặc email trực tiếp lộ liễu trên tiêu đề để tránh lọt qua bộ lọc spam. Hệ thống phát hiện tin hoàn toàn hợp chuẩn tôn chỉ cộng đồng của TutorMatch.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end space-x-2">
              <button
                onClick={() => { handleReject(selectedPost.id); setSelectedPost(null); }}
                className="px-3 py-1.5 rounded-xl border border-rose-150 text-rose-600 text-xs font-semibold hover:bg-rose-50 transition-colors cursor-pointer"
              >
                Hạ bài/Từ chối
              </button>
              <button
                onClick={() => { handleApprove(selectedPost.id); setSelectedPost(null); }}
                className="px-4 py-1.5 rounded-xl bg-tm-primary text-white text-xs font-semibold hover:bg-tm-primary-container transition-colors cursor-pointer"
              >
                Phê duyệt ngay
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
