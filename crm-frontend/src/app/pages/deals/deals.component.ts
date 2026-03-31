import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DealService } from '../../services/deal.service';
import { Deal } from '../../models/deal.model';

type Stage = 'LEAD' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [
    CommonModule, FormsModule, DragDropModule,
    MatToolbarModule, MatButtonModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatSnackBarModule, MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <button mat-icon-button (click)="router.navigate(['/dashboard'])">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span style="margin-left:8px">Deal Pipeline</span>
      <span style="flex:1"></span>
      <button mat-raised-button (click)="toggleForm()">+ Add Deal</button>
    </mat-toolbar>

    <div style="padding:24px">

      <!-- Add deal form -->
      <mat-card *ngIf="showForm" style="margin-bottom:24px;padding:16px">
        <mat-card-title>New Deal</mat-card-title>
        <mat-card-content>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-top:16px">

            <mat-form-field appearance="outline">
              <mat-label>Title</mat-label>
              <input matInput [(ngModel)]="form.title"/>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Value</mat-label>
              <input matInput type="number" [(ngModel)]="form.value"/>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Currency</mat-label>
              <mat-select [(ngModel)]="form.currency">
                <mat-option value="INR">INR</mat-option>
                <mat-option value="USD">USD</mat-option>
                <mat-option value="EUR">EUR</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Stage</mat-label>
              <mat-select [(ngModel)]="form.stage">
                <mat-option *ngFor="let s of stages" [value]="s">{{ s }}</mat-option>
              </mat-select>
            </mat-form-field>

          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary"
            (click)="saveDeal()" [disabled]="saving">
            {{ saving ? 'Saving...' : 'Create Deal' }}
          </button>
          <button mat-button (click)="toggleForm()" style="margin-left:8px">Cancel</button>
        </mat-card-actions>
      </mat-card>

      <!-- Kanban board -->
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:12px;overflow-x:auto">

        <div *ngFor="let stage of stages" class="kanban-column">
          <div class="column-header" [class]="'header-' + stage.toLowerCase()">
            {{ stage }}
            <span class="count">{{ dealsByStage[stage]?.length || 0 }}</span>
          </div>

          <div
            cdkDropList
            [id]="stage"
            [cdkDropListData]="dealsByStage[stage]"
            [cdkDropListConnectedTo]="stages"
            (cdkDropListDropped)="onDrop($event, stage)"
            class="drop-zone">

            <mat-card
              *ngFor="let deal of dealsByStage[stage]"
              cdkDrag
              class="deal-card">
              <div style="font-weight:500;margin-bottom:4px">{{ deal.title }}</div>
              <div style="font-size:12px;color:#666" *ngIf="deal.value">
                {{ deal.currency }} {{ deal.value | number }}
              </div>
              <div style="font-size:11px;color:#999;margin-top:4px" *ngIf="deal.contactName">
                {{ deal.contactName }}
              </div>
              <button mat-icon-button color="warn"
                style="position:absolute;top:4px;right:4px;width:24px;height:24px"
                (click)="deleteDeal(deal.id!)">
                <mat-icon style="font-size:16px">close</mat-icon>
              </button>
            </mat-card>

            <div *ngIf="!dealsByStage[stage]?.length" class="empty-column">
              Drop here
            </div>

          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .kanban-column {
      min-width: 160px;
      display: flex;
      flex-direction: column;
    }
    .column-header {
      padding: 8px 12px;
      border-radius: 8px 8px 0 0;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .count {
      background: rgba(255,255,255,0.4);
      border-radius: 10px;
      padding: 1px 7px;
      font-size: 11px;
    }
    .header-lead        { background: #90caf9; color: #0d47a1; }
    .header-qualified   { background: #ce93d8; color: #4a148c; }
    .header-proposal    { background: #ffcc80; color: #e65100; }
    .header-negotiation { background: #80cbc4; color: #004d40; }
    .header-won         { background: #a5d6a7; color: #1b5e20; }
    .header-lost        { background: #ef9a9a; color: #b71c1c; }
    .drop-zone {
      flex: 1;
      min-height: 400px;
      background: #f8f8f8;
      border: 1px solid #e0e0e0;
      border-top: none;
      border-radius: 0 0 8px 8px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .deal-card {
      padding: 10px 12px !important;
      cursor: grab;
      position: relative;
    }
    .deal-card:active { cursor: grabbing; }
    .empty-column {
      text-align: center;
      color: #bbb;
      font-size: 12px;
      padding: 20px 0;
    }
    .cdk-drag-preview { box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
    .cdk-drag-placeholder { opacity: 0.3; }
    .cdk-drag-animating { transition: transform 250ms; }
  `]
})
export class DealsComponent implements OnInit {

  stages: Stage[] = ['LEAD', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'];
  dealsByStage: Record<Stage, Deal[]> = {
    LEAD: [], QUALIFIED: [], PROPOSAL: [],
    NEGOTIATION: [], WON: [], LOST: []
  };

  showForm = false;
  saving = false;

  form: Deal = {
    title: '', value: undefined, currency: 'INR', stage: 'LEAD'
  };

  constructor(
    public router: Router,
    private dealService: DealService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDeals();
  }

  loadDeals(): void {
    this.dealService.getAll().subscribe({
      next: deals => {
        this.stages.forEach(s => this.dealsByStage[s] = []);
        deals.forEach(deal => {
          if (this.dealsByStage[deal.stage]) {
            this.dealsByStage[deal.stage].push(deal);
          }
        });
      },
      error: () => this.snackBar.open('Failed to load deals', 'Close', { duration: 3000 })
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    this.form = { title: '', value: undefined, currency: 'INR', stage: 'LEAD' };
  }

  saveDeal(): void {
    if (!this.form.title) {
      this.snackBar.open('Title is required', 'Close', { duration: 3000 });
      return;
    }
    this.saving = true;
    this.dealService.create(this.form).subscribe({
      next: () => {
        this.snackBar.open('Deal created', 'Close', { duration: 2000 });
        this.showForm = false;
        this.loadDeals();
        this.saving = false;
      },
      error: () => {
        this.snackBar.open('Failed to create deal', 'Close', { duration: 3000 });
        this.saving = false;
      }
    });
  }

  onDrop(event: CdkDragDrop<Deal[]>, targetStage: Stage): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const deal = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.dealService.updateStage(deal.id!, targetStage).subscribe({
        error: () => {
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
          this.snackBar.open('Failed to update stage', 'Close', { duration: 3000 });
        }
      });
    }
  }

  deleteDeal(id: number): void {
    if (!confirm('Delete this deal?')) return;
    this.dealService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Deal deleted', 'Close', { duration: 2000 });
        this.loadDeals();
      }
    });
  }
}