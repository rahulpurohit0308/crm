import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatCardModule],
  template: `
    <mat-toolbar color="primary">
      <span>CRM Dashboard</span>
      <span style="flex: 1"></span>
      <span style="margin-right: 16px">{{ currentUser?.name }}</span>
      <button mat-button (click)="logout()">Logout</button>
    </mat-toolbar>

    <div style="padding: 24px">
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Contacts</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p style="font-size: 36px; font-weight: 500; margin: 16px 0">
              Manage your leads
            </p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary"
              (click)="router.navigate(['/contacts'])">View Contacts</button>
          </mat-card-actions>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Deals</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p style="font-size: 36px; font-weight: 500; margin: 16px 0">
              Track your pipeline
            </p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button color="primary"
              (click)="router.navigate(['/deals'])">View Deals</button>
          </mat-card-actions>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-card-title>Welcome back</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p style="margin: 16px 0">
              Logged in as <strong>{{ currentUser?.role }}</strong>
            </p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  currentUser: any;

  constructor(
    public router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}