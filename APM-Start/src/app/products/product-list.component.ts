import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, Input } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    // listFilter: string; // moved to criteria component
    showImage: boolean;
    includeDetail: boolean = true;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;
    parentListFilter: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    // using @ViewChild('filterElement') 
    // private _listFilter: string;
    // get listFilter(): string {
    //     return this._listFilter;
    // }

    // set listFilter(value: string) {
    //     this._listFilter = value;
    //     this.performFilter(this.listFilter);
    // }

    // // #filterElement, using the setter; accesses the native element
    // @ViewChild('filterElement') filterElementRef: ElementRef; 

    // // must be subscribed to value changes; accesses the data structure
    // @ViewChild(NgModel) filterWithNgModel: NgModel; 

    // both are equivalent and generate a querylist to be iterated
    // @ViewChildren('filterElement', 'secondElement') filterElementRefs: QueryList<ElementRef>; // #filterElement and #secondElement 
    // @ViewChildren(NgModel) filterElementRefs: QueryList<NgModel>;
    @ViewChild(CriteriaComponent) fromFilterCriteria: CriteriaComponent;

    constructor(private productService: ProductService) { }

    ngAfterViewInit(): void {

        // commented out on P5: moved logic to criteria component
        // console.log(this.filterElementRef.nativeElement);

        // if (this.filterElementRef.nativeElement != null) {
            
        //     this.filterElementRef.nativeElement.focus();
        // }

        // using @ViewChild(NgModel) // moved to criteria component
        // this.filterWithNgModel.valueChanges.subscribe(() => {
        //     this.performFilter(this.listFilter);
        // })

        this.parentListFilter = this.fromFilterCriteria.listFilter;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.parentListFilter);
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
