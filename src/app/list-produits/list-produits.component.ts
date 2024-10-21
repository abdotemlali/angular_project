import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {LignePanier} from "../model/LignePanier";
import {Product} from "../model/Product";
import {ProduitService} from "./produit.service";
import {ProductItemComponent} from "../product-item/product-item.component";
import { EventEmitter } from '@angular/core';
import {PanierComponent} from "../panier/panier.component";
import {NgIf} from "@angular/common";
import {SharedService} from "../shared-service.service";

@Component({
  selector: 'app-list-produits',
  standalone: true,
  imports: [
    ProductItemComponent, NavbarComponent, PanierComponent, NgIf
  ],
  templateUrl: './list-produits.component.html',
  styleUrl: './list-produits.component.css'
})
export class ListProduitsComponent implements OnInit{
  items: LignePanier[] = [];
  produits: Array<Product> = [];

  constructor(private produitService: ProduitService, private sharedService: SharedService) {}

  ngOnInit(): void {
    // Load initial products
    this.produitService.getProduits().subscribe((data: any) => {
      this.produits = data.products;
    });

    // Subscribe to the search key and update products
    this.sharedService.searchKey$.subscribe((searchKey) => {
      if (searchKey) {
        this.onSearchedText(searchKey);
      }
    });

    // Subscribe to the selected category and update products
    this.sharedService.selectedCategory$.subscribe((category) => {
      if (category) {
        this.onSearch(category);
      }
    });
  }

  onProductSelected(product: Product) {
    const productExists = this.items.find((item) => item.produit.title === product.title);
    if (productExists) {
      productExists.quantite++;
    } else {
      this.items.push(new LignePanier(product, 1));
    }

    // Update cart item count in the shared service
    this.sharedService.setCartItemCount(this.getCartItemCount());
  }

  onSearch(category: string) {
    this.produitService.getCategory(category).subscribe((data: any) => {
      this.produits = data.products;
    });
  }

  onSearchedText(searchKey: string) {
    this.produitService.getProductByKey(searchKey).subscribe((data: any) => {
      this.produits = data.products;
    });
  }

  getCartItemCount(): number {
    return this.items.reduce((acc, item) => acc + item.quantite, 0);
  }
}
