export class User {
  constructor(
    public strCi: string,
    public strFirstName: string,
    public strLastName: string,
    public strUsername: string,
    public strPassword: string,
    public intRole: number,
    public strEmail: string,
    public strPhone: string,
    public strAddress: string,
    public strCity: string,
    public intUserId?: number | undefined,
    public strTempPass?: string,
    public blIsActive?: boolean,
    public dtCreatedAt?: Date,
    public dtUpdatedAt?: Date,
    public dtLastLogin?: Date,
    public isAbleToChangePassword?: boolean,
    public intLoginAttempts?: number
  ) {}
}
