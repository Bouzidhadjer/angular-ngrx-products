import { Component, OnInit, Input } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';
import { DeleteProductAction, SelectProductAction } from 'src/app/ngrx/product.actions';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent  implements OnInit {
   @Input() product!: Product;
   constructor(private store: Store,
    private router : Router) {

   }
   ngOnInit(): void {
     
   }
   onSelect(product:Product) {
    this.store.dispatch(new SelectProductAction(product));
   }
   onDelete(product: Product) {
    this.store.dispatch(new DeleteProductAction(product));

   }
   onEdit(product:  Product) {
  this.router.navigateByUrl("/editProduct/"+product.id);
   }
}
