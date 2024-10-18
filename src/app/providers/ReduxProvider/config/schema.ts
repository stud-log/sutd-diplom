import { AddAndEditCustomActivitySchema } from '@/widgets/Modals/ProfileModals/AddAndEditCustomActivity/types/index';
import { ActivityTimerSchema } from '@/widgets/ActivityTimer';
import { AddAndEditCustomTodoSchema } from '@/widgets/Modals/ProfileModals/AddAndEditCustomTodo/types';
import { AddAndEditModalSchema } from '@/widgets/Modals/ProfileModals/AddAndEditModal';
import { GuideModalSchema } from '@/widgets/Modals/GuideModal/types';
import { HomeworkTaskModalSchema } from '@/widgets/Modals/HomeworkTaskModal/types';
import { ManageGroupModalSchema } from '@/widgets/Modals/ProfileModals/ManageGroupModal';
import { NotificationsSchema } from '@/widgets/Notifications/model/types';
import { ScheduleModalSchema } from '@/widgets/Modals/ProfileModals/ScheduleModal';
import { SidebarSchema } from "@/widgets/Sidebar";
import { TrophySchema } from '@/features/TrophyButton/model/types';
import { customActivityModalSchema } from '@/widgets/Modals/CustomActivityModal/types';

export interface RootStateSchema {
  sidebar: SidebarSchema;
  activityTimer: ActivityTimerSchema;
  addAndEditModal: AddAndEditModalSchema;
  scheduleModal: ScheduleModalSchema;
  guideModal: GuideModalSchema;
  manageGroupModal: ManageGroupModalSchema;
  homeworkTaskModal: HomeworkTaskModalSchema;
  notifications: NotificationsSchema;
  trophy: TrophySchema;
  addAndEditCustomTodo: AddAndEditCustomTodoSchema;
  addAndEditCustomActivity: AddAndEditCustomActivitySchema;
  customActivityModal: customActivityModalSchema;
}
