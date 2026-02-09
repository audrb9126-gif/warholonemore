
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
    id: '2', 
    title: '출국 전날준비, 이건 꼭 하고 가세요', 
    content: '다른 건 몰라도 상비약이랑 공인인증서 갱신은 필수입니다...',
    author: '시드니멘토', 
    time: '12:42',
    views: 124,
    likes: 8,
    scraps: 3,
    comments: 5, 
    category: 'all',
    tag: '정보'
  },
  { 
    id: '3', 
    title: '인터뷰에서 자주 나오는 질문 TOP 5', 
    content: '1. 자기소개 2. 비자 상태 3. 경력 유무 4. 언제부터...',
    author: '브리즈번선배', 
    time: '11:58',
    views: 124,
    likes: 8,
    scraps: 3,
    comments: 4, 
    category: 'popular',
    tag: '정보'
  },
  { 
    id: '4', 
    title: '영문 이력서, 이 문장은 진짜 잘 먹힙니다', 
    content: '요즘 워홀 알바도 "자기소개서"가 기본이라던데요...',
    author: '인스펙', 
    time: '10:15',
    views: 124,
    likes: 8,
    scraps: 3,
    comments: 2, 
    category: 'popular',
    tag: '꿀팁'
  },
  { 
    id: '5', 
    title: '현지 통신, eSIM vs 유심 뭐가 나을까요?', 
    content: '아이폰 14 쓰는데 이심으로 할지 물리 유심할지 고민...',
    author: '골드코스트', 
    time: '10:15',
    views: 124,
    likes: 8,
    scraps: 3,
    comments: 2, 
    category: 'all',
    tag: '질문'
  },
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
    imageUrl: 'https://images.unsplash.com/photo-1560170433-41e974e6284f?auto=format&fit=crop&q=80&w=100',
    participants: 820,
    lastMessageTime: '15분전',
    tags: ['캐나다']
  },
  {
    id: 'ca_3',
    title: '휘슬러/밴프 스키장 인맥 만들기',
    imageUrl: 'https://images.unsplash.com/photo-1488953155160-24436573752e?auto=format&fit=crop&q=80&w=100',
    participants: 410,
    lastMessageTime: '30분전',
    tags: ['캐나다']
  },
  {
    id: 'ca_4',
    title: '몬트리올 불어 공부 & 생활',
    imageUrl: 'https://images.unsplash.com/photo-1519178173668-2f63a563de56?auto=format&fit=crop&q=80&w=100',
    participants: 320,
    lastMessageTime: '1시간전',
    tags: ['캐나다']
  },

  // --- 뉴질랜드 (New Zealand) ---
  {
    id: 'nz_1',
    title: '오클랜드 시티잡 & 플랫 정보',
    imageUrl: 'https://images.unsplash.com/photo-1507699622177-f888916f656d?auto=format&fit=crop&q=80&w=100',
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
    imageUrl: 'https://images.unsplash.com/photo-1554761066-d6677465333f?auto=format&fit=crop&q=80&w=100',
    participants: 1100,
    lastMessageTime: '3분전',
    tags: ['일본']
  },
  {
    id: 'jp_4',
    title: 'JLPT 공부 및 언어교환',
    imageUrl: 'https://images.unsplash.com/photo-1528164344705-475426879fdc?auto=format&fit=crop&q=80&w=100',
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
    imageUrl: 'https://images.unsplash.com/photo-1511225501373-5110c79dbd63?auto=format&fit=crop&q=80&w=100',
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
    imageUrl: 'https://images.unsplash.com/photo-1565881606991-789a8d579339?auto=format&fit=crop&q=80&w=100',
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
