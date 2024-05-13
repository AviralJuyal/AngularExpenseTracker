import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { IncomesComponent } from './pages/incomes/incomes.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: HomeComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'incomes', component: IncomesComponent },
  { path: 'transactions', component: TransactionsComponent },

  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
