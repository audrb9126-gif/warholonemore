
import React, { useState, useEffect } from 'react';
import { CHARACTERS, MOCK_TASKS, MOCK_STORE_ITEMS, MOCK_POSTS, COUNTRIES, TRAVEL_PURPOSES, STORE_CATEGORIES, MOCK_CHAT_ROOMS } from './constants';
import CharacterCard from './components/CharacterCard';
//import ChatBot from './components/ChatBot';
import { 
  Home, ShoppingBag, MessageSquare, Users, MessageCircle, 
  Search, Bell, Bookmark, Settings, Plus, 
  ChevronRight, ChevronLeft, MapPin, CheckCircle2, Circle,
  LogOut, HelpCircle,
  CreditCard, Smartphone, Bus, Banknote, Trash2, Plane, Calendar, Briefcase, Globe, FileText, ArrowRight, X, Star, Clock, Phone,
  Menu, ThumbsUp, MessageSquare as MessageIcon, User, Edit3, Shield, CreditCard as CardIcon, Check, ExternalLink, Info as InfoIcon,
  PartyPopper
} from 'lucide-react';
import { TabType, PrepTask } from './types';

// Importing the image as requested (Using the high-quality 3D URL directly for stability in this environment)
const PilotImg = "https://i.postimg.cc/Y0rSvJX0/pilot-removebg-preview.png";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedCountry, setSelectedCountry] = useState('au');
  const [prepTab, setPrepTab] = useState('출국 전');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarkTab, setBookmarkTab] = useState<'store' | 'community'>('store');
  
  // Find current country data
  const currentCountry = COUNTRIES.find(c => c.id === selectedCountry);
  
  // Inquiry Modal State
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [isInquirySuccess, setIsInquirySuccess] = useState(false);

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
  const [communityCategory, setCommunityCategory] = useState('커뮤니티');
  const [communityFilter, setCommunityFilter] = useState('전체글');
  const [bookmarkedPosts, setBookmarkedPosts] = useState<string[]>([]);

  // Reservation State
  const [calendarDate, setCalendarDate] = useState(new Date()); 
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reservationStep, setReservationStep] = useState<1 | 2>(1); // 1: DateTime, 2: Details
  const [reservationNote, setReservationNote] = useState('');
  const [isReservationSuccess, setIsReservationSuccess] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right'); // Animation direction for reservation

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
      if (!target.closest('.notification-area')) {
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

  // Animation Styles for Calendar
  const calendarAnimationStyles = `
    @keyframes slideInRight {
      0% { opacity: 0; transform: translateX(20px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInLeft {
      0% { opacity: 0; transform: translateX(-20px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    .calendar-slide-right {
      animation: slideInRight 0.3s ease-out forwards;
    }
    .calendar-slide-left {
      animation: slideInLeft 0.3s ease-out forwards;
    }
  `;

  const renderUpgradeModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] animate-in fade-in p-4" onClick={() => setShowUpgradeModal(false)}>
        <div className="bg-white w-full max-w-4xl rounded-2xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowUpgradeModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black">
                <X size={24} />
            </button>

            <h2 className="text-3xl font-black text-center mb-8">플랜 업그레이드</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                {/* Free Plan */}
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

                {/* Pro Plan */}
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
                    <p className="text-xs font-bold text-gray-500 mb-4">권정빈 행정사에게 짧은 메세지를 보내보세요.</p>
                    
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

  // Info Page Component (Restored & Updated)
  const renderInfo = () => (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-black text-white p-8 rounded-xl relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
         <div className="relative z-10">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Working Holiday<br/>Info Center</h2>
            <p className="font-bold text-gray-300 max-w-xl">
               대한민국 정부 지원 프로그램부터 국가별 자격 요건까지,<br/>
               성공적인 워킹홀리데이를 위한 필수 정보를 확인하세요.
            </p>
         </div>
         <InfoIcon className="absolute -right-10 -bottom-10 w-64 h-64 text-gray-800 opacity-50" />
      </div>

      {/* Section 1: Government Support (Clickable) */}
      <div>
         <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><Shield className="text-blue-600"/> 정부 지원 프로그램</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a 
              href="https://www.worldjob.or.kr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white border-2 border-black p-6 rounded-xl hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group block"
            >
               <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">🌏</div>
                  <ExternalLink size={20} className="text-gray-400 group-hover:text-black" />
               </div>
               <h4 className="text-xl font-black mb-2">월드잡플러스 (WorldJob+)</h4>
               <p className="text-sm font-bold text-gray-500 mb-4">고용노동부와 한국산업인력공단이 운영하는 해외취업 지원 포털입니다. 해외 취업 정착 지원금(최대 500만원) 신청이 가능합니다.</p>
               <span className="text-xs font-black bg-blue-600 text-white px-3 py-1 rounded-full">해외취업장려금</span>
            </a>
            <a 
              href="https://whic.mofa.go.kr/"
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white border-2 border-black p-6 rounded-xl hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer group block"
            >
               <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">ℹ️</div>
                  <ExternalLink size={20} className="text-gray-400 group-hover:text-black" />
               </div>
               <h4 className="text-xl font-black mb-2">워킹홀리데이 인포센터 (WHIC)</h4>
               <p className="text-sm font-bold text-gray-500 mb-4">외교부 워킹홀리데이 인포센터로, 국가별 비자 정보, 안전 수칙, 체험 수기 등 공신력 있는 정보를 제공합니다.</p>
               <span className="text-xs font-black bg-green-600 text-white px-3 py-1 rounded-full">공식 가이드북</span>
            </a>
         </div>
      </div>

      {/* Section 2: Country Requirements (Expanded & Updated) */}
      <div>
         <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><Globe className="text-purple-600"/> 주요 국가별 자격 요건 (2025 기준)</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
               { code: 'AU', flag: '🇦🇺', name: '호주', age: '만 18-30세', money: 'AUD 5,000+', quota: '제한 없음', feature: '상시 신청, 세컨/서드 비자 가능' },
               { code: 'CA', flag: '🇨🇦', name: '캐나다', age: '만 18-35세', money: 'CAD 2,500+', quota: '12,000명 (쿼터제)', feature: '추첨제(Pool), 최대 24개월 체류' },
               { code: 'UK', flag: '🇬🇧', name: '영국', age: '만 18-35세', money: 'GBP 2,530+', quota: '5,000명 (YMS)', feature: '최대 24개월 체류, 경쟁률 낮음' },
               { code: 'JP', flag: '🇯🇵', name: '일본', age: '만 18-25세 (예외 30세)', money: 'JPY 280,000+', quota: '10,000명', feature: '분기별 접수, 계획서/이유서 중요' },
               { code: 'NZ', flag: '🇳🇿', name: '뉴질랜드', age: '만 18-30세', money: 'NZD 4,200+', quota: '3,000명', feature: '선착순 접수(5월), 경쟁률 치열' },
               { code: 'DE', flag: '🇩🇪', name: '독일', age: '만 18-30세', money: 'EUR 2,000+', quota: '제한 없음', feature: '현지 비자 신청 가능, 최대 12개월' },
               { code: 'FR', flag: '🇫🇷', name: '프랑스', age: '만 18-30세', money: 'EUR 2,500+', quota: '2,000명', feature: '동기서 중요, 한국에서 신청 필수' },
               { code: 'IE', flag: '🇮🇪', name: '아일랜드', age: '만 18-30세', money: 'EUR 1,500+', quota: '800명', feature: '상/하반기 추첨, 어학연수 인기' },
            ].map((c) => (
               <div key={c.code} className="bg-white border-2 border-black p-5 rounded-xl space-y-3 hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="font-black text-2xl">{c.flag}</span>
                     <h4 className="font-black text-lg">{c.name}</h4>
                  </div>
                  <div className="text-sm space-y-2">
                     <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-500 font-bold">연령</span>
                        <span className="font-black">{c.age}</span>
                     </div>
                     <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-500 font-bold">초기자금</span>
                        <span className="font-black">{c.money}</span>
                     </div>
                     <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-500 font-bold">쿼터</span>
                        <span className="font-black">{c.quota}</span>
                     </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-xs font-bold text-gray-600 text-center">
                     {c.feature}
                  </div>
               </div>
            ))}
         </div>
      </div>

      <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-xl flex items-start gap-4">
         <InfoIcon className="text-yellow-600 flex-shrink-0" />
         <div>
            <h4 className="font-black text-yellow-800 text-lg mb-1">주의사항</h4>
            <p className="text-sm font-bold text-yellow-700">
               위 정보는 2025년 기준 대략적인 요건이며, 각국 이민성의 정책 변경에 따라 수시로 달라질 수 있습니다. 
               비자 신청 전 반드시 해당 국가 이민성 공식 홈페이지 또는 대사관 공지를 확인하시기 바랍니다.
            </p>
         </div>
      </div>
    </div>
  );

  const renderBookmarksDrawer = () => (
     <div className={`fixed inset-y-0 right-0 w-96 bg-white border-l-4 border-black shadow-2xl z-50 transform transition-transform duration-300 ease-in-out bookmark-area ${showBookmarks ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
           {/* Header */}
           <div className="bg-black text-white p-6 flex justify-between items-center">
              <h3 className="font-black text-xl italic flex items-center gap-2"><Bookmark className="fill-white" size={20}/> SAVED ITEMS</h3>
              <button onClick={() => setShowBookmarks(false)}><X className="hover:text-gray-300" /></button>
           </div>
           
           {/* Tabs */}
           <div className="flex border-b-4 border-black">
              <button 
                onClick={() => setBookmarkTab('store')}
                className={`flex-1 py-4 font-black text-sm uppercase ${bookmarkTab === 'store' ? 'bg-yellow-300' : 'bg-white hover:bg-gray-50'}`}
              >
                Store ({MOCK_STORE_ITEMS.slice(0, 3).length})
              </button>
              <button 
                onClick={() => setBookmarkTab('community')}
                className={`flex-1 py-4 font-black text-sm uppercase border-l-2 border-black ${bookmarkTab === 'community' ? 'bg-blue-300' : 'bg-white hover:bg-gray-50'}`}
              >
                Community ({MOCK_POSTS.slice(0, 2).length})
              </button>
           </div>

           {/* Content List */}
           <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
              {bookmarkTab === 'store' ? (
                 MOCK_STORE_ITEMS.slice(0, 3).map(item => (
                    <div key={item.id} className="bg-white border-2 border-black p-3 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex gap-3 cursor-pointer hover:translate-x-1 transition-transform">
                       <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0 border border-black">
                          <img src={item.imageUrl} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-grow min-w-0">
                          <p className="text-xs font-bold text-gray-500 mb-1">{item.category}</p>
                          <h4 className="font-black text-sm leading-tight mb-1 truncate">{item.name}</h4>
                          <p className="font-black text-sm">{item.price}</p>
                       </div>
                    </div>
                 ))
              ) : (
                 MOCK_POSTS.slice(0, 2).map(post => (
                    <div key={post.id} className="bg-white border-2 border-black p-4 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:translate-x-1 transition-transform">
                       <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mb-2 inline-block">
                          {post.tag || '전체'}
                       </span>
                       <h4 className="font-black text-sm mb-2">{post.title}</h4>
                       <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                          <span>{post.author}</span>
                          <span className="flex items-center gap-1"><Star size={10} className="fill-gray-400"/> {post.scraps}</span>
                       </div>
                    </div>
                 ))
              )}
           </div>
           
           <div className="p-4 border-t-4 border-black bg-white">
              <button className="w-full py-3 bg-black text-white font-black hover:bg-gray-800 transition-colors">
                 VIEW ALL SAVED
              </button>
           </div>
        </div>
     </div>
  );

  const renderHome = () => (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
      <style>{calendarAnimationStyles}</style>
      
      {/* 1. Enhanced Hero Section (Fixed Layout) */}
      <div className="relative w-full h-[500px] rounded-3xl border-2 border-blue-100 overflow-hidden shadow-sm group">
        
        {/* Background Layer with Dynamic Image and Overlay */}
        <div className="absolute inset-0 bg-[#F0F9FF]">
            {currentCountry && (
                <>
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out transform scale-105 group-hover:scale-100"
                        style={{ backgroundImage: `url(${currentCountry.imageUrl})` }}
                    />
                    {/* Updated: Reduced white overlay opacity for clearer background image (bg-white/40) */}
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
                </>
            )}
        </div>
        
        {/* Decorative Diagonal Line */}
        <div className="absolute bottom-0 left-1/2 w-0.5 h-full bg-blue-100/50 transform -skew-x-12 hidden lg:block z-10"></div>

        {/* Content Container */}
        <div className="relative z-30 h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
          {/* Left: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start pt-8">
             <span className="text-blue-500 font-black tracking-widest text-lg mb-3 uppercase">Working Holiday One More</span>
             <h2 className="text-6xl md:text-7xl font-black text-blue-600 mb-6 leading-tight tracking-tighter">
               워홀 원 모어
             </h2>
             <div className="mb-10">
                <p className="text-xl md:text-2xl font-bold text-gray-700 leading-relaxed drop-shadow-sm">
                  "선택만 하세요.
                </p>
                <p className="text-xl md:text-2xl font-black text-black leading-relaxed drop-shadow-sm">
                  준비는 저희가 할게요."
                </p>
             </div>
             <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-black hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-3 text-lg transform hover:-translate-y-1 group">
               <Plane size={24} className="group-hover:rotate-45 transition-transform duration-300" /> 
               출국 준비 시작하기
             </button>
          </div>
        </div>

        {/* Right Side: Composition Group */}
        <div className="absolute right-0 bottom-0 h-full w-1/2 hidden lg:flex items-center justify-center pointer-events-none z-30">
            {/* Relative Container for stacking */}
            <div className="relative w-[580px] h-[580px] flex items-center justify-center transform translate-y-12 translate-x-8">
                {/* 1. Yellow Circle (Behind) */}
                <div className="absolute w-[480px] h-[480px] bg-yellow-300 rounded-full blur-[2px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* 2. Character Image (Front, Floating) */}
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
      <div className="flex border-b-2 border-gray-200 overflow-x-auto">
        {['출국 전', '생활', '알바', '서류', '집'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setPrepTab(tab)}
            className={`px-8 py-4 font-black text-lg transition-all relative whitespace-nowrap ${
              prepTab === tab 
                ? 'text-blue-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
            {prepTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Admin Banner + Checklist */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Enhanced Expert Profile Banner (Screenshot 1) */}
          <div className="neo-brutalism bg-white p-0 relative overflow-hidden rounded-xl group hover:shadow-lg transition-all">
             {/* Header Image/Background */}
             <div className="h-24 bg-gradient-to-r from-slate-700 to-slate-900 relative">
               <div className="absolute inset-0 bg-black/20"></div>
               <div className="absolute bottom-4 left-6 text-white">
                  <p className="text-xs font-bold opacity-80">행정대 | 행정법인 | 대형로펌 행정인</p>
                  <p className="text-lg font-black">행정사 전화 상담 3회 무료!</p>
               </div>
             </div>
             
             <div className="p-6 flex flex-col md:flex-row gap-6 relative">
                {/* Profile Image */}
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 overflow-hidden flex-shrink-0 -mt-12 relative z-10">
                   <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow pt-2">
                   <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                           <h3 className="text-2xl font-black text-gray-900">권정빈 행정사</h3>
                           <span className="bg-blue-100 text-blue-700 text-xs font-black px-2 py-0.5 rounded">대표 행정사</span>
                        </div>
                        <p className="text-sm font-bold text-gray-500">로엘행정사법인</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><MapPin size={12}/> 경기도 수원시 영통구</p>
                      </div>
                      <div className="text-center">
                         <span className="text-2xl font-black text-blue-600">100%</span>
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

          {/* Checklist Area */}
          <div>
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-black italic text-gray-400 uppercase">Preparation List</h3>
               {prepTab === '출국 전' && <span className="text-xs font-black text-blue-500 bg-blue-50 px-2 py-1 rounded">3 tasks remaining</span>}
            </div>
            
            <div className="space-y-4">
              {MOCK_TASKS.filter(t => t.tab === prepTab).map((task) => (
                <div 
                  key={task.id} 
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`border-2 rounded-2xl p-6 flex items-center justify-between shadow-sm cursor-pointer transition-all ${
                    selectedTaskId === task.id 
                    ? 'bg-blue-50 border-blue-500 ring-4 ring-blue-100' 
                    : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedTaskId === task.id ? 'bg-blue-500 text-white shadow-lg shadow-blue-200' : 'bg-gray-50 text-gray-500'}`}>
                      {getTaskIcon(task.iconType || 'default')}
                    </div>
                    <div>
                      <h4 className={`text-lg font-black ${selectedTaskId === task.id ? 'text-blue-900' : 'text-gray-800'}`}>{task.title}</h4>
                      <p className="text-sm font-bold text-gray-400">{task.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {task.rightTag && (
                      <span className="text-lg font-black text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                        {task.rightTag}
                      </span>
                    )}
                    {task.iconType === 'phone' ? (
                       <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors z-10">
                         <Trash2 size={18} />
                       </button>
                    ) : (
                      <ChevronRight className={selectedTaskId === task.id ? 'text-blue-500' : 'text-gray-300'} />
                    )}
                  </div>
                </div>
              ))}
              
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
              // Reservation Flow
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
                                {/* Step 1: Type */}
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

                                {/* Step 2: Date (Monthly Calendar) */}
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
                                    {/* Calendar Grid with CSS Keyframe Animation */}
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
                                            {/* Empty slots for start of month */}
                                            {Array.from({ length: getFirstDayOfMonth(calendarDate) }).map((_, i) => (
                                                <div key={`empty-${i}`} className="p-2"></div>
                                            ))}
                                            {/* Days */}
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
                                                        {isDisabled && <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                            <div className="w-full h-[1px] bg-gray-300 rotate-45 transform"></div>
                                                        </div>}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                </div>

                                {/* Step 3: Time */}
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
                                <p className="text-xs text-gray-500 mb-2 leading-relaxed">
                                    개인별 맞춤형 상담을 위해서 상담하고 싶은 내용을 간단히 작성해주세요!
                                </p>
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
                                    className={`w-full py-4 font-black rounded-lg transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${reservationNote.trim().length > 0 ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'}`}
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
                             {calendarDate.getMonth() + 1}월 {selectedDate}일 {selectedTime}에<br/>
                             상담이 확정되었습니다.
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
               {/* Task Management Card */}
               <div className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <div className="bg-gray-50 border-b-2 border-gray-100 p-4 flex justify-between items-center">
                     <h3 className="font-black text-lg flex items-center gap-2">
                       {getTaskIcon(selectedTask.iconType)}
                       <span className="truncate w-40">{selectedTask.title}</span>
                     </h3>
                     <button onClick={() => setSelectedTaskId(null)}><X size={20} className="text-gray-400 hover:text-black"/></button>
                  </div>
                  
                  {/* Task Details Form */}
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

               {/* Guide Card */}
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
             // Default Right Column
             <div className="space-y-8 animate-in fade-in">
                {/* Trip Widget */}
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

                        {/* Dropdown Calendar for Departure Date */}
                        {showDepartureCalendar && (
                           <div className="absolute top-full left-0 mt-2 w-full bg-white border-2 border-black rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
                              <div className="flex justify-between items-center mb-4">
                                <h4 className="font-black text-sm">출국일 설정 (2027-2029)</h4>
                                <button onClick={() => setShowDepartureCalendar(false)}><X size={16} /></button>
                              </div>
                              
                              {/* Month Navigation */}
                              <div className="flex items-center justify-between mb-3 bg-gray-100 p-2 rounded-lg">
                                <button onClick={() => changeDepartureMonth(-1)} className="p-1 hover:bg-white rounded transition-colors disabled:opacity-30" disabled={departureViewDate.getFullYear() === 2027 && departureViewDate.getMonth() === 0}>
                                  <ChevronLeft size={16}/>
                                </button>
                                <span className="font-black text-sm">{departureViewDate.getFullYear()}. {departureViewDate.getMonth() + 1}</span>
                                <button onClick={() => changeDepartureMonth(1)} className="p-1 hover:bg-white rounded transition-colors disabled:opacity-30" disabled={departureViewDate.getFullYear() === 2029 && departureViewDate.getMonth() === 11}>
                                  <ChevronRight size={16}/>
                                </button>
                              </div>

                              {/* Calendar Grid */}
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
                                      {/* Empty slots */}
                                      {Array.from({ length: getFirstDayOfMonth(departureViewDate) }).map((_, i) => (
                                          <div key={`empty-${i}`} className="p-2"></div>
                                      ))}
                                      {/* Days */}
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

               {/* Mentors */}
               <div className="bg-white border-2 border-black p-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex justify-between items-center mb-4">
                     <h3 className="font-black italic text-lg">My Mentors</h3>
                     <span className="text-xs font-bold text-blue-600 cursor-pointer">View All</span>
                  </div>
                  <div className="space-y-4">
                     {CHARACTERS.map(c => (
                       <div key={c.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                          <div className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-gray-100">
                            <img src={c.imageUrl} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-black text-sm">{c.name}</p>
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
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
         <h2 className="text-3xl font-black italic text-blue-600">워홀원모어 스토어</h2>
         <div className="flex gap-4">
            <Search size={24} className="cursor-pointer" />
            <Bell size={24} className="cursor-pointer" />
         </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
         {STORE_CATEGORIES.map((cat, i) => (
            <button 
              key={cat} 
              onClick={() => setActiveStoreCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-black whitespace-nowrap transition-colors ${activeStoreCategory === cat ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-500 hover:border-black hover:text-black'}`}
            >
               {cat}
            </button>
         ))}
      </div>

      {/* Hero Banner (Store) */}
      <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-between relative overflow-hidden">
         <div className="relative z-10">
            <p className="font-black text-lg mb-2">★ 워홀 준비, 여기서 끝내기 ★</p>
            <h3 className="text-3xl font-black leading-tight">가장 완벽한 <br/>워킹홀리데이 준비</h3>
         </div>
         <div className="w-32 h-32 bg-yellow-300 rounded-full blur-2xl absolute -right-4 -bottom-4"></div>
      </div>

      {/* Sort & Count */}
      <div className="flex justify-between items-center">
         <span className="font-black text-sm">총 {MOCK_STORE_ITEMS.filter(item => item.category === activeStoreCategory).length}개</span>
         <button className="flex items-center gap-1 text-xs font-bold text-gray-500">
            추천순 <ChevronRight size={14} className="rotate-90" />
         </button>
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-10">
        {MOCK_STORE_ITEMS
          .filter(item => item.category === activeStoreCategory)
          .map(item => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gray-200 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none transition-all">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              {item.id === '1' && (
                 <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded">HOT</div>
              )}
            </div>
            <div>
              <h4 className="font-black text-lg mb-1 leading-tight line-clamp-2 group-hover:underline">{item.name}</h4>
              <p className="font-black text-xl mb-1">{item.price}</p>
              <div className="flex items-center gap-1 text-sm font-bold text-gray-500">
                 <Star size={14} className="text-yellow-400 fill-yellow-400" />
                 <span className="text-black">{item.rating}</span>
                 <span>({item.reviewCount})</span>
              </div>
            </div>
          </div>
        ))}
        {MOCK_STORE_ITEMS.filter(item => item.category === activeStoreCategory).length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-400 font-bold border-2 border-dashed border-gray-200 rounded-xl">
             준비된 상품이 없습니다.
          </div>
        )}
      </div>
    </div>
  );

  const renderCommunity = () => {
    // Logic to filter posts based on tabs and filters
    let filteredPosts = MOCK_POSTS;

    // 1. Tab Filter
    if (communityCategory === '워홀정보방') {
        filteredPosts = filteredPosts.filter(p => p.tag === '정보' || p.tag === '꿀팁');
    } else if (communityCategory === '멘토게시판') {
        filteredPosts = filteredPosts.filter(p => p.author.includes('멘토') || p.author.includes('선배') || p.author.includes('인스펙'));
    } else if (communityCategory === '나라별 게시판') {
        // Simulating country filter
        filteredPosts = filteredPosts.filter(p => 
            p.title.includes('호주') || p.content.includes('시드니') || 
            p.title.includes('캐나다') || p.author.includes('브리즈번') ||
            p.title.includes('영국') || p.title.includes('일본')
        );
    }

    // 2. Chip Filter
    if (communityFilter === '인기글') {
        filteredPosts = filteredPosts.filter(p => p.likes >= 8); 
    } else if (communityFilter === '공지') {
        // Assuming posts with '필독' or specific IDs are notices
        filteredPosts = filteredPosts.filter(p => p.title.includes('필독') || p.tag === '공지' || p.id === '2');
    } else if (communityFilter === '즐겨찾기') {
        filteredPosts = filteredPosts.filter(p => bookmarkedPosts.includes(p.id));
    }

    return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
       {/* Header with Title and Tools */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-4xl font-black text-blue-600 italic uppercase mb-1">Community</h2>
            <p className="text-sm font-bold text-gray-500">워홀러들의 생생한 이야기와 꿀팁을 확인하세요.</p>
         </div>
         <div className="flex gap-3">
             <div className="relative group">
                 <input 
                    className="pl-10 pr-4 py-2 border-2 border-black rounded-full font-bold text-sm w-64 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    placeholder="관심있는 키워드를 검색해보세요"
                 />
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             </div>
             <button className="bg-black text-white px-6 py-2 rounded-full font-black text-sm hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                 글쓰기
             </button>
         </div>
       </div>

       {/* Navigation Tabs (Sub-boards) */}
       <div className="flex gap-1 border-b-2 border-gray-200">
          {['커뮤니티', '워홀정보방', '멘토게시판', '나라별 게시판'].map((tab) => (
             <button 
                key={tab}
                onClick={() => setCommunityCategory(tab)}
                className={`px-6 py-3 font-black text-sm relative transition-colors ${communityCategory === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
             >
                {tab}
                {communityCategory === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>}
             </button>
          ))}
       </div>

       {/* Filters */}
       <div className="flex gap-2">
          {['전체글', '인기글', '공지', '즐겨찾기'].map((filter) => (
            <button 
                key={filter} 
                onClick={() => setCommunityFilter(filter)}
                className={`px-4 py-1.5 rounded-full border-2 text-xs font-black transition-all ${
                    communityFilter === filter 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white border-gray-200 text-gray-500 hover:border-black hover:text-black'
                }`}
            >
                {filter === '즐겨찾기' ? <span className="flex items-center gap-1"><Star size={10} className={bookmarkedPosts.length > 0 ? "fill-yellow-400 text-yellow-400" : ""} /> 즐겨찾기</span> : filter}
            </button>
          ))}
       </div>

       {/* Post List (Grid Layout for "Open" feel) */}
       <div className="grid grid-cols-1 gap-4">
         {filteredPosts.length > 0 ? (
             filteredPosts.map(post => (
             <div key={post.id} className="bg-white border-2 border-black rounded-xl p-6 shadow-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 cursor-pointer transition-all group relative">
                <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${post.tag === '공지' ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                            {post.tag || '잡담'}
                        </span>
                        <span className="text-xs font-bold text-gray-400">{post.category === 'popular' ? '🔥 인기' : ''}</span>
                    </div>
                    <button 
                        onClick={(e) => togglePostBookmark(e, post.id)}
                        className="text-gray-300 hover:text-yellow-400 transition-colors p-1"
                    >
                        <Star size={20} className={bookmarkedPosts.includes(post.id) ? "fill-yellow-400 text-yellow-400" : ""} />
                    </button>
                </div>
                
                <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {post.title}
                </h3>
                <p className="text-sm font-bold text-gray-500 line-clamp-2 mb-4">
                    {post.content}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t-2 border-gray-50">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden border border-black">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author}`} alt="avatar" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black">{post.author}</span>
                            <span className="text-[10px] font-bold text-gray-400">{post.time}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-400">
                        <span className="flex items-center gap-1"><MessageSquare size={14}/> {post.comments}</span>
                        <span className="flex items-center gap-1"><ThumbsUp size={14}/> {post.likes}</span>
                        <span className="flex items-center gap-1"><Users size={14}/> {post.views}</span>
                    </div>
                </div>
             </div>
             ))
         ) : (
            <div className="py-20 text-center border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                <p className="text-gray-400 font-bold mb-2">게시글이 없습니다.</p>
                {communityFilter === '즐겨찾기' && <p className="text-xs text-gray-400">게시글의 별 모양 아이콘을 눌러 저장해보세요!</p>}
            </div>
         )}
       </div>
    </div>
    );
  };

  const renderChat = () => (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-4xl font-black text-black italic uppercase mb-1">Global Chat</h2>
            <p className="text-sm font-bold text-gray-500">전 세계 워홀러들과 실시간으로 소통하세요.</p>
         </div>
         <div className="flex gap-3">
            <div className="relative group">
                 <input 
                    className="pl-10 pr-4 py-2 border-2 border-black rounded-full font-bold text-sm w-64 focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    placeholder="채팅방 검색..."
                 />
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             </div>
             <button className="bg-black text-white px-6 py-2 rounded-full font-black text-sm hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                 방 만들기
             </button>
         </div>
      </div>

      {/* Country Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['호주', '캐나다', '뉴질랜드', '일본', '영국', '독일', '프랑스', '아일랜드'].map((country) => (
            <button 
            key={country} 
            onClick={() => setActiveChatCountry(country)}
            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-black border-2 border-black transition-all shadow-sm ${
                activeChatCountry === country 
                ? 'bg-black text-white scale-105' 
                : 'bg-white text-gray-500 hover:bg-gray-100 hover:scale-105'
            }`}
            >
            {country}
            </button>
        ))}
      </div>

      {/* Chat Room List (Grid Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {MOCK_CHAT_ROOMS
           .filter(room => room.tags.includes(activeChatCountry))
           .map(room => (
            <div key={room.id} className="bg-white border-2 border-black rounded-xl p-4 flex gap-4 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 cursor-pointer transition-all group">
               <div className="w-24 h-24 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0 relative border-2 border-black">
                  <img src={room.imageUrl} alt={room.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded">LIVE</div>
               </div>
               <div className="flex-grow min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-black text-gray-900 truncate pr-2 group-hover:text-blue-600 transition-colors">{room.title}</h3>
                    </div>
                    <div className="flex gap-1 mb-2">
                        {room.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-bold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">#{tag}</span>
                        ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                     <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
                        <User size={12} /> {room.participants}명 참여중
                     </div>
                     <span className="text-xs text-blue-500 font-bold bg-blue-50 px-2 py-1 rounded-full">{room.lastMessageTime} 업데이트</span>
                  </div>
               </div>
            </div>
         ))}
         {MOCK_CHAT_ROOMS.filter(room => room.tags.includes(activeChatCountry)).length === 0 && (
           <div className="col-span-full py-20 text-center text-gray-400 font-bold border-2 border-dashed border-gray-300 rounded-xl">
              아직 개설된 채팅방이 없습니다.
           </div>
         )}
      </div>
    </div>
  );

  const renderMyPage = () => (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
         <h2 className="text-3xl font-black italic text-black">마이페이지</h2>
         <button onClick={() => setActiveTab('home')} className="text-sm font-bold text-gray-400 hover:text-black hover:underline">홈으로 돌아가기</button>
      </div>

      {/* Profile Header */}
      <div className="bg-white border-4 border-black p-8 flex flex-col md:flex-row items-center justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] gap-6">
         <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="w-24 h-24 bg-yellow-300 rounded-full border-4 border-black flex items-center justify-center text-3xl font-black flex-shrink-0">홍</div>
            <div>
               <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-3xl font-black">홍길동</h2>
                  <Edit3 size={16} className="text-gray-400 cursor-pointer hover:text-black" />
               </div>
               <p className="font-bold text-gray-500">예비 워홀러 (D-385)</p>
               <div className="flex gap-2 mt-3">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-black border-2 border-blue-500 rounded-full">Free Tier</span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 text-xs font-black border-2 border-gray-500 rounded-full flex items-center gap-1"><MapPin size={10} /> Seoul, KR</span>
               </div>
            </div>
         </div>
         <div className="w-full md:w-auto flex flex-col gap-2">
            <button className="px-6 py-3 bg-black text-white font-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(100,100,100,0.5)] whitespace-nowrap">
               프로필 수정
            </button>
         </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">My Plan</p>
            <div className="flex justify-between items-end">
               <span className="text-3xl font-black">23%</span>
               <div className="text-right">
                  <p className="text-sm font-bold">준비 진행률</p>
                  <p className="text-xs text-gray-400">3개 완료 / 13개 전체</p>
               </div>
            </div>
            <div className="w-full bg-gray-100 h-2 mt-4 rounded-full overflow-hidden border border-black">
               <div className="w-[23%] bg-blue-500 h-full"></div>
            </div>
         </div>
         <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">Saved Items</p>
            <div className="flex justify-between items-end">
               <span className="text-3xl font-black">5</span>
               <div className="text-right">
                  <p className="text-sm font-bold">찜한 상품</p>
                  <p className="text-xs text-gray-400">스토어 보러가기 →</p>
               </div>
            </div>
         </div>
         <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-transform">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">My Community</p>
            <div className="flex justify-between items-end">
               <span className="text-3xl font-black">12</span>
               <div className="text-right">
                  <p className="text-sm font-bold">작성한 글</p>
                  <p className="text-xs text-gray-400">댓글 45개</p>
               </div>
            </div>
         </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Account Info */}
         <div className="space-y-4">
            <h3 className="text-xl font-black flex items-center gap-2"><User size={20} /> 계정 정보</h3>
            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl space-y-4">
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">이메일</label>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      value={email} 
                      disabled={!isEditingEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full border rounded p-2 text-sm font-bold transition-colors ${isEditingEmail ? 'bg-white border-black' : 'bg-gray-50 border-gray-300 text-gray-500'}`} 
                    />
                    <button 
                      onClick={handleEmailEdit}
                      className={`px-3 text-xs font-bold rounded whitespace-nowrap transition-colors ${isEditingEmail ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-white hover:bg-gray-800'}`}
                    >
                      {isEditingEmail ? '저장' : '변경'}
                    </button>
                  </div>
                  {emailSuccessMsg && <p className="text-xs text-green-600 font-black mt-1 animate-in fade-in slide-in-from-top-1">{emailSuccessMsg}</p>}
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">휴대폰 번호</label>
                  <div className="flex gap-2">
                     <input 
                        type="tel" 
                        value={phone} 
                        disabled={!isEditingPhone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full border rounded p-2 text-sm font-bold transition-colors ${isEditingPhone ? 'bg-white border-black' : 'bg-gray-50 border-gray-300 text-gray-500'}`} 
                     />
                     <button 
                        onClick={handlePhoneEdit}
                        className={`px-3 text-xs font-bold rounded whitespace-nowrap transition-colors ${isEditingPhone ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-black text-white hover:bg-gray-800'}`}
                     >
                        {isEditingPhone ? '저장' : '변경'}
                     </button>
                  </div>
                  {phoneSuccessMsg && <p className="text-xs text-green-600 font-black mt-1 animate-in fade-in slide-in-from-top-1">{phoneSuccessMsg}</p>}
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">비밀번호</label>
                  <button className="text-sm font-bold underline hover:text-blue-600">비밀번호 재설정</button>
               </div>
            </div>
         </div>

         {/* Plan & Payment */}
         <div className="space-y-4">
            <h3 className="text-xl font-black flex items-center gap-2"><CardIcon size={20} /> 멤버십 & 결제</h3>
            <div className="bg-white border-2 border-gray-200 p-6 rounded-xl space-y-4">
               <div className="flex justify-between items-center p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <div>
                     <p className="text-sm font-black text-blue-800">Free Tier 이용중</p>
                     <p className="text-xs text-blue-600">기본 기능 무료 제공</p>
                  </div>
                  <button 
                    onClick={() => setShowUpgradeModal(true)}
                    className="bg-blue-600 text-white px-3 py-1.5 text-xs font-bold rounded hover:bg-blue-700 transition-colors shadow-sm active:translate-y-0.5"
                  >
                    업그레이드
                  </button>
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1">등록된 결제 수단</label>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-400">
                     <CreditCard size={16} /> 등록된 카드가 없습니다.
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      <div className="pt-8 border-t-2 border-gray-100 flex justify-end">
         <button className="text-red-500 font-bold text-sm hover:underline">회원 탈퇴</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex selection:bg-yellow-300">
      {/* Sidebar Navigation */}
      <aside className="w-80 bg-white border-r-4 border-black h-screen sticky top-0 flex flex-col z-50 hidden lg:flex">
        <div className="p-10 border-b-4 border-black cursor-pointer group" onClick={() => setActiveTab('home')}>
          <div className="flex flex-col items-start">
            <h1 className="text-4xl font-black text-blue-500 tracking-tighter leading-none mb-1 group-hover:scale-105 transition-transform origin-left">워홀원모어</h1>
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

      {/* Main Content Area */}
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
            {/* Notification Area */}
            <div className="relative notification-area">
              <div 
                className="relative cursor-pointer group hover:scale-110 transition-transform"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={28} />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-black rounded-full flex items-center justify-center text-[10px] font-black text-white">3</span>
              </div>
              
              {/* Notification Dropdown */}
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

            <Bookmark size={28} className="cursor-pointer hover:scale-110 transition-transform bookmark-toggle" onClick={() => setShowBookmarks(!showBookmarks)} />
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
            {/* --- 수정 시작 --- */}
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
            {/* --- 수정 끝 --- */}
            {activeTab === 'community' && renderCommunity()}
            {activeTab === 'chat' && renderChat()}
            {activeTab === 'mypage' && renderMyPage()}
            {activeTab === 'info' && renderInfo()}
          </div>
        </main>
        
        {/* Overlays */}
        {showInquiryModal && renderInquiryModal()}
        {showUpgradeModal && renderUpgradeModal()}
        {renderBookmarksDrawer()}

        <footer className="mt-auto bg-white border-t-4 border-black p-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
               <button onClick={() => setActiveTab('home')} className="text-2xl font-black text-blue-500 mb-2 underline decoration-yellow-400 decoration-4 underline-offset-4 hover:scale-105 transition-transform origin-left cursor-pointer inline-block">워홀원모어</button>
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
