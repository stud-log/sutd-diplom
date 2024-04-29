import { ActivityTimerSchema } from 'widgets/ActivityTimer';
import { AddAndEditModalSchema } from 'widgets/Modals/ProfileModals/AddAndEditModal';
import { ScheduleModalSchema } from 'widgets/Modals/ProfileModals/ScheduleModal';
import { SidebarSchema } from "widgets/Sidebar";

export interface RootStateSchema {
  sidebar: SidebarSchema;
  activityTimer: ActivityTimerSchema;
  addAndEditModal: AddAndEditModalSchema;
  scheduleModal: ScheduleModalSchema;
}
