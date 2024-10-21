import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListProduitsComponent} from "./list-produits/list-produits.component";
import {NavbarComponent} from "./navbar/navbar.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListProduitsComponent, NavbarComponent ,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'p_angular';
}
