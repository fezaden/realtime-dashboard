import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LiveDataService, Product } from '../../shared/live-data.service';


@Component({
  selector: 'app-data-grid',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatInputModule],
  template: `
    <h2><span style="font-weight:400">Ürünler   </span> <span style="font-size:0.9em;color:#42a5f5;font-weight:700">Canlı Veri</span></h2>

    <div style="margin-bottom: 1rem;">
      <input matInput [(ngModel)]="filterValue" placeholder="Filtrele (isim/fiyat)" style="width:200px;">
      <button (click)="showAddForm = !showAddForm">{{showAddForm ? 'Vazgeç' : 'Yeni Ürün Ekle'}}</button>
    </div>

    <!-- Ekleme Formu -->
    <div *ngIf="showAddForm" style="margin-bottom:1rem;">
      <input matInput [(ngModel)]="newProductName" placeholder="Ürün Adı" style="width:150px;">
      <input matInput [(ngModel)]="newProductPrice" placeholder="Fiyat" type="number" style="width:100px;">
      <button (click)="addProduct()">Kaydet</button>
    </div>

    <table mat-table [dataSource]="filteredProducts" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> ID </th>
        <td mat-cell *matCellDef="let element"> {{element.id}} </td>
      </ng-container>
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Ürün Adı </th>
        <td mat-cell *matCellDef="let element">
          <span *ngIf="editId !== element.id">{{element.name}}</span>
          <input *ngIf="editId === element.id" matInput [(ngModel)]="editName">
        </td>
      </ng-container>
      <ng-container matColumnDef="price">
        <th mat-header-cell *matHeaderCellDef> Fiyat </th>
        <td mat-cell *matCellDef="let element">
          <span *ngIf="editId !== element.id">{{element.price | currency:'TRY' }}</span>
          <input *ngIf="editId === element.id" matInput [(ngModel)]="editPrice" type="number" style="width:80px;">
        </td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> İşlem </th>
        <td mat-cell *matCellDef="let element">
          <button *ngIf="editId !== element.id" (click)="startEdit(element)">Düzenle</button>
          <button *ngIf="editId === element.id" (click)="saveEdit(element)">Kaydet</button>
          <button (click)="deleteProduct(element.id)">Sil</button>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
    styles: [`
    h2 {
      color: #1976d2;
      font-size: 1.25rem;
      margin-bottom: 2rem;
      letter-spacing: 0.05em;
      font-weight: bold;
      text-align: center;
    }
    .mat-elevation-z8 {
      background: #fff;
      border-radius: 1.1rem;
      box-shadow: 0 6px 26px 0 rgba(30,90,150,0.10);
      margin-top: 1.2rem;
      margin-bottom: 2rem;
      overflow: hidden;
    }
    th, td {
      padding: 1rem 1.4rem;
      font-size: 1.07rem;
    }
    th {
      background: #e3f2fd;
      color: #1565c0;
      font-weight: 600;
      letter-spacing: 0.03em;
      border-bottom: 1.8px solid #90caf9;
    }
    tr.mat-row:hover td {
      background: #f1f8ff;
    }
    button {
      background: linear-gradient(90deg, #42a5f5 0%, #1976d2 100%);
      border: none;
      color: #fff;
      padding: 0.4rem 1.15rem;
      margin-right: 0.6rem;
      border-radius: 0.8rem;
      font-size: 0.97em;
      cursor: pointer;
      transition: background 0.18s;
      font-weight: 500;
      outline: none;
      box-shadow: 0 2px 7px #42a5f522;
    }
    button:last-child {
      margin-right: 0;
      background: linear-gradient(90deg, #e53935 0%, #e35d5b 100%);
    }
    button:hover {
      filter: brightness(1.13);
    }
    input[matInput] {
      background: #f6faff;
      border-radius: 0.6rem;
      border: 1.3px solid #90caf9;
      padding: 0.7rem 1rem;
      margin-right: 0.8rem;
      font-size: 1em;
      transition: border 0.15s;
      outline: none;
    }
    input[matInput]:focus {
      border: 1.8px solid #1976d2;
      background: #e3f2fd;
    }
    /* Ekstra responsive */
    @media (max-width: 900px) {
      .mat-elevation-z8 {
        font-size: 0.97rem;
      }
      th, td { padding: 0.6rem 0.7rem; }
    }
    /* Ekleme Formu ve Arama kutusu için */
    div[style*="margin-bottom:1rem;"] {
      display: flex;
      gap: 0.7rem;
      align-items: center;
      margin-bottom: 1.2rem !important;
    }
  `]
})
export class DataGridComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'price', 'actions'];
  filterValue = '';
  showAddForm = false;
  newProductName = '';
  newProductPrice: number | null = null;
  // Edit için
  editId: number | null = null;
  editName = '';
  editPrice: number | null = null;

  products: Product[] = [];
  private sub!: Subscription;

  constructor(private liveData: LiveDataService) {}

  ngOnInit() {
    this.sub = this.liveData.products$.subscribe(p => (this.products = p));
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  get filteredProducts() {
    if (!this.filterValue) return this.products;
    const v = this.filterValue.toLowerCase();
    return this.products.filter(
      p => p.name.toLowerCase().includes(v) || p.price.toString().includes(v)
    );
  }

  addProduct() {
    if (!this.newProductName || this.newProductPrice == null) return;
    const product: Product = {
      id: this.liveData.getNextId(),
      name: this.newProductName,
      price: this.newProductPrice,
    };
    this.liveData.addProduct(product);
    this.newProductName = '';
    this.newProductPrice = null;
    this.showAddForm = false;
  }

  deleteProduct(id: number) {
    this.liveData.deleteProduct(id);
    if (this.editId === id) this.editId = null;
  }

  startEdit(product: Product) {
    this.editId = product.id;
    this.editName = product.name;
    this.editPrice = product.price;
  }

  saveEdit(product: Product) {
    if (this.editPrice == null) return;
    this.liveData.updateProduct({
      id: product.id,
      name: this.editName,
      price: this.editPrice,
    });
    this.editId = null;
    this.editName = '';
    this.editPrice = null;
  }

}
