export class ParameterEntity {
    constructor(
        public intId: number,
        public strName: string,
        public strNemonic: string,
        public strValue: string,
        public strDescription: string,
        public dtCreatedAt: Date,
        public dtUpdatedAt: Date,
        public blIsActive: boolean        
    ) {}
}