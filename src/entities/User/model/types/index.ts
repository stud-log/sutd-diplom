import { User } from "@stud-log/news-types/models";

/* Remove unnecessary properties for redux state */
export interface UserSchema extends Omit<User, 'password' | 'roleId' | 'createdAt' | 'updatedAt' | 'role' | 'status' | 'groupId'> {}