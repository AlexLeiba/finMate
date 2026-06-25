export type UserType = {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  currency?: string;
};
export type UserProfileType = {
  name?: string;
  password?: string;
};
