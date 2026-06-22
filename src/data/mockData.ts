import { User, Category, Subject, KycRequest, ClassMatch, SupportTicket, TutorPost, TutorClass, CommissionPayment, ReviewItem, ModerationContent, PastNotification } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: "USR-001",
    name: "Nguyễn Văn Minh",
    email: "nguyenvanminh@gmail.com",
    phone: "0948 123 456",
    role: "Tutor",
    status: "Active",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmWaeSU8SczCVfWjF4xLbrx-VkBOIQxegUEabC4NC8xJXccFgihn008Im5XsBydPPib0vG3b5JCEDaMWy4Vg1EIYWBIwog_L2Df0FrMtCKhuHEfjGx8azJDO8VJyiz6IEJVfghjgp1dzMv6cQm4KJaBPzXftF5jC7LNMXlrkgBqxfWUlaLPjdC3rLy10sg4pcnkHpE7nWfCXlC6MJ-U1WRaYU6q6JyISo1EJinMFVAX1-wu2h7cfjvLGzmRoZLgvmYwsHoSOmzEHAr",
    createdAt: "12/03/2026",
    details: {
      accountInfo: {
        username: "minh_nguyen99",
        registrationDate: "12/03/2026",
        lastLogin: "18/06/2026 14:32:10",
        secureLevel: "Cao (MFA Active)"
      },
      personalInfo: {
        gender: "Nam",
        dob: "15/10/2001",
        address: "125 Hùng Vương, Hải Châu, Đà Nẵng",
        education: "Cử nhân Đại học Bách Khoa - ĐHĐN",
        specialization: "Sư phạm Vật lý",
        skills: ["Vật lý đại cương", "Luyện thi THPT Quốc gia", "Giải tích"],
        bio: "Gia sư Vật lý 3 năm kinh nghiệm giảng dạy nhiệt tình, dễ hiểu. Có nhiều học sinh đạt điểm 9+ THPT."
      },
      activityHistory: [
        { action: "Đăng nhập hệ thống", timestamp: "18/06/2026 14:32", ipAddress: "192.168.1.10", details: "Chrome trên macOS" },
        { action: "Thay đổi mật khẩu thành công", timestamp: "15/06/2026 09:12", ipAddress: "192.168.1.4", details: "Mật khẩu bảo mật cao" },
        { action: "Cập nhật thông tin gia sư", timestamp: "10/06/2026 11:20", ipAddress: "192.168.1.3", details: "Thêm chứng chỉ Vật lý" }
      ],
      adminNotes: "Hồ sơ đầy đủ, hoạt động tích cực. Đánh giá từ phụ huynh đạt tỷ lệ cao 4.9/5.0."
    }
  },
  {
    id: "USR-002",
    name: "Nguyễn Thu Hà",
    email: "nguyenthuha@gmail.com",
    phone: "0356 789 101",
    role: "Tutor",
    status: "Active",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuACy5C9n36PR-73IfG_qeSGf6kJn3F7qx5zoyw7LXpwOoampdJ2bSZJ9tBVFCCivJUs9oyCnz0N6Ya2gpAU9jbn7eOfN2rBut0sOUlUTUsxQulxKJgeLCEIy-v5jn3VJbUc4zSCOvDzwrLa0QuRCW1BNhcZ_BSBff24RODd7E2gPpaB0dQElspoXHsv5AJjgF4Y8OdoScTwJMnn9epXhedGMpN3K5o74zFz1hXpX1eNlpzyFXnX6NqOYvCI-BBmeAjs1mF6OzJ5jWne",
    createdAt: "05/01/2026",
    details: {
      accountInfo: {
        username: "thuha_math",
        registrationDate: "05/01/2026",
        lastLogin: "18/06/2026 11:15:02",
        secureLevel: "Trung bình"
      },
      personalInfo: {
        gender: "Nữ",
        dob: "20/08/2000",
        address: "45 Lê Lợi, Thạch Thang, Hải Châu, Đà Nẵng",
        education: "Thạc sỹ Sư phạm Toán - Đại học Sư phạm Đà Nẵng",
        specialization: "Toán giải tích và hình học",
        skills: ["Toán giải tích", "Hình học không gian", "Giải tích 1"],
        bio: "Giáo viên trung học phổ thông, có định hướng giảng dạy kích thích tư duy giải toán cho học sinh mất gốc."
      },
      activityHistory: [
        { action: "Rút tiền hoa hồng", timestamp: "17/06/2026 16:10", ipAddress: "192.168.21.3", details: "Yêu cầu thanh toán 1,200,000đ" },
        { action: "Tạo lớp học mới", timestamp: "12/06/2026 08:30", ipAddress: "192.168.21.3", details: "Tạo lớp Toán Giải Tích 1" }
      ],
      adminNotes: "Giáo viên THPT cơ hữu, chuyên môn rất cao. Đã ký xác thực lý lịch tư pháp."
    }
  },
  {
    id: "USR-003",
    name: "Trần Văn Nam",
    email: "tranvannam@gmail.com",
    phone: "0905 555 777",
    role: "Tutor",
    status: "Pending",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHd2nyHHxH9zf8XpcCAaaGxaKA5tonpfH4rEdHFyiZ8a1DC2N75D3plTXkIhNAnfIroo0ciBHN4yRj5IazzCSG0X8ks80KVByOGpRaVDkpTl58wtVuvSHQrLHIEEmH6Nb1D0HwkTIVKNpKig2AFf2fHPf-TDNpQOBatRQ2MeVULIby0Zcu6SgLPk4DGiRM0bxCWDelNdojfeKxM5QAVB2vMlAo5LkTwZYxJCuvhXqY5HnldcfKl91lVbcM8q7ErpLf9aPZaY08IdKc",
    createdAt: "15/06/2026",
    details: {
      accountInfo: {
        username: "nam_tran_english",
        registrationDate: "15/06/2026",
        lastLogin: "15/06/2026 15:40:02",
        secureLevel: "Trạng thái mới tạo"
      },
      personalInfo: {
        gender: "Nam",
        dob: "02/05/1998",
        address: "56 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng",
        education: "Cử nhân Ngôn ngữ Anh - ĐH Ngoại Ngữ",
        specialization: "IELTS & Giao tiếp thương mại",
        skills: ["IELTS Reading/Writing", "Tiếng Anh giao tiếp"],
        bio: "Chứng chỉ IELTS 8.0, rèn luyện phát âm chuẩn Mỹ và phản xạ giao tiếp tự nhiên."
      },
      activityHistory: [
        { action: "Đăng ký tài khoản", timestamp: "15/06/2026 15:30", ipAddress: "1.52.203.45", details: "Đăng ký vai trò Gia sư" },
        { action: "Tải lên tài liệu KYC", timestamp: "15/06/2026 15:35", ipAddress: "1.52.203.45", details: "Căn cước, Thẻ sinh viên, Bằng đại học" }
      ],
      adminNotes: "Đang chờ duyệt KYC. Thông tin văn bằng khớp với đăng ký."
    }
  },
  {
    id: "USR-004",
    name: "Lê Thị Mai",
    email: "lethimai@gmail.com",
    phone: "0914 888 999",
    role: "Tutor",
    status: "Suspended",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCyygniiIXWdgf5h11zLGtwXCgmMMc_xx9YVesT6a54PGJkjaq8t0L3jC4Vw5QpHCTHW4ookzPOFSBLuViTJHYhNZw5IibOYSqYndX6Clf6rhs8M6BaoEUkEIPXvalLJGHJyiM1uBOOuIdWrF-oM02bzaSmeaTvUOFD8n-CsD_WtoOsZrcwcVgu8eSJOKGVRmKtajOOf1g-rBNZkfSEm8526gYflQpbrJZsJR4bxJHIknyXzfuvXp_NCA_z0AxJ7gSzXuQv_dhRDfs",
    createdAt: "10/11/2025",
    details: {
      accountInfo: {
        username: "lemai_chemistry",
        registrationDate: "10/11/2025",
        lastLogin: "01/06/2026 09:12:00",
        secureLevel: "Bảo mật Thấp"
      },
      personalInfo: {
        gender: "Nữ",
        dob: "12/03/1999",
        address: "78 Ngô Quyền, Sơn Trà, Đà Nẵng",
        education: "Đại học Sư phạm - Khoa Hóa học",
        specialization: "Hóa học hữu cơ",
        skills: ["Hóa học lớp 11, 12", "Hóa học hữu cơ nâng cao"],
        bio: "Kinh nghiệm gia sư Hóa. Tập trung vào các chuyên đề giúp học sinh vượt qua nỗi sợ hóa hữu cơ."
      },
      activityHistory: [
        { action: "Bị báo cáo vi phạm", timestamp: "02/06/2026 14:00", ipAddress: "System", details: "Báo cáo nghỉ học đột xuất 3 lần không lý do" }
      ],
      adminNotes: "Tạm khóa 30 ngày do vi phạm chính sách hủy lớp không báo trước nhiều lần."
    }
  },
  {
    id: "USR-005",
    name: "Phạm Minh Hoàng",
    email: "hoangpham@gmail.com",
    phone: "0945 999 111",
    role: "Student",
    status: "Active",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgr90-k6Ho0UNSwKZJXj0mZAA-UdfYXsPtA4jdJXbA9O9gaFQds4UZSivlBWo_bD2_x0DMFOEWyV2T9S7rAQ1LICpqvkrdJ8-hTmBI5FSBnqJw3Ivlo-HqdyvQFpimEkqeAsvHJbsyVRZJ15pcWtPUmS_zTTEUlVEPUgTdXZpj9qjVctq8Zv2yt6pnQARcv6FeZoNkVaMlVniwG0Vwgbq-Yeq6doBu4gzLQrZO388HGRYoI0Gaxb9CKUu4PsQOg3o-e6y7Ke6yE58M",
    createdAt: "20/04/2026",
    parent: "Phạm Hùng Sơn (Phụ huynh)",
    classCount: 2,
    gradeLevel: "Lớp 12",
    details: {
      accountInfo: {
        username: "hoangpham12",
        registrationDate: "20/04/2026",
        lastLogin: "18/06/2026 08:30:11",
        secureLevel: "Trung bình"
      },
      personalInfo: {
        gender: "Nam",
        dob: "05/06/2008",
        address: "K30/12 Điện Biên Phủ, Thanh Khê, Đà Nẵng",
        bio: "Học sinh lớp 12 trường chuyên Lê Quý Đôn. Đang ôn thi khối A00 (Toán, Lý, Hóa)."
      },
      activityHistory: [
        { action: "Yêu cầu kết nối gia sư", timestamp: "18/06/2026 08:15", ipAddress: "192.168.1.12", details: "Kết nối với Gia sư Vật lý Nguyễn Văn Minh" }
      ],
      adminNotes: "Gia đình có tinh thần học tập cao, đóng học phí đúng hạn. Thích gia sư có phong cách giảng chuẩn mực."
    }
  },
  {
    id: "USR-006",
    name: "Hoàng Ngọc Lan",
    email: "ngoclanhoang@gmail.com",
    phone: "0389 444 555",
    role: "Student",
    status: "Active",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgr90-k6Ho0UNSwKZJXj0mZAA-UdfYXsPtA4jdJXbA9O9gaFQds4UZSivlBWo_bD2_x0DMFOEWyV2T9S7rAQ1LICpqvkrdJ8-hTmBI5FSBnqJw3Ivlo-HqdyvQFpimEkqeAsvHJbsyVRZJ15pcWtPUmS_zTTEUlVEPUgTdXZpj9qjVctq8Zv2yt6pnQARcv6FeZoNkVaMlVniwG0Vwgbq-Yeq6doBu4gzLQrZO388HGRYoI0Gaxb9CKUu4PsQOg3o-e6y7Ke6yE58M",
    createdAt: "18/03/2026",
    parent: "Trần Thị Lan (Phụ huynh)",
    classCount: 1,
    gradeLevel: "Sinh viên năm 2",
    details: {
      accountInfo: {
        username: "ngoclan_vnu",
        registrationDate: "18/03/2026",
        lastLogin: "17/06/2026 19:40:00",
        secureLevel: "Cao"
      },
      personalInfo: {
        gender: "Nữ",
        dob: "14/02/2006",
        address: "67 Hàm Nghi, Vĩnh Trung, Thanh Khê, Đà Nẵng",
        bio: "Sinh viên trường Đại học Kinh tế ĐHĐN. Cần học bổ trợ môn Giải tích 1."
      },
      activityHistory: [
        { action: "Thanh toán học phí", timestamp: "16/06/2026 10:20", ipAddress: "192.168.32.22", details: "Học phí tháng 6 môn Giải tích 1" }
      ],
      adminNotes: "Sinh viên chăm chỉ, tiếp thu bài tốt. Sắp có bài thi giữa kỳ vào cuối tháng."
    }
  },
  {
    id: "USR-007",
    name: "Hồ Anh Tuấn",
    email: "anhtuanho@gmail.com",
    phone: "0905 111 222",
    role: "Admin",
    status: "Active",
    avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyLVcQdgenCCgJbyYUdqHvuWHUfRo6dvKcmACBssI9zQwPPoCqqsnblCVz4-3gqSudiI9WffubMmFVp8R0qytOltf9z-Ie9HwR_Cw7BSgMFWb_TUYewFVkFXMg1Ez46I-9bpFV8kGGhSFogIImtglTIEpMqnFoQw5eq5gq4TofngXgSf4A6LG3Zuo9wRtTsMrfgsY2BvyDCybzgzFOkfteIgSA16sNKIgXiiD8zS7C9Z6QCQwEcqojgxG4YKZ66Y0US9BtvvanLPfa",
    createdAt: "01/10/2025",
    details: {
      accountInfo: {
        username: "anhtuan_root",
        registrationDate: "01/10/2025",
        lastLogin: "18/06/2026 15:45:10",
        secureLevel: "Yêu cầu 2FA sinh trắc học"
      },
      personalInfo: {
        gender: "Nam",
        dob: "08/12/1990",
        address: "Trụ sở chính TutorMatch Đà Nẵng",
        education: "Thạc sỹ Khoa học Máy tính - ĐH Công Nghệ"
      },
      activityHistory: [
        { action: "Phân bổ quyền quản trị", timestamp: "18/06/2026 09:00", ipAddress: "10.0.0.1", details: "Cấp quyền kiểm duyệt viên cho Đỗ Thu Uyên" },
        { action: "Cấu hình cổng thanh toán", timestamp: "15/06/2026 14:00", ipAddress: "10.0.0.1", details: "Cập nhật khóa API MB Bank Pay" }
      ],
      adminNotes: "Quản trị viên cấp cao của hệ thống."
    }
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: "cat_tu_nhien", name: "Khoa học Tự nhiên", iconName: "Atom", count: 5 },
  { id: "cat_xa_hoi", name: "Khoa học Xã hội", iconName: "BookOpen", count: 4 },
  { id: "cat_ngoai_ngu", name: "Ngôn ngữ quốc tế", iconName: "Languages", count: 6 },
  { id: "cat_tin_hoc", name: "Công nghệ thông tin", iconName: "Cpu", count: 3 },
  { id: "cat_nghe_thuat", name: "Nghệ thuật & Năng khiếu", iconName: "Palette", count: 2 }
];

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: "SUB-001",
    name: "Vật lý đại cương",
    categoryId: "cat_tu_nhien",
    code: "PHY101",
    tutorsCount: 142,
    classesCount: 56,
    status: "Active",
    description: "Các khái niệm cơ bản về Cơ học, Nhiệt học, Điện từ và Quang học dành cho học sinh THPT và sinh viên năm nhất khối kỹ thuật."
  },
  {
    id: "SUB-002",
    name: "Hóa học hữu cơ",
    categoryId: "cat_tu_nhien",
    code: "CHM201",
    tutorsCount: 85,
    classesCount: 32,
    status: "Active",
    description: "Cấu trúc, tính chất, phản ứng và cấu tạo của các hợp chất chứa carbon."
  },
  {
    id: "SUB-003",
    name: "Sinh học phân tử",
    categoryId: "cat_tu_nhien",
    code: "BIO301",
    tutorsCount: 64,
    classesCount: 18,
    status: "Active",
    description: "Nghiên cứu thế giới sinh học ở mức độ cấu trúc và chức năng của đại phân tử sinh học DNA, RNA, Protein."
  },
  {
    id: "SUB-004",
    name: "Toán giải tích 1",
    categoryId: "cat_tu_nhien",
    code: "MTH101",
    tutorsCount: 210,
    classesCount: 120,
    status: "Active",
    description: "Giới hạn, đạo hàm, vi phân, tích phân hàm một biến và các ứng dụng thực tế."
  },
  {
    id: "SUB-005",
    name: "Lịch sử Việt Nam hiện đại",
    categoryId: "cat_xa_hoi",
    code: "HIS102",
    tutorsCount: 45,
    classesCount: 12,
    status: "Active",
    description: "Tiến trình Lịch sử Việt Nam từ triều đại nhà Nguyễn đến thời kỳ đổi mới đất nước."
  },
  {
    id: "SUB-006",
    name: "Tiếng Anh IELTS 7.0+",
    categoryId: "cat_ngoai_ngu",
    code: "ENG-IELTS",
    tutorsCount: 198,
    classesCount: 84,
    status: "Active",
    description: "Luyện thi chuyên sâu 4 kỹ năng Nghe-Nói-Đọc-Viết đạt chuẩn thăng tiến band điểm từ 5.5 lên 7.0+."
  },
  {
    id: "SUB-007",
    name: "Tiếng Nhật N3",
    categoryId: "cat_ngoai_ngu",
    code: "JPN-N3",
    tutorsCount: 52,
    classesCount: 25,
    status: "Active",
    description: "Kiến thức ngữ pháp, từ vựng và đàm thoại cơ bản cho sinh viên/kỹ sư đi Nhật làm việc."
  },
  {
    id: "SUB-008",
    name: "Lập trình Python căn bản",
    categoryId: "cat_tin_hoc",
    code: "PROG-PY",
    tutorsCount: 110,
    classesCount: 48,
    status: "Active",
    description: "Làm chủ cú pháp Python, cấu trúc dữ liệu, giải thuật cơ bản và bước đầu ứng dụng khoa học dữ liệu."
  }
];

