// employee-list.component.ts

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'employee-list',
  templateUrl: 'employee-list.component.html',
  styleUrls: ['employee-list.component.css']
})
export class EmployeeListComponent implements AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'grossAnnualSalary', 'view'];
  employee: Employee[] = [];
  searchName: string = '';
  dataSource: MatTableDataSource<Employee>;
  totalRecords: number = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private employeeService: EmployeeService, private router: Router) {
    this.getEmployees();
    this.dataSource = new MatTableDataSource<Employee>(this.employee);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(res => {
      this.employee = res;
      this.dataSource.data = this.employee;
      this.totalRecords = res.length;
      this.dataSource.paginator = this.paginator;
    });
  }

  viewDetails(id: number): void {
    // Handle view details here
    console.log('View details for employee with id:', id);
    this.router.navigate(
      ['/employee-details'], { queryParams: { id: id } }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: any): void {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.getEmployees();
  }
}
