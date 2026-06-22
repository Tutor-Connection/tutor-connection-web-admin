import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  TrendingUp, 
  AlertOctagon, 
  Clock, 
  Map, 
  Send, 
  Loader2,
  ChevronRight
} from 'lucide-react';
import { Message } from '../types';

export default function ReportsView() {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Xin chào! Tôi là AI Insight Partner của TutorMatch. Bạn cần phân tích số liệu gì về cung cầu gia sư tại khu vực Đà Nẵng hôm nay?', sender: 'AI', timestamp: '15:30' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Da Nang Districts dataset
  const districts = [
    { id: 'hc', name: 'Hải Châu', x: '50%', y: '48%', students: 5640, tutors: 2190, rate: '96.5%', color: 'bg-brand-primary-500 shadow-brand-primary-500/50' },
    { id: 'lc', name: 'Liên Chiểu', x: '25%', y: '30%', students: 3410, tutors: 3120, rate: '93.2%', color: 'bg-brand-orange-500 shadow-brand-orange-500/50' },
    { id: 'tk', name: 'Thanh Khê', x: '38%', y: '42%', students: 2890, tutors: 1040, rate: '95.1%', color: 'bg-indigo-500 shadow-indigo-500/50' },
    { id: 'st', name: 'Sơn Trà', x: '70%', y: '25%', students: 1200, tutors: 850, rate: '92.4%', color: 'bg-brand-green-500 shadow-brand-green-500/50' },
    { id: 'nhs', name: 'Ngũ Hành Sơn', x: '80%', y: '75%', students: 1850, tutors: 1430, rate: '94.8%', color: 'bg-pink-500 shadow-pink-500/50' },
    { id: 'cl', name: 'Cẩm Lệ', x: '45%', y: '70%', students: 1620, tutors: 720, rate: '91.8%', color: 'bg-teal-500 shadow-teal-500/50' },
  ];

  const anomalies = [
    { id: 'a1', title: 'Nhu cầu tăng đột biến ở Liên Chiểu', desc: 'Môn Toán Giải Tích 1 tăng 45% trong 3 ngày qua do mùa ôn thi kỳ II.', severity: 'Medium', time: '5 phút trước' },
    { id: 'a2', title: 'Thiếu hụt gia sư Tiếng Anh IELTS tại Sơn Trà', desc: 'Có 18 yêu cầu kết nối đang chờ khớp quá 48 giờ.', severity: 'High', time: '1 giờ trước' },
    { id: 'a3', title: 'Phát hiện hành vi gửi thư rác (Spam)', desc: 'Tài khoản học viên USR-902 đăng ký 12 lớp thử liên tục tại Hải Châu.', severity: 'Low', time: '4 giờ trước' }
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isAiLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'User',
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsAiLoading(true);

    try {
      // Call server side gemini endpoint
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg.text })
      });

      if (!response.ok) {
        throw new Error('API server failed');
      }

      const data = await response.json();
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: 'AI',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      // Fallback response with beautiful stats matching local model
      setTimeout(() => {
        let text = 'Tôi đã nhận được câu hỏi của bạn. ';
        const lower = userMsg.text.toLowerCase();
        if (lower.includes('hải châu') || lower.includes('hai chau')) {
          text += 'Quận Hải Châu hiện có mật độ nhu cầu gia sư cao nhất Đà Nẵng (5,640 học sinh đăng ký tích cực) tập trung lớn ở các môn Toán và Vật lý đại cương với tỷ lệ kết nối thành công lý tưởng 96.5% nhờ năng lực sư phạm của các gia sư cơ hữu.';
        } else if (lower.includes('liên chiểu') || lower.includes('lien chieu') || lower.includes('đại học')) {
          text += 'Quận Liên Chiểu là tâm điểm tập trung lượng lớn gia sư (3,120 người) do địa bàn gần cụm Đại học Bách Khoa, Sư Phạm. Tăng trưởng lớn nhất hiện nay là ở mảng Hóa học hữu cơ và Công nghệ thông tin.';
        } else if (lower.includes('báo cáo') || lower.includes('mật độ')) {
          text += 'Dựa trên bản đồ mật độ, Hải Châu và Liên Chiểu là hai cực tăng trưởng cung - cầu mạnh nhất. Chúng ta khuyến nghị điều chuyển điều phối các chương trình quảng cáo gia sư sang Sơn Trà để bù đắp lượng thiếu hụt gia sư IELTS.';
        } else {
          text += 'Hệ thống ghi nhận tổng cộng 12,482 thành viên với tỷ lệ ghép đôi thành công đặc biệt cao 94.2% tại Đà Nẵng. Hãy tập trung ưu tiên xử lý phê duyệt hồ sơ KYC đang treo (3 đơn mới) để đáp ứng nhu cầu tăng nhiệt của các lớp đại học mùa thi.';
        }
        
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          text,
          sender: 'AI',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 1000);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div id="reportsInsightsView" className="space-y-8 animate-fadeIn font-sans">
      
      {/* View Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-3 py-1 bg-brand-primary-50 text-brand-primary-700 text-[10px] font-bold rounded-full border border-brand-primary-100 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            AI & Big Data Analytical Sandbox
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI-Driven Insights</h1>
        <p className="text-slate-500 text-sm font-medium">Báo cáo phân tích mật độ phân bố học viên, phát hiện bất thường và cố vấn kế hoạch quảng bá bằng Trí Tuệ Nhân Tạo.</p>
      </div>

      {/* Two Panes layout matching Image 10 */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Left Pane (8cols): Interactive Da Nang Heatmap Map mock */}
        <div className="xl:col-span-7 bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
                <Map className="w-5 h-5 text-brand-primary-500" />
                Bản Đồ Mật Độ Nhu Cầu (Da Nang Demand Map)
              </h3>
              <p className="text-slate-400 text-xs font-semibold">Rê chuột lên chấm tròn quận để hiển thị báo cáo số lượng học sinh/gia sư</p>
            </div>
            
            {hoveredDistrict && (
              <div className="bg-brand-primary-50 border border-brand-primary-200 px-3 py-1 rounded-xl text-center">
                <span className="text-[10px] block text-brand-primary-400 font-extrabold uppercase">Đang trỏ:</span>
                <span className="text-xs font-extrabold text-brand-primary-700">{hoveredDistrict}</span>
              </div>
            )}
          </div>

          {/* Interactive Geographic Plate mockup */}
          <div className="bg-slate-900 h-[380px] rounded-2xl relative overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
            {/* Dark Cybernet Grid background */}
            <div className="absolute inset-0 opacity-15" style={{
              backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px'
            }} />
            
            {/* Outline map Da Nang shape using neat visual elements or mock outline paths */}
            <svg className="w-full h-full absolute inset-0 opacity-25" viewBox="0 0 400 400">
              {/* Abstract curve representing Da Nang bay & shoreline */}
              <path d="M 60,110 Q 150,80 230,120 T 310,90 T 360,150 L 320,380 L 120,380 L 80,250 Z" fill="none" stroke="#2979ff" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 230,120 Q 250,150 240,190 T 300,240" fill="none" stroke="#fd761a" strokeWidth="1" />
            </svg>

            <span className="absolute bottom-4 left-4 text-[10px] text-white/40 font-mono font-bold uppercase tracking-wider">TutorMatch.V4 Geography Plate</span>

            {districts.map((d) => (
              <div 
                key={d.id}
                style={{ left: d.x, top: d.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group z-20"
                onMouseEnter={() => setHoveredDistrict(d.name)}
                onMouseLeave={() => setHoveredDistrict(null)}
              >
                {/* Glowing ring */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition duration-300 relative ${d.color} bg-opacity-35 hover:bg-opacity-50 shadow-xl`}>
                  <div className="w-3.5 h-3.5 bg-white rounded-full border-2 border-slate-900 shadow-md group-hover:scale-125 transition duration-300" />
                  
                  {/* Pulse wave animation */}
                  <div className={`absolute -inset-1 rounded-full animate-ping opacity-30 ${d.color}`} />
                </div>

                {/* District text tag on map */}
                <div className="absolute top-11 -left-4 bg-slate-950/85 border border-white/10 px-2.5 py-1 rounded-lg text-white text-[9px] font-extrabold uppercase tracking-wider shadow-md pointer-events-none whitespace-nowrap">
                  {d.name}
                </div>

                {/* Micro tooltip hovering detail */}
                <div className="absolute bottom-12 -left-20 bg-slate-950 border border-white/15 p-3 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-44 z-50 text-white space-y-1">
                  <span className="text-xs font-bold block text-brand-primary-400 pb-1 border-b border-white/10 uppercase tracking-wider">{d.name}</span>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Học sinh:</span>
                    <span className="font-mono font-bold text-[#6ffbbe]">{d.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Gia sư:</span>
                    <span className="font-mono font-bold text-brand-orange-500">{d.tutors.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-slate-400">Duyệt khớp:</span>
                    <span className="font-mono font-bold text-white">{d.rate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map legend */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-primary-500" />
              <span>Cực Cầu Đậm (Hải Châu)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-orange-500" />
              <span>Nguồn Gia Sư (Liên Chiểu)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
              <span>Địa Bàn Tiềm Năng</span>
            </div>
          </div>
        </div>

        {/* Right Pane (5cols): Anomaly, gold times & AI Assistant Chat box */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* Anomaly list matching Image 10 right bar */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2 mb-4">
              <AlertOctagon className="w-5 h-5 text-brand-orange-500 animate-pulse" />
              Phát Hiện Dị Thường (Anomaly)
            </h3>
            
            <div className="space-y-3">
              {anomalies.map((anom) => (
                <div key={anom.id} className="p-3 bg-slate-50 rounded-xl border border-slate-150 relative overflow-hidden flex gap-3 text-xs font-medium">
                  {/* Indicator banner depending on severity */}
                  <span className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                    anom.severity === 'High' ? 'bg-red-500' : anom.severity === 'Medium' ? 'bg-brand-orange-500' : 'bg-slate-400'
                  }`} />
                  
                  <div className="pl-1.5 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 block truncate max-w-[180px]">{anom.title}</span>
                      <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase shrink-0">{anom.time}</span>
                    </div>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{anom.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gold times */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary-50 text-brand-primary-600 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold text-slate-950 uppercase tracking-widest">Thời gian hoạt động cao điểm</h3>
                <span className="text-xl font-extrabold text-[#0037b0] tracking-tight">19h00 - 21h30 Hằng Ngày</span>
              </div>
            </div>
            <span className="text-[11px] font-extrabold bg-[#6ffbbe]/15 text-[#007048] py-1 px-2.5 rounded-lg border border-[#6ffbbe]/30 shrink-0 font-sans">
              85% Lượt Truy Cập
            </span>
          </div>

          {/* Interactive AI Chat sandbox matching Image 10 footer */}
          <div className="bg-slate-900 text-slate-100 rounded-3xl border border-white/5 p-5 shadow-2xl relative overflow-hidden flex flex-col justify-between h-[360px]">
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#2979ff]/10 rounded-full blur-2xl" />
            
            {/* Header chat banner */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-primary-600 flex items-center justify-center text-white text-xs font-bold">
                  AI
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">AI INSIGHT PARTNER</h4>
                  <span className="text-[9px] text-[#6ffbbe] block font-semibold uppercase tracking-wider">Live Consult System</span>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#6ffbbe] animate-pulse" />
            </div>

            {/* Messages feed */}
            <div className="flex-1 py-4 overflow-y-auto space-y-3.5 scrollbar-thin text-xs text-slate-300">
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex flex-col max-w-[85%] ${m.sender === 'User' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                >
                  <div className={`p-3 rounded-2xl leading-relaxed text-xs font-medium font-sans ${
                    m.sender === 'User' 
                      ? 'bg-brand-primary-600 text-white' 
                      : 'bg-white/5 border border-white/10 text-slate-200'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 font-semibold block">{m.timestamp}</span>
                </div>
              ))}
              {isAiLoading && (
                <div className="flex items-center gap-2 text-brand-primary-300 font-bold text-xs">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Insight Partner đang phân tích dữ liệu...
                </div>
              )}
            </div>

            {/* Chat form input */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                placeholder="Hỏi về học viên Hải Châu hoặc gia sư Liên Chiểu..."
                value={inputMessage}
                disabled={isAiLoading}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-medium focus:outline-none focus:border-brand-primary-500 text-white placeholder-slate-500"
              />
              <button 
                type="submit"
                disabled={isAiLoading}
                className="w-9 h-9 rounded-xl bg-brand-primary-600 hover:bg-brand-primary-700 text-white flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4.5 h-4.5" />
              </button>
            </form>
          </div>

        </div>

      </div>
      
    </div>
  );
}
