import {Component, Input, Output} from '@angular/core';
import {Product} from "../model/Product";
import {NgIf, NgStyle} from "@angular/common";
import { EventEmitter } from '@angular/core';
import {SharedService} from "../shared-service.service";
import {LignePanier} from "../model/LignePanier";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    NgIf
  ],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input() product!: Product;
  constructor(private sharedService: SharedService) {
  }
  addToPanier() {
    const productToAdd = new LignePanier(this.product, 1);
    this.sharedService.addProductToCart(productToAdd);
  }
  getColor() {
    return this.product.stock > 0 ? 'green' : 'red';
  }
  getState() {
    return this.product.stock > 0 ? 'En stock' : 'En rupture de stock';
  }
}

