import React, { useState, useMemo } from 'react';
import { ModerationContent } from '../types';
import { ShieldCheck, ShieldAlert, Sparkles, Filter, Check, X, Plus, Trash2, HeartHandshake } from 'lucide-react';

interface ModerationProps {
  moderationList: ModerationContent[];
  setModerationList: React.Dispatch<React.SetStateAction<ModerationContent[]>>;
  searchQuery: string;
}

export default function ContentModeration({ moderationList, setModerationList, searchQuery }: ModerationProps) {
  const [activeType, setActiveType] = useState<string>('ALL');
  const [blocklist, setBlocklist] = useState<string[]>(['lừa đảo', 'vớ vẩn', 'mua bán', 'bậy bạ', '0901234567']);
  const [newKeyword, setNewKeyword] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredList = useMemo(() => {
    return moderationList.filter(item => {
      const matchSearch = 
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.author.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = activeType === 'ALL' || item.type === activeType;

      return matchType && matchSearch;
    });
  }, [moderationList, activeType, searchQuery]);

  const handleApprove = (id: string) => {
    setModerationList(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'APPROVED' };
      }
      return item;
    }));
    triggerToast(`Đã phê duyệt và khôi phục nội dung ${id}.`);
  };

  const handleReject = (id: string) => {
    setModerationList(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status: 'REJECTED' };
      }
      return item;
    }));
    triggerToast(`Đã bác bỏ phê duyệt, hạ nội dung ${id} xuống.`);
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    if (blocklist.includes(newKeyword.trim().toLowerCase())) {
      alert("Từ khóa này đã tồn tại trong danh sách đen.");
      return;
    }
    setBlocklist(prev => [...prev, newKeyword.trim().toLowerCase()]);
    triggerToast(`Đã thêm "${newKeyword}" vào danh sách đen.`);
    setNewKeyword('');
  };

  const handleRemoveKeyword = (kw: string) => {
    setBlocklist(prev => prev.filter(item => item !== kw));
    triggerToast(`Đã gỡ "${kw}" khỏi danh sách từ từ khóa rà soát.`);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Helper to color and highlight sensitive words
  const renderHighlightedContent = (text: string, words: string[]) => {
    if (!words || words.length === 0) return text;
    
    // Create a regular expression from highlighted words
    const regex = new RegExp(`(${words.join('|')})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <p className="text-xs text-gray-700 leading-relaxed font-sans font-medium">
        {parts.map((p, idx) => {
          const isHighlighted = words.some(w => w.toLowerCase() === p.toLowerCase());
          return isHighlighted ? (
            <span key={idx} className="bg-rose-100 text-rose-800 border border-rose-300 px-1.5 py-0.5 rounded-lg font-bold font-mono text-xs">
              {p}
            </span>
          ) : (
            p
          );
        })}
      </p>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <nav className="flex text-xs text-gray-400 font-medium mb-1.5">
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span className="text-tm-primary font-semibold">Kiểm duyệt nội dung</span>
          </nav>
          <h2 className="text-2xl font-bold font-display text-gray-900 tracking-tight flex items-center gap-2">
            Kiểm duyệt nội dung & Spam
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Rà soát hồ sơ gia sư, tin tìm lớp, phát hiện số điện thoại lạ và xử lý bộ lọc từ khóa cấm.
          </p>
        </div>
      </div>

      {/* Floating prompt */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#293040] border border-emerald-450 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-2xl flex items-center gap-2 animate-pulse">
          <HeartHandshake className="size-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Content flow split layout grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Flagged list logs */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">LUỒNG NỘI DUNG ĐANG RÀ SOÁT ({filteredList.length})</span>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              {['ALL', 'POST', 'BIO', 'REVIEW'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                    activeType === type ? 'bg-white text-tm-primary shadow-xs' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {type === 'ALL' ? 'Tất cả' : type}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredList.map((item) => (
              <div 
                key={item.id} 
                className={`bg-white rounded-2xl border p-5 shadow-xs space-y-4 transition-all relative overflow-hidden ${
                  item.status === 'APPROVED' ? 'border-emerald-100 bg-emerald-50/10 opacity-70' :
                  item.status === 'REJECTED' ? 'border-rose-100 bg-rose-50/10 opacity-70' :
                  'border-gray-100'
                }`}
              >
                {/* Visual state headers */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">{item.id}</span>
                    <span className="bg-rose-50 text-rose-700 border border-rose-100 text-[10px] font-bold px-2 py-0.5 rounded">
                      Loại: {item.type}
                    </span>
                    <span className="text-gray-300">|</span>
                    <span className="text-xs font-semibold text-gray-800">Tác giả: {item.author}</span>
                  </div>
                  <span className="text-[10px] text-gray-450 font-medium font-mono">Báo cáo: {item.timeText}</span>
                </div>

                {/* Highlighted text paragraph box */}
                <div className="p-3.5 bg-gray-50 border border-gray-150 rounded-xl">
                  {renderHighlightedContent(item.content, item.highlightWords)}
                </div>

                {/* Flag tags list */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">Lý do rà soát:</span>
                  {item.flagReasons.map((reason, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 font-bold px-2 py-0.5 rounded text-[10px]">
                      <ShieldAlert className="size-3" />
                      {reason}
                    </span>
                  ))}
                  {item.status !== 'PENDING' && (
                    <span className={`inline-flex items-center gap-1 font-bold px-2 py-0.5 rounded text-[10px] ml-auto ${
                      item.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      TRẠNG THÁI: {item.status}
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                {item.status === 'PENDING' && (
                  <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                    <p className="text-[10px] text-gray-400 italic">Cần duyệt hành động quản trị viên</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleReject(item.id)}
                        className="py-1 px-3 border border-rose-150 text-rose-600 rounded-lg hover:bg-rose-50 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <X className="size-3" />
                        Gỡ bài / Từ chối
                      </button>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="py-1 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="size-3" />
                        Giữ lại nội dung
                      </button>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>

        {/* Right Side: Blacklist keywords directory */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-1 text-gray-800 font-display font-semibold text-sm">
            <ShieldCheck className="size-4.5 text-tm-primary" />
            <span>Từ khóa cấm tự động</span>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
            Nội dung chứa các từ khóa cấm dưới đây sẽ tự động bị gắn cờ và giữ lại để quản trị viên phê duyệt thủ công.
          </p>

          <form onSubmit={handleAddKeyword} className="flex gap-2">
            <label htmlFor="blocklist-keyword-input" className="sr-only">Từ khóa cấm mới</label>
            <input
              id="blocklist-keyword-input"
              type="text"
              placeholder="Nhập từ khóa..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-150 rounded-lg px-2.5 py-1 text-xs text-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-lg p-1.5 flex items-center justify-center transition-colors cursor-pointer"
              title="Thêm từ khóa đen"
            >
              <Plus className="size-3.5" />
            </button>
          </form>

          <div className="pt-2">
            <span className="block text-[10px] text-gray-400 uppercase font-bold mb-2">Thư viện rà soát ({blocklist.length})</span>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {blocklist.map((kw) => (
                <span key={kw} className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-100 rounded-lg px-2 py-0.5 text-xs font-semibold">
                  <span>{kw}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveKeyword(kw)}
                    className="hover:bg-rose-100 rounded text-rose-700 cursor-pointer p-0.5"
                  >
                    <X className="size-2.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
