import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ProductStateEnum, ProductsState } from 'src/app/ngrx/product.reducer';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productsState$: Observable<ProductsState> | null = null;
  readonly DataStateEnum = ProductStateEnum;
  constructor(private store: Store<any>) {
  }
  ngOnInit(): void {
    this.productsState$ = this.store.pipe(
      map((state) =>  state.catalogState)
    );
  }
}
