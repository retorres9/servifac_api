import { CustomerDomain } from "../customer.domain";

export const CUSTOMER_REPOSITORY = Symbol('CUSTOMER_REPOSITORY');
export interface ICustomer {
    createCustomer(customer: CustomerDomain): Promise<void>;
    getCustomerById(id: number): Promise<CustomerDomain[] | null>;
    getAllCustomers(): Promise<CustomerDomain[]>;
    updateCustomer(id: number, customer: CustomerDomain): Promise<void>;
    deleteCustomer(id: number): Promise<void>;
}