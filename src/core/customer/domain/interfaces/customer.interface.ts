import { CustomerDomain } from "../customer.domain";
import { GetCustomerDomain } from "../getCustomer.domain";

export const CUSTOMER_INTERFACE = Symbol('CUSTOMER_INTERFACE');
export interface ICustomer {
    createCustomer(customer: CustomerDomain): Promise<void>;
    getCustomerById(id: number): Promise<CustomerDomain | null>;
    getCustomerByCi(ci: string): Promise<CustomerDomain | null>;
    getAllCustomers(getCustomerDomain: GetCustomerDomain): Promise<CustomerDomain[]>;
    updateCustomer(customer: CustomerDomain): Promise<void>;
    deleteCustomer(id: number): Promise<void>;
}