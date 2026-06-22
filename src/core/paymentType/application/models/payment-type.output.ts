export type PaymentTypeOutput = {
    intId: number;
    strName: string;
    strCode: string;
    boolActive: boolean;
    boolIsCash: boolean;
    objConfig: Record<string, any> | null;
    strDescription: string;
    dtCreatedAt: Date;
    dtUpdatedAt: Date;
};