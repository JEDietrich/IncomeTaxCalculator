import { HttpClient, HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Observable } from 'rxjs';
import { InterceptorModule } from '../interceptor.module';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './pages/employee-list.component';
import { EmployeeService } from './services/employee.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { EmployeeDetailsComponent } from './pages/employee-details.component';
import { MatIconModule } from '@angular/material/icon';
import { TaxBandService } from './services/taxband.service';
import { GrossAnnualSalaryEditDalogComponent } from './pages/gross-annual-salary-edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';


const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employee-details', component: EmployeeDetailsComponent }
];

export class HttpsInterceptor implements HttpInterceptor {
  constructor(private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const secureReq = req.clone({
      url: req.url.replace('https://', 'http://')
    });
    return this.http.request(secureReq);
  }
}


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeDetailsComponent,
    GrossAnnualSalaryEditDalogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    InterceptorModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule
  ],
  providers: [
    EmployeeService,
    TaxBandService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
