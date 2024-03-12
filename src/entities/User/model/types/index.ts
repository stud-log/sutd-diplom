import { User } from "@stud-log/news-types/models";

export interface UserSchema extends Partial<User> {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  group: {
    id: number;
    name: string;
  };
  avatarUrl: '';
}