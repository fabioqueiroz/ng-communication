import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, Input } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    // listFilter: string; // moved to criteria component
    // showImage: boolean; // now comming from the parameter service
    includeDetail: boolean = true;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;
    parentListFilter: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    get showImage(): boolean {
        return this._productParameterService.showImage;
    }
    set showImage(value: boolean) {
        this._productParameterService.showImage = value;
    }

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

    constructor(private _productService: ProductService, 
        private _productParameterService: ProductParameterService) { }

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
        this._productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.fromFilterCriteria.listFilter = this._productParameterService.filterBy ;
                // this.performFilter(this.parentListFilter); // with the parameter service, it only needs to be called from filterInputFromChild
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

    filterInputFromChild(value) {
        this._productParameterService.filterBy = value;
        this.performFilter(value);
    }

    // used for the long two way binding

    // onFilterChange(filter: string) : void {
    //     this.listFilter = filter;
    //     this.performFilter(this.listFilter);
    // }
}
