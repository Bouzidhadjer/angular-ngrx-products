import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EditProductAction, UpdateProductAction } from 'src/app/ngrx/product.actions';
import { ProductStateEnum, ProductsState } from 'src/app/ngrx/product.reducer';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent  implements OnInit{
    productID!: number;
    state!: ProductsState;
    productFormGroup!: FormGroup;
    readonly ProductStateEnum = ProductStateEnum;
    formBuilt: boolean = false;
    submitted: boolean = false; 
  constructor(private activatedRouter: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<any>) {
    this.productID = this.activatedRouter.snapshot.params['id'];
  }

  ngOnInit(): void {
     console.log(this.productID);
      this.store.dispatch(new EditProductAction(this.productID));
      this.store.subscribe(myState =>{
          this.state= myState.catalogState;
          if(this.state.dataState === ProductStateEnum.LOADED) {
            if(this.state.currentProduct != null) {
              this.productFormGroup = this.fb.group({
                id:[this.state?.currentProduct?.id],
                name:[this.state.currentProduct.name, Validators.required],
                price:[this.state.currentProduct.price, Validators.required],
                quantity:[this.state.currentProduct.quantity, Validators.required],
                selected:[this.state.currentProduct.selected],
                available: [this.state.currentProduct.available]
              });
              this.formBuilt = true;
            }
          }
     
      });
  }
  okUpdated() {
this.router.navigateByUrl("/products");
  }
  onUpdateProduct() {
    this.submitted = true;
    if(this.productFormGroup.invalid) return;
     this.store.dispatch(new UpdateProductAction(this.productFormGroup.value)); 
  }
}
