import { TransactionService } from "./transaction.service";
import { TransactionServiceACI } from "./transaction.service.aci";

export const TransactionServiceProvider = [
    { provide: TransactionServiceACI, useClass: TransactionService }
];