export const INITIAL_KYC_REQUESTS: KycRequest[] = [
  {
    id: "KYC-001",
    tutorName: "Trần Văn Nam",
    tutorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHd2nyHHxH9zf8XpcCAaaGxaKA5tonpfH4rEdHFyiZ8a1DC2N75D3plTXkIhNAnfIroo0ciBHN4yRj5IazzCSG0X8ks80KVByOGpRaVDkpTl58wtVuvSHQrLHIEEmH6Nb1D0HwkTIVKNpKig2AFf2fHPf-TDNpQOBatRQ2MeVULIby0Zcu6SgLPk4DGiRM0bxCWDelNdojfeKxM5QAVB2vMlAo5LkTwZYxJCuvhXqY5HnldcfKl91lVbcM8q7ErpLf9aPZaY08IdKc",
    email: "tranvannam@gmail.com",
    phone: "0905 555 777",
    major: "Ngôn ngữ Anh",
    university: "Đại học Ngoại ngữ - ĐHĐN",
    submittedAt: "17/06/2026 10:45",
    status: "Pending",
    documents: {
      idCardFront: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHJAra830jV6e4w9YJeSLd2oCuHpseSabPYr5CL2XtFxQRF7ayTzZyikO65hJ8c7bCVE76H0XPaoeb0btxcIpuElEEadVsR_fnT6Wq_il1AtSga2Lv5BJbydoX8LM1ezIuKhiPBLR8HLWk5iPsFx3vEnAIdVQu5ZWcmL5M240Ihy1YxOv0NpRiOB7T5WkONK3uKNG_HsIedu7PJvVm-NTE32x36qrCJVt_YSU_U9VKYWt9LRllQolJWpQVoXGYWbedFhXgdD7K2_Jp",
      studentCard: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN7AnPs7PN_gkSj2Dv1ulOWIj5cNHv7M0-W8c3k7QBDT2BOxXBgTF1XjpkKpHh_bUcMElSyIOus6QLnNLJ-X0-WrQL7dpWnA2I8y0Wq1wXaqLsdfieP-KOhKflMa_Wf_sOB85ECqsn4Emc9hclMc3uXnh2cRZq88CN0_xcPcVWPJ5W4ixYXn6phTbK4JTQrtY82FIxi0S_PZ34d96EbVNnhJLeoDu7RE2gRtc_vxeGsg6C50rV7ePUgrd-5NHPNT0vqaZuKqPvahgU",
      degreeCert: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTa9KpA9vtovmaxcUlNPSttD9OZ8SI1qA_XMLEUrH-JGdyJcR05XqoXQhL9SPe-cnU-PASiOmmbibeA9a0wHj6419vXadq5v0xy8Z0-_Onpw_rGO0R9JR-f2bnXLPqihw7Foz5TwiiGakD89JzfpHMKRUqMS5KSb00ccotTTCnUh1H5dC3WOQVeCorINVK6lHrn_ZveJkZTOWKZXy19jFjeMQPOQFClkEtsW0HB4L7f05kyTY1wzLr3HRTSGa4fr-R_rXIZ-hxTxGg"
    }
  },
  {
    id: "KYC-002",
    tutorName: "Đặng Thị Hồng",
    tutorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgMiRTqE4feADjn0elij4GJSXTwmkmA1usVGTrDUvkTIUQOnh7x6vhcOy9UdyKiVDIE39JKQmskumdTOM7E-Pf0KHe8eCw1XLbsF95pW2TMb_UGt04hGiZXx11dYDodwtYW5Hc-dHQucldQnpdR1Qn_3SZjqDnAVjGSQwZxO3tWVBmkGEsR5o8Fx-5BNZjgMsPu9tiPJ7F0cfi1-A1-I8zqEvaJEB9MDEiG6E4UQKHMyaKL2FOGUsWLAbhPLgSGH5joD8t1GbOI0tD",
    email: "danghong99@gmail.com",
    phone: "0321 445 667",
    major: "Sư phạm Toán",
    university: "Đại học Sư phạm - ĐHĐN",
    submittedAt: "17/06/2026 15:30",
    status: "Pending",
    documents: {
      idCardFront: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsj7Slv4anwsNwpYpd27PqsPQ_amUtBWufJouKWbSi2TTfC-_oOVNWJ4pZ-Jiwe-idy_Rnuvzw_SHDwqVA-f4lkaKN7b-4mSpo0Lkvb-O98ifqKRWF9sJcH2GUckCwpjRQ7owSVDR9cYEw5ok5u7J5HtaD6nzgADC1Dz-w_GuXhiWaFs9uu0ALO2Gg2tLuhl5KUieI_2fWjrD3Bou6iwKAfmUd2Olhrys_ZEI4MWzN3h9Bo5VzA206k_x6tU9odMinKBO6sfCdBPMG",
      studentCard: "https://lh3.googleusercontent.com/aida-public/AB6AXuC03YGRpv7s3xcnUzG9oV9z_Lwtc81y9t7BPIIQA_r8SSDdM9YaDKq0IsYW_wFiOI6HwtQpo1odv6cbq4hLfGS1-Lf7P-590bRQfuMKhZznwgcVG-6IZgCQQxnri4mbK1etZI0mLWUEmnSCs42HKNhT1oDPAirvc1LL4o2NiX26I0vA36t2ee0JfGht9aIY-BcLEsbqWeLH7iTJUZJT9Vcg4ZOq3XplkU4GwVjlhKtpMZOonEeg1hAUwEtc5ft5LGKTcp3BQIl7n1S9",
      degreeCert: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz7mnY5T2qz-2hlBzbo3liS2eIRxrlj4j7osRkj7xLYjHw_comVbMyTflejJuHlhVcLA_0i8S6t-mTYeg7YMo-Gbxmycw9TCqijImPJS50rxjZPNX95fTq40T7bNXVnPS9m8deOhGXDzxlKOX2PCvPA4xsedIGvSCxNDNU21qz4rEJa4I2nD4_zk82boulseMq7-vCkkJqUQKDR05DLh6mHImrOiFApO2pD2QOv5EUj8zexeRzLWBPYq7I-C8aGd3Q8K_e8f-JjRjW"
    }
  },
  {
    id: "KYC-003",
    tutorName: "Vũ Minh Quân",
    tutorAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCTL3y13IFnmQ-PWA7V4MprlF-d1jNRD5m6ZjpotVcxPY1yUEZIPOPtgJQoAIsl3AERReczfLnU87LvU9qxX4kbG4s2-LN3mPxS1NnqPnpv9KsgbuGNegkJcGS8FUAjH2_E508TRif4_1VVmx_SPhp3EpgBTBE8Sex_HvZbxlNBKIeehYFD8M1kFnDxQAbKvBdVs8SgYtgQpIMjYTpxfyQMYxuFZXcF9EpTceBfGMDWsjmBPioUpmcTAJdJpn0_OwEpJi3PPyZ8lQW",
    email: "vuminhquan@gmail.com",
    phone: "0934 888 123",
    major: "Khoa học Máy tính",
    university: "Đại học Bách Khoa - ĐHĐN",
    submittedAt: "18/06/2026 08:20",
    status: "Pending",
    documents: {
      idCardFront: "https://lh3.googleusercontent.com/aida-public/AB6AXuASqL-7EiFV6vMtFi1m4o1E5s3hk0GZg6Q17QiRabPcmpKKsU76LGL2mRY3u_idZZypThbNYAE-NSMV71-O7mrXwRU45bIPZU0vly2a06rcU68wh-9rmQM9QaSQhdjUdyHSypkKBJSpv2shhuuDAKCxewjXpcfQQYHHBJwwx3R-2rDm5T-HOghWhOyptGWFEoUH_XGPXPXTDe9G52jb1fDEtBsCg52qgOs7iLFqI9TS5AoaabGKAE46ztJxjeVl6Y8ynAEaZUXYXv8R",
      studentCard: "", // None provided or optional
      degreeCert: "https://lh3.googleusercontent.com/aida-public/AB6AXuDargtIdniC2rhY97Olcfz1KSw7LjHx1zGFcxmte_kdweP9QwbXDNtJPIN_Lwpc4Lo3NupSh5li7qDsNZ1b3icFM12pGWVzYlaDn56115ZI77ugHSLcdA13cSConFuUTK_7ci_eCaNPbOyTl0olBvHzxWsJXex-5KvXDwfGyedlwJthxPfZr9vxEERDupzUUgOczoRjWG0wIBgGQReffR9v5fHShfzhR0tOrLmuHRpVZ1C-MU-BIDO_N2B2mC4ljfkZ8BcYFF_dsjHA"
    }
  }
];

