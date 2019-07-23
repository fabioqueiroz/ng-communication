import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';
    product: IProduct | null;
    sub: Subscription;
    
    // p8
    // get product(): IProduct | null {
        //     return this._productService.currentProduct; 
        // }
        
    constructor(private _productService: ProductService) { }
        
    ngOnInit() {
        this.sub = this._productService.selectedProductchanges$.subscribe(selectedProduct =>
            this.product = selectedProduct
        );
    }
    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
