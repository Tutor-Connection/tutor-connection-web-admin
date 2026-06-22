import React, { useState, useMemo } from 'react';
import { ReviewItem } from '../types';
import { Star, ShieldAlert, Sparkles, AlertCircle, EyeOff, Check, Trash2, ArrowRight } from 'lucide-react';

interface ReviewManagementProps {
  reviews: ReviewItem[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewItem[]>>;
  searchQuery: string;
}

export default function ReviewManagement({ reviews, setReviews, searchQuery }: ReviewManagementProps) {
  const [activeSubTab, setActiveSubTab] = useState<'ALL' | 'PENDING' | 'HIDDEN' | 'FLAGGED'>('ALL');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filteredReviews = useMemo(() => {
    return reviews.filter(rev => {
      const matchSearch = 
        rev.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.targetTutor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rev.targetSubject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchTab = 
        activeSubTab === 'ALL' ||
        (activeSubTab === 'PENDING' && rev.status === 'PENDING') ||
        (activeSubTab === 'HIDDEN' && rev.status === 'HIDDEN') ||
        (activeSubTab === 'FLAGGED' && rev.status === 'FLAGGED');

      return matchSearch && matchTab;
    });
  }, [reviews, searchQuery, activeSubTab]);

  const handlePublish = (id: string) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        return { ...rev, status: 'ALL', tag: undefined };
      }
      return rev;
    }));
    triggerToast("Đã duyệt công khai đánh giá thành công.");
  };

  const handleHide = (id: string) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        return { ...rev, status: 'HIDDEN' };
      }
      return rev;
    }));
    triggerToast("Đã ẩn đánh giá khỏi luồng hiển thị của học viên.");
  };

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa vĩnh viễn đánh giá này?")) {
      setReviews(prev => prev.filter(rev => rev.id !== id));
      triggerToast("Đã xóa hoàn toàn đánh giá khỏi cơ sở dữ liệu.");
    }
  };

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Render yellow/amber star block based on rating values
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star 
            key={s} 
            className={`size-3.5 ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex text-xs text-gray-400 font-medium mb-1.5">
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span className="text-tm-primary font-semibold">Quản lý đánh giá</span>
          </nav>
          <h2 className="text-2xl font-bold font-display text-gray-900 tracking-tight flex items-center gap-2">
            Quản lý đánh giá
            <span className="text-xs bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
              <ShieldAlert className="size-3" />
              <span>Cần rà soát</span>
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Duyệt và kiểm định đánh giá từ học viên. Phát hiện mâu thuẫn điểm số tự động bằng trí tuệ nhân tạo (AI-Powered).
          </p>
        </div>
      </div>

      {/* Toast Alert message */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-900 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-1.5 animate-bounce">
          <Sparkles className="size-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Filter Tabs matching top header style sheets */}
      <div className="border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {[
            { id: 'ALL', label: 'Tất cả đánh giá' },
            { id: 'PENDING', label: 'Chờ duyệt / Báo cáo' },
            { id: 'FLAGGED', label: 'AI gắn cờ' },
            { id: 'HIDDEN', label: 'Đã ẩn' }
          ].map((tab) => {
            const count = reviews.filter(r => {
              if (tab.id === 'ALL') return true;
              if (tab.id === 'PENDING') return r.status === 'PENDING';
              if (tab.id === 'FLAGGED') return r.status === 'FLAGGED';
              if (tab.id === 'HIDDEN') return r.status === 'HIDDEN';
              return false;
            }).length;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`px-4 py-3 text-xs font-semibold tracking-tight border-b-2 transition-all cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'border-tm-primary text-tm-primary font-bold'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label} ({count})
              </button>
            );
          })}
        </div>
        
        {/* Help label summary */}
        <span className="hidden md:inline-flex text-[10px] text-gray-400 font-medium items-center gap-1">
          <AlertCircle className="size-3.5 text-indigo-500" />
          Mâu thuẫn đánh giá 1 sao - Lời bình tích cực được gắn thẻ tự động.
        </span>
      </div>

      {/* Review list cards layout streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviews.length === 0 ? (
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 py-16 text-center text-gray-400">
             Không có đánh giá nào tương thích với bộ lọc tab này.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div 
              key={rev.id} 
              className={`bg-white rounded-2xl border p-5 shadow-sm space-y-4 flex flex-col justify-between transition-all ${
                rev.status === 'FLAGGED' ? 'border-amber-200 bg-amber-50/10' : 'border-gray-100'
              }`}
            >
              
              {/* Card Title & user structure */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  
                  {/* User Profile Avatar */}
                  <div className={`size-10 rounded-full flex items-center justify-center font-display font-bold text-xs text-tm-primary overflow-hidden border border-gray-150 ${rev.avatarBg}`}>
                    {rev.userAvatar ? (
                      <img src={rev.userAvatar} alt="Reviewer" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      rev.user.substring(0, 2).toUpperCase()
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-xs text-gray-800 flex items-center gap-1.5 font-display">
                      {rev.user}
                      {rev.isAnonymous && <span className="text-[9px] bg-gray-100 text-gray-400 px-1.5 py-0.2 rounded font-sans">ẨN DANH</span>}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-medium">{rev.timeText}</span>
                  </div>

                </div>

                {/* Rating score badge stars */}
                <div className="text-right">
                  {renderStars(rev.rating)}
                  <span className="text-[10px] text-gray-400 mt-1 font-semibold block">Đánh giá {rev.rating}/5</span>
                </div>
              </div>

              {/* Review target subjects */}
              <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold bg-gray-50/70 p-1.5 rounded-lg border border-gray-100">
                <span className="text-tm-primary uppercase">Mục tiêu:</span>
                <span className="text-gray-700">{rev.targetTutor}</span>
                <ArrowRight className="size-2.5 text-gray-400" />
                <span className="text-gray-500 font-medium">{rev.targetSubject}</span>
              </div>

              {/* Content description styled nicely */}
              <p className="text-xs text-gray-650 italic leading-relaxed font-sans font-medium text-gray-600">
                {rev.content}
              </p>

              {/* AI Trigger tag context warning */}
              {rev.tag && (
                <div className={`text-xs px-3 py-2 rounded-xl border flex items-start gap-2 ${rev.tagColor}`}>
                  <ShieldAlert className="size-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[10.5px]">{rev.tag}</p>
                    <p className="text-[9.5px] mt-0.5 opacity-80 leading-snug">
                      {rev.reportReason || "Yêu cầu rà soát lý do từ admin viên."}
                    </p>
                  </div>
                </div>
              )}

              {/* Active Admin Moderation Controls panel */}
              <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-mono font-medium">ID: {rev.id.toUpperCase()}</span>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleDelete(rev.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Xóa đánh giá vĩnh viễn"
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <button
                    onClick={() => handleHide(rev.id)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-all cursor-pointer ${
                      rev.status === 'HIDDEN'
                        ? 'bg-slate-100 border-slate-200 text-slate-500'
                        : 'bg-indigo-50/40 border-indigo-100 text-tm-primary hover:bg-indigo-50'
                    }`}
                  >
                    {rev.status === 'HIDDEN' ? 'Đã ẩn' : 'Ẩn tin'}
                  </button>
                  <button
                    onClick={() => handlePublish(rev.id)}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="size-3" />
                    Duyệt hiển thị
                  </button>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
