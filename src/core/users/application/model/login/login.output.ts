export type LoginOutput = {
  strToken: string;
  user: {
    strCi: string;
    strFirstName: string;
    strLastName: string;
    strUsername: string | undefined;
    strEmail: string;
    strPhone: string;
    strAddress: string;
    strCity: string;
    intRole: number;
  };
};