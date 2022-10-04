import { CurrencyEnum } from "../../enumeration/currency/currency-enum";
import { CustomerDTO } from "../customer/customer-dto";
import { RegionEmbededDTO } from "../region/region-embeded-dto";

export class TransactionDTO {
    id: string;
    reference: string;
    customer: CustomerDTO;
    transferAmount: number;
    transferCurrency: CurrencyEnum;
    beneficiaryBank: string;
    beneficiaryAccountNumber: string;
    paymentDetails: string;
    cardDetails: string;
    region: RegionEmbededDTO;
    creationDate: Date;
}