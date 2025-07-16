// Типы для структуры года, класса и человека
export interface Person {
  Full_name: string;
  Description: string;
  Photo?: { url: string } | null;
}

export interface SchoolClass {
  id: number;
  Literal: string;
  Class_photo?: { url: string } | null;
  Class_persons: Person[];
}

export interface SchoolYear {
  id: number;
  documentId: string;
  Year: number;
  Classes: SchoolClass[];
} 