import { Component, OnInit, ContentChildren, QueryList, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'custom-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.css']
})
export class StyleComponent implements OnInit, AfterContentInit {

  constructor() { }

  ngOnInit() {
    console.log(this.style);
  }

  ngAfterContentInit() {
    console.log(this.style);
  }


  @ContentChildren(ElementRef) style: QueryList<ElementRef>

}
