import { Component, OnInit, OnDestroy } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
 
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;
  sub: Subscription;

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = <any>error
    );

    this.sub = this._productService.selectedProductchanges$.subscribe(product => {
      this.selectedProduct = product;
    });
  }

  onSelected(product: IProduct) {
    // this._productService.currentProduct = product; // p8
    this._productService.changeSelectedProduct(product);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