export const INITIAL_CLASSES: ClassMatch[] = [
  { id: "CLS-001", tutorName: "Nguyễn Văn Minh", studentName: "Phạm Minh Hoàng", subjectName: "Vật lý đại cương", fee: 250000, rate: 95, status: "Active", date: "18/06/2026" },
  { id: "CLS-002", tutorName: "Nguyễn Thu Hà", studentName: "Hoàng Ngọc Lan", subjectName: "Toán giải tích 1", fee: 300000, rate: 98, status: "Active", date: "16/06/2026" },
  { id: "CLS-003", tutorName: "Đặng Thị Hồng", studentName: "Bùi Quốc Tuấn", subjectName: "Toán hình học 12", fee: 220000, rate: 92, status: "Pending", date: "17/06/2026" },
  { id: "CLS-004", tutorName: "Nguyễn Văn Minh", studentName: "Trần Anh Thư", subjectName: "Vật lý lớp 12", fee: 280000, rate: 94, status: "Active", date: "10/06/2026" },
  { id: "CLS-005", tutorName: "Lê Thị Mai", studentName: "Nguyễn Bảo Nam", subjectName: "Hóa học hữu cơ", fee: 250000, rate: 89, status: "Cancelled", date: "01/06/2026" },
  { id: "CLS-006", tutorName: "Nguyễn Thu Hà", studentName: "Lê Thị Hồng", subjectName: "Toán luyện thi đại học", fee: 350000, rate: 99, status: "Completed", date: "15/05/2026" }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  { id: "TCK-101", user: "Phạm Minh Hoàng", role: "Học viên", subject: "Lỗi thanh toán học phí qua MBBank", priority: "High", status: "Open", date: "18/06/2026" },
  { id: "TCK-102", user: "Nguyễn Thu Hà", role: "Gia sư", subject: "Báo lỗi hiển thị lịch dạy tuần này", priority: "Medium", status: "InProgress", date: "17/06/2026" },
  { id: "TCK-103", user: "Lê Thị Mai", role: "Gia sư", subject: "Khiếu nại về quyết định tạm ngưng tài khoản", priority: "High", status: "Open", date: "16/06/2026" },
  { id: "TCK-104", user: "Trần Anh Thư", role: "Học viên", subject: "Yêu cầu thay đổi gia sư dạy kèm Anh văn", priority: "Low", status: "Closed", date: "10/06/2026" }
];

