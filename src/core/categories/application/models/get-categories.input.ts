export type GetCategoriesInput = {
    intPage: number;
    intLimit: number;
    strSearchTerm?: string;
    dtFromDate?: Date;
    dtToDate?: Date;
    strSortBy?: string;
    strSortOrder?: 'ASC' | 'DESC';
};
