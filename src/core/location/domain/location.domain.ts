export class LocationDomain {
  constructor(
    public strLocationName: string,
    public strLocationDescription: string,
    public intWarehouse: number,
    public intLocationId?: number,
    public strWarehouseName?: string,
    public intUserCreate?: number,
    public dtCreatedAt?: Date,
    public intUserUpdate?: number,
    public dtUpdatedAt?: Date,
  ) {}
}