export const initialPosts: TutorPost[] = [
  {
    id: '#POST-2034',
    title: 'Tìm gia sư Toán 12 ôn thi THPTQG',
    studentName: 'Nguyễn Lan',
    studentAvatar: 'NL',
    subject: 'Toán học',
    fee: '350.000đ/buổi',
    date: '24/05/2024',
    status: 'OPEN',
    approval: 'PENDING'
  },
  {
    id: '#POST-2029',
    title: 'Gia sư Tiếng Anh IELTS 6.5+',
    studentName: 'Trần Quân',
    studentAvatar: 'TQ',
    subject: 'Tiếng Anh',
    fee: '500.000đ/buổi',
    date: '23/05/2024',
    status: 'MATCHED',
    approval: 'APPROVED'
  },
  {
    id: '#POST-2025',
    title: 'Dạy đàn Piano cho trẻ em tại nhà',
    studentName: 'Minh Anh',
    studentAvatar: 'MA',
    subject: 'Năng khiếu',
    fee: '450.000đ/buổi',
    date: '22/05/2024',
    status: 'CANCELLED',
    approval: 'REJECTED'
  },
  {
    id: '#POST-2018',
    title: 'Luyện thi SAT cấp tốc 2 tháng',
    studentName: 'Hoàng Phúc',
    studentAvatar: 'HP',
    subject: 'Tiếng Anh',
    fee: '800.000đ/buổi',
    date: '20/05/2024',
    status: 'EXPIRED',
    approval: 'APPROVED'
  },
  {
    id: '#POST-2014',
    title: 'Học vẽ màu nước cơ bản',
    studentName: 'Lê Vy',
    studentAvatar: 'LV',
    subject: 'Mỹ thuật',
    fee: '300.000đ/buổi',
    date: '19/05/2024',
    status: 'OPEN',
    approval: 'APPROVED'
  },
  {
    id: '#POST-2011',
    title: 'Bồi dưỡng Lý 10 nâng cao',
    studentName: 'Phạm Nam',
    studentAvatar: 'PN',
    subject: 'Vật Lý',
    fee: '400.000đ/buổi',
    date: '18/05/2024',
    status: 'MATCHED',
    approval: 'APPROVED'
  }
];

