import { Routes } from '@angular/router';
import {ListProduitsComponent} from "./list-produits/list-produits.component";
import {PanierComponent} from "./panier/panier.component";
import {DetailsProduitComponent} from "./details-produit/details-produit.component";

export const routes: Routes = [
  { path: '', component: ListProduitsComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'product/:id', component: DetailsProduitComponent },
];
