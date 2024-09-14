import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {Product} from "../../models/Product";
import {Category} from "../../models/Category";
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";
@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListItem,
    MatIcon,
    MatNavList,
    MatSidenavContent,
    MatSidenav,
    MatSidenavContainer,
    MatToolbar,
    MatAnchor,
    MatIconButton,
    FlexLayoutModule,
    MatSidenavModule,
    MatCardTitle,
    MatCardImage,
    MatCardHeader,
    NgForOf,
    MatCard,
    MatButton,
    MatCardActions,
    MatCardContent,
    CurrencyPipe,
    RouterOutlet
  ],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent  {

  isSidenavOpen = false;

  closeSidenav() {
    this.isSidenavOpen = false;
  }
  onSearchClick() {

  }
}
