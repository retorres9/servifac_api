export class User {
  constructor(
    public strCi: string,
    public strFirstName: string,
    public strLastName: string,
    public strUsername: string,
    public strPassword: string,
    public strRole: string,
    public blIsActive: boolean,
    public strEmail: string,
    public strTempPass: string,
    public dtCreatedAt: Date,
    public dtUpdatedAt: Date,
    public dtLastLogin: Date,
    public strPhone: string,
    public strAddress: string,
    public strCity: string,
    public isAbleToChangePassword: boolean,
    public intLoginAttempts: number
  ) {}
}
