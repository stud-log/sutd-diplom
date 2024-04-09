import { ActivityTimerSchema } from 'widgets/ActivityTimer';
import { AddAndEditModalSchema } from 'widgets/Modals/ProfileModals/AddAndEditModal';
import { SidebarSchema } from "widgets/Sidebar";

export interface RootStateSchema {
  sidebar: SidebarSchema;
  activityTimer: ActivityTimerSchema;
  addAndEditModal: AddAndEditModalSchema;
}
