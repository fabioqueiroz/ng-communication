import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    // listFilter: string;
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    private _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.performFilter(this.listFilter);
    }

    @ViewChild('filterElement') filterElementRef: ElementRef; // #filterElement 

    // both are equivalent and generate a querylist to be iterated
    // @ViewChildren('filterElement', 'secondElement') filterElementRefs: QueryList<ElementRef>; // #filterElement and #secondElement 
    // @ViewChildren(NgModel) filterElementRefs: QueryList<NgModel>;

    constructor(private productService: ProductService) { }

    ngAfterViewInit(): void {
        console.log(this.filterElementRef.nativeElement);

        if (this.filterElementRef.nativeElement != null) {
            
            this.filterElementRef.nativeElement.focus();
        }
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }

    // used for the long two way binding

    // onFilterChange(filter: string) : void {
    //     this.listFilter = filter;
    //     this.performFilter(this.listFilter);
    // }
}
