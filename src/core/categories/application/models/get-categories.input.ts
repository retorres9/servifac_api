export type GetCategoriesFiltersInput = {
    intPage: number | undefined;
    intLimit: number;
    strSearchTerm?: string;
    dtFromDate?: Date;
    dtToDate?: Date;
    strSortBy?: string;
    strSortOrder?: 'ASC' | 'DESC';
};
