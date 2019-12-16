import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, Renderer2, OnDestroy } from '@angular/core';
import { StyleComponent } from '../style/style.component';
import { IfStmt, CompileStylesheetMetadata } from '@angular/compiler';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  breakpoints = [{ xl: "min-width: 1200px" }, { lg: "min-width: 992px" }, { md: "min-width: 768px" }, { sm: "min-width: 544px" }, { xs: "min-width: 0em" },]

  @Input('cols') cols: any;
  staticCols: number;
  responsiveCols: object;

  @Input('rows') rows: any;
  staticRows: number;
  responsiveRows: object;
  
  @Input('gap') gap: any;
  staticGap: number;
  responsiveGap: object;

  styleTag: Node;


  constructor(private renderer: Renderer2) { }

  ngOnInit() {

  }

  ngOnChanges() {
    console.log('changes');
    if (this.cols || this.rows) {
      this.getInputValue(this.cols, 'staticCols', 'responsiveCols');
      this.getInputValue(this.rows, 'staticRows', 'responsiveRows');
      this.getInputValue(this.gap, 'staticGap', 'responsiveGap');
      this.createStylesheet();
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.styleTag?this.renderer.removeChild(window.document.head, this.styleTag):null;
  }

  getInputValue(value, variableName, repsonsiveVariableName) {

    if (value.length == 1 || typeof value == 'number' || value.includes(".")) {
      this[variableName] = typeof value == 'string' ? Number(value) : value;
    } else if (value === Object(value)) {
      this[repsonsiveVariableName] = value;
    } else if (typeof value == 'string') {
      this[repsonsiveVariableName] = eval("(" + '{' + value + '}' + ")");
    }
  }

  createStylesheet() {
    this.styleTag?this.renderer.removeChild(window.document.head, this.styleTag):null;
    let tag = this.renderer.createElement('style');
    let hostname = '[' + tag.attributes[0].name.replace("content", "host") + ']';

    let stylesheet = '';
    if (this.staticCols || this.staticRows || this.staticGap) {
      let columns = this.staticCols ? ' 1fr '.repeat(this.staticCols) : null;
      let rows = this.staticRows ? ' 1fr '.repeat(this.staticRows) : null;
      let gap = this.staticGap ? this.staticGap + 'rem': null;
      stylesheet =
        ` ${hostname} {
        ${columns ? 'grid-template-columns:' + columns + ';' + '-ms-grid-colums' + columns + ';' : ''}
        ${rows ? 'grid-template-rows:' + rows + ';' + '-ms-grid-rows' + rows + ';' : ''}
        ${gap ? 'grid-gap:' + gap + ';' + 'padding:' + gap + ';' + 'width: calc(100% - ' + gap + ' - '+ gap +');'  : ''}
          }`;
    }
    if (this.responsiveCols || this.responsiveRows || this.responsiveGap) {
      this.breakpoints.forEach(bp => {
        let columns = this.responsiveCols ? ' 1fr '.repeat(this.responsiveCols[Object.keys(bp)[0]]) : null;
        let rows = this.responsiveRows ? ' 1fr '.repeat(this.responsiveRows[Object.keys(bp)[0]]) : null;
        let gap = this.responsiveGap ? this.responsiveGap[Object.keys(bp)[0]]  + 'rem': null;
        stylesheet = stylesheet +
          `@media only screen and (${bp[Object.keys(bp)[0]]}){
              ${hostname} {
            ${columns ? 'grid-template-columns:' + columns + ';' + '-ms-grid-colums' + columns + ';' : ''}
            ${rows ? 'grid-template-rows:' + rows + ';' + '-ms-grid-rows' + rows + ';' : ''}
            ${gap ? 'grid-gap:' + gap + ';' + 'padding:' + gap + ';' + 'width: calc(100% - ' + gap + ' - '+ gap +');' : ''}
              }
          }`;
      });
    }
    let textNode = this.renderer.createText(stylesheet);
    this.renderer.appendChild(tag, textNode);
    this.styleTag = tag;
    this.renderer.appendChild(window.document.head, this.styleTag);

  }

}