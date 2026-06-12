import { PaginationInput } from "@common/models/PaginationInput";

export type SearchProductInput = PaginationInput & {
  strProductCode?: string;
  strProductName?: string;
  intTypeOfTax?: number;
  intIdLocation?: number;
  intIdCategory?: number;
}