
export interface CharacterInfo {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  description: string;
  color: string;
}

export interface Step {
  title: string;
  desc: string;
  icon: string;
}

export interface TaskGuideSection {
  title: string;
  items: string[];
}

export interface TaskGuide {
  title: string;
  description: string;
  sections: TaskGuideSection[];
}

export interface PrepTask {
  id: string;
  tab: string; // '출국 전', '생활' etc.
  title: string;
  subtitle?: string;
  rightTag?: string; // e.g. '6개월', 'D-30'
  isCompleted: boolean;
  iconType: string;
  guideContent?: TaskGuide;
  // Task Details for Screenshot 4
  dateRange?: string;
  stage?: string;
  alert?: string;
  goal?: string;
}

export interface StoreItem {
  id: string;
  name: string;
  price: string;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string; // Added content preview
  author: string;
  time: string;    // Added timestamp
  views: number;   // Added view count
  likes: number;   // Reused as 'recommendations'
  scraps: number;  // Added scraps
  comments: number;
  category: 'popular' | 'notice' | 'all';
  tag?: string;    // For badges like '질문', '정보'
}

export interface ChatRoom {
  id: string;
  title: string;
  imageUrl: string;
  participants: number;
  lastMessageTime: string;
  tags: string[]; // e.g., ['호주', '정보']
}

export interface Country {
  id: string;
  name: string;
  engName: string;
  imageUrl: string;
}

export interface TravelPurpose {
  id: string;
  label: string;
  icon: string;
}

export type TabType = 'home' | 'store' | 'ai' | 'community' | 'chat' | 'mypage' | 'info';
