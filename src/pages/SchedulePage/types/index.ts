export interface FCEvent{
  title: string;
  date: string;
  start: string;
  end: string;
  info: FCExtendedProps;
}

export interface FCExtendedProps {
    
  isDO: boolean;
  isCustom: boolean;
  room: string;
  teacher: string | null;
  type: string;
    
}