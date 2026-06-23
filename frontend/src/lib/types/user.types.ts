export type UserType = {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};
export type UserProfileType = {
  name?: string;
  password?: string;
};