export const initialClasses: TutorClass[] = [
  {
    id: '#CL-8821',
    tutorName: 'Nguyễn Lam',
    studentName: 'Lê Hoàng Nam',
    subject: 'Toán 12',
    fee: '250.000đ/buổi',
    startDate: '12/10/2023',
    status: 'ACTIVE'
  },
  {
    id: '#CL-8822',
    tutorName: 'Phạm Thảo',
    studentName: 'Trần Anh Tú',
    subject: 'Tiếng Anh',
    fee: '300.000đ/buổi',
    startDate: '15/10/2023',
    status: 'TRIAL'
  },
  {
    id: '#CL-8823',
    tutorName: 'Vũ Huy',
    studentName: 'Đỗ Lan Anh',
    subject: 'Vật Lý 11',
    fee: '220.000đ/buổi',
    startDate: '--/--/----',
    status: 'PENDING'
  },
  {
    id: '#CL-8824',
    tutorName: 'Kim Huệ',
    studentName: 'Mai Trung Hiếu',
    subject: 'Hóa Học 10',
    fee: '200.000đ/buổi',
    startDate: '05/10/2023',
    status: 'CANCELLED'
  },
  {
    id: '#CL-8825',
    tutorName: 'Quốc Trung',
    studentName: 'Phạm Minh Anh',
    subject: 'Sinh Học 12',
    fee: '280.000đ/buổi',
    startDate: '01/09/2023',
    status: 'COMPLETED'
  }
];

