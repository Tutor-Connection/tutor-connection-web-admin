import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit, 
  Atom, 
  BookOpen, 
  Languages, 
  Cpu, 
  Palette, 
  X,
  FileSpreadsheet,
  Grid
} from 'lucide-react';
import { Category, Subject } from '../types';

interface SubjectManagementViewProps {
  categories: Category[];
  subjects: Subject[];
  onAddCategory: (category: Category) => void;
  onAddSubject: (subject: Subject) => void;
  onDeleteSubject: (subjectId: string) => void;
  onDeleteCategory: (categoryId: string) => void;
}

export default function SubjectManagementView({
  categories,
  subjects,
  onAddCategory,
  onAddSubject,
  onDeleteSubject,
  onDeleteCategory
}: SubjectManagementViewProps) {
  const [selectedCatId, setSelectedCatId] = useState<string>('cat_tu_nhien');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [isAddCatOpen, setIsAddCatOpen] = useState(false);
  const [isAddSubOpen, setIsAddSubOpen] = useState(false);
  
  // New Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('Atom');
  
  // New Subject Form State
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubDesc, setNewSubDesc] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;

    const newCat: Category = {
      id: `cat_${newCatName.toLowerCase().replace(/\s+/g, '_')}_${Math.floor(Math.random() * 100)}`,
      name: newCatName,
      iconName: newCatIcon,
      count: 0
    };
    onAddCategory(newCat);
    setNewCatName('');
    setIsAddCatOpen(false);
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName || !newSubCode) return;

    const newSub: Subject = {
      id: `SUB-${Math.floor(100 + Math.random() * 900)}`,
      name: newSubName,
      categoryId: selectedCatId,
      code: newSubCode.toUpperCase(),
      tutorsCount: 0,
      classesCount: 0,
      status: 'Active',
      description: newSubDesc || 'Học phần được phê duyệt đưa vào giảng dạy.'
    };
    onAddSubject(newSub);
    setNewSubName('');
    setNewSubCode('');
    setNewSubDesc('');
    setIsAddSubOpen(false);
  };

  // Helper to map icon name to Lucide Icons
  const categoryIcons: Record<string, React.ComponentType<any>> = {
    Atom: Atom,
    BookOpen: BookOpen,
    Languages: Languages,
    Cpu: Cpu,
    Palette: Palette
  };

  const activeCategory = categories.find(c => c.id === selectedCatId);

  // Filter subjects metrics
  const filteredSubjects = subjects.filter(sub => {
    const matchesCat = sub.categoryId === selectedCatId;
    const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div id="subjectManagementView" className="flex flex-col lg:flex-row gap-6 animate-fadeIn font-sans items-start">
      
      {/* LEFT COLUMN: Categories Tree layout matching Image 4 */}
      <div className="w-full lg:w-[32%] bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-extrabold text-slate-950">Danh mục chính</h3>
            <p className="text-slate-400 text-[11px] font-bold">Phân hệ phân loại môn học chính</p>
          </div>
          <button
            onClick={() => setIsAddCatOpen(true)}
            className="w-8 h-8 rounded-lg bg-brand-primary-50 text-brand-primary-600 hover:bg-brand-primary-100 flex items-center justify-center cursor-pointer transition border border-brand-primary-100"
            title="Thêm danh mục"
          >
            <Plus className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Categories List */}
        <div className="space-y-2">
          {categories.map((cat) => {
            const IconComp = categoryIcons[cat.iconName] || BookOpen;
            const isSelected = cat.id === selectedCatId;
            const subCountForCat = subjects.filter(s => s.categoryId === cat.id).length;
            
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCatId(cat.id);
                  setSearchQuery('');
                }}
                className={`flex items-center justify-between p-3.5 rounded-xl text-left cursor-pointer transition-all duration-150 border ${
                  isSelected 
                    ? 'bg-brand-primary-50 border-brand-primary-200 text-brand-primary-950 font-bold shadow-sm' 
                    : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50/50 hover:border-slate-200'
                }`}
              >
                <div id={`categoryItem-${cat.id}`} className="flex items-center gap-3.5">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-brand-primary-600 text-white shadow-sm' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <IconComp className="w-5 h-5 shrink-0" />
                  </div>
                  <span className="text-xs tracking-wide">{cat.name}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold py-0.5 px-2 rounded-full font-mono ${
                    isSelected ? 'bg-brand-primary-200/50 text-brand-primary-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {subCountForCat} Môn
                  </span>
                  
                  {cat.id !== 'cat_tu_nhien' && cat.id !== 'cat_xa_hoi' && cat.id !== 'cat_ngoai_ngu' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Xóa danh mục [${cat.name}]? Toàn bộ môn học bên trong sẽ cần chuyển danh mục.`)) {
                          onDeleteCategory(cat.id);
                          if (selectedCatId === cat.id) {
                            setSelectedCatId('cat_tu_nhien');
                          }
                        }
                      }}
                      className="p-1 text-slate-300 hover:text-red-500 rounded cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT COLUMN: Subjects Table Registry Layout matching Image 4 & 8 */}
      <div className="w-full lg:w-[68%] bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
              <Grid className="w-5 h-5 text-brand-primary-600" />
              {activeCategory ? activeCategory.name : 'Quản Lý Môn Học'}
            </h3>
            <p className="text-slate-400 text-xs font-semibold mt-1">Danh sách các môn học chi tiết thuộc danh mục đang chọn</p>
          </div>
          
          <button
            onClick={() => setIsAddSubOpen(true)}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-brand-primary-600 hover:bg-brand-primary-700 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition uppercase self-start"
          >
            <Plus className="w-4 h-4" />
            Thêm môn học mới
          </button>
        </div>

        {/* Toolbar matching Image 8 */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm môn học theo tên, mã viết tắt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-brand-primary-500 focus:bg-white transition"
            />
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="py-4 px-5">Mã môn</th>
                <th className="py-4 px-5">Tên môn học</th>
                <th className="py-4 px-5">Số gia sư</th>
                <th className="py-4 px-5">Lớp hoạt động</th>
                <th className="py-4 px-5">Trạng thái</th>
                <th className="py-4 px-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/50 text-xs font-semibold text-slate-600 transition">
                    <td className="py-4 px-5 font-mono text-brand-primary-700 font-extrabold">{sub.code}</td>
                    <td className="py-4 px-5">
                      <div>
                        <span className="font-extrabold text-slate-900 block text-sm">{sub.name}</span>
                        <span className="text-slate-400 text-[11px] block text-normal mt-0.5 truncate max-w-sm font-medium">{sub.description}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-800 font-bold">{sub.tutorsCount || (sub.id === 'SUB-001' ? 142 : sub.id === 'SUB-002' ? 85 : 42)} gia sư</td>
                    <td className="py-4 px-5 font-mono text-slate-800 font-bold">{sub.classesCount || (sub.id === 'SUB-001' ? 56 : sub.id === 'SUB-002' ? 32 : 12)} lớp</td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex py-0.5 px-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        sub.status === 'Active' ? 'bg-brand-green-50 text-brand-green-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {sub.status === 'Active' ? 'Đang Dạy' : 'Tạm dừng'}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => {
                          if (confirm(`Bạn chắc chắn muốn xóa môn học [${sub.name}] ra khỏi danh mục đăng ký?`)) {
                            onDeleteSubject(sub.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 cursor-pointer transition"
                        title="Xóa môn"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 font-bold text-xs bg-slate-53">
                    Không tìm thấy môn học nào thuộc nhóm này.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal form: New Category */}
      {isAddCatOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-sm w-full overflow-hidden flex flex-col justify-between">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-950">Thêm danh mục đào tạo</h3>
              <button onClick={() => setIsAddCatOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-widest mb-1.5">Tên danh mục</label>
                <input 
                  type="text" 
                  value={newCatName}
                  required
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Ví dụ: Khoa học Đời sống"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-brand-primary-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-widest mb-1.5">Biểu tượng</label>
                <select 
                  value={newCatIcon}
                  onChange={(e) => setNewCatIcon(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-xs text-slate-600 focus:outline-none transition cursor-pointer"
                >
                  <option value="Atom">Nguyên tử (Khoa học)</option>
                  <option value="BookOpen">Quyển sách (Xã hội)</option>
                  <option value="Languages">Ngôn ngữ</option>
                  <option value="Cpu">Vi xử lý (Công nghệ)</option>
                  <option value="Palette">Bảng màu (Nghệ thuật)</option>
                </select>
              </div>
              <div className="pt-2 flex justify-end gap-2.5">
                <button type="button" onClick={() => setIsAddCatOpen(false)} className="px-3.5 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs cursor-pointer">Hủy</button>
                <button type="submit" className="px-3.5 py-2 bg-brand-primary-600 hover:bg-brand-primary-700 text-white rounded-xl font-bold text-xs cursor-pointer shadow">Xác nhận</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal form: New Subject */}
      {isAddSubOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden flex flex-col justify-between">
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-950">Khai báo môn học mới</h3>
              <button onClick={() => setIsAddSubOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddSubject} className="p-5 space-y-4">
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-2 rounded-xl mb-1 text-[10px] font-extrabold uppercase text-slate-500">
                <span className="col-span-1">Danh mục lưu trữ:</span>
                <span className="col-span-2 text-brand-primary-700">{activeCategory ? activeCategory.name : ''}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-widest mb-1.5">Mã học phần</label>
                  <input 
                    type="text" 
                    value={newSubCode}
                    required
                    onChange={(e) => setNewSubCode(e.target.value)}
                    placeholder="Ví dụ: PHY101"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-brand-primary-500 text-xs transition-all placeholder:font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-widest mb-1.5">Tên môn học</label>
                  <input 
                    type="text" 
                    value={newSubName}
                    required
                    onChange={(e) => setNewSubName(e.target.value)}
                    placeholder="Ví dụ: Giải tích 2"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none focus:border-brand-primary-500 text-xs transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-widest mb-1.5">Mô tả tóm tắt nội dung</label>
                <textarea 
                  value={newSubDesc}
                  onChange={(e) => setNewSubDesc(e.target.value)}
                  placeholder="Viết mô tả ngắn gọn về môn học..."
                  className="w-full min-h-[80px] p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-xs focus:outline-none focus:border-brand-primary-500 transition"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button type="button" onClick={() => setIsAddSubOpen(false)} className="px-3.5 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-xs cursor-pointer">Hủy</button>
                <button type="submit" className="px-3.5 py-2 bg-brand-primary-600 hover:bg-brand-primary-700 text-white rounded-xl font-bold text-xs cursor-pointer shadow">Xác nhận môn học</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
