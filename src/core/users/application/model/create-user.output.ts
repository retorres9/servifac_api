export type CreateUserOutput = {
  intUserId: number;
  strCi: string;
  strUsername: string | undefined;
  strFirstName: string;
  strLastName: string;
  strEmail: string;
  intRole: number;
  blIsActive: boolean;
  dtCreatedAt: Date;
};
