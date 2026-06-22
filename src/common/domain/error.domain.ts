export class DomainError extends Error {
    constructor(public code: string, public message: string, public details?: any) {
        super(message);
    }
}