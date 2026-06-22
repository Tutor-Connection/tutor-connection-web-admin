import React, { useState } from 'react';
import { 
  INITIAL_USERS, 
  INITIAL_CATEGORIES, 
  INITIAL_SUBJECTS, 
  INITIAL_KYC_REQUESTS, 
  INITIAL_CLASSES, 
  INITIAL_TICKETS,
  initialPosts,
  initialClasses as consoleClassesInitial,
  initialCommissionPayments,
  initialReviews,
  initialModerationList,
  initialPastNotifications
} from './data/mockData';
import { User, Category, Subject, KycRequest, ClassMatch, SupportTicket, TutorPost, TutorClass, CommissionPayment, ReviewItem, ModerationContent, PastNotification } from './types';

// Import Views
import LoginView from './components/LoginView';
import WelcomeView from './components/WelcomeView';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import UserManagementView from './components/UserManagementView';
import UserDetailModal from './components/UserDetailModal';
import SubjectManagementView from './components/SubjectManagementView';
import KycVerificationView from './components/KycVerificationView';
import ReportsView from './components/ReportsView';
import ClassesView from './components/ClassesView';
import RevenueView from './components/RevenueView';
import SupportTicketsView from './components/SupportTicketsView';
import SettingsView from './components/SettingsView';

import ClassManagement from './components/ClassManagement';
import ContentModeration from './components/ContentModeration';
import NotificationManagement from './components/NotificationManagement';
import PostManagement from './components/PostManagement';
import ReportsAndStats from './components/ReportsAndStats';
import RevenueManagement from './components/RevenueManagement';
import ReviewManagement from './components/ReviewManagement';

import { Sparkles, Calendar, BookOpen, UserCheck, HelpCircle } from 'lucide-react';

