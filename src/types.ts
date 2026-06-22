export interface ActivityLog {
  action: string;
  timestamp: string;
  ipAddress: string;
  details: string;
}

export interface UserDetails {
  accountInfo?: {
    username: string;
    registrationDate: string;
    lastLogin: string;
    secureLevel: string;
  };
  personalInfo?: {
    gender: string;
    dob: string;
    address: string;
    education?: string;
    specialization?: string;
    skills?: string[];
    bio?: string;
  };
  activityHistory?: ActivityLog[];
  adminNotes?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Tutor' | 'Student';
  status: 'Active' | 'Pending' | 'Suspended' | 'Unverified';
  avatarUrl: string;
  createdAt: string;
  details: UserDetails;
  // Particular fields for list representation
  parent?: string; // and Student/Tutor specific fields
  classCount?: number;
  gradeLevel?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  count: number;
}

export interface Subject {
  id: string;
  name: string;
  categoryId: string;
  code: string;
  tutorsCount: number;
  classesCount: number;
  status: 'Active' | 'Inactive';
  description: string;
}

export interface KycRequest {
  id: string;
  tutorName: string;
  tutorAvatar: string;
  email: string;
  phone: string;
  major: string;
  university: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectReason?: string;
  documents: {
    idCardFront: string;
    studentCard: string;
    degreeCert: string;
  };
}

export interface ClassMatch {
  id: string;
  tutorName: string;
  studentName: string;
  subjectName: string;
  fee: number;
  rate: number;
  status: 'Active' | 'Pending' | 'Completed' | 'Cancelled';
  date: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'User' | 'AI';
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  user: string;
  role: string;
  subject: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'InProgress' | 'Closed';
  date: string;
}

export interface TutorPost {
  id: string;
  title: string;
  studentName: string;
  studentAvatar: string;
  subject: string;
  fee: string;
  date: string;
  status: 'OPEN' | 'MATCHED' | 'CANCELLED' | 'EXPIRED';
  approval: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface TutorClass {
  id: string;
  tutorName: string;
  studentName: string;
  subject: string;
  fee: string;
  startDate: string;
  status: 'ACTIVE' | 'TRIAL' | 'PENDING' | 'CANCELLED' | 'COMPLETED';
}

export interface CommissionPayment {
  id: string;
  tutorName: string;
  studentName: string;
  tuition: number;
  commissionRate: number;
  commissionAmount: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export interface ReviewItem {
  id: string;
  user: string;
  userAvatar: string;
  isAnonymous: boolean;
  avatarBg: string;
  rating: number;
  timeText: string;
  content: string;
  tag?: string;
  tagColor?: string;
  targetTutor: string;
  targetSubject: string;
  status: 'ALL' | 'PENDING' | 'HIDDEN' | 'FLAGGED';
  reportReason?: string;
}

export interface ModerationContent {
  id: string;
  type: 'POST' | 'BIO' | 'REVIEW';
  content: string;
  flagReasons: string[];
  timeText: string;
  author: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  highlightWords: string[];
}

export interface PastNotification {
  id: string;
  title: string;
  audience: string;
  timeText: string;
  readCount: number;
  totalCount: number;
  statsPercent: number;
}
