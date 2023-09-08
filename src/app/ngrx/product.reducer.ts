import { Action } from "@ngrx/store";
import { Product } from "../model/product.model";
import { ProductsActions, ProductsActionsTypes } from "./product.actions";

export enum ProductStateEnum  {
     LOADING="Loading",
     LOADED="Loaded",
     SUCCESS="Success",
     ERROR="Error",
     INITIAL="Initial",
     NEW="NEW",
     EDIT="EDIT", 
     UPDATED = "UPDATED"
}

export interface ProductsState {
  products: Product[],
  errorMessage: string,
  dataState: ProductStateEnum,
  currentProduct: Product | null,
  currentAction: ProductsActions | null,

}
const initState: ProductsState = {
    products: [],
    errorMessage: "", 
    dataState: ProductStateEnum.INITIAL,
    currentProduct: null,
    currentAction: null
} 
export function productsReducer(state: ProductsState=initState, action: Action) : ProductsState{
      switch(action.type) {
         case ProductsActionsTypes.GET_ALL_PRODUCTS: 
           return {...state, dataState: ProductStateEnum.LOADING, currentAction: <ProductsActions> action }
         case ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
           return {...state, dataState: ProductStateEnum.LOADED, products:(<ProductsActions>action).payload, currentAction: <ProductsActions> action}
         case ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR:
            return {...state, dataState: ProductStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction: <ProductsActions> action }  

           
        /* Get Selected Products*/
        case ProductsActionsTypes.GET_SELECTED_PRODUCTS:
          return {...state, dataState:ProductStateEnum.LOADING, currentAction: <ProductsActions> action }
        case ProductsActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS:
          return {...state, dataState:ProductStateEnum.LOADED, products:(<ProductsActions>action).payload , currentAction: <ProductsActions> action}
        case ProductsActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
          return {...state, dataState:ProductStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload , currentAction: <ProductsActions> action}

          /* Select Product */
        case ProductsActionsTypes.SELECT_PRODUCT:
          return {...state, dataState:ProductStateEnum.LOADING , currentAction: <ProductsActions> action }
        case ProductsActionsTypes.SELECT_PRODUCT_SUCCESS:
          let product: Product = (<ProductsActions>action).payload;
          let listproducts =  [...state.products];
          let data : Product[] = listproducts.map(p => p.id == product.id?product:p);
          return {...state, dataState:ProductStateEnum.LOADED, products:data , currentAction: <ProductsActions> action}
        case ProductsActionsTypes.SELECT_PRODUCT_ERROR:
          return {...state, dataState:ProductStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload , currentAction: <ProductsActions> action} 
         
         /* Delete Product */
         case ProductsActionsTypes.DELETE_PRODUCT:
                  return {...state, dataState:ProductStateEnum.LOADING, currentAction: <ProductsActions> action }
         case ProductsActionsTypes.DELETE_PRODUCT_SUCCESS:
            let p: Product = (<ProductsActions>action).payload;
            let index = state.products.indexOf(p);
            let productsList =  [...state.products];
            productsList.splice(index,1);
          return {...state, dataState:ProductStateEnum.LOADED, products:productsList, currentAction: <ProductsActions> action}
        case ProductsActionsTypes.DELETE_PRODUCT_ERROR:
          return {...state, dataState:ProductStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction: <ProductsActions> action} 
         
           /* New Product */
        case ProductsActionsTypes.NEW_PRODUCT:
            return {...state, dataState:ProductStateEnum.LOADING , currentAction: <ProductsActions> action}
        case ProductsActionsTypes.NEW_PRODUCT_SUCCESS:
            return {...state, dataState:ProductStateEnum.NEW , currentAction: <ProductsActions> action}
        case ProductsActionsTypes.NEW_PRODUCT_ERROR:
             return {...state, dataState:ProductStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload , currentAction: <ProductsActions> action}   
                  /* Save Product */
        case ProductsActionsTypes.SAVE_PRODUCT:
            return {...state, dataState:ProductStateEnum.LOADING , currentAction: <ProductsActions> action}
        case ProductsActionsTypes.SAVE_PRODUCT_SUCCESS:
             let prods : Product[]= [...state.products];
             prods.push((<ProductsActions>action).payload);
            return {...state, dataState:ProductStateEnum.LOADED, products: prods, currentAction: <ProductsActions> action }
        case ProductsActionsTypes.SAVE_PRODUCT_ERROR:
             return {...state, dataState:ProductStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction: <ProductsActions> action}   
              /* Edit Product */
        case ProductsActionsTypes.EDIT_PRODUCT:
            return {...state, dataState:ProductStateEnum.LOADING, currentAction: <ProductsActions> action }
        case ProductsActionsTypes.EDIT_PRODUCT_SUCCESS:
            return {...state, dataState:ProductStateEnum.LOADED, currentProduct: (<ProductsActions>action).payload , currentAction: <ProductsActions> action}
        case ProductsActionsTypes.EDIT_PRODUCT_ERROR:
             return {...state, dataState:ProductStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction: <ProductsActions> action}   
       
                         /* Edit Product */
        case ProductsActionsTypes.UPDATE_PRODUCT:
          return {...state, dataState:ProductStateEnum.LOADING, currentAction: <ProductsActions> action }
      case ProductsActionsTypes.UPDATE_PRODUCT_SUCCESS:
            let updateProduct: Product = (<ProductsActions>action).payload;
            let updatedProducts : Product[]  = state.products.map(p => p.id == updateProduct.id?updateProduct:p);
          return {...state, dataState:ProductStateEnum.UPDATED, products: updatedProducts , currentAction: <ProductsActions> action}
      case ProductsActionsTypes.UPDATE_PRODUCT_ERROR:
           return {...state, dataState:ProductStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction: <ProductsActions> action}   
     
        default: return {...state}  
      }
}