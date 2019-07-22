import { Component, OnInit } from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];

  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => this.errorMessage = <any>error
    );
  }

  onSelected(product: IProduct) {
    // this._productService.currentProduct = product; // p8
    this._productService.changeSelectedProduct(product);
  }
}
