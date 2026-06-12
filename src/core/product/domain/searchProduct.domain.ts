import { PaginationDomain } from "@common/domain/pagination.domain";

export class SearchProductDomain extends PaginationDomain {
  constructor(
    public strProductCode?: string,
    public strProductName?: string,
    public intTypeOfTax?: number,
    public intIdLocation?: number,
    public intIdCategory?: number
  ) {
    super();
  }
}