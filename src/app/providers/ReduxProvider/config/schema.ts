import { ActivityTimerSchema } from 'widgets/ActivityTimer';
import { AddAndEditModalSchema } from 'widgets/Modals/ProfileModals/AddAndEditModal';
import { GuideModalSchema } from 'widgets/Modals/GuideModal/types';
import { HomeworkTaskModalSchema } from 'widgets/Modals/HomeworkTaskModal/types';
import { ManageGroupModalSchema } from 'widgets/Modals/ProfileModals/ManageGroupModal';
import { ScheduleModalSchema } from 'widgets/Modals/ProfileModals/ScheduleModal';
import { SidebarSchema } from "widgets/Sidebar";

export interface RootStateSchema {
  sidebar: SidebarSchema;
  activityTimer: ActivityTimerSchema;
  addAndEditModal: AddAndEditModalSchema;
  scheduleModal: ScheduleModalSchema;
  guideModal: GuideModalSchema;
  manageGroupModal: ManageGroupModalSchema;
  homeworkTaskModal: HomeworkTaskModalSchema;
}
