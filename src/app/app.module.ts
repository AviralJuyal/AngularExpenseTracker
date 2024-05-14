import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { IncomesComponent } from './pages/incomes/incomes.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ChartComponent } from './components/chart/chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyPipe } from './pipes/currency.pipe';
import { PiechartComponent } from './components/piechart/piechart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginModalComponent,
    SidenavComponent,
    ExpensesComponent,
    IncomesComponent,
    TransactionsComponent,
    ChartComponent,
    CurrencyPipe,
    PiechartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    CanvasJSAngularChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
