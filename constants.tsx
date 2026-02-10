
import { CharacterInfo, Step, PrepTask, StoreItem, CommunityPost, Country, TravelPurpose, ChatRoom } from './types';

export const CHARACTERS: CharacterInfo[] = [
  {
    id: 'pilot',
    name: '캡틴 워홀',
    role: '출국 & 비자 전문가',
    imageUrl: 'https://i.postimg.cc/Y0rSvJX0/pilot-removebg-preview.png',
    description: '비자 신청부터 항공권 예약까지, 안전한 비행을 도와드려요!',
    color: 'bg-blue-500'
  },
  {
    id: 'traveler',
    name: '모험가 루카',
    role: '초기 정착 & 생활 전문가',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png',
    description: '숙소 구하기와 뱅크 어카운트 개설, 낯선 땅에서의 첫걸음을 함께해요.',
    color: 'bg-yellow-400'
  },
  {
    id: 'farmer',
    name: '농부 샘',
    role: '일자리 & 세컨 비자 전문가',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png',
    description: '고수익 농장 일자리와 세컨 비자 취득 노하우를 아낌없이 전수합니다!',
    color: 'bg-green-500'
  }
];

export const COUNTRIES: Country[] = [
  { id: 'au', name: '호주', engName: 'Australia', imageUrl: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&q=80&w=300' },
  { id: 'ca', name: '캐나다', engName: 'Canada', imageUrl: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&q=80&w=300' },
  { id: 'nz', name: '뉴질랜드', engName: 'New Zealand', imageUrl: 'https://cwn.kr/news/data/2023/06/28/p179565280556240_385.jpg' },
  { id: 'jp', name: '일본', engName: 'Japan', imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=300' },
  { id: 'uk', name: '영국', engName: 'United Kingdom', imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=300' },
  { id: 'de', name: '독일', engName: 'Germany', imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=300' },
  { id: 'fr', name: '프랑스', engName: 'France', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=300' },
  { id: 'ie', name: '아일랜드', engName: 'Ireland', imageUrl: 'https://vstatic.vietnam.vn/vietnam/resource/IMAGE/2025/1/20/e668bf4d7e3d41f9be4fea1296c0639c' },
];

export const TRAVEL_PURPOSES: TravelPurpose[] = [
  { id: 'job', label: '취업', icon: '💼' },
  { id: 'study', label: '어학 능력 향상', icon: '🎓' },
  { id: 'travel', label: '여행', icon: '✈️' },
  { id: 'exp', label: '새로운 경험', icon: '🌱' },
];

export const MOCK_TASKS: PrepTask[] = [
  { 
    id: 'pass_1', 
    tab: '출국 전',
    title: '여권 유효기간 확인하기', 
    subtitle: '최소 6개월 이상 남았는지 확인', 
    rightTag: '6개월',
    isCompleted: false, 
    iconType: 'globe' 
  },
  { 
    id: 'visa_1', 
    tab: '출국 전',
    title: '비자 승인서 준비하기', 
    subtitle: '평균 소요기간 1-3주', 
    isCompleted: false, 
    iconType: 'doc',
    dateRange: '27년 2월 5일 - 27년 3월 2일',
    stage: '기타',
    alert: '1주 전',
    goal: '출국 전 완료',
    guideContent: {
      title: '🇦🇺 호주 워킹홀리데이 비자 받는 방법 총정리',
      description: '호주는 한국인 워킹홀리데이 지원자에게 가장 인기 있는 나라! 비자 조건이 비교적 명확하고, 승인 속도도 빠른 편이라 처음 워홀을 준비하는 분들에게 특히 많이 선택됩니다.',
      sections: [
        {
          title: '📄 비자 준비',
          items: [
            '비자 종류: 워킹홀리데이 비자 (Subclass 417)',
            '체류 기간: 최대 12개월',
            '신청 가능 연령: 만 18세 ~ 30세',
            '신청 횟수: 1인 1회',
          ]
        },
        {
          title: '👉 호주 워킹홀리데이 비자 신청 방법',
          items: [
             '호주 워킹홀리데이 비자는 온라인으로 직접 신청합니다.',
             '1. 호주 이민성 홈페이지 접속',
             '2. ImmiAccount 계정 생성 필요',
             '3. 온라인 신청서 작성 (개인정보, 여권 정보 등)'
          ]
        }
      ]
    }
  },
  { 
    id: 'fund_1', 
    tab: '출국 전',
    title: '자금 증명 최소 AUD 5,000 이상', 
    subtitle: '한화 430만~460만 원대', 
    isCompleted: false, 
    iconType: 'money' 
  },
  { id: 'bank_1', tab: '생활', title: '은행 계좌 개설하기', subtitle: 'HSBC, MONZO 등', isCompleted: true, iconType: 'bank' },
  { id: 'phone_1', tab: '생활', title: '통신사 EE, O2 등 준비하기', subtitle: 'Telstra, Optus, Vodafone 등', isCompleted: false, iconType: 'phone' },
  { id: 'trans_1', tab: '생활', title: '교통카드 / Railcard', subtitle: '현지 대중교통 필수템', isCompleted: false, iconType: 'bus' },
  { id: 'ex_1', tab: '생활', title: '초기 생활비 환전', subtitle: '평균 한화 600~1000만', isCompleted: false, iconType: 'money' },
  
  // 알바 (Part-time Job)
  { 
    id: 'job_1', 
    tab: '알바', 
    title: '영문 이력서(Resume) & 커버레터', 
    subtitle: '호주 스타일로 포맷 변경하기', 
    rightTag: '필수',
    isCompleted: false, 
    iconType: 'doc',
    guideContent: {
      title: '📝 합격을 부르는 영문 이력서 작성법',
      description: '한국식 이력서는 잊어라! 영미권 국가에서 선호하는 심플하고 직관적인 레쥬메 작성 가이드입니다.',
      sections: [
        {
          title: '필수 포함 항목',
          items: ['Personal Details (이름, 연락처)', 'Availability (근무 가능 시간)', 'Work Experience (경력 사항)', 'Skills (직무 관련 스킬)']
        },
        {
          title: '작성 꿀팁',
          items: ['사진은 넣지 마세요!', '직무와 관련된 경력 위주로 작성', '1장을 넘기지 않도록 요약']
        }
      ]
    }
  },
  { 
    id: 'job_2', 
    tab: '알바', 
    title: 'TFN (납세자 번호) 신청하기', 
    subtitle: '일하기 전 필수! 온라인 신청', 
    isCompleted: false, 
    iconType: 'doc' 
  },
  { 
    id: 'job_3', 
    tab: '알바', 
    title: 'RSA 주류 취급 자격증 취득', 
    subtitle: '호주 식음료 분야 취업 필수', 
    isCompleted: false, 
    iconType: 'doc' 
  },

  // 서류 (Documents)
  { 
    id: 'doc_1', 
    tab: '서류', 
    title: '비자 승인레터 출력해두기', 
    subtitle: '입국 심사 및 고용주 제출용', 
    rightTag: '중요',
    isCompleted: false, 
    iconType: 'doc' 
  },
  { 
    id: 'doc_2', 
    tab: '서류', 
    title: '영문 운전면허증 발급', 
    subtitle: '국제운전면허증 or 영문면허증', 
    isCompleted: false, 
    iconType: 'doc' 
  },
  { 
    id: 'doc_3', 
    tab: '서류', 
    title: '영문 잔고 증명서 준비', 
    subtitle: '입국 시 랜덤 검사 대비', 
    isCompleted: false, 
    iconType: 'bank' 
  },

  // 집 (Housing)
  { 
    id: 'house_1', 
    tab: '집', 
    title: '도착 후 1주 임시 숙소 예약', 
    subtitle: '백패커스 또는 에어비앤비', 
    rightTag: 'D-14',
    isCompleted: false, 
    iconType: 'home' 
  },
  { 
    id: 'house_2', 
    tab: '집', 
    title: '인스펙션 체크리스트 숙지', 
    subtitle: '수압, 벌레, 치안, 마스터 확인', 
    isCompleted: false, 
    iconType: 'doc' 
  },
  { 
    id: 'house_3', 
    tab: '집', 
    title: '보증금(Bond) 및 2주치 월세', 
    subtitle: '현금 또는 계좌이체 준비', 
    isCompleted: false, 
    iconType: 'money' 
  },
];

export const STORE_CATEGORIES = ['어학과정', '취업준비', '자소서첨삭', '현지생활', '헬스케어'];

export const MOCK_STORE_ITEMS: StoreItem[] = [
  { 
    id: '1', 
    name: '워홀 맞춤 영문 이력서 첨삭', 
    price: '8,000원', 
    category: '자소서첨삭', 
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400',
    rating: 4.3,
    reviewCount: 122
  },
  { 
    id: '2', 
    name: '호주 인사담당자를 사로잡는 합격자소서 컨설팅', 
    price: '50,000원', 
    category: '취업준비', 
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviewCount: 510
  },
  { 
    id: '3', 
    name: '첫 직장 합격원 지원 문장 패키지', 
    price: '32,000원', 
    category: '취업준비', 
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviewCount: 111
  },
  { 
    id: '4', 
    name: '호주 워홀러를 위한 현지 인터뷰 질문 정리 패키지', 
    price: '15,000원', 
    category: '현지생활', 
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviewCount: 540
  },
  // 어학과정 아이템
  { 
    id: 'lang_1', 
    name: '워홀 생존 영어 스피킹 (초급)', 
    price: '45,000원', 
    category: '어학과정', 
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviewCount: 320
  },
  { 
    id: 'lang_2', 
    name: '자신감 뿜뿜 영어 스피킹 (중급)', 
    price: '60,000원', 
    category: '어학과정', 
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviewCount: 215
  },
  { 
    id: 'lang_3', 
    name: '네이티브가 놀라는 영어 스피킹 (고급)', 
    price: '85,000원', 
    category: '어학과정', 
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400',
    rating: 5.0,
    reviewCount: 150
  },
  { 
    id: 'lang_4', 
    name: '당장 써먹는 리얼 생활 회화', 
    price: '40,000원', 
    category: '어학과정', 
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviewCount: 430
  },
  { 
    id: 'lang_5', 
    name: '오피스잡 & 인터뷰 비즈니스 회화', 
    price: '70,000원', 
    category: '어학과정', 
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviewCount: 180
  },
  // 헬스케어 (홈트레이닝) 아이템
  { 
    id: 'health_1', 
    name: '좁은 쉐어하우스에서도 가능한 전신 홈트', 
    price: '12,000원', 
    category: '헬스케어', 
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    reviewCount: 85
  },
  { 
    id: 'health_2', 
    name: '농장/공장 워홀러를 위한 코어 & 허리 강화 루틴', 
    price: '18,000원', 
    category: '헬스케어', 
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviewCount: 210
  },
  { 
    id: 'health_3', 
    name: '하루 10분! 서빙 알바 피로를 푸는 하체 스트레칭', 
    price: '9,900원', 
    category: '헬스케어', 
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviewCount: 142
  },
  { 
    id: 'health_4', 
    name: '외로움을 이겨내는 멘탈 케어 명상 & 요가', 
    price: '25,000원', 
    category: '헬스케어', 
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviewCount: 98
  },
];

export const MOCK_POSTS: CommunityPost[] = [
  {
    id: 'n1',
    title: '[공지] 워홀원모어 시스템 정기 점검 안내 (3/15)',
    content: '보다 안정적인 서비스를 위해 서버 점검이 진행될 예정입니다. 점검 시간 동안은 앱 접속이 원활하지 않을 수 있습니다. 이용에 불편을 드려 죄송합니다.',
    author: '워홀원모어',
    time: '방금전',
    views: 1205,
    likes: 0,
    scraps: 0,
    comments: 0,
    category: 'notice',
    tag: '공지'
  },
  {
    id: 'n2',
    title: '[필독] 클린한 커뮤니티 문화를 위한 이용 수칙',
    content: '안녕하세요, 워홀원모어 팀입니다. 서로 배려하고 존중하는 커뮤니티를 만들기 위해 다음 수칙을 꼭 지켜주세요. 비방, 욕설, 광고성 게시글은 예고 없이 삭제될 수 있습니다.',
    author: '운영자',
    time: '23.10.01',
    views: 3420,
    likes: 56,
    scraps: 12,
    comments: 4,
    category: 'notice',
    tag: '공지'
  },
  {
    id: 'n3',
    title: '[이벤트] 워홀원모어 런칭 기념! 항공권 지원 이벤트 당첨자 발표',
    content: '많은 분들이 참여해주신 런칭 이벤트 당첨자를 발표합니다! 당첨되신 분들에게는 개별 메시지로 연락드릴 예정입니다. 참여해주신 모든 분들께 감사드립니다.',
    author: '이벤트담당자',
    time: '23.09.28',
    views: 5600,
    likes: 230,
    scraps: 45,
    comments: 120,
    category: 'notice',
    tag: '공지'
  },
  { 
    id: 'm1', 
    title: '[멘토칼럼] 워홀 실패하지 않는 마인드셋 3가지', 
    content: '돈도 중요하지만 결국 남는 건 사람과 경험입니다. 멘토가 전하는 진짜 워홀 이야기. 초기 정착 단계에서 멘탈이 흔들릴 때 꼭 읽어보세요.',
    author: '공식멘토_지니', 
    time: '12:00',
    views: 450,
    likes: 125,
    scraps: 45,
    comments: 22, 
    category: 'popular',
    tag: '멘토링'
  },
  { 
    id: 'm2', 
    title: '[취업꿀팁] 영어 초보가 오지잡 구한 현실 루틴 공개', 
    content: '매일 아침 6시 기상, 이력서 50장 돌리기... 제가 성공한 비법은 단순합니다. 포기하지 않고 두드리는 자에게 문은 열립니다.',
    author: '취업멘토_라이언', 
    time: '11:30',
    views: 380,
    likes: 98,
    scraps: 30,
    comments: 15, 
    category: 'popular',
    tag: '멘토링'
  },
  { 
    id: 'm3', 
    title: '[커리어] 워홀 1년, 한국 돌아와서 뭐하지? (취업 연계 팁)', 
    content: '워홀 경험을 스펙으로 만드는 방법, 자소서 작성 꿀팁 대방출. 귀국 후 취업 고민하지 마세요.',
    author: '커리어멘토_수', 
    time: '10:15',
    views: 512,
    likes: 156,
    scraps: 89,
    comments: 41, 
    category: 'popular',
    tag: '멘토링'
  },
  { 
    id: '1', 
    title: '호주 워홀 첫잡, 언제 부터 지원하는 게 좋을까요', 
    content: '출국 2주 전부터 컨택 시작하는 게 국룰인가요? 아니면 가서...',
    author: '익명', 
    time: '13:05',
    views: 124,
    likes: 8,
    scraps: 3,
    comments: 6, 
    category: 'all',
    tag: '질문'
  },
  { 
    id: '5', 
    title: '현지 통신, eSIM vs 유심 뭐가 나을까요?', 
    content: '아이폰 14 쓰는데 이심으로 할지 물리 유심할지 고민...',
    author: '골드코스트', 
    time: '09:40',
    views: 88,
    likes: 5,
    scraps: 1,
    comments: 3, 
    category: 'all',
    tag: '질문'
  },
  // 중고장터 (Used Market) Posts
  {
    id: 'used_1',
    title: '🚗 워홀 끝나는데 중고차 시세 보다 싸게 팝니다~ (급처)',
    content: '2015년식 도요타 캠리입니다. 15만km 탔고 레지 3개월 남았습니다. 귀국 날짜 잡혀서 급하게 내놓습니다. 쿨거시 네고 가능! 상태 아주 좋습니다. 브리즈번 시티 픽업 가능해요.',
    author: '브리즈번_드라이버',
    time: '방금전',
    views: 230,
    likes: 15,
    scraps: 8,
    comments: 12,
    category: 'all',
    tag: '중고'
  },
  {
    id: 'used_2',
    title: '[무료나눔] 전기장판, 헤어드라이기, 멀티탭 나눔합니다',
    content: '한국 돌아가서 짐 줄이려고 나눔해요. 시티 픽업만 가능합니다. 상태 다 좋아요. 먼저 오시는 분께 드립니다!',
    author: '짐정리중',
    time: '30분전',
    views: 150,
    likes: 20,
    scraps: 5,
    comments: 8,
    category: 'all',
    tag: '중고'
  },
  {
    id: 'used_3',
    title: '🚲 상태 좋은 자전거 헬멧 포함 팝니다 ($50)',
    content: '출퇴근용으로 3개월 썼어요. 타이어 바람 빵빵하고 브레이크 잘 듭니다. 헬멧이랑 자물쇠도 같이 드려요.',
    author: '라이더',
    time: '1시간전',
    views: 95,
    likes: 6,
    scraps: 2,
    comments: 4,
    category: 'all',
    tag: '중고'
  },
  {
    id: 'used_4',
    title: '아이엘츠(IELTS) 교재 팝니다 (필기감 거의 없음)',
    content: '공부하려고 샀는데 학원 다니게 돼서 팝니다. 캠브리지 16, 17, 18권 일괄 판매 원해요.',
    author: '공부벌레',
    time: '3시간전',
    views: 60,
    likes: 3,
    scraps: 1,
    comments: 2,
    category: 'all',
    tag: '중고'
  }
];

// Expanded Chat Rooms for Global Chat Functionality
export const MOCK_CHAT_ROOMS: ChatRoom[] = [
  // --- 호주 (Australia) ---
  {
    id: 'au_1',
    title: '시드니 워홀러 모여라',
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=100',
    participants: 1284,
    lastMessageTime: '5분전',
    tags: ['호주']
  },
  {
    id: 'au_2',
    title: '멜버른 쉐어하우스/구인 정보',
    imageUrl: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/0444427b-8439-4aa0-9648-e6d1d44fe18c.jpeg',
    participants: 892,
    lastMessageTime: '방금전',
    tags: ['호주']
  },
  {
    id: 'au_3',
    title: '호주 농장/공장(세컨비자) 정보방',
    imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=100',
    participants: 2031,
    lastMessageTime: '1분전',
    tags: ['호주', '농장']
  },
  {
    id: 'au_4',
    title: '브리즈번 & 골드코스트 생활',
    imageUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=100',
    participants: 1540,
    lastMessageTime: '10분전',
    tags: ['호주']
  },

  // --- 캐나다 (Canada) ---
  {
    id: 'ca_1',
    title: '토론토 룸렌트 & 일자리 공유',
    imageUrl: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&q=80&w=100',
    participants: 950,
    lastMessageTime: '2분전',
    tags: ['캐나다']
  },
  {
    id: 'ca_2',
    title: '밴쿠버 워홀러 수다방 (카페잡)',
    imageUrl: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/9d3201c9-c8d7-41e4-b4c6-7180eed6aeeb.jpeg',
    participants: 820,
    lastMessageTime: '15분전',
    tags: ['캐나다']
  },
  {
    id: 'ca_3',
    title: '휘슬러/밴프 스키장 인맥 만들기',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROB21BcCBOQAR6_wKqiMVei-CosBGVidSlSw&s',
    participants: 410,
    lastMessageTime: '30분전',
    tags: ['캐나다']
  },
  {
    id: 'ca_4',
    title: '몬트리올 불어 공부 & 생활',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/08/71/fd/st-paul-street-in-summer.jpg?w=500&h=500&s=1',
    participants: 320,
    lastMessageTime: '1시간전',
    tags: ['캐나다']
  },

  // --- 뉴질랜드 (New Zealand) ---
  {
    id: 'nz_1',
    title: '오클랜드 시티잡 & 플랫 정보',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPOz_YnFf89Pdv0ihDMD4D2ifCdCyUIMxDUQ&s',
    participants: 600,
    lastMessageTime: '10분전',
    tags: ['뉴질랜드']
  },
  {
    id: 'nz_2',
    title: '남섬 여행 동행 구해요 (퀸스타운)',
    imageUrl: 'https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&q=80&w=100',
    participants: 250,
    lastMessageTime: '방금전',
    tags: ['뉴질랜드']
  },
  {
    id: 'nz_3',
    title: '뉴질랜드 바리스타 취업 꿀팁',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=100',
    participants: 430,
    lastMessageTime: '5분전',
    tags: ['뉴질랜드']
  },

  // --- 일본 (Japan) ---
  {
    id: 'jp_1',
    title: '도쿄 워홀 쉐어하우스/부동산',
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=100',
    participants: 1500,
    lastMessageTime: '방금전',
    tags: ['일본']
  },
  {
    id: 'jp_2',
    title: '오사카/교토 간사이 워홀러',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=100',
    participants: 800,
    lastMessageTime: '12분전',
    tags: ['일본']
  },
  {
    id: 'jp_3',
    title: '일본 편의점/이자카야 알바 팁',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRKZR6FLfmeBAkWgvCSqJlBqedt1TondOH0g&s',
    participants: 1100,
    lastMessageTime: '3분전',
    tags: ['일본']
  },
  {
    id: 'jp_4',
    title: 'JLPT 공부 및 언어교환',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHtPiRP10HuedfLae6lR2h7yUqJxZ8wKeDig&s',
    participants: 600,
    lastMessageTime: '1시간전',
    tags: ['일본']
  },

  // --- 영국 (United Kingdom) ---
  {
    id: 'uk_1',
    title: '런던 뷰잉 지옥 탈출방 (방구하기)',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=100',
    participants: 1800,
    lastMessageTime: '방금전',
    tags: ['영국']
  },
  {
    id: 'uk_2',
    title: 'YMS 비자 승인 & 입국 준비',
    imageUrl: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&q=80&w=100',
    participants: 900,
    lastMessageTime: '40분전',
    tags: ['영국']
  },
  {
    id: 'uk_3',
    title: '영국 펍/축구 직관 번개⚡️',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbuSK5qIr-HBPwjY8axaBQn0FXCxUSLTN4fg&s',
    participants: 550,
    lastMessageTime: '10분전',
    tags: ['영국']
  },

  // --- 독일 (Germany) ---
  {
    id: 'de_1',
    title: '베를린 안멜둥(거주등록) Q&A',
    imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&q=80&w=100',
    participants: 700,
    lastMessageTime: '20분전',
    tags: ['독일']
  },
  {
    id: 'de_2',
    title: '독일 미니잡/아우스빌둥 정보',
    imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=100',
    participants: 450,
    lastMessageTime: '1시간전',
    tags: ['독일']
  },
  {
    id: 'de_3',
    title: '독일어 A1-B1 스터디 모임',
    imageUrl: 'https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?auto=format&fit=crop&q=80&w=100',
    participants: 300,
    lastMessageTime: '3시간전',
    tags: ['독일']
  },

  // --- 프랑스 (France) ---
  {
    id: 'fr_1',
    title: '파리 집구하기 (보증인X 방법)',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=100',
    participants: 620,
    lastMessageTime: '30분전',
    tags: ['프랑스']
  },
  {
    id: 'fr_2',
    title: '프랑스 제빵/카페 잡 구해요',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=100',
    participants: 400,
    lastMessageTime: '2시간전',
    tags: ['프랑스']
  },
  {
    id: 'fr_3',
    title: '한불 언어교환 & 피크닉',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQydMOBLMqLxBMAUA0gdmY2vY_9U6w0U9neKg&s',
    participants: 350,
    lastMessageTime: '15분전',
    tags: ['프랑스']
  },

  // --- 아일랜드 (Ireland) ---
  {
    id: 'ie_1',
    title: '더블린 렌트 대란 정보통',
    imageUrl: 'https://vstatic.vietnam.vn/vietnam/resource/IMAGE/2025/1/20/e668bf4d7e3d41f9be4fea1296c0639c',
    participants: 580,
    lastMessageTime: '5분전',
    tags: ['아일랜드']
  },
  {
    id: 'ie_2',
    title: '아일랜드 펍잡/오페어 구인',
    imageUrl: 'https://images.unsplash.com/photo-1516733968668-dbdce39c4651?auto=format&fit=crop&q=80&w=100',
    participants: 320,
    lastMessageTime: '45분전',
    tags: ['아일랜드']
  },
];

export const PREP_STEPS: Step[] = [
  { title: '국가 선정', desc: '나에게 맞는 나라 찾기', icon: '🌍' },
  { title: '비자 신청', desc: '복잡한 서류 한번에', icon: '📄' },
  { title: '초기 자금', desc: '현실적인 예산 짜기', icon: '💰' },
  { title: '항공권/보험', desc: '최저가와 든든한 보장', icon: '✈️' },
];
