import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {OrderService} from "../../../services/order.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-order-status-dialog',
  standalone: true,
  imports: [
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    NgForOf,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './order-status-dialog.component.html',
  styleUrl: './order-status-dialog.component.css'
})
export class OrderStatusDialogComponent  {
  statusForm: FormGroup;
  statuses = ['PENDING', 'CONFIRMED', 'SHIPPED', 'RETURNED', 'CANCELLED'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrderStatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.statusForm = this.fb.group({
      status: [data.order.status]
    });
  }

  onSave(): void {
    const updatedStatus = this.statusForm.value.status;
    // Pass the updated status to the parent component
    this.dialogRef.close(updatedStatus);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
