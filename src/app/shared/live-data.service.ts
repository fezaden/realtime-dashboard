import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class LiveDataService {
  private _products$ = new BehaviorSubject<Product[]>([
    { id: 1, name: 'Mouse', price: 120 },
    { id: 2, name: 'Klavye', price: 200 },
    { id: 3, name: 'Monitör', price: 1200 },
    { id: 4, name: 'Laptop', price: 25000 }
  ]);
  private nextId = 5;

  constructor() {
    // Her 5 saniyede yeni ürün ekle (CANLI veri simülasyonu)
    interval(5000).subscribe(() => this.addRandomProduct());
  }

  get products$() {
    return this._products$.asObservable();
  }

  addRandomProduct() {
    const names = ['Mikrofon', 'Hoparlör', 'Tablet', 'Kamera', 'Webcam'];
    const name = names[Math.floor(Math.random() * names.length)];
    const price = Math.floor(Math.random() * 9000) + 100;
    const newProduct = { id: this.nextId++, name, price };
    const updated = [...this._products$.value, newProduct];
    this._products$.next(updated);
  }

   addProduct(product: Product) {
      const updated = [...this._products$.value, product];
      this._products$.next(updated);
   }
   
   updateProduct(updatedProduct: Product) {
      const updated = this._products$.value.map(p =>
         p.id === updatedProduct.id ? updatedProduct : p
      );
      this._products$.next(updated);
   }
   
   deleteProduct(id: number) {
      const updated = this._products$.value.filter(p => p.id !== id);
      this._products$.next(updated);
   }
   getProductById(id: number): Product | undefined {
      return this._products$.value.find(p => p.id === id);
   }
   getNextId(): number {
      return this.nextId++;
   }
   getProducts(): Product[] {
      return this._products$.value;
   }
}