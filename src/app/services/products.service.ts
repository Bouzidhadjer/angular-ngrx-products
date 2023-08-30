import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environements/environment";
import { Product } from "../model/product.model";

@Injectable({
    providedIn: "root"
})
export class ProductsService {

    constructor(private http: HttpClient){

        }

        getAllProducts(): Observable<Product[]> {
             return this.http.get<Product[]>(environment.backendHost+"/products");
        }

        getSelectedProducts(): Observable<Product[]> {
            return this.http.get<Product[]>(environment.backendHost+"/products?selected=true");
       }
       getAvailableProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(environment.backendHost+"/products?available=true");
         }

       searchProducts(keyword: string): Observable<Product[]> {
        return this.http.get<Product[]>(environment.backendHost+"/products?name_like="+ keyword);
    }

    selectProduct(product: Product): Observable<Product> {
        product.selected = !product.selected;
        return this.http.put<Product>(environment.backendHost+"/products/"+ product.id, product);
    }
    deleteProduct(product: Product): Observable<void> {
        return this.http.delete<void>(environment.backendHost+"/products/"+ product.id);
    }
    save(product: Product):Observable<Product> {
         return this.http.post<Product>(environment.backendHost+"/products",product);
    }
    
    getProduct(productId : number): Observable<Product> {
        return this.http.get<Product>(environment.backendHost+"/products/"+productId);
   }

    updateProduct(product: Product):Observable<Product> {
        return this.http.put<Product>(environment.backendHost+"/products/"+product.id,product);
   }
}