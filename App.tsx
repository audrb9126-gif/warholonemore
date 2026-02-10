import React, { useState, useEffect, useRef } from 'react';
import { CHARACTERS, MOCK_TASKS, MOCK_STORE_ITEMS, MOCK_POSTS, COUNTRIES, STORE_CATEGORIES, MOCK_CHAT_ROOMS } from './constants';
//import ChatBot from './components/ChatBot';
import { 
  Home, ShoppingBag, MessageSquare, Users, MessageCircle, 
  Search, Bell, Bookmark, Settings, Plus, 
  ChevronRight, ChevronLeft, MapPin, CheckCircle2, Circle,
  LogOut, HelpCircle,
  CreditCard, Smartphone, Bus, Banknote, Trash2, Plane, Calendar, Briefcase, Globe, FileText, ArrowRight, X, Star, Clock, Phone,
  Menu, ThumbsUp, MessageSquare as MessageIcon, User, Edit3, Shield, CreditCard as CardIcon, Check, ExternalLink, Info as InfoIcon,
  PartyPopper, ShoppingCart, Send as SendIcon, Sparkles, Inbox
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { TabType } from './types';

// Importing the image as requested (Using the high-quality 3D URL directly for stability in this environment)
const PilotImg = "https://i.postimg.cc/Y0rSvJX0/pilot-removebg-preview.png";

// Expert Data Definition
const EXPERTS = [
  {
    id: 1,
    name: "권정빈 행정사",
    role: "대표 행정사",
    firm: "로엘행정사법인",
    location: "경기도 수원시 영통구",
    rate: "100%",
    imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200",
    headerColor: "from-slate-700 to-slate-900"
  },
  {
    id: 2,
    name: "최지원 행정사",
    role: "비자 전문",
    firm: "더바른 행정사무소",
    location: "서울 강남구 역삼동",
    rate: "98%",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    headerColor: "from-blue-700 to-blue-900"
  },
  {
    id: 3,
    name: "박민수 행정사",
    role: "해외 정착",
    firm: "글로벌 비자 센터",
    location: "부산 해운대구 우동",
    rate: "99%",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
    headerColor: "from-green-700 to-green-900"
  }
];

const FLAG_MAP: Record<string, string> = { 
  '호주': '🇦🇺', '캐나다': '🇨🇦', '뉴질랜드': '🇳🇿', '일본': '🇯🇵', 
  '영국': '🇬🇧', '독일': '🇩🇪', '프랑스': '🇫🇷', '아일랜드': '🇮🇪' 
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCountry, setSelectedCountry] = useState('au');
  const [prepTab, setPrepTab] = useState('출국 전');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarkTab, setBookmarkTab] = useState<'store' | 'community'>('store');
  
  // Welcome Popup State
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  // State for Completed Category Tabs
  const [completedTabs, setCompletedTabs] = useState<string[]>([]);

  // State for Completed Tasks (List Items)
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(
    MOCK_TASKS.filter(t => t.isCompleted).map(t => t.id)
  );

  // State for Cart Items (Linked to Saved Items in MyPage)
  const [cartItems, setCartItems] = useState<string[]>([]);

  // Find current country data
  const currentCountry = COUNTRIES.find(c => c.id === selectedCountry);
  
  // Inquiry Modal State
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isInquirySuccess, setIsInquirySuccess] = useState(false);

  // Review Modal State (Guest Review)
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewContent, setReviewContent] = useState('');
  const [isSendingReview, setIsSendingReview] = useState(false);
  const [isReviewSent, setIsReviewSent] = useState(false);

  // Upgrade Plan Modal State
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  
  // Account Info Edit States
  const [email, setEmail] = useState("hong.gildong@example.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailSuccessMsg, setEmailSuccessMsg] = useState("");

  const [phone, setPhone] = useState("010-1234-5678");
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneSuccessMsg, setPhoneSuccessMsg] = useState("");
  
  // Community States
  const [communityCategory, setCommunityCategory] = useState('최신'); // Top Tabs: '인기', '최신', '추천'
  const [communityFilter, setCommunityFilter] = useState('전체글'); // Sidebar: '전체글', '공지사항', etc.
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  // Reservation State
  const [calendarDate, setCalendarDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reservationStep, setReservationStep] = useState<1 | 2>(1); // 1: DateTime, 2: Details
  const [reservationNote, setReservationNote] = useState('');
  const [isReservationSuccess, setIsReservationSuccess] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right'); // Animation direction for reservation

  // Expert Slider State
  const [currentExpertIndex, setCurrentExpertIndex] = useState(0);
  const [expertSlideDir, setExpertSlideDir] = useState<'left' | 'right'>('right');

  // Departure Date State (My Journey)
  // Default set to 2027-03-15 as per requirement start range
  const [departureDate, setDepartureDate] = useState(new Date('2027-03-15'));
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
  const [departureViewDate, setDepartureViewDate] = useState(new Date('2027-03-01'));
  const [departureSlideDir, setDepartureSlideDir] = useState<'left' | 'right'>('right');

  // Store Tab State
  const [activeStoreCategory, setActiveStoreCategory] = useState('어학과정');
  
  // Chat Tab State
  const [activeChatCountry, setActiveChatCountry] = useState('호주');

  // Right Column Mode: 'default', 'task_detail', 'reservation'
  const [rightColMode, setRightColMode] = useState<'default' | 'task_detail' | 'reservation'>('default');
  
  // Ref for scroll to preparation list
  const prepListRef = useRef<HTMLDivElement>(null);

  const selectedTask = MOCK_TASKS.find(t => t.id === selectedTaskId);

  // Sync selected task with right column mode
  useEffect(() => {
    if (selectedTaskId) {
      setRightColMode('task_detail');
    } else if (rightColMode === 'task_detail') {
      setRightColMode('default');
    }
  }, [selectedTaskId]);

  // Reset states when modal closes or opens
  useEffect(() => {
     if (showInquiryModal) {
         setIsInquirySuccess(false);
         setInquiryMessage('');
     }
  }, [showInquiryModal]);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-area') && !target.closest('.notification-trigger')) {
        setShowNotifications(false);
      }
      if (!target.closest('.bookmark-area') && !target.closest('.bookmark-toggle')) {
         setShowBookmarks(false);
      }
    };
    if (showNotifications || showBookmarks) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showNotifications, showBookmarks]);

  const toggleTabCompletion = (e: React.MouseEvent, tab: string) => {
    e.stopPropagation();
    setCompletedTabs(prev => 
        prev.includes(tab) 
        ? prev.filter(t => t !== tab) 
        : [...prev, tab]
    );
  };

  const toggleTaskCompletion = (e: React.MouseEvent, taskId: string) => {
    e.stopPropagation();
    setCompletedTaskIds(prev => 
        prev.includes(taskId) 
        ? prev.filter(id => id !== taskId) 
        : [...prev, taskId]
    );
  };

  const toggleCartItem = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    setCartItems(prev => 
        prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };

  const handleConsultationClick = () => {
    setSelectedTaskId(null);
    setRightColMode('reservation');
    setCalendarDate(new Date()); 
    setSelectedDate(null);
    setSelectedTime(null);
    setReservationStep(1);
    setReservationNote('');
    setIsReservationSuccess(false);
  };
  
  const scrollToPrep = () => {
    prepListRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleEmailEdit = () => {
    if (isEditingEmail) {
        // Save logic
        setIsEditingEmail(false);
        setEmailSuccessMsg("수정되었습니다.");
        setTimeout(() => setEmailSuccessMsg(""), 3000);
    } else {
        setIsEditingEmail(true);
        setEmailSuccessMsg("");
    }
  };

  const handlePhoneEdit = () => {
    if (isEditingPhone) {
        // Save logic
        setIsEditingPhone(false);
        setPhoneSuccessMsg("수정되었습니다.");
        setTimeout(() => setPhoneSuccessMsg(""), 3000);
    } else {
        setIsEditingPhone(true);
        setPhoneSuccessMsg("");
    }
  };

  const togglePostBookmark = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    if (bookmarkedPosts.includes(postId)) {
      setBookmarkedPosts(prev => prev.filter(id => id !== postId));
    } else {
      setBookmarkedPosts(prev => [...prev, postId]);
    }
  };

  // Guest Review Submission Handler
  const handleReviewSubmit = async () => {
    if (!reviewContent.trim()) {
        alert('리뷰 내용을 입력해주세요.');
        return;
    }

    setIsSendingReview(true);

    const YOUR_SERVICE_ID = 'service_nd1550p';
    const YOUR_TEMPLATE_ID = 'template_xjzrn5v';
    const YOUR_PUBLIC_KEY = 'anjh4TDex5azu_ckm';

    try {
        await emailjs.send(
            YOUR_SERVICE_ID,
            YOUR_TEMPLATE_ID,
            { message: reviewContent }, // This key 'message' should match your EmailJS template variable
            YOUR_PUBLIC_KEY
        );
        // Show success state in modal instead of alert
        setIsReviewSent(true);
        setReviewContent('');
    } catch (error) {
        console.error('EmailJS Error:', error);
        alert('리뷰 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
        setIsSendingReview(false);
    }
  };

  // Calendar Helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Helper: Check if date is today or past
  const isPastOrToday = (targetYear: number, targetMonth: number, targetDay: number) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetYear, targetMonth, targetDay);
    return target <= today;
  };

  // Helper: Calculate D-Day
  const getDDayString = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
  };

  const changeMonth = (offset: number) => {
    setSlideDirection(offset > 0 ? 'right' : 'left');
    const newDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + offset, 1);
    setCalendarDate(newDate);
    setSelectedDate(null); 
  };

  const changeDepartureMonth = (offset: number) => {
      setDepartureSlideDir(offset > 0 ? 'right' : 'left');
      const newDate = new Date(departureViewDate.getFullYear(), departureViewDate.getMonth() + offset, 1);
      
      // Limit range: 2027 ~ 2029 (3 years)
      if (newDate.getFullYear() < 2027) return;
      if (newDate.getFullYear() > 2029) return;
      
      setDepartureViewDate(newDate);
  };

  // Expert Slider Handlers
  const handleNextExpert = () => {
    setExpertSlideDir('right');
    setCurrentExpertIndex((prev) => (prev + 1) % EXPERTS.length);
  };

  const handlePrevExpert = () => {
    setExpertSlideDir('left');
    setCurrentExpertIndex((prev) => (prev - 1 + EXPERTS.length) % EXPERTS.length);
  };

  const handleReservationSubmit = () => {
      setIsReservationSuccess(true);
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'bank': return <CreditCard className="text-blue-500" size={24} />;
      case 'phone': return <Smartphone className="text-gray-600" size={24} />;
      case 'bus': return <Bus className="text-red-500" size={24} />;
      case 'money': return <Banknote className="text-green-600" size={24} />;
      case 'globe': return <Globe className="text-blue-400" size={24} />;
      case 'doc': return <FileText className="text-yellow-500" size={24} />;
      case 'home': return <Home className="text-orange-500" size={24} />;
      default: return <CheckCircle2 size={24} />;
    }
  };

  const animationStyles = `
    @keyframes slideInRight {
      0% { opacity: 0; transform: translateX(20px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInLeft {
      0% { opacity: 0; transform: translateX(-20px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    .slide-right {
      animation: slideInRight 0.3s ease-out forwards;
    }
    .slide-left {
      animation: slideInLeft 0.3s ease-out forwards;
    }
  `;

  // Render Functions for Modals
  const renderWelcomePopup = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-in fade-in duration-500 p-4" onClick={() => setShowWelcomePopup(false)}>
        <div className="bg-white border-4 border-black p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md relative text-center" onClick={(e) => e.stopPropagation()}>
            <button 
                onClick={() => setShowWelcomePopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
                <X size={24} />
            </button>
            <div className="w-20 h-20 bg-yellow-300 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-4xl">👋</span>
            </div>
            <h3 className="text-2xl font-black mb-4 italic uppercase">Welcome!</h3>
            <p className="text-sm font-bold text-gray-600 mb-8 leading-relaxed">
                워홀 원 모어에 오신 것을 환영합니다!<br/>
                서비스를 둘러보시고,<br/>
                화면 우측 상단의 <span className="inline-block bg-black text-white px-2 py-0.5 rounded mx-1 text-xs">방문자 리뷰</span> 버튼을 눌러<br/>
                여러분의 소중한 후기를 남겨주세요.
            </p>
            <button 
                onClick={() => setShowWelcomePopup(false)}
                className="w-full py-4 bg-black text-white border-2 border-black rounded-xl font-black text-lg hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
                확인했습니다!
            </button>
        </div>
    </div>
  );

  const renderUpgradeModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-in fade-in p-4" onClick={() => setShowUpgradeModal(false)}>
        <div className="bg-white w-full max-w-4xl rounded-2xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowUpgradeModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
                <X size={24} />
            </button>
            <h2 className="text-3xl font-black text-center mb-8">플랜 업그레이드</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-black transition-colors flex flex-col">
                    <h3 className="text-2xl font-black mb-2">Free</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-black">0원</span>
                        <span className="text-gray-500 font-bold">/ 월</span>
                    </div>
                    <p className="text-gray-500 font-bold text-sm mb-6">AI의 능력 체험 및 기본 정보 습득</p>
                    <button disabled className="w-full py-3 rounded-lg border-2 border-gray-200 text-gray-400 font-black mb-8 cursor-not-allowed">현재 플랜</button>
                    <ul className="space-y-4 text-sm font-bold text-gray-600">
                        <li className="flex items-center gap-2"><Check size={16} /> 기본 체크리스트 제공</li>
                        <li className="flex items-center gap-2"><Check size={16} /> 커뮤니티 글 읽기/쓰기</li>
                        <li className="flex items-center gap-2"><Check size={16} /> AI 챗봇 하루 5회 무료</li>
                        <li className="flex items-center gap-2"><Check size={16} /> 기본 비자 정보 열람</li>
                    </ul>
                </div>
                <div className="border-2 border-blue-500 bg-blue-50/30 rounded-xl p-8 relative flex flex-col">
                    <div className="absolute top-4 right-4 bg-blue-100 text-blue-600 text-xs font-black px-2 py-1 rounded">권장</div>
                    <h3 className="text-2xl font-black mb-2 text-black">Pro Global</h3>
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-black">9,900원</span>
                        <span className="text-gray-500 font-bold">/ 월</span>
                    </div>
                    <p className="text-gray-500 font-bold text-sm mb-6">성공적인 워홀을 위한 완벽한 파트너</p>
                    <button className="w-full py-3 rounded-lg bg-blue-600 text-white font-black mb-8 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">Pro로 업그레이드</button>
                    <ul className="space-y-4 text-sm font-bold text-gray-700">
                        <li className="flex items-center gap-2"><Check size={16} className="text-blue-600"/> 전문가 1:1 상담 월 1회 무료</li>
                        <li className="flex items-center gap-2"><Check size={16} className="text-blue-600"/> 무제한 AI 챗봇 상담</li>
                        <li className="flex items-center gap-2"><Check size={16} className="text-blue-600"/> 현지 일자리/숙소 우선 추천</li>
                        <li className="flex items-center gap-2"><Check size={16} className="text-blue-600"/> 영문 이력서 AI 자동 첨삭</li>
                        <li className="flex items-center gap-2"><Check size={16} className="text-blue-600"/> 광고 없는 쾌적한 환경</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );

  const renderInquiryModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-in fade-in duration-200 p-4">
        <div className="bg-white border-4 border-black p-6 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-sm relative" onClick={(e) => e.stopPropagation()}>
            <button 
                onClick={() => setShowInquiryModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
                <X size={24} />
            </button>
            {!isInquirySuccess ? (
                <>
                    <h3 className="text-xl font-black mb-1">간편 문의</h3>
                    <p className="text-xs font-bold text-gray-500 mb-4">{EXPERTS[currentExpertIndex].name}에게 짧은 메세지를 보내보세요.</p>
                    <div className="relative">
                        <textarea
                            className="w-full h-32 bg-gray-50 border-2 border-black p-4 rounded-lg font-bold text-sm resize-none focus:bg-white transition-colors placeholder:text-gray-400 focus:outline-none"
                            placeholder="문의 내용을 입력해주세요."
                            maxLength={50}
                            value={inquiryMessage}
                            onChange={(e) => setInquiryMessage(e.target.value)}
                        />
                        <div className="absolute bottom-3 right-3 text-xs font-black text-gray-400">
                            {inquiryMessage.length} / 50
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            if(inquiryMessage.trim().length === 0) return;
                            setIsInquirySuccess(true);
                        }}
                        className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-black text-sm hover:bg-blue-700 transition-colors border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                    >
                        문의 보내기
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 border-2 border-black">
                        <Check size={32} className="text-green-600" strokeWidth={4} />
                    </div>
                    <h3 className="text-xl font-black mb-2">전송 완료!</h3>
                    <p className="text-sm font-bold text-gray-500 mb-6">
                        문의가 성공적으로 전송되었습니다.<br/>
                        빠른 시일 내에 답변 드리겠습니다.
                    </p>
                    <button 
                        onClick={() => setShowInquiryModal(false)}
                        className="w-full bg-black text-white py-3 rounded-lg font-black text-sm hover:bg-gray-800 transition-colors"
                    >
                        확인
                    </button>
                </div>
            )}
        </div>
    </div>
  );

  const renderReviewModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-in fade-in duration-200 p-4" onClick={() => setShowReviewModal(false)}>
        <div className="bg-white border-4 border-black p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
            <button 
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black"
            >
                <X size={24} />
            </button>
            {!isReviewSent ? (
                <>
                    <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
                        <MessageSquare className="text-yellow-400 fill-yellow-400" size={28} /> 
                        방문자 리뷰
                    </h3>
                    <p className="text-sm font-bold text-gray-500 mb-6">서비스에 대한 솔직한 후기를 남겨주세요.</p>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-black mb-2">리뷰 내용</label>
                            <textarea
                                className="w-full h-40 bg-gray-50 border-2 border-black p-4 rounded-lg font-bold text-sm resize-none focus:bg-white transition-colors placeholder:text-gray-400 focus:outline-none"
                                placeholder="이곳에 리뷰를 작성해주세요..."
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={handleReviewSubmit}
                            disabled={isSendingReview}
                            className={`w-full py-4 rounded-lg font-black text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2
                                ${isSendingReview ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800'}
                            `}
                        >
                            {isSendingReview ? '전송 중...' : (
                                <>전송하기 <SendIcon size={16} /></>
                            )}
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-6 animate-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-400 rounded-full flex items-center justify-center mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Check size={40} className="text-white" strokeWidth={4} />
                    </div>
                    <h3 className="text-2xl font-black mb-2">전송되었습니다.</h3>
                    <p className="text-sm font-bold text-gray-500 mb-8">소중한 리뷰 감사합니다!</p>
                    <button
                        onClick={() => setShowReviewModal(false)}
                        className="w-full bg-black text-white py-4 rounded-xl font-black text-lg hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                    >
                        확인
                    </button>
                </div>
            )}
        </div>
    </div>
  );

  const renderHome = () => (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
      <style>{animationStyles}</style>
      {/* 1. Enhanced Hero Section (Fixed Layout) */}
      <div className="relative w-full h-[500px] rounded-3xl border-2 border-blue-100 overflow-hidden shadow-sm group">
        <div className="absolute inset-0 bg-[#F0F9FF]">
            {currentCountry && (
                <>
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform scale-105 group-hover:scale-100"
                        style={{ backgroundImage: `url(${currentCountry.imageUrl})` }}
                    />
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
                </>
            )}
        </div>
        <div className="absolute bottom-0 left-1/2 w-0.5 h-full bg-blue-100/50 transform -skew-x-12 hidden lg:block z-10"></div>
        <div className="relative z-30 h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start pt-8">
             <span className="text-blue-500 font-black tracking-widest text-lg mb-3 uppercase">Working Holiday One More</span>
             <img 
               src="https://i.postimg.cc/NfGq90Td/wohol-wonmo-eo-logo-removebg-preview.png" 
               alt="워홀 원 모어" 
               className="h-28 md:h-40 mb-6 object-contain -ml-2" 
             />
             <div className="mb-10">
                <p className="text-xl md:text-2xl font-bold text-gray-700 leading-relaxed drop-shadow-sm">
                  "선택만 하세요.
                </p>
                <p className="text-xl md:text-2xl font-black text-black leading-relaxed drop-shadow-sm">
                  준비는 저희가 할게요."
                </p>
             </div>
             <button 
                onClick={scrollToPrep}
                className="bg-blue-600 text-white px-10 py-4 rounded-full font-black hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-3 text-lg transform hover:-translate-y-1 group"
             >
               <Plane size={24} className="group-hover:rotate-45 transition-transform duration-300" /> 
               출국 준비 시작하기
             </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 h-full w-1/2 hidden lg:flex items-center justify-center pointer-events-none z-30">
            <div className="relative w-[580px] h-[580px] flex items-center justify-center transform translate-y-12 translate-x-8">
                <div className="absolute w-[480px] h-[480px] bg-yellow-300 rounded-full blur-[2px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <img 
                  src={PilotImg} 
                  alt="Captain Warhol" 
                  className="absolute z-10 w-full h-full object-contain drop-shadow-[0_15px_5px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500"
                  style={{ top: '-8%' }} 
                />
            </div>
        </div>
      </div>
      {/* 2. Country Selection (Card Style) */}
      <div>
         <div className="flex justify-between items-center mb-6">
           <h3 className="font-black italic text-2xl flex items-center gap-2"><MapPin className="text-red-500" /> 나라 선택하기</h3>
           <span className="text-xs font-bold text-gray-400 cursor-pointer hover:text-black">전체보기</span>
         </div>
         <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x">
            {COUNTRIES.map((country) => (
              <div 
                key={country.id}
                onClick={() => setSelectedCountry(country.id)}
                className={`flex-shrink-0 w-64 neo-brutalism cursor-pointer transition-all snap-start ${selectedCountry === country.id ? 'bg-black text-white scale-105' : 'bg-white hover:bg-yellow-50'}`}
              >
                 <div className="h-32 overflow-hidden border-b-2 border-black">
                    <img src={country.imageUrl} alt={country.name} className="w-full h-full object-cover" />
                 </div>
                 <div className="p-4">
                    <h4 className="text-xl font-black">{country.name}</h4>
                    <p className={`text-sm font-bold ${selectedCountry === country.id ? 'text-gray-400' : 'text-gray-500'}`}>{country.engName}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
      {/* 3. Preparation Tabs */}
      <div ref={prepListRef} className="flex border-b-2 border-gray-200 overflow-x-auto scroll-mt-32">
        {['출국 전', '생활', '알바', '서류', '집'].map((tab) => {
          const isCompleted = completedTabs.includes(tab);
          return (
            <button 
              key={tab}
              onClick={() => setPrepTab(tab)}
              className={`px-6 py-4 font-black text-lg transition-all relative whitespace-nowrap flex items-center gap-2 group ${
                prepTab === tab 
                  ? (isCompleted ? 'text-green-600' : 'text-blue-600') 
                  : (isCompleted ? 'text-green-500' : 'text-gray-400 hover:text-gray-600')
              }`}
            >
              {tab}
              <div 
                onClick={(e) => toggleTabCompletion(e, tab)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all z-10 hover:scale-110 ${
                   isCompleted 
                   ? 'bg-green-500 border-green-500' 
                   : 'border-gray-300 hover:border-gray-400'
                }`}
                title={isCompleted ? "완료 취소" : "단계 완료"}
              >
                 {isCompleted && <Check size={14} className="text-white" strokeWidth={4} />}
              </div>
              {prepTab === tab && (
                <div className={`absolute bottom-0 left-0 w-full h-1 rounded-t-full ${isCompleted ? 'bg-green-600' : 'bg-blue-600'}`}></div>
              )}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Admin Banner + Checklist */}
        <div className="lg:col-span-8 space-y-8">
          <div className="neo-brutalism bg-white p-0 relative overflow-hidden rounded-xl group hover:shadow-lg transition-all">
             <button 
                onClick={handlePrevExpert}
                className="absolute top-1/2 left-2 z-20 -translate-y-1/2 p-2 bg-white border-2 border-black rounded-full shadow-md hover:bg-gray-100 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
             >
                <ChevronLeft size={24} />
             </button>
             <button 
                onClick={handleNextExpert}
                className="absolute top-1/2 right-2 z-20 -translate-y-1/2 p-2 bg-white border-2 border-black rounded-full shadow-md hover:bg-gray-100 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
             >
                <ChevronRight size={24} />
             </button>
             <div key={currentExpertIndex} className={expertSlideDir === 'right' ? 'slide-right' : 'slide-left'}>
                <div className={`h-24 bg-gradient-to-r ${EXPERTS[currentExpertIndex].headerColor} relative`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-6 text-white">
                        <p className="text-xs font-bold opacity-80">행정대 | 행정법인 | 대형로펌 행정인</p>
                        <p className="text-lg font-black">행정사 전화 상담 3회 무료!</p>
                    </div>
                </div>
                <div className="p-6 flex flex-col md:flex-row gap-6 relative">
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 overflow-hidden flex-shrink-0 -mt-8 relative z-10">
                        <img src={EXPERTS[currentExpertIndex].imageUrl} className="w-full h-full object-cover" alt={EXPERTS[currentExpertIndex].name} />
                    </div>
                    <div className="flex-grow pt-2">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-2xl font-black text-gray-900">{EXPERTS[currentExpertIndex].name}</h3>
                                    <span className="bg-blue-100 text-blue-700 text-xs font-black px-2 py-0.5 rounded">{EXPERTS[currentExpertIndex].role}</span>
                                </div>
                                <p className="text-sm font-bold text-gray-500">{EXPERTS[currentExpertIndex].firm}</p>
                                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><MapPin size={12}/> {EXPERTS[currentExpertIndex].location}</p>
                            </div>
                            <div className="text-center">
                                <span className="text-2xl font-black text-blue-600">{EXPERTS[currentExpertIndex].rate}</span>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Reservation Rate</p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button 
                                onClick={() => setShowInquiryModal(true)}
                                className="flex-1 py-3 border-2 border-black font-black text-sm hover:bg-gray-50 transition-colors"
                            >
                                간편 문의 하기
                            </button>
                            <button 
                                onClick={handleConsultationClick}
                                className="flex-1 py-3 bg-blue-600 text-white font-black text-sm hover:bg-blue-700 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                            >
                                행정사 상담 예약
                            </button>
                        </div>
                    </div>
                </div>
             </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-black italic text-gray-400 uppercase">Preparation List</h3>
               {prepTab === '출국 전' && <span className="text-xs font-black text-blue-500 bg-blue-50 px-2 py-1 rounded">3 tasks remaining</span>}
            </div>
            <div className="space-y-4">
              {MOCK_TASKS.filter(t => t.tab === prepTab).map((task) => {
                const isTaskCompleted = completedTaskIds.includes(task.id);
                return (
                <div 
                  key={task.id} 
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`border-2 rounded-2xl p-6 flex items-center justify-between shadow-sm cursor-pointer transition-all ${
                    selectedTaskId === task.id 
                    ? 'bg-blue-50 border-blue-500 ring-4 ring-blue-100' 
                    : isTaskCompleted
                        ? 'bg-green-50 border-green-500 ring-4 ring-green-100'
                        : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                        selectedTaskId === task.id ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 
                        isTaskCompleted ? 'bg-green-500 text-white shadow-lg shadow-green-200' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {isTaskCompleted ? <Check size={24} strokeWidth={4} /> : getTaskIcon(task.iconType || 'default')}
                    </div>
                    <div>
                      <h4 className={`text-lg font-black ${
                          selectedTaskId === task.id ? 'text-blue-900' : 
                          isTaskCompleted ? 'text-green-800 decoration-2' : 'text-gray-800'
                      }`}>
                          {task.title}
                      </h4>
                      <p className="text-sm font-bold text-gray-400">{task.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {task.rightTag && (
                      <span className="text-lg font-black text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                        {task.rightTag}
                      </span>
                    )}
                    <button
                        onClick={(e) => toggleTaskCompletion(e, task.id)}
                        className={`px-3 py-1.5 rounded-full font-black text-xs border-2 transition-all flex items-center gap-1 z-10 ${
                            isTaskCompleted
                            ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
                            : 'bg-white border-gray-200 text-gray-400 hover:border-black hover:text-black'
                        }`}
                    >
                        {isTaskCompleted ? '완료' : '완료'}
                    </button>
                    <ChevronRight className={selectedTaskId === task.id ? 'text-blue-500' : 'text-gray-300'} />
                  </div>
                </div>
              )})}
              
              {MOCK_TASKS.filter(t => t.tab === prepTab).length === 0 && (
                <div className="text-center p-10 text-gray-400 font-bold border-2 border-dashed border-gray-300 rounded-xl">
                  아직 등록된 할 일이 없습니다.
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Right Column: Dynamic Content */}
        <div className="lg:col-span-4 space-y-8">
           {rightColMode === 'reservation' ? (
              <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden animate-in slide-in-from-right-4 flex flex-col">
                 {!isReservationSuccess ? (
                    <>
                        <div className="p-4 border-b-2 border-gray-100 flex items-center gap-3 flex-shrink-0">
                            <button onClick={() => {
                                if (reservationStep === 2) setReservationStep(1);
                                else setRightColMode('default');
                            }}><ArrowRight className="rotate-180" /></button>
                            <h3 className="font-black text-lg">상담 예약 {reservationStep === 2 && '확인'}</h3>
                        </div>
                        {reservationStep === 1 ? (
                        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                            <div className="p-6 space-y-6">
                                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                    <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden">
                                        <img src={EXPERTS[currentExpertIndex].imageUrl} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-bold">담당 행정사</p>
                                        <p className="font-black text-sm">{EXPERTS[currentExpertIndex].name}</p>
                                    </div>
                                </div>
                                <div>
                                <label className="block text-sm font-bold mb-3 flex items-center gap-2">
                                    <Phone size={16} /> 상담 유형 선택
                                </label>
                                <div className="space-y-2">
                                    <button className="w-full p-4 border-2 border-blue-500 bg-blue-50 rounded-lg flex justify-between items-center">
                                        <span className="font-black">15분 전화상담</span>
                                        <CheckCircle2 className="text-blue-500" size={18} />
                                    </button>
                                    <button className="w-full p-4 border-2 border-gray-200 rounded-lg flex justify-between items-center text-gray-400">
                                        <span className="font-bold">방문 상담 (준비중)</span>
                                    </button>
                                </div>
                                </div>
                                <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-bold flex items-center gap-2">
                                        <Calendar size={16} /> 날짜 선택
                                    </label>
                                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1">
                                        <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-white rounded-full transition-colors"><ChevronLeft size={14}/></button>
                                        <span className="text-xs font-black">{calendarDate.getFullYear()}. {calendarDate.getMonth() + 1}</span>
                                        <button onClick={() => changeMonth(1)} className="p-1 hover:bg-white rounded-full transition-colors"><ChevronRight size={14}/></button>
                                    </div>
                                </div>
                                <div className="border-2 border-gray-200 rounded-lg p-3 bg-white overflow-hidden">
                                    <div key={calendarDate.toString()} className={slideDirection === 'right' ? 'calendar-slide-right' : 'calendar-slide-left'}>
                                        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold mb-2 uppercase text-gray-400">
                                            <div className="text-red-400">Sun</div>
                                            <div>Mon</div>
                                            <div>Tue</div>
                                            <div>Wed</div>
                                            <div>Thu</div>
                                            <div>Fri</div>
                                            <div className="text-blue-400">Sat</div>
                                        </div>
                                        <div className="grid grid-cols-7 gap-1">
                                            {Array.from({ length: getFirstDayOfMonth(calendarDate) }).map((_, i) => (
                                                <div key={`empty-${i}`} className="p-2"></div>
                                            ))}
                                            {Array.from({ length: getDaysInMonth(calendarDate) }).map((_, i) => {
                                                const day = i + 1;
                                                const isSelected = selectedDate === day;
                                                const isDisabled = isPastOrToday(calendarDate.getFullYear(), calendarDate.getMonth(), day);
                                                return (
                                                    <button 
                                                        key={day}
                                                        onClick={() => !isDisabled && setSelectedDate(day)}
                                                        disabled={isDisabled}
                                                        className={`p-2 rounded-lg text-xs font-bold transition-all relative ${
                                                            isDisabled ? 'text-gray-300 cursor-not-allowed bg-gray-50' :
                                                            isSelected 
                                                            ? 'bg-black text-white shadow-md transform scale-105 z-10' 
                                                            : 'hover:bg-gray-100 text-gray-700'
                                                        }`}
                                                    >
                                                        {day}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div>
                                <label className="block text-sm font-bold mb-3 flex items-center gap-2">
                                    <Clock size={16} /> 시간 선택
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30'].map((t, i) => (
                                        <button 
                                            key={t} 
                                            onClick={() => setSelectedTime(t)}
                                            className={`py-2 rounded border font-bold text-xs transition-colors ${selectedTime === t ? 'bg-black text-white border-black' : 'border-gray-200 hover:border-black'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                                </div>
                            </div>
                            <div className="p-4 border-t-2 border-gray-100 bg-white sticky bottom-0">
                                <button 
                                    onClick={() => {
                                        if (selectedDate && selectedTime) setReservationStep(2);
                                        else alert('날짜와 시간을 선택해주세요.');
                                    }}
                                    className={`w-full py-4 font-black rounded-lg transition-colors ${selectedDate && selectedTime ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                >
                                다음 (내용 작성)
                                </button>
                            </div>
                        </div>
                        ) : (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300 flex flex-col h-full">
                            <div className="p-6 flex-grow">
                                <div className="bg-gray-50 border-2 border-gray-200 p-4 rounded-xl mb-6">
                                    <div className="flex items-center gap-3 border-b-2 border-gray-100 pb-4 mb-4">
                                        <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden">
                                            <img src={EXPERTS[currentExpertIndex].imageUrl} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-bold">담당 전문가</p>
                                            <p className="font-black text-lg">{EXPERTS[currentExpertIndex].name}</p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 mb-1">선택하신 일정</p>
                                    <div className="flex items-center gap-2 text-lg font-black text-gray-900">
                                        <Calendar size={20} className="text-blue-500" />
                                        <span>{calendarDate.getFullYear()}. {calendarDate.getMonth() + 1}. {selectedDate}</span>
                                        <span className="w-1 h-1 bg-gray-400 rounded-full mx-1"></span>
                                        <span>{selectedTime}</span>
                                    </div>
                                </div>
                                <label className="block text-sm font-bold mb-3 text-gray-800">
                                    상담 내용 작성
                                </label>
                                <textarea 
                                    className="w-full h-40 border-2 border-black rounded-lg p-4 text-sm font-bold bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all resize-none placeholder:text-gray-300"
                                    placeholder="예) 호주 워킹홀리데이 비자 신청 절차가 궁금해요. 초기 자금은 얼마나 필요할까요?"
                                    value={reservationNote}
                                    onChange={(e) => setReservationNote(e.target.value)}
                                />
                            </div>
                            <div className="p-4 border-t-2 border-gray-100 mt-auto">
                                <button 
                                    onClick={handleReservationSubmit}
                                    className={`w-full py-4 font-black rounded-lg transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${reservationNote.trim().length > 0 ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}`}
                                >
                                예약하기
                                </button>
                            </div>
                        </div>
                        )}
                    </>
                 ) : (
                    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-in zoom-in duration-300 py-20">
                        <div className="w-24 h-24 bg-green-400 rounded-full flex items-center justify-center mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <Check size={48} className="text-white" strokeWidth={4} />
                        </div>
                        <h3 className="text-2xl font-black mb-2">예약이 완료되었어요!</h3>
                        <p className="text-sm font-bold text-gray-500 mb-8 leading-relaxed">
                             {EXPERTS[currentExpertIndex].name}님과의<br/>
                             {calendarDate.getMonth() + 1}월 {selectedDate}일 {selectedTime} 상담이<br/>
                             확정되었습니다.
                        </p>
                        <button 
                            onClick={() => setRightColMode('default')}
                            className="w-full bg-black text-white py-4 rounded-xl font-black text-lg hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                        >
                            확인
                        </button>
                    </div>
                 )}
              </div>
           ) : rightColMode === 'task_detail' && selectedTask ? (
             <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
               <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <div className="bg-gray-50 border-b-2 border-gray-100 p-4 flex justify-between items-center">
                     <h3 className="font-black text-lg flex items-center gap-2">
                       {getTaskIcon(selectedTask.iconType)}
                       <span className="truncate w-40">{selectedTask.title}</span>
                     </h3>
                     <button onClick={() => setSelectedTaskId(null)}><X size={20} className="text-gray-400 hover:text-black"/></button>
                  </div>
                  <div className="p-4 space-y-0 text-sm">
                     <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="font-bold text-gray-500 w-16">날짜</span>
                        <div className="flex-grow text-right font-black bg-gray-100 px-3 py-1 rounded cursor-pointer hover:bg-gray-200">
                           {selectedTask.dateRange || '날짜 설정'}
                        </div>
                     </div>
                     <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="font-bold text-gray-500 w-16">단계</span>
                        <div className="flex-grow text-right font-black text-gray-600">
                           <span className="bg-gray-100 px-3 py-1 rounded">{selectedTask.stage || '설정 안함'}</span>
                        </div>
                     </div>
                     <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <span className="font-bold text-gray-500 w-16">알림</span>
                        <div className="flex-grow text-right font-black text-gray-600">
                           {selectedTask.alert || '없음'}
                        </div>
                     </div>
                  </div>
               </div>
               {selectedTask.guideContent && (
                 <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="p-6">
                       <h3 className="font-black text-xl leading-tight mb-4 border-b-4 border-yellow-300 inline-block pb-1">
                          {selectedTask.guideContent.title}
                       </h3>
                       <p className="text-sm font-bold text-gray-600 mb-6 leading-relaxed">
                          {selectedTask.guideContent.description}
                       </p>
                       <button className="w-full bg-blue-50 text-blue-600 font-black py-3 text-xs uppercase hover:bg-blue-100 transition-colors">
                          가이드 전체보기
                       </button>
                    </div>
                 </div>
               )}
             </div>
           ) : (
             <div className="space-y-8 animate-in fade-in">
                <div className="bg-white border-2 border-black p-0 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-visible">
                  <div className="bg-black text-white p-4">
                     <h3 className="font-black italic text-lg flex items-center gap-2"><Briefcase size={18} /> My Journey</h3>
                  </div>
                  <div className="p-6 space-y-6 relative">
                     <div className="relative">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-2">Departure Date</p>
                        <div 
                           onClick={() => setShowDepartureCalendar(!showDepartureCalendar)}
                           className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border-2 border-transparent hover:border-black cursor-pointer transition-colors"
                        >
                           <div className="flex items-center gap-3">
                              <Calendar className="text-blue-600" size={20} />
                              <span className="font-black text-lg">
                                {departureDate.getFullYear()}. {String(departureDate.getMonth()+1).padStart(2,'0')}. {String(departureDate.getDate()).padStart(2,'0')}
                              </span>
                           </div>
                           <span className="text-xs font-bold bg-white border border-gray-200 px-2 py-1 rounded min-w-[50px] text-center">
                             {getDDayString(departureDate)}
                           </span>
                        </div>
                        {showDepartureCalendar && (
                           <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="font-black text-sm">출국일 설정 (2027-2029)</h4>
                                <button onClick={() => setShowDepartureCalendar(false)}><X size={16} /></button>
                              </div>
                              <div className="flex items-center justify-between mb-3 bg-gray-100 p-2 rounded-lg">
                                <button onClick={() => changeDepartureMonth(-1)} className="p-1 hover:bg-white rounded transition-colors disabled:opacity-30" disabled={departureViewDate.getFullYear() === 2027 && departureViewDate.getMonth() === 0}>
                                  <ChevronLeft size={16}/>
                                </button>
                                <span className="font-black text-sm">{departureViewDate.getFullYear()}. {departureViewDate.getMonth() + 1}</span>
                                <button onClick={() => changeDepartureMonth(1)} className="p-1 hover:bg-white rounded transition-colors disabled:opacity-30" disabled={departureViewDate.getFullYear() === 2029 && departureViewDate.getMonth() === 11}>
                                  <ChevronRight size={16}/>
                                </button>
                              </div>
                              <div key={departureViewDate.toString()} className={departureSlideDir === 'right' ? 'calendar-slide-right' : 'calendar-slide-left'}>
                                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold mb-2 uppercase text-gray-400">
                                      <div className="text-red-400">Sun</div>
                                      <div>Mon</div>
                                      <div>Tue</div>
                                      <div>Wed</div>
                                      <div>Thu</div>
                                      <div>Fri</div>
                                      <div className="text-blue-400">Sat</div>
                                  </div>
                                  <div className="grid grid-cols-7 gap-1">
                                      {Array.from({ length: getFirstDayOfMonth(departureViewDate) }).map((_, i) => (
                                          <div key={`empty-${i}`} className="p-2"></div>
                                      ))}
                                      {Array.from({ length: getDaysInMonth(departureViewDate) }).map((_, i) => {
                                          const day = i + 1;
                                          const isSelected = departureDate.getFullYear() === departureViewDate.getFullYear() && 
                                                             departureDate.getMonth() === departureViewDate.getMonth() && 
                                                             departureDate.getDate() === day;
                                          return (
                                              <button 
                                                  key={day}
                                                  onClick={() => {
                                                    const newDate = new Date(departureViewDate.getFullYear(), departureViewDate.getMonth(), day);
                                                    setDepartureDate(newDate);
                                                    setShowDepartureCalendar(false);
                                                  }}
                                                  className={`p-2 rounded-md text-xs font-bold transition-all ${
                                                      isSelected 
                                                      ? 'bg-blue-600 text-white shadow-md' 
                                                      : 'hover:bg-gray-100 text-gray-700'
                                                  }`}
                                              >
                                                  {day}
                                              </button>
                                          );
                                      })}
                                  </div>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="bg-white border-2 border-black p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-black italic text-lg">My Mentors</h3>
                     <span className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">View All</span>
                  </div>
                  <div className="space-y-4">
                     {CHARACTERS.map(c => (
                       <div key={c.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-all hover:scale-105 group border-2 border-transparent hover:border-black/10">
                          <div className={`w-14 h-14 rounded-full border-2 border-black overflow-hidden flex items-center justify-center shadow-sm ${c.color} group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all`}>
                            <img src={c.imageUrl} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-black text-sm group-hover:text-blue-600 transition-colors">{c.name}</p>
                            <p className="text-xs text-gray-500 font-bold truncate w-32">{c.role}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );

  const renderStore = () => (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {STORE_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveStoreCategory(cat)}
            className={`px-4 py-2 rounded-full font-black text-sm border-2 transition-all whitespace-nowrap ${
              activeStoreCategory === cat
                ? 'bg-black text-white border-black'
                : 'bg-white border-gray-200 text-gray-500 hover:border-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_STORE_ITEMS.filter(item => item.category === activeStoreCategory).map(item => (
          <div key={item.id} className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all group">
            <div className="h-48 overflow-hidden border-b-2 border-black relative">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <button 
                onClick={(e) => toggleCartItem(e, item.id)}
                className="absolute top-2 right-2 p-2 bg-white border-2 border-black rounded-full hover:bg-yellow-300 transition-colors"
              >
                <Bookmark size={16} className={cartItems.includes(item.id) ? "fill-black" : ""} />
              </button>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-black bg-gray-100 px-2 py-1 rounded text-gray-500">{item.category}</span>
                <div className="flex items-center gap-1 text-xs font-bold">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  {item.rating} ({item.reviewCount})
                </div>
              </div>
              <h3 className="font-black text-lg leading-tight mb-2 min-h-[3rem]">{item.name}</h3>
              <div className="flex justify-between items-center mt-4">
                <span className="font-black text-xl">{item.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-black text-xs hover:bg-blue-700 transition-colors">
                  구매하기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCommunity = () => {
    const filteredPosts = MOCK_POSTS.filter(post => {
      let matchesCategory = true;
      switch (communityFilter) {
        case '전체글': matchesCategory = true; break;
        case '공지사항': matchesCategory = post.tag === '공지'; break;
        case '자유게시판': matchesCategory = post.tag !== '공지' && post.tag !== '중고'; break;
        case '질문/답변': matchesCategory = post.tag === '질문'; break;
        case '정보공유': matchesCategory = post.tag === '멘토링'; break;
        case '중고장터': matchesCategory = post.tag === '중고'; break;
        case '구인구직': matchesCategory = false; break;
        case '즐겨찾기': matchesCategory = bookmarkedPosts.includes(post.id); break;
        default: matchesCategory = true;
      }
      let matchesTab = true;
      if (communityCategory === '인기') {
        matchesTab = post.category === 'popular' || post.likes >= 50 || post.views >= 500;
      } else if (communityCategory === '추천') {
        matchesTab = post.likes >= 20; 
      }
      return matchesCategory && matchesTab;
    });

    return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in">
      <div className="lg:col-span-3 space-y-6">
         <button className="w-full py-4 bg-black text-white font-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2">
           <Edit3 size={18} /> 글쓰기
         </button>
         <div className="bg-white border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {['전체글', '공지사항', '자유게시판', '질문/답변', '정보공유', '중고장터', '구인구직', '즐겨찾기'].map(filter => (
               <button
                 key={filter}
                 onClick={() => setCommunityFilter(filter)}
                 className={`w-full text-left px-6 py-4 font-black text-sm border-b-2 border-gray-100 last:border-0 hover:bg-gray-50 transition-colors flex justify-between items-center ${communityFilter === filter ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
               >
                 <div className="flex items-center gap-2">
                    {filter === '즐겨찾기' && <Bookmark size={16} className={communityFilter === filter ? 'fill-blue-600' : ''}/>}
                    {filter}
                 </div>
                 <ChevronRight size={16} className={communityFilter === filter ? 'text-blue-600' : 'text-gray-300'} />
               </button>
            ))}
         </div>
      </div>
      <div className="lg:col-span-9 space-y-4">
         <div className="flex gap-4 border-b-2 border-gray-200 pb-1 mb-4">
            {['최신', '인기', '추천'].map(cat => (
               <button 
                 key={cat} 
                 onClick={() => setCommunityCategory(cat)}
                 className={`font-black text-lg px-4 py-2 relative ${communityCategory === cat ? 'text-black' : 'text-gray-400'}`}
               >
                 {cat}
                 {communityCategory === cat && <div className="absolute bottom-0 left-0 w-full h-1 bg-black rounded-t-full"></div>}
               </button>
            ))}
         </div>
         {filteredPosts.length > 0 ? (
           filteredPosts.map(post => (
             <div key={post.id} className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                   <div className="flex gap-2 items-center">
                      <span className={`text-xs font-black px-2 py-1 rounded ${post.tag === '공지' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                         {post.tag || '일반'}
                      </span>
                      <h3 className="font-black text-lg group-hover:text-blue-600 transition-colors">{post.title}</h3>
                   </div>
                   <button onClick={(e) => togglePostBookmark(e, post.id)} className="text-gray-400 hover:text-blue-500 transition-colors">
                      <Bookmark size={20} className={bookmarkedPosts.includes(post.id) ? "fill-blue-500 text-blue-500" : ""} />
                   </button>
                </div>
                <p className="text-gray-600 text-sm font-bold mb-4 line-clamp-2">{post.content}</p>
                <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                   <div className="flex items-center gap-4">
                      <span className="text-gray-900">{post.author}</span>
                      <span>{post.time}</span>
                      <span className="flex items-center gap-1"><Users size={12}/> {post.views}</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><ThumbsUp size={12}/> {post.likes}</span>
                      <span className="flex items-center gap-1"><MessageIcon size={12}/> {post.comments}</span>
                   </div>
                </div>
             </div>
           ))
         ) : (
           <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <Inbox size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-400 font-bold">
                {communityFilter === '즐겨찾기' 
                  ? '즐겨찾기한 게시글이 없습니다.' 
                  : '등록된 게시글이 없습니다.'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {communityFilter === '즐겨찾기' 
                  ? '마음에 드는 글의 북마크 아이콘을 눌러보세요!' 
                  : '첫 번째 글을 작성해보세요!'}
              </p>
           </div>
         )}
      </div>
    </div>
    );
  };

  const renderChat = () => (
    <div className="space-y-8 animate-in fade-in">
       <div className="flex flex-col md:flex-row justify-between items-end border-b-4 border-black pb-6 gap-4">
          <div>
             <h2 className="text-4xl font-black text-black italic tracking-tighter mb-2">GLOBAL CHAT</h2>
             <p className="font-bold text-gray-500">전 세계 워홀러들과 실시간으로 소통하세요.</p>
          </div>
          <button className="bg-black text-white px-6 py-3 rounded-lg font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none hover:bg-gray-800 transition-all flex items-center gap-2 hover:translate-x-[2px] hover:translate-y-[2px]">
             <Plus size={18} /> 방 만들기
          </button>
       </div>
       <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
          {['전체', '호주', '캐나다', '뉴질랜드', '일본', '영국', '독일', '프랑스', '아일랜드'].map(country => (
             <button 
                key={country}
                onClick={() => setActiveChatCountry(country)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 font-black flex flex-col items-center justify-center gap-1 transition-all ${activeChatCountry === country ? 'bg-blue-600 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]' : 'bg-white border-gray-200 text-gray-400 hover:border-black hover:text-black'}`}
             >
                <span className="text-2xl">{FLAG_MAP[country] || '🌍'}</span>
                <span className="text-xs">{country}</span>
             </button>
          ))}
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_CHAT_ROOMS.filter(room => activeChatCountry === '전체' || room.tags.includes(activeChatCountry)).map(room => (
             <div key={room.id} className="bg-white border-2 border-black rounded-xl p-4 flex gap-4 items-center hover:bg-gray-50 transition-colors cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                <div className="w-16 h-16 rounded-full border-2 border-black overflow-hidden flex-shrink-0">
                   <img src={room.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-grow min-w-0">
                   <div className="flex justify-between items-start mb-1">
                      <h4 className="font-black text-lg truncate pr-2">{room.title}</h4>
                      <span className="text-xs font-bold text-gray-400 whitespace-nowrap">{room.lastMessageTime}</span>
                   </div>
                   <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><User size={12} /> {room.participants}명 참여중</span>
                      {room.tags.map(tag => (
                         <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">#{tag}</span>
                      ))}
                   </div>
                </div>
                <button className="bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition-colors">
                   <MessageCircle size={20} />
                </button>
             </div>
          ))}
       </div>
    </div>
  );

  const renderMyPage = () => {
    const dDayLabel = getDDayString(departureDate);
    const targetCountryName = COUNTRIES.find(c => c.id === selectedCountry)?.name || '호주';

    return (
    <div className="space-y-8 animate-in fade-in">
      <div className="bg-white border-2 border-black rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 bg-yellow-300 border-l-2 border-b-2 border-black font-black text-xs uppercase">
            Free Member
         </div>
         <div className="w-32 h-32 rounded-full border-4 border-black bg-[#FACC15] flex items-center justify-center text-5xl font-black shadow-lg">
            홍
         </div>
         <div className="flex-grow text-center md:text-left">
            <h2 className="text-3xl font-black mb-2">홍길동 <span className="text-lg text-gray-400 font-bold ml-2">@hong_gildong</span></h2>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold text-gray-600 mb-6">
               <span className="flex items-center gap-1"><MapPin size={16}/> {targetCountryName} ({dDayLabel})</span>
               <span className="flex items-center gap-1"><Briefcase size={16}/> 바리스타 준비중</span>
            </div>
            <button 
               onClick={() => setShowUpgradeModal(true)}
               className="bg-black text-white px-6 py-3 rounded-lg font-black text-sm hover:bg-gray-800 transition-colors shadow-lg flex items-center gap-2 mx-auto md:mx-0"
            >
               <Sparkles size={16} className="text-yellow-400" /> PRO 멤버십 업그레이드
            </button>
         </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black text-xl mb-6 flex items-center gap-2"><Settings size={20}/> 계정 설정</h3>
            <div className="space-y-4">
               <div>
                  <label className="block text-xs font-black text-gray-500 mb-1">이메일</label>
                  <div className="flex gap-2">
                     <input 
                        disabled={!isEditingEmail}
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className={`flex-grow p-3 border-2 rounded-lg font-bold text-sm ${isEditingEmail ? 'border-blue-500 bg-white' : 'border-gray-200 bg-gray-50'}`} 
                     />
                     <button onClick={handleEmailEdit} className="px-4 font-black text-xs bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                        {isEditingEmail ? '저장' : '수정'}
                     </button>
                  </div>
                  {emailSuccessMsg && <p className="text-green-600 text-xs font-bold mt-1">{emailSuccessMsg}</p>}
               </div>
               <div>
                  <label className="block text-xs font-black text-gray-500 mb-1">휴대폰 번호</label>
                  <div className="flex gap-2">
                     <input 
                        disabled={!isEditingPhone}
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                        className={`flex-grow p-3 border-2 rounded-lg font-bold text-sm ${isEditingPhone ? 'border-blue-500 bg-white' : 'border-gray-200 bg-gray-50'}`} 
                     />
                     <button onClick={handlePhoneEdit} className="px-4 font-black text-xs bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                        {isEditingPhone ? '저장' : '수정'}
                     </button>
                  </div>
                  {phoneSuccessMsg && <p className="text-green-600 text-xs font-bold mt-1">{phoneSuccessMsg}</p>}
               </div>
            </div>
         </div>
         <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black text-xl mb-6 flex items-center gap-2"><CheckCircle2 size={20}/> 활동 현황</h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-100">
                  <p className="text-xs font-bold text-blue-500 mb-1">완료한 준비</p>
                  <p className="text-3xl font-black text-blue-900">{completedTaskIds.length} <span className="text-sm text-blue-400">/ {MOCK_TASKS.length}</span></p>
               </div>
               <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-100">
                  <p className="text-xs font-bold text-yellow-600 mb-1">저장한 글</p>
                  <p className="text-3xl font-black text-yellow-900">{bookmarkedPosts.length}</p>
               </div>
               <div className="bg-green-50 p-4 rounded-lg border-2 border-green-100">
                  <p className="text-xs font-bold text-green-600 mb-1">장바구니</p>
                  <p className="text-3xl font-black text-green-900">{cartItems.length}</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-100">
                  <p className="text-xs font-bold text-gray-500 mb-1">작성한 글</p>
                  <p className="text-3xl font-black text-gray-900">0</p>
               </div>
            </div>
         </div>
      </div>
    </div>
    );
  };

  const renderInfo = () => {
    const governmentPrograms = [
      {
        title: "월드잡플러스 (WorldJob+)",
        desc: "고용노동부와 한국산업인력공단이 운영하는 해외취업 지원 포털입니다. 해외 취업 정착 지원금(최대 500만원) 신청이 가능합니다.",
        icon: <Globe size={32} className="text-blue-500" />,
        badge: "해외취업장려금",
        badgeColor: "bg-blue-600",
        link: "https://www.worldjob.or.kr"
      },
      {
        title: "워킹홀리데이 인포센터 (WHIC)",
        desc: "외교부 워킹홀리데이 인포센터로, 국가별 비자 정보, 안전 수칙, 체험 수기 등 공신력 있는 정보를 제공합니다.",
        icon: <InfoIcon size={32} className="text-green-500" />,
        badge: "공식 가이드북",
        badgeColor: "bg-green-600",
        link: "https://whic.mofa.go.kr"
      }
    ];

    const countryRequirements = [
      { code: "AU", name: "호주", age: "만 18-30세", fund: "AUD 5,000+", quota: "제한 없음", note: "상시 신청, 세컨/써드 비자 가능" },
      { code: "CA", name: "캐나다", age: "만 18-35세", fund: "CAD 2,500+", quota: "12,000명 (쿼터제)", note: "추첨제(Pool), 최대 24개월 체류" },
      { code: "GB", name: "영국", age: "만 18-35세", fund: "GBP 2,530+", quota: "5,000명 (YMS)", note: "최대 24개월 체류, 경쟁률 낮음" },
      { code: "JP", name: "일본", age: "만 18-25세 (예외 30세)", fund: "JPY 280,000+", quota: "10,000명", note: "분기별 접수, 계획서/이유서 중요" },
      { code: "NZ", name: "뉴질랜드", age: "만 18-30세", fund: "NZD 4,200+", quota: "3,000명", note: "선착순 접수(5월), 경쟁률 치열" },
      { code: "DE", name: "독일", age: "만 18-30세", fund: "EUR 2,000+", quota: "제한 없음", note: "현지 비자 신청 가능, 최대 12개월" },
      { code: "FR", name: "프랑스", age: "만 18-30세", fund: "EUR 2,500+", quota: "2,000명", note: "동기서 중요, 한국에서 신청 필수" },
      { code: "IE", name: "아일랜드", age: "만 18-30세", fund: "EUR 1,500+", quota: "800명", note: "상/하반기 추첨, 어학연수 인기" },
    ];

    return (
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in pb-10">
          <div className="text-center space-y-4">
              <h2 className="text-4xl font-black italic">INFORMATION CENTER</h2>
              <p className="text-gray-500 font-bold">성공적인 워킹홀리데이를 위한 필수 정보 모음</p>
          </div>
          <section>
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <Shield className="text-blue-600" /> 정부 지원 프로그램
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {governmentPrograms.map((prog, idx) => (
                      <a 
                        key={idx} 
                        href={prog.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all relative group cursor-pointer block"
                      >
                          <ExternalLink className="absolute top-6 right-6 text-gray-300 group-hover:text-black transition-colors" size={20} />
                          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 border-2 border-gray-200">
                              {prog.icon}
                          </div>
                          <h4 className="font-black text-xl mb-2">{prog.title}</h4>
                          <p className="text-sm font-bold text-gray-500 mb-6 leading-relaxed h-auto md:h-12">{prog.desc}</p>
                          <button className={`${prog.badgeColor} text-white px-4 py-2 rounded-full font-black text-xs hover:opacity-90 transition-opacity`}>
                              {prog.badge}
                          </button>
                      </a>
                  ))}
              </div>
          </section>
          <section>
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                  <Globe className="text-purple-600" /> 주요 국가별 자격 요건 (2025 기준)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {countryRequirements.map((country, idx) => (
                      <div key={idx} className="bg-white border-2 border-black rounded-xl p-5 hover:bg-gray-50 transition-colors">
                          <h4 className="font-black text-lg mb-4 pb-2 border-b-2 border-gray-100">
                              <span className="mr-2">{country.code}</span> {country.name}
                          </h4>
                          <div className="space-y-3 text-sm mb-4">
                              <div className="flex justify-between">
                                  <span className="font-bold text-gray-500">연령</span>
                                  <span className="font-black">{country.age}</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="font-bold text-gray-500">초기자금</span>
                                  <span className="font-black">{country.fund}</span>
                              </div>
                              <div className="flex justify-between">
                                  <span className="font-bold text-gray-500">쿼터</span>
                                  <span className="font-black">{country.quota}</span>
                              </div>
                          </div>
                          <div className="bg-gray-100 p-3 rounded-lg text-xs font-bold text-gray-600 text-center">
                              {country.note}
                          </div>
                      </div>
                  ))}
              </div>
          </section>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 flex gap-4 shadow-sm">
              <div className="flex-shrink-0">
                  <InfoIcon className="text-yellow-500" size={24} />
              </div>
              <div>
                  <h4 className="font-black text-yellow-700 mb-1">주의사항</h4>
                  <p className="text-sm font-bold text-yellow-600/80 leading-relaxed">
                      위 정보는 2025년 기준 대략적인 요건이며, 각국 이민성의 정책 변경에 따라 수시로 달라질 수 있습니다. 
                      비자 신청 전 반드시 해당 국가 이민성 공식 홈페이지 또는 대사관 공지를 확인하시기 바랍니다.
                  </p>
              </div>
          </div>
      </div>
    );
  };

  const renderBookmarksDrawer = () => (
      <>
        {showBookmarks && (
          <div 
            className="fixed inset-0 bg-black/20 z-[60] backdrop-blur-sm"
            onClick={() => setShowBookmarks(false)}
          />
        )}
        <div 
          className={`fixed top-0 right-0 h-full w-96 bg-white border-l-4 border-black shadow-[-8px_0px_0px_0px_rgba(0,0,0,0.1)] z-[70] transform transition-transform duration-300 flex flex-col bookmark-area ${
            showBookmarks ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 border-b-4 border-black bg-yellow-300 flex justify-between items-center">
              <h3 className="font-black text-xl uppercase italic flex items-center gap-2">
                  <Bookmark className="fill-black" /> Saved Items
              </h3>
              <button onClick={() => setShowBookmarks(false)}><X size={24} className="hover:scale-110 transition-transform"/></button>
          </div>
          <div className="flex border-b-2 border-black">
              <button 
                  onClick={() => setBookmarkTab('store')}
                  className={`flex-1 py-3 font-black text-sm uppercase transition-colors ${bookmarkTab === 'store' ? 'bg-black text-white' : 'bg-white text-gray-400 hover:text-black'}`}
              >
                  Cart ({cartItems.length})
              </button>
              <button 
                  onClick={() => setBookmarkTab('community')}
                  className={`flex-1 py-3 font-black text-sm uppercase transition-colors ${bookmarkTab === 'community' ? 'bg-black text-white' : 'bg-white text-gray-400 hover:text-black'}`}
              >
                  Bookmarks ({bookmarkedPosts.length})
              </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
              {bookmarkTab === 'store' ? (
                  cartItems.length > 0 ? (
                      MOCK_STORE_ITEMS.filter(item => cartItems.includes(item.id)).map(item => (
                          <div key={item.id} className="bg-white border-2 border-black p-3 rounded-lg flex gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              <img src={item.imageUrl} className="w-16 h-16 object-cover rounded border border-black" />
                              <div className="flex-grow min-w-0">
                                  <h4 className="font-black text-sm truncate">{item.name}</h4>
                                  <p className="text-xs font-bold text-gray-500 mb-1">{item.price}</p>
                                  <button onClick={(e) => toggleCartItem(e, item.id)} className="text-[10px] font-black text-red-500 hover:underline">삭제</button>
                              </div>
                          </div>
                      ))
                  ) : (
                      <div className="text-center py-10 text-gray-400 font-bold">장바구니가 비어있습니다.</div>
                  )
              ) : (
                  bookmarkedPosts.length > 0 ? (
                      MOCK_POSTS.filter(post => bookmarkedPosts.includes(post.id)).map(post => (
                          <div key={post.id} className="bg-white border-2 border-black p-4 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                               <h4 className="font-black text-sm mb-1">{post.title}</h4>
                               <p className="text-xs text-gray-500 line-clamp-2 mb-2">{post.content}</p>
                               <button onClick={(e) => togglePostBookmark(e, post.id)} className="text-[10px] font-black text-red-500 hover:underline">북마크 해제</button>
                          </div>
                      ))
                  ) : (
                      <div className="text-center py-10 text-gray-400 font-bold">저장된 글이 없습니다.</div>
                  )
              )}
          </div>
          <div className="p-4 border-t-2 border-black bg-white">
              <button 
                  onClick={() => setActiveTab('mypage')}
                  className="w-full py-3 bg-black text-white font-black rounded-lg hover:bg-gray-800 transition-colors"
              >
                  마이페이지로 이동
              </button>
          </div>
        </div>
      </>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex selection:bg-yellow-300">
      <aside className="w-80 bg-white border-r-4 border-black h-screen sticky top-0 flex flex-col z-50 hidden lg:flex">
        <div className="p-10 border-b-4 border-black cursor-pointer group" onClick={() => setActiveTab('home')}>
          <div className="flex flex-col items-start">
            <img 
              src="https://i.postimg.cc/xdZTgzvZ/wohol-wonmo-eo-logo.png" 
              alt="워홀원모어" 
              className="w-48 mb-2 group-hover:scale-105 transition-transform origin-left object-contain" 
            />
            <span className="text-xs font-bold text-gray-400 tracking-tight">선택만하세요 준비는 저희가 할게요</span>
          </div>
        </div>
        <nav className="flex-grow p-8 space-y-4">
          <button 
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center gap-4 px-6 py-4 border-4 transition-all font-black text-xl uppercase italic ${activeTab === 'home' ? 'bg-black text-white border-black translate-x-1 translate-y-1' : 'bg-white border-transparent hover:border-black hover:bg-gray-50 hover:scale-105 origin-left'}`}
          >
            <Home size={28} /> Home
          </button>
          <button 
            onClick={() => setActiveTab('store')}
            className={`w-full flex items-center gap-4 px-6 py-4 border-4 transition-all font-black text-xl uppercase italic ${activeTab === 'store' ? 'bg-black text-white border-black translate-x-1 translate-y-1' : 'bg-white border-transparent hover:border-black hover:bg-gray-50 hover:scale-105 origin-left'}`}
          >
            <ShoppingBag size={28} /> Store
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`w-full flex items-center gap-4 px-6 py-4 border-4 transition-all font-black text-xl uppercase italic ${activeTab === 'ai' ? 'bg-black text-white border-black translate-x-1 translate-y-1' : 'bg-white border-transparent hover:border-black hover:bg-gray-50 hover:scale-105 origin-left'}`}
          >
            <MessageSquare size={28} /> AI Assistant
          </button>
          <button 
            onClick={() => setActiveTab('community')}
            className={`w-full flex items-center gap-4 px-6 py-4 border-4 transition-all font-black text-xl uppercase italic ${activeTab === 'community' ? 'bg-black text-white border-black translate-x-1 translate-y-1' : 'bg-white border-transparent hover:border-black hover:bg-gray-50 hover:scale-105 origin-left'}`}
          >
            <Users size={28} /> Community
          </button>
          <button 
            onClick={() => setActiveTab('chat')}
            className={`w-full flex items-center gap-4 px-6 py-4 border-4 transition-all font-black text-xl uppercase italic ${activeTab === 'chat' ? 'bg-black text-white border-black translate-x-1 translate-y-1' : 'bg-white border-transparent hover:border-black hover:bg-gray-50 hover:scale-105 origin-left'}`}
          >
            <MessageCircle size={28} /> Global Chat
          </button>
        </nav>
        <div className="p-8 border-t-4 border-black space-y-4">
          <div 
             onClick={() => setActiveTab('mypage')}
             className="flex items-center gap-4 p-4 border-2 border-black neo-brutalism bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors"
          >
            <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden bg-[#FACC15] flex items-center justify-center">
                <span className="font-black text-lg text-black">홍</span>
            </div>
            <div className="overflow-hidden">
               <p className="font-black truncate">홍길동</p>
               <p className="text-[10px] font-black uppercase text-gray-500">Free Tier Account</p>
            </div>
          </div>
          <button className="w-full py-3 font-black text-sm uppercase italic hover:underline flex items-center justify-center gap-2">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
      <div className="flex-grow flex flex-col min-w-0 relative">
        <header className="sticky top-0 z-40 bg-white border-b-4 border-black px-10 py-6 flex justify-between items-center">
          <div className="flex-grow max-w-2xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={24} />
            <input 
              className="w-full bg-gray-100 border-4 border-transparent focus:border-black focus:bg-white p-4 pl-14 font-black transition-all outline-none" 
              placeholder="Search for jobs, visas, or experts..."
            />
          </div>
          <div className="flex gap-8 items-center pl-10 relative">
            <button 
                onClick={() => {
                    setShowReviewModal(true);
                    setIsReviewSent(false); 
                    setReviewContent('');
                }}
                className="bg-black text-white px-4 py-2 rounded-lg font-black text-xs hover:bg-gray-800 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
            >
                방문자 리뷰(Guest Review)
            </button>
            <div className="relative notification-area">
              <div 
                className="relative cursor-pointer group hover:scale-110 transition-transform"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={28} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-black rounded-full flex items-center justify-center text-[10px] font-black text-white">3</span>
              </div>
              {showNotifications && (
                <div className="absolute top-full right-0 mt-4 w-80 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 animate-in fade-in slide-in-from-top-2 overflow-hidden">
                  <div className="bg-black text-white p-3 flex justify-between items-center">
                     <span className="font-black italic">NOTIFICATIONS</span>
                     <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full border border-white">3 NEW</span>
                  </div>
                  <div className="divide-y-2 divide-gray-100">
                     <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex justify-between items-start mb-1">
                           <span className="font-black text-sm text-blue-600">SYSTEM</span>
                           <span className="text-[10px] font-bold text-gray-400">2분 전</span>
                        </div>
                        <p className="text-sm font-bold text-gray-800">🇦🇺 호주 워킹홀리데이 비자 신청이 정상적으로 접수되었습니다.</p>
                     </div>
                     <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex justify-between items-start mb-1">
                           <span className="font-black text-sm text-green-600">COMMUNITY</span>
                           <span className="text-[10px] font-bold text-gray-400">1시간 전</span>
                        </div>
                        <p className="text-sm font-bold text-gray-800">'시드니 쉐어하우스...' 글에 새로운 댓글이 달렸습니다.</p>
                     </div>
                     <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors bg-purple-50">
                        <div className="flex justify-between items-start mb-1">
                           <span className="font-black text-sm text-purple-600 flex items-center gap-1"><PartyPopper size={12}/> EVENT</span>
                           <span className="text-[10px] font-bold text-gray-400">방금 전</span>
                        </div>
                        <p className="text-sm font-bold text-gray-800">📅 [D-3] 서울 워홀러 네트워킹 파티가 이번 주 토요일에 열립니다!</p>
                     </div>
                  </div>
                  <button className="w-full py-3 bg-gray-100 font-black text-xs hover:bg-gray-200 transition-colors border-t-2 border-black">
                     MARK ALL AS READ
                  </button>
                </div>
              )}
            </div>
            <div className="relative cursor-pointer bookmark-toggle" onClick={() => { setShowBookmarks(!showBookmarks); setBookmarkTab('store'); }}>
               <ShoppingCart size={28} className="hover:scale-110 transition-transform"/>
               {cartItems.length > 0 && (
                   <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                       {cartItems.length}
                   </span>
               )}
            </div>
            <HelpCircle size={28} className="cursor-pointer hover:scale-110 transition-transform" onClick={() => setActiveTab('info')} />
            <div 
              onClick={() => setActiveTab('mypage')}
              className="w-12 h-12 rounded-full border-2 border-black overflow-hidden cursor-pointer hover:scale-110 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-[#FACC15] flex items-center justify-center"
            >
               <span className="font-black text-xl text-black">홍</span>
            </div>
          </div>
        </header>
        <main className="p-12 overflow-y-auto bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'home' && renderHome()}
            {activeTab === 'store' && renderStore()}
            {activeTab === 'ai' && (
               <div className="max-w-4xl mx-auto flex flex-col items-center justify-center h-[600px] text-center p-8 border-4 border-black rounded-xl bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-300">
               <div className="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center mb-6 text-6xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                     🤖
               </div>
               <h3 className="text-3xl font-black italic mb-4">AI Assistant</h3>
               <p className="font-bold text-gray-500 mb-8 text-lg">
                     현재 AI 서비스 시스템 점검 중입니다.<br/>
                     더 똑똑해진 모습으로 곧 돌아올게요! 🚀
               </p>
               <button className="px-8 py-4 bg-black text-white font-black rounded-full text-lg hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(100,100,100,0.5)]">
                     다른 기능 둘러보기
               </button>
               </div>
            )}
            {activeTab === 'community' && renderCommunity()}
            {activeTab === 'chat' && renderChat()}
            {activeTab === 'mypage' && renderMyPage()}
            {activeTab === 'info' && renderInfo()}
          </div>
        </main>
        {showWelcomePopup && renderWelcomePopup()}
        {showInquiryModal && renderInquiryModal()}
        {showUpgradeModal && renderUpgradeModal()}
        {showReviewModal && renderReviewModal()}
        {renderBookmarksDrawer()}
        {/*{activeTab !== 'ai' && <ChatBot />}*/}
        <footer className="mt-auto bg-white border-t-4 border-black p-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <button onClick={() => setActiveTab('home')} className="mb-4 hover:scale-105 transition-transform origin-left cursor-pointer inline-block">
                  <img src="https://i.postimg.cc/Gp4bBmWG/wohol-wonmo-eo-logo2.png" alt="워홀원모어" className="h-8 md:h-10 object-contain" />
               </button>
               <p className="font-bold text-gray-500">당신의 새로운 도약을 위한 모든 것. 전문가와 함께 성공적인 워홀을 준비하세요.</p>
            </div>
            <div className="flex gap-6 font-black uppercase text-sm tracking-widest">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Help</a>
              <a href="#" className="hover:underline text-blue-600 font-black italic">Go to Mobile →</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;