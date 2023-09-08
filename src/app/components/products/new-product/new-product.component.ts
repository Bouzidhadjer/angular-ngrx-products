import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NewProductAction, SaveProductAction } from 'src/app/ngrx/product.actions';
import { ProductStateEnum, ProductsState } from 'src/app/ngrx/product.reducer';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent  implements OnInit {
  productFormGroup!: FormGroup;
  state: ProductsState | null = null;
  readonly ProductStateEnum = ProductStateEnum;
  submitted: boolean = false; 
  constructor(private store: Store<any>,
     private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.store.dispatch(new NewProductAction({}));
    this.store.subscribe(mystate => {
       this.state = mystate.catalogState;
       if(mystate.catalogState.dataState === ProductStateEnum.NEW ) {
       this.productFormGroup = this.fb.group({
          name:["", Validators.required],
          price:[0, Validators.required],
          quantity:[0, Validators.required],
          selected:[true, Validators.required],
          available: [true, Validators.required]
       });
      }
    })
  }
  newProduct() {
    this.store.dispatch(new NewProductAction({}));
  }
  onSaveProduct(){
      this.store.dispatch(new SaveProductAction(this.productFormGroup?.value));
  }
}