export const initialCommissionPayments: CommissionPayment[] = [
  {
    id: '#TM-9281',
    tutorName: 'Dr. Aris Thorne',
    studentName: 'Maria G.',
    tuition: 450,
    commissionRate: 12,
    commissionAmount: 54,
    dueDate: 'Jun 12, 2024',
    status: 'PAID'
  },
  {
    id: '#TM-9284',
    tutorName: 'Prof. Sarah Jenkins',
    studentName: 'Leo K.',
    tuition: 800,
    commissionRate: 15,
    commissionAmount: 120,
    dueDate: 'Jun 18, 2024',
    status: 'PENDING'
  },
  {
    id: '#TM-9275',
    tutorName: 'Marcus Vane',
    studentName: 'Chloe R.',
    tuition: 200,
    commissionRate: 10,
    commissionAmount: 20,
    dueDate: 'Jun 05, 2024',
    status: 'OVERDUE'
  },
  {
    id: '#TM-9290',
    tutorName: 'Elena Rodriguez',
    studentName: 'James B.',
    tuition: 1200,
    commissionRate: 12,
    commissionAmount: 144,
    dueDate: 'Jun 20, 2024',
    status: 'PENDING'
  },
  {
    id: '#TM-9295',
    tutorName: 'Samuel Lee',
    studentName: 'Nina T.',
    tuition: 600,
    commissionRate: 12,
    commissionAmount: 72,
    dueDate: 'Jun 10, 2024',
    status: 'PAID'
  }
];

