import { TransactionRestService } from "./transaction-rest.service";
import { TransactionRestServiceACI } from "./transaction-rest.service.aci";

export const TransactionRestServiceProvider = [
    { provide: TransactionRestServiceACI, useClass: TransactionRestService }
];