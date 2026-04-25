export class CategoryDomain {
  constructor(
    public strCategoryName: string,
    public strCategoryDescription: string,
    public intUserId: number,
    public strUser?: string,
    public intId?: number,
  ) {}
}
