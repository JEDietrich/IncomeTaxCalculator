//employee-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Employee } from '../models/employee.model';
import { TaxBand } from '../models/taxband.model';
import { EmployeeService } from '../services/employee.service';
import { TaxBandService } from '../services/taxband.service';
import { GrossAnnualSalaryEditDalogComponent } from './gross-annual-salary-edit-dialog.component';


@Component({
  selector: 'employee-details',
  templateUrl: 'employee-details.component.html',
  styleUrls: ['employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: Employee;
  taxBands: TaxBand[] = [];
  netAnnualSalary: number = 0;
  netMonthlySalary: number = 0;
  annualTaxPaid: number = 0;
  monthlyTaxPaid: number = 0;
  editDialogOpen: boolean = false;
  newGrossAnnualSalary: number = 0;
  editMode: boolean = false;
  grossMonthlySalary: number = 0;
  userId!: number;

  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private taxBandService: TaxBandService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params != null) {
        this.userId = params['id'];
        this.getEmployee();
      }
    });

    this.taxBandService.getTaxBands().subscribe(res => {
      if (res != null) {
        this.taxBands = res;
        this.calculateSalaryDetails();
      }
    });
  }

  calculateSalaryDetails() {
    if (!this.employee) return;

    this.grossMonthlySalary = Math.round((this.employee.grossAnnualSalary / 12) * 100) / 100; // Round to 2 decimal places
    this.annualTaxPaid = this.calculateAnnualTax();
    this.netAnnualSalary = this.employee.grossAnnualSalary - this.annualTaxPaid;
    this.netMonthlySalary = Math.round((this.netAnnualSalary / 12) * 100) / 100; 
    this.monthlyTaxPaid = Math.round((this.annualTaxPaid / 12) * 100) / 100;
  }

  calculateAnnualTax(): number {
    if (!this.employee || !this.taxBands || !this.taxBands.length) return 0;

    let grossAnnualSalary = this.employee.grossAnnualSalary;
    let annualTax = 0;

    for (let band of this.taxBands) {
      let upperLimit = band.upperLimit !== null && band.upperLimit !== undefined ? band.upperLimit : Infinity; // Use Infinity if upperLimit is null or undefined
      let lowerLimit = band.lowerLimit !== null ? band.lowerLimit : 0; // Use 0 if lowerLimit is null

      let taxableAmount = Math.min(upperLimit, grossAnnualSalary) - lowerLimit;
      if (taxableAmount <= 0) {
        continue;
      }

      let tax = (taxableAmount * band.taxRate) / 100;
      annualTax += tax;

      if (!isFinite(upperLimit) && taxableAmount < upperLimit - lowerLimit) {
        break;
      }
    }

    return Math.round(annualTax * 100) / 100; // Round to 2 decimal places
  }

  getEmployee() {
    this.employeeService.getEmployee(this.userId).subscribe(res => {
      if (res != null) {
        this.employee = res;
        this.calculateSalaryDetails();
      }
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(GrossAnnualSalaryEditDalogComponent, {
      width: '400px',
      data: {
        currentValue: this.employee.grossAnnualSalary,
        newValue: this.employee.grossAnnualSalary
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null) {
        this.employee.grossAnnualSalary = result;
        this.employeeService.updateEmployee(this.employee).subscribe(res => {
          this.calculateSalaryDetails();
        });
      }
    });
  }

  closeEditDialog(): void {
    this.editDialogOpen = false;
    this.editMode = false;
  }
}
