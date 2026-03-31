import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatToolbarModule, MatButtonModule, MatCardModule,
    MatTableModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDialogModule, MatSnackBarModule,
    MatIconModule, MatChipsModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="router.navigate(['/dashboard'])">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span style="margin-left:8px">Contacts</span>
      <span style="flex:1"></span>
      <button mat-raised-button (click)="openForm()">+ Add Contact</button>
    </mat-toolbar>

    <div style="padding:24px">

      <!-- Search bar -->
      <mat-form-field appearance="outline" style="width:100%;margin-bottom:16px">
        <mat-label>Search contacts</mat-label>
        <input matInput [(ngModel)]="searchKeyword"
          (ngModelChange)="onSearch()" placeholder="Search by name..."/>
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <!-- Add / Edit form -->
      <mat-card *ngIf="showForm" style="margin-bottom:24px;padding:16px">
        <mat-card-title>{{ editingId ? 'Edit Contact' : 'New Contact' }}</mat-card-title>
        <mat-card-content>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">

            <mat-form-field appearance="outline">
              <mat-label>First name</mat-label>
              <input matInput [(ngModel)]="form.firstName"/>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Last name</mat-label>
              <input matInput [(ngModel)]="form.lastName"/>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" [(ngModel)]="form.email"/>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Phone</mat-label>
              <input matInput [(ngModel)]="form.phone"/>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Company</mat-label>
              <input matInput [(ngModel)]="form.company"/>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Status</mat-label>
              <mat-select [(ngModel)]="form.status">
                <mat-option value="LEAD">Lead</mat-option>
                <mat-option value="PROSPECT">Prospect</mat-option>
                <mat-option value="CUSTOMER">Customer</mat-option>
                <mat-option value="CHURNED">Churned</mat-option>
              </mat-select>
            </mat-form-field>

          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary"
            (click)="saveContact()" [disabled]="saving">
            {{ saving ? 'Saving...' : (editingId ? 'Update' : 'Create') }}
          </button>
          <button mat-button (click)="closeForm()" style="margin-left:8px">
            Cancel
          </button>
        </mat-card-actions>
      </mat-card>

      <!-- Contacts table -->
      <mat-card>
        <table mat-table [dataSource]="contacts" style="width:100%">

          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let c">
              {{ c.firstName }} {{ c.lastName }}
            </td>
          </ng-container>

          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let c">{{ c.email }}</td>
          </ng-container>

          <ng-container matColumnDef="phone">
            <th mat-header-cell *matHeaderCellDef>Phone</th>
            <td mat-cell *matCellDef="let c">{{ c.phone }}</td>
          </ng-container>

          <ng-container matColumnDef="company">
            <th mat-header-cell *matHeaderCellDef>Company</th>
            <td mat-cell *matCellDef="let c">{{ c.company }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let c">
              <span [class]="'status-badge status-' + c.status?.toLowerCase()">
                {{ c.status }}
              </span>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let c">
              <button mat-icon-button color="primary" (click)="editContact(c)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="deleteContact(c.id!)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

        </table>

        <div *ngIf="contacts.length === 0"
          style="text-align:center;padding:48px;color:#888">
          No contacts found. Click "+ Add Contact" to get started.
        </div>
      </mat-card>

    </div>
  `,
  styles: [`
    .status-badge {
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    .status-lead     { background: #e3f2fd; color: #1565c0; }
    .status-prospect { background: #fff8e1; color: #f57f17; }
    .status-customer { background: #e8f5e9; color: #2e7d32; }
    .status-churned  { background: #fce4ec; color: #c62828; }
  `]
})
export class ContactsComponent implements OnInit {

  contacts: Contact[] = [];
  displayedColumns = ['name', 'email', 'phone', 'company', 'status', 'actions'];
  searchKeyword = '';
  showForm = false;
  saving = false;
  editingId: number | null = null;

  form: Contact = {
    firstName: '', lastName: '', email: '',
    phone: '', company: '', status: 'LEAD'
  };

  constructor(
    public router: Router,
    private contactService: ContactService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getAll().subscribe({
      next: data => this.contacts = data,
      error: () => this.snackBar.open('Failed to load contacts', 'Close', { duration: 3000 })
    });
  }

  onSearch(): void {
    if (this.searchKeyword.trim().length > 1) {
      this.contactService.search(this.searchKeyword).subscribe({
        next: data => this.contacts = data
      });
    } else if (this.searchKeyword.trim().length === 0) {
      this.loadContacts();
    }
  }

  openForm(): void {
    this.editingId = null;
    this.form = { firstName: '', lastName: '', email: '', phone: '', company: '', status: 'LEAD' };
    this.showForm = true;
  }

  editContact(contact: Contact): void {
    this.editingId = contact.id!;
    this.form = { ...contact };
    this.showForm = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  closeForm(): void {
    this.showForm = false;
    this.editingId = null;
  }

  saveContact(): void {
    if (!this.form.firstName || !this.form.lastName) {
      this.snackBar.open('First name and last name are required', 'Close', { duration: 3000 });
      return;
    }

    this.saving = true;
    const operation = this.editingId
      ? this.contactService.update(this.editingId, this.form)
      : this.contactService.create(this.form);

    operation.subscribe({
      next: () => {
        this.snackBar.open(
          this.editingId ? 'Contact updated' : 'Contact created',
          'Close', { duration: 2000 }
        );
        this.closeForm();
        this.loadContacts();
        this.saving = false;
      },
      error: (err) => {
        this.snackBar.open(err.error || 'Something went wrong', 'Close', { duration: 3000 });
        this.saving = false;
      }
    });
  }

  deleteContact(id: number): void {
    if (!confirm('Delete this contact?')) return;
    this.contactService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Contact deleted', 'Close', { duration: 2000 });
        this.loadContacts();
      },
      error: () => this.snackBar.open('Failed to delete', 'Close', { duration: 3000 })
    });
  }
}