export const initialReviews: ReviewItem[] = [
  {
    id: 'rev-01',
    user: 'Nguyễn Thu Thảo',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    isAnonymous: false,
    avatarBg: 'bg-rose-100',
    rating: 1,
    timeText: '1 sao • 2 giờ trước',
    content: '"Gia sư giảng bài rất hay và dễ hiểu, mình đã cải thiện được điểm số rất nhiều sau 2 tháng học cùng anh. Rất recommend mọi người nha!"',
    tag: 'AI: Mâu thuẫn',
    tagColor: 'bg-amber-100 text-amber-800 border-amber-200',
    targetTutor: 'Trần Văn Hoàng',
    targetSubject: 'Math',
    status: 'FLAGGED',
    reportReason: 'Lưu ý AI: Nội dung khen ngợi tích cực nhưng đánh giá 1 sao. Có thể là nhầm lẫn.'
  },
  {
    id: 'rev-02',
    user: 'Ẩn danh',
    userAvatar: '',
    isAnonymous: true,
    avatarBg: 'bg-slate-100 text-slate-500',
    rating: 5,
    timeText: '5 sao • 1 ngày trước',
    content: '"Thầy dạy quá giỏi, điểm IELTS của mình từ 5.5 lên 7.5 luôn. Link tài liệu xịn ở đây: bit.ly/tai-lieu-mien-phi-xyz"',
    tag: 'Đã báo cáo vi phạm',
    tagColor: 'bg-rose-100 text-rose-800 border-rose-200',
    targetTutor: 'Lê Minh Tuấn',
    targetSubject: 'IELTS',
    status: 'PENDING',
    reportReason: 'LÝ DO BÁO CÁO: Chứa link quảng cáo, spam ngoài lề bài học. Do Gia sư báo cáo.'
  },
  {
    id: 'rev-03',
    user: 'Phạm Minh Quân',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    isAnonymous: false,
    avatarBg: 'bg-emerald-100',
    rating: 4,
    timeText: '4 sao • 3 ngày trước',
    content: '"Cô Ngân nhiệt tình lắm ạ, giảng bài rất kĩ. Chỉ là đôi khi mạng bên cô hơi lag chút xíu nên thi thoảng bị gián đoạn. Còn lại mọi thứ đều tuyệt vời."',
    targetTutor: 'Ngô Kim Ngân',
    targetSubject: 'Chemistry',
    status: 'PENDING'
  },
  {
    id: 'rev-04',
    user: 'Lê Hải Yến',
    userAvatar: '',
    isAnonymous: false,
    avatarBg: 'bg-indigo-100 text-indigo-500',
    rating: 2,
    timeText: '2 sao • 1 tuần trước',
    content: '"Gia sư đến muộn 15 phút mà không báo trước. Nội dung dạy cũng bình thường, không có gì nổi bật so với giá tiền."',
    targetTutor: 'Đặng Thái Sơn',
    targetSubject: 'Physics',
    status: 'HIDDEN'
  }
];

