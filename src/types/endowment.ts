// Тип для медиа-файла (универсально для фото и картинок)
export interface MediaFile {
  id: number;
  name: string;
  url: string;
  formats?: {
    thumbnail?: {
      url: string;
    };
  };
}

// Документ
export interface EndowmentDocument {
  id: number;
  name: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
}

// Даритель
export interface EndowmentDonor {
  id: number;
  date: string;
  name: string;
  amount: number;
}

// Новость
export interface EndowmentNews {
  id: number;
  Title: string;
  Content: string;
  Date: string | null;
  Content_img: MediaFile[];
}

// Член команды
export interface EndowmentTeamMember {
  id: number;
  Name: string;
  Position: string;
  bio: string | null;
  Photo?: MediaFile;
}

// Главный объект
export interface EndowmentData {
  id: number;
  documentId: string;
  total_amount: string;
  donors_count: string;
  donors: EndowmentDonor[];
  documents: EndowmentDocument[];
  news: EndowmentNews[];
  team: EndowmentTeamMember[];
} 