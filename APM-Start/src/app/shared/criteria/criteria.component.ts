import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { IProduct } from '../../products/product';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  
  listFilter: string;
  hitMessage: string;
  
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

  // alternative way for watching for changes on the @Input() property
  ngOnChanges(changes: SimpleChanges): void { 
    console.log(changes);

    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount;
    }
  }
  

}
