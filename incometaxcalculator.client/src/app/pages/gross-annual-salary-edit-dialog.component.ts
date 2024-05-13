import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'gross-annual-salary-edit-dialog',
  templateUrl: './gross-annual-salary-edit-dialog.component.html',
  styleUrls: ['./gross-annual-salary-edit-dialog.component.css']
})
export class GrossAnnualSalaryEditDalogComponent {
  constructor(public dialogRef: MatDialogRef<GrossAnnualSalaryEditDalogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService) { }

  onSave(): void {
    this.dialogRef.close(this.data.newValue);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
