import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Eye, 
  AlertTriangle, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Calendar,
  Layers,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';
import { KycRequest } from '../types';

interface KycVerificationViewProps {
  requests: KycRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

export default function KycVerificationView({ requests, onApprove, onReject }: KycVerificationViewProps) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('Tài liệu mờ, không rõ thông tin.');
  const [customReason, setCustomReason] = useState('');

  const pendingRequests = requests.filter(r => r.status === 'Pending');

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectingId) return;
    const finalReason = rejectReason === 'Khác' ? customReason : rejectReason;
    onReject(rejectingId, finalReason);
    setRejectingId(null);
    setCustomReason('');
  };

  return (
    <div id="kycCensorshipView" className="space-y-6 animate-fadeIn font-sans select-none">
      {/* Banner info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs text-brand-orange-600 font-bold uppercase tracking-widest block mb-1">Cổng kiểm soát pháp lý</span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Kiểm Duyệt Hồ Sơ KYC</h1>
          <p className="text-slate-500 text-sm font-medium">Đối soát giấy tờ tùy thân và văn bằng sư phạm của Đội ngũ Gia sư trước khi đưa lên môi trường kết nối.</p>
        </div>
        
        <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm text-right self-start sm:self-auto">
          <span className="text-slate-400 text-[10px] block font-bold uppercase mb-1">Hồ sơ chờ phê duyệt</span>
          <span className="text-2xl font-extrabold text-brand-orange-500 font-mono">{pendingRequests.length} Đơn</span>
        </div>
      </div>

      {pendingRequests.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {pendingRequests.map((req) => (
            <div 
              key={req.id} 
              className="bg-white rounded-3xl border border-slate-100 shadow-md overflow-hidden flex flex-col justify-between"
            >
              {/* Header profile cards layout matching Image 11 */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={req.tutorAvatar} 
                    alt={req.tutorName} 
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-[#0f172a]">{req.tutorName}</h3>
                      <span className="bg-brand-orange-50 text-brand-orange-600 border border-brand-orange-100 py-0.5 px-2 rounded-lg text-[10px] font-extrabold uppercase">
                        Chờ duyệt tài liệu
                      </span>
                    </div>
                    <div className="text-slate-500 text-xs font-semibold mt-1 space-y-0.5">
                      <p className="font-semibold text-slate-800">{req.university}</p>
                      <p className="text-slate-400">Chuyên ngành: <span className="text-slate-600">{req.major}</span></p>
                    </div>
                  </div>
                </div>

                <div className="text-right text-slate-400 font-bold text-[10px] flex items-center gap-1.5 font-mono">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  {req.submittedAt}
                </div>
              </div>

              {/* Document previews grid matching Image 11 document thumbnails */}
              <div className="p-6 space-y-4">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Các tài liệu xác minh được gửi lên</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* CCCD */}
                  {req.documents.idCardFront ? (
                    <div className="group relative bg-slate-50 border border-slate-150 rounded-2xl overflow-hidden p-2 text-center shadow-inner">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Thẻ CCCD / CMND</span>
                      <div className="h-28 w-full bg-slate-200 rounded-xl overflow-hidden relative">
                        <img 
                          src={req.documents.idCardFront} 
                          alt="CCCD Front" 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <button 
                          onClick={() => setSelectedImg(req.documents.idCardFront)}
                          className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition duration-200 cursor-pointer"
                        >
                          <ZoomIn className="w-6 h-6" />
                        </button>
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold block mt-2">Ảnh mặt trước pháp lý</span>
                    </div>
                  ) : null}

                  {/* Student Card / Optional Card */}
                  {req.documents.studentCard ? (
                    <div className="group relative bg-slate-50 border border-slate-150 rounded-2xl overflow-hidden p-2 text-center shadow-inner">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2">Thẻ sinh viên / CB GD</span>
                      <div className="h-28 w-full bg-slate-200 rounded-xl overflow-hidden relative">
                        <img 
                          src={req.documents.studentCard} 
                          alt="Student Card" 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <button 
                          onClick={() => setSelectedImg(req.documents.studentCard)}
                          className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition duration-200 cursor-pointer"
                        >
                          <ZoomIn className="w-6 h-6" />
                        </button>
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold block mt-2">Check mã sinh viên khớp</span>
                    </div>
                  ) : (
                    <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-2 flex flex-col justify-center items-center text-center h-full min-h-[160px]">
                      <AlertTriangle className="w-6 h-6 text-slate-300 mb-2" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thẻ SV / Thẻ Công Tác</span>
                      <span className="text-[9px] text-slate-400 block mt-1">Không cung cấp / Đã tốt nghiệp</span>
                    </div>
                  )}

                  {/* Degree Certificate */}
                  {req.documents.degreeCert ? (
                    <div className="group relative bg-slate-50 border border-slate-150 rounded-2xl overflow-hidden p-2 text-center shadow-inner">
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block mb-2 font-sans">Bằng cấp Sư Phạm / IELTS</span>
                      <div className="h-28 w-full bg-slate-200 rounded-xl overflow-hidden relative">
                        <img 
                          src={req.documents.degreeCert} 
                          alt="Degree Certificate" 
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <button 
                          onClick={() => setSelectedImg(req.documents.degreeCert)}
                          className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition duration-200 cursor-pointer"
                        >
                          <ZoomIn className="w-6 h-6" />
                        </button>
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold block mt-2 font-sans">Bằng tốt nghiệp hoặc Ngoại ngữ</span>
                    </div>
                  ) : null}
                </div>

                {/* Additional metadata row */}
                <div className="p-3 bg-brand-primary-50/30 rounded-xl border border-brand-primary-100/50 text-xs text-slate-600 font-medium">
                  <span className="font-extrabold text-[#0037b0] block mb-1">Thông tin liên kết văn phòng:</span>
                  Số điện thoại đối chiếu: <strong className="text-slate-800">{req.phone}</strong> • Email đối chiếu: <strong className="text-slate-800">{req.email}</strong>
                </div>
              </div>

              {/* Action buttons footer matching Image 11 & 13 */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setRejectingId(req.id)}
                  className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 text-xs font-bold rounded-xl border border-red-100 cursor-pointer transition flex items-center gap-1.5"
                >
                  <X className="w-4.5 h-4.5" />
                  Từ chối phê duyệt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Phê duyệt tài khoản gia sư hợp pháp [${req.tutorName}]?`)) {
                      onApprove(req.id);
                    }
                  }}
                  className="px-4 py-2.5 bg-brand-primary-600 hover:bg-brand-primary-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow shadow-brand-primary-500/10 hover:-translate-y-0.5 transition flex items-center gap-1.5"
                >
                  <Check className="w-4.5 h-4.5" />
                  Phê Duyệt Hồ Sơ
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-400 font-bold text-sm shadow-sm">
          Tuyệt vời! Hiện tại không có yêu cầu kiểm duyệt hồ sơ KYC nào đang xếp hàng chờ duyệt.
        </div>
      )}

      {/* Lightbox zoomed modal (CCCD/Cert view)  */}
      {selectedImg && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 z-50 animate-fadeIn">
          {/* Controls */}
          <div className="absolute top-4 right-4 flex gap-3 text-white z-55">
            <button 
              onClick={() => setSelectedImg(null)}
              className="py-2.5 px-4 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer border border-white/10 transition"
            >
              Đóng Xem Trực Tiếp
            </button>
          </div>

          <div className="max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl shadow-2xl relative border border-white/10">
            <img 
              src={selectedImg} 
              alt="Zoomed document" 
              className="max-w-full max-h-[85vh] object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-white/60 text-xs font-medium font-sans mt-4">
            Cuộn chuột hoặc xem kỹ tiêu đề để quyết định duyệt chính xác thông tin.
          </p>
        </div>
      )}

      {/* Rejection reason slide dialog */}
      {rejectingId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-sm w-full overflow-hidden flex flex-col justify-between">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-950 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Lý do từ chối hồ sơ
              </h3>
              <button 
                onClick={() => setRejectingId(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRejectSubmit} className="p-5 space-y-4">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block mb-1">Chọn lý do hoặc điền bổ sung</span>

              <div className="space-y-2">
                {[
                  'Tài liệu mờ, không rõ thông tin.',
                  'Thông tin văn bằng không trùng khớp họ tên.',
                  'Thiếu ảnh mặt sau của giấy tờ tùy thân.',
                  'Chứng chỉ ngoại ngữ IELTS hết hạn hiệu lực.',
                  'Khác'
                ].map((reason, idx) => (
                  <label key={idx} className="flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-100 rounded-lg cursor-pointer text-xs font-semibold hover:border-slate-300">
                    <input 
                      type="radio" 
                      name="rejectReason"
                      value={reason === 'Khác' ? 'Khác' : reason}
                      checked={rejectReason === reason}
                      onChange={() => setRejectReason(reason)}
                      className="text-brand-primary-600 focus:ring-brand-primary-500"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>

              {rejectReason === 'Khác' && (
                <div>
                  <label className="text-slate-400 text-[10px] font-bold block mb-1">Ghi rõ lý do khác</label>
                  <textarea
                    value={customReason}
                    required
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder="VD: Nghi ngờ làm giả văn bằng ngôn ngữ..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-brand-primary-500"
                  />
                </div>
              )}

              <div className="pt-2 flex justify-end gap-2 pr-1">
                <button 
                  type="button" 
                  onClick={() => setRejectingId(null)}
                  className="px-3.5 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit" 
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs cursor-pointer shadow shadow-red-500/10"
                >
                  Xác nhận Từ chối
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
