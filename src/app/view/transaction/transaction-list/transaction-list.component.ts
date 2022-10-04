import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { PaginationDTO } from 'src/app/model/dto/pagination/pagination-dto';
import { TransactionDTO } from 'src/app/model/dto/transaction/transaction-dto';
import { TransactionServiceACI } from 'src/app/service/transaction/transaction.service.aci';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  displayedColumns = ['reference', 'transferCurrency', 'transferAmount', 'customerName'];
  transactions: Array<TransactionDTO>;

  constructor(
    private transactionService: TransactionServiceACI
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.findAll().pipe(take(1))
      .subscribe((transactionList: Array<TransactionDTO>) => {
        this.transactions = transactionList;
      });
  }
}
