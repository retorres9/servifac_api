export type GetCategoriesFiltersInput = {
    intPage: number | undefined | null;
    intLimit: number;
    strSearchTerm?: string;
    dtFromDate?: Date;
    dtToDate?: Date;
    strSortBy?: string;
    strSortOrder?: 'ASC' | 'DESC';
};
