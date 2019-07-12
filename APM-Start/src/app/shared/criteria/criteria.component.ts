import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { IProduct } from '../../products/product';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit {
  
  listFilter: string;

  @ViewChild('filterElement') filterElementRef: ElementRef; 
  @Input() displayDetail: boolean;
  @Input() hitCount: number;

  constructor() { }

  ngAfterViewInit(): void {
    if (this.filterElementRef.nativeElement != null) {

      this.filterElementRef.nativeElement.focus();
    }
  }

  ngOnInit() {

  }
  

}
