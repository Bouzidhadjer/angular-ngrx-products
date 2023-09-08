import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Store} from '@ngrx/store';
import { GetAllProductsAction, GetSelectedProductsAction, ProductsActionsTypes, SearchProductsAction } from 'src/app/ngrx/product.actions';
import { ProductsState } from 'src/app/ngrx/product.reducer';

@Component({
  selector: 'app-navbar-products',
  templateUrl: './navbar-products.component.html',
  styleUrls: ['./navbar-products.component.css']
})
export class NavbarProductsComponent implements OnInit {

   state!: ProductsState;
   readonly ProductsActionsTypes = ProductsActionsTypes;
  constructor(private store: Store<any>, private router: Router) {

  }

  ngOnInit(): void {
    this.store.subscribe(state =>{ 
      this.state = state.catalogState;
    });
  }
  onGetAllProducts() {
      this.store.dispatch(new GetAllProductsAction({}));
  }
  onGetSelectedProducts() {
    this.store.dispatch(new GetSelectedProductsAction({}))
  }
  onSearch(dataForm: any) {
    this.store.dispatch(new SearchProductsAction(dataForm.keyword));
 
   }

   onNewProduct(){
    this.router.navigateByUrl("/newProduct");
   }
}
