import {Component, OnInit} from '@angular/core';
import { ProduitService } from "../list-produits/produit.service";
import { SharedService } from "../shared-service.service";
import { ActivatedRoute } from '@angular/router';
import { Product } from "../model/Product";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import { LignePanier } from "../model/LignePanier";
import {CommentsComponent} from "../comments/comments.component";

@Component({
  selector: 'app-details-produit',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    CommentsComponent
  ],
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']  // Updated here
})
export class DetailsProduitComponent implements OnInit {
  product!: Product;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');  // Get product ID from route

    if (productId) {
      // Fetch product details using the product service
      this.produitService.getProductById(Number(productId)).subscribe((product:any) => {
        this.product = product;
      });
    }
  }

  addToPanier() {
    const productToAdd = new LignePanier(this.product, 1);
    this.sharedService.addProductToCart(productToAdd);
  }
}
