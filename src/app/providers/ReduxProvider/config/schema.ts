import { ActivityTimerSchema } from './../../../../widgets/ActivityTimer/model/types/index';
import { SidebarSchema } from "widgets/Sidebar";

export interface RootStateSchema {
  sidebar: SidebarSchema;
  activityTimer:ActivityTimerSchema;
}
