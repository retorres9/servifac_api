import { GetCustomersInput } from "@core/customer/application/model/getCustomers.input";
import { CustomerDomain } from "../customer.domain";

export const CUSTOMER_REPOSITORY = Symbol('CUSTOMER_REPOSITORY');
export interface ICustomer {
    createCustomer(customer: CustomerDomain): Promise<void>;
    getCustomerById(id: number): Promise<CustomerDomain | null>;
    getCustomerByCi(ci: string): Promise<CustomerDomain | null>;
    getAllCustomers(getCustomersInput: GetCustomersInput): Promise<CustomerDomain[]>;
    updateCustomer(customer: CustomerDomain): Promise<void>;
    deleteCustomer(id: number): Promise<void>;
}