export default function App() {
  // App routing pages: 'login' | 'welcome' | 'app' 
  const [page, setPage] = useState<'login' | 'welcome' | 'app'>('login');
  
  // Active dashboard navigational tabs (default is 'dashboard')
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  
  // Role switcher: 'Admin' | 'Tutor' | 'Student'
  const [userRole, setUserRole] = useState<'Admin' | 'Tutor' | 'Student'>('Admin');
  
  // Sidebar expand/collapse state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Core Local Persistence State (Interactive Database)
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [subjects, setSubjects] = useState<Subject[]>(INITIAL_SUBJECTS);
  const [kycRequests, setKycRequests] = useState<KycRequest[]>(INITIAL_KYC_REQUESTS);
  const [classes, setClasses] = useState<ClassMatch[]>(INITIAL_CLASSES);
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);

  // Console specific state
  const [posts, setPosts] = useState(initialPosts);
  const [consoleClasses, setConsoleClasses] = useState(consoleClassesInitial);
  const [payments, setPayments] = useState(initialCommissionPayments);
  const [reviews, setReviews] = useState(initialReviews);
  const [moderationList, setModerationList] = useState(initialModerationList);
  const [notifications, setNotifications] = useState(initialPastNotifications);
  const [searchQuery, setSearchQuery] = useState('');

  const reviewPendingCount = reviews.filter(r => r.status === 'PENDING' || r.status === 'FLAGGED').length;
  const postPendingCount = posts.filter(p => p.approval === 'PENDING').length;
  const modPendingCount = moderationList.filter(m => m.status === 'PENDING').length;
  
  // User selected for looking closely inside Nguyễn Văn Minh Modal
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Admin Profile info
  const adminInfo = {
    name: 'Hồ Anh Tuấn',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyLVcQdgenCCgJbyYUdqHvuWHUfRo6dvKcmACBssI9zQwPPoCqqsnblCVz4-3gqSudiI9WffubMmFVp8R0qytOltf9z-Ie9HwR_Cw7BSgMFWb_TUYewFVkFXMg1Ez46I-9bpFV8kGGhSFogIImtglTIEpMqnFoQw5eq5gq4TofngXgSf4A6LG3Zuo9wRtTsMrfgsY2BvyDCybzgzFOkfteIgSA16sNKIgXiiD8zS7C9Z6QCQwEcqojgxG4YKZ66Y0US9BtvvanLPfa',
    role: 'Root Administrator'
  };

  const handleLoginSuccess = (role: 'Admin' | 'Tutor' | 'Student') => {
    setUserRole(role);
    setPage('welcome');
  };

  const handleSelectRoleFromWelcome = (selectedRole: 'Admin' | 'Tutor' | 'Student') => {
    setUserRole(selectedRole);
    if (selectedRole === 'Admin') {
      setPage('app');
      setCurrentTab('dashboard');
    } else {
      // Prompt nice descriptive role feedback for simulated login redirects
      alert(`Đăng nhập cổng ${selectedRole === 'Tutor' ? 'Gia sư' : 'Học viên'} thành công! Giao diện client-side đang định tuyến, đang trỏ bảng điều khiển trung tâm...`);
      setPage('app');
      setCurrentTab('dashboard'); // Redirect to central dashboard representing administrative audit
    }
  };

  const handleLogout = () => {
    setPage('login');
    setSelectedUser(null);
  };

  // ----------------------------------------------------
  // INTERACTIVE DATABASE HANDLERS
  // ----------------------------------------------------
  
  // User notes update
  const handleSaveUserNotes = (userId: string, notes: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          details: {
            ...u.details,
            adminNotes: notes
          }
        };
      }
      return u;
    }));
  };

  // Add User
  const handleAddUser = (newUser: User) => {
    setUsers(prev => [newUser, ...prev]);
  };

  // Delete User
  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  // Update Status
  const handleUpdateUserStatus = (userId: string, status: User['status']) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, status };
      }
      return u;
    }));
  };

  // Add Category
  const handleAddCategory = (newCat: Category) => {
    setCategories(prev => [...prev, newCat]);
  };

  // Delete Category
  const handleDeleteCategory = (catId: string) => {
    setCategories(prev => prev.filter(c => c.id !== catId));
  };

  // Add Subject
  const handleAddSubject = (newSub: Subject) => {
    setSubjects(prev => [...prev, newSub]);
    // Increment category count
    setCategories(prev => prev.map(c => {
      if (c.id === newSub.categoryId) {
        return { ...c, count: c.count + 1 };
      }
      return c;
    }));
  };

  // Delete Subject
  const handleDeleteSubject = (subId: string) => {
    const subToDelete = subjects.find(s => s.id === subId);
    setSubjects(prev => prev.filter(s => s.id !== subId));
    if (subToDelete) {
      setCategories(prev => prev.map(c => {
        if (c.id === subToDelete.categoryId) {
          return { ...c, count: Math.max(0, c.count - 1) };
        }
        return c;
      }));
    }
  };

  // KYC Approval
  const handleApproveKyc = (reqId: string) => {
    const req = kycRequests.find(r => r.id === reqId);
    if (!req) return;

    // 1. Change KYC status
    setKycRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Approved' } : r));

    // 2. Cohesively activate corresponding tutor profile in database
    setUsers(prev => prev.map(u => {
      if (u.name === req.tutorName || u.email === req.email) {
        return { ...u, status: 'Active' };
      }
      return u;
    }));
    
    alert(`Đã phê duyệt hồ sơ KYC thành công! Gia sư ${req.tutorName} đã được kích hoạt trạng thái Đang Hoạt Động.`);
  };

  // KYC Rejection
  const handleRejectKyc = (reqId: string, reason: string) => {
    const req = kycRequests.find(r => r.id === reqId);
    if (!req) return;

    // 1. Change KYC status to Rejected
    setKycRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Rejected', rejectReason: reason } : r));
    
    // 2. Set user status to Suspended / Suspicious
    setUsers(prev => prev.map(u => {
      if (u.name === req.tutorName || u.email === req.email) {
        return { ...u, status: 'Suspended' };
      }
      return u;
    }));

    alert(`Đã từ chối hồ sơ của ${req.tutorName}. Lý do: "${reason}". Hồ sơ đã được đánh nhãn tạm khóa.`);
  };

  // Delete Class Match
  const handleDeleteClass = (classId: string) => {
    setClasses(prev => prev.filter(c => c.id !== classId));
  };

  // Update Class Status
  const handleUpdateClassStatus = (classId: string, status: ClassMatch['status']) => {
    setClasses(prev => prev.map(c => c.id === classId ? { ...c, status } : c));
  };

  // Update Support Ticket status
  const handleUpdateTicketStatus = (ticketId: string, status: SupportTicket['status']) => {
    setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status } : t));
  };

  // Delete Support Ticket
  const handleDeleteTicket = (ticketId: string) => {
    setTickets(prev => prev.filter(t => t.id !== ticketId));
  };

  // ----------------------------------------------------
  // VIEW ROUTER switcher
  // ----------------------------------------------------
  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView 
            classes={classes} 
            usersCount={users.length}
            onNavigateTab={(tab) => setCurrentTab(tab)} 
          />
        );
      case 'users':
        return (
          <UserManagementView 
            users={users}
            onSelectUser={(user) => setSelectedUser(user)}
            onAddUser={handleAddUser}
            onDeleteUser={handleDeleteUser}
            onUpdateStatus={handleUpdateUserStatus}
          />
        );
      case 'subjects':
        return (
          <SubjectManagementView 
            categories={categories}
            subjects={subjects}
            onAddCategory={handleAddCategory}
            onAddSubject={handleAddSubject}
            onDeleteSubject={handleDeleteSubject}
            onDeleteCategory={handleDeleteCategory}
          />
        );
      case 'classes':
        return (
          <ClassesView 
            classes={classes} 
            onDeleteClass={handleDeleteClass}
            onUpdateStatus={handleUpdateClassStatus}
          />
        );
      case 'kyc':
        return (
          <KycVerificationView 
            requests={kycRequests}
            onApprove={handleApproveKyc}
            onReject={handleRejectKyc}
          />
        );
      case 'reports':
        return <ReportsView />;
      case 'tickets':
        return (
          <SupportTicketsView 
            tickets={tickets} 
            onUpdateStatus={handleUpdateTicketStatus}
            onDeleteTicket={handleDeleteTicket}
          />
        );
      case 'settings':
        return <SettingsView />;
      case 'posts':
        return (
          <PostManagement 
            posts={posts} 
            setPosts={setPosts} 
            searchQuery={searchQuery} 
          />
        );
      case 'console-classes':
        return (
          <ClassManagement 
            classes={consoleClasses} 
            setClasses={setConsoleClasses} 
            searchQuery={searchQuery} 
          />
        );
      case 'revenue':
        return (
          <RevenueManagement 
            payments={payments} 
            setPayments={setPayments} 
            searchQuery={searchQuery} 
          />
        );
      case 'reviews':
        return (
          <ReviewManagement 
            reviews={reviews} 
            setReviews={setReviews} 
            searchQuery={searchQuery} 
          />
        );
      case 'moderation':
        return (
          <ContentModeration 
            moderationList={moderationList} 
            setModerationList={setModerationList} 
            searchQuery={searchQuery} 
          />
        );
      case 'notifications':
        return (
          <NotificationManagement 
            notifications={notifications} 
            setNotifications={setNotifications} 
          />
        );
      case 'console-reports':
        return <ReportsAndStats />;
      default:
        return (
          <div className="p-8 text-center text-slate-400 font-bold text-xs bg-white rounded-3xl border border-slate-100">
            Tính năng đang được phát triển...
          </div>
        );
    }
  };

  // Check which page to render globally
  if (page === 'login') {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  if (page === 'welcome') {
    return (
      <WelcomeView 
        userRole={userRole} 
        onSelectRole={handleSelectRoleFromWelcome} 
        onLogout={handleLogout} 
      />
    );
  }

  // CORE APPLICATION SHELL (SIDEBAR + TOP NAVBAR + CONTAINER VIEW)
  return (
    <div id="mainApplicationShell" className="flex bg-[#f8fafc] font-sans min-h-screen">
      
      {/* Dynamic Sidebar nav */}
      <Sidebar 
        currentTab={currentTab}
        onChangeTab={(tab) => setCurrentTab(tab)}
        onLogout={handleLogout}
        adminInfo={adminInfo}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        reviewPendingCount={reviewPendingCount}
        postPendingCount={postPendingCount}
        modPendingCount={modPendingCount}
      />

      {/* Main Container workspace */}
      <main className="flex-1 overflow-y-auto max-h-screen relative p-6 sm:p-8 lg:p-10 space-y-8">
        
        {/* Top Navbar Header */}
        <header className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary-500 animate-ping" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
              ROLE: {userRole === 'Admin' ? 'SUPER ROOT' : userRole === 'Tutor' ? 'GIA SƯ AUDIT' : 'HỌC VIÊN AUDIT'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="text-right hidden md:block">
              <span className="text-slate-800 block text-xs">{adminInfo.name}</span>
              <span className="text-slate-400 text-[10px] block mt-0.5 font-mono">{adminInfo.role} • Da Nang Center</span>
            </div>
            
            <button
              onClick={() => {
                setPage('welcome');
              }}
              className="px-3.5 py-1.5 bg-brand-primary-50 text-brand-primary-700 rounded-xl border border-brand-primary-100 cursor-pointer transition uppercase text-[10px] font-extrabold flex items-center gap-1.5"
            >
              Cổng phân vai
            </button>
          </div>
        </header>

        {/* Selected view slot */}
        <section className="min-h-[70vh]">
          {renderTabContent()}
        </section>

        {/* Global Modal View: Nguyễn Văn Minh profile details */}
        <UserDetailModal 
          isOpen={selectedUser !== null}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
          onSaveNotes={handleSaveUserNotes}
        />
        
        {/* Footer info in margins */}
        <footer className="text-center text-[10px] text-slate-400 font-semibold font-mono border-t border-slate-100 pt-6">
          TUTORMATCH CONTROL ROOM SYSTEM • VERSION 4.2.0 • BUILT SECURELY IN SANDBOX CONTAINER
        </footer>
      </main>
    </div>
  );
}
