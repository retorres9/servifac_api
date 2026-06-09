export class PaginationDomain {
    constructor(
        public intPage?: number,
        public intLimit?: number,
        public strSearchTerm?: string,
        public dtFromDate?: Date,
        public dtToDate?: Date,
        public strSortBy?: string,
        public strSortOrder?: 'ASC' | 'DESC'
    ) {}
}