export const initialModerationList: ModerationContent[] = [
  {
    id: '#P-2314',
    type: 'POST',
    content: 'Chào mọi người, mình nhận dạy kèm Toán tại nhà. Liên hệ mình qua số 0901234567 hoặc qua email tutor@gmail.com nhé...',
    flagReasons: ['Chứa SĐT', 'Chứa Email'],
    timeText: '15 phút trước',
    author: 'Hoàng Nam',
    status: 'PENDING',
    highlightWords: ['0901234567', 'tutor@gmail.com']
  },
  {
    id: '#U-8821',
    type: 'BIO',
    content: 'Gia sư chuyên nghiệp, có lừa đảo không bao giờ. Cam kết kết quả cao, không học phí nếu không hiệu quả...',
    flagReasons: ['Từ nhạy cảm'],
    timeText: '42 phút trước',
    author: 'Minh Tuấn',
    status: 'PENDING',
    highlightWords: ['lừa đảo']
  },
  {
    id: '#R-1029',
    type: 'REVIEW',
    content: 'Người dạy này rất vớ vẩn, không có kiến thức sư phạm gì cả. Đừng ai vào học...',
    flagReasons: ['Công kích cá nhân'],
    timeText: '2 giờ trước',
    author: 'User_992',
    status: 'PENDING',
    highlightWords: ['vớ vẩn']
  }
];

export const initialPastNotifications: PastNotification[] = [
  {
    id: 'nt-01',
    title: 'Cập nhật chính sách bảo mật cho toàn hệ thống',
    audience: 'Tất cả',
    timeText: '12:30, 24/05/2024',
    readCount: 1200,
    totalCount: 1500,
    statsPercent: 80
  },
  {
    id: 'nt-02',
    title: 'Khóa học Toán mới ra mắt tại Đà Nẵng',
    audience: 'Học viên',
    timeText: '09:15, 22/05/2024',
    readCount: 840,
    totalCount: 2000,
    statsPercent: 42
  },
  {
    id: 'nt-03',
    title: 'Hướng dẫn đăng ký tài khoản cho Gia Sư Premium',
    audience: 'Gia sư',
    timeText: '16:45, 20/05/2024',
    readCount: 460,
    totalCount: 500,
    statsPercent: 92
  },
  {
    id: 'nt-04',
    title: 'Bảo trì hệ thống định kỳ',
    audience: 'Tất cả',
    timeText: '23:00, 18/05/2024',
    readCount: 2380,
    totalCount: 3500,
    statsPercent: 68
  }
];
