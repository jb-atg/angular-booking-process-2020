import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, Renderer2, OnDestroy } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  breakpoints = { static: [], xs: [], sm: [], md: [], lg: [], xl: [] };
  cssProperties = {
    cols: [
      { name: 'grid-template-columns', value: '', unit: 'fr' },
      { name: '-ms-grid-columns', value: '', unit: 'fr' },],
    rows: [
      { name: 'grid-template-rows', value: '', unit: 'fr' },
      { name: '-ms-grid-rows', value: '', unit: 'fr' }],
    gap: [
      { name: 'grid-gap', value: '', unit: 'rem' },
      { name: 'padding', value: '', unit: 'rem' },
      { name: 'width', value: '', unit: 'rem' }
    ],
  }

  @Input('cols') _cols: any;
  cols: object;

  @Input('rows') _rows: any;
  rows: object;

  @Input('gap') _gap: any;
  gap: object;

  id: string;
  styleTag: Node;


  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit() {

  }

  ngOnChanges() {
    if (this.cols || this.rows) {
      this.getInputValue(this.cols, 'cols');
      this.getInputValue(this.rows, 'rows');
      this.getInputValue(this.gap, 'gap');
  /*     this.createStylesheet(); */
    }
  }

  ngAfterViewInit(): void {
    if (this.cols || this.rows) {
      this.id = 'grid-' + Math.random().toString(36).substring(2, 8);
      this.renderer.setAttribute(this.element.nativeElement, 'id', this.id);
    }
  }

  ngOnDestroy(): void {
    this.styleTag ? this.renderer.removeChild(window.document.head, this.styleTag) : null;
  }

  getInputValue(value, propertyName) {
    if (value.length == 1 || typeof value == 'number' || value.includes(".")) {
      this[propertyName].static = typeof value == 'string' ? Number(value) : value;
    } else if (value === Object(value)) {
      this[propertyName] = value;
    } else if (typeof value == 'string') {
      this[propertyName] = eval("(" + '{' + value + '}' + ")");
    }
  }

  setStyles(propertyName) {
    Object.keys(this.breakpoints).forEach((bp, i) => {
      if (this[propertyName][bp]) {
        this.breakpoints[bp].push(this.cssProperties[propertyName]);
        this.setCssValues(propertyName, bp);
      }
    });
  }


  setCssValues(propertyName, bp) {
    this.breakpoints[bp].forEach((property, i) => {
      property.value = this[propertyName][bp];
    });
  }








  /*   abc = [
      { name: '', value: '', repeated: true }
    ] */
  /* 
    setBreakpoints(staticValue: number, responsiveValue: object, cssProperties: Array<any>) {
      let value: string;
      let id: string = ' #' + this.id;
   
      if (staticValue) {
        value = id + '{' +
          cssProperties.forEach((cssProperty, i) => {
            if (cssProperty.value) {
              return cssProperty.name + ':' + cssProperty.value + ';'
            }
          });
        + '}';
   
      } else if (responsiveValue) {
        value = '' + Object.keys(responsiveValue).forEach((bp, i) => {
          let responsiveClassName: string = ' .' + bp;
          return responsiveClassName + id + '{' +
            cssProperties.forEach((cssProperty, i) => {
              if (cssProperty.value) {
                return cssProperty.name + ':' + cssProperty.value + ';'
              }
            });
          + '}';
        });
   
        return value
   
      }
    }
   */

  createStylesheet1() {
    // Remove previous style sheet
    if (this.styleTag) { this.renderer.removeChild(window.document.head, this.styleTag); }

    let tag = this.renderer.createElement('style');
    let stylesheet = '';

    let textNode = this.renderer.createText(stylesheet);
    this.renderer.appendChild(tag, textNode);
    this.styleTag = tag;
    this.renderer.appendChild(window.document.head, this.styleTag);

  }

/*   createStylesheet() {

    this.styleTag ? this.renderer.removeChild(window.document.head, this.styleTag) : null;
    this.id ? this.renderer.removeAttribute(this.element.nativeElement, 'id', this.id) : null;

    this.id = 'grid-' + Math.random().toString(36).substring(2, 8);
    this.renderer.setAttribute(this.element.nativeElement, 'id', this.id);

    let tag = this.renderer.createElement('style');

    let stylesheet = '';
    if (this.staticCols || this.staticRows || this.staticGap) {
      let columns = this.staticCols ? ' 1fr '.repeat(this.staticCols) : null;
      let rows = this.staticRows ? ' 1fr '.repeat(this.staticRows) : null;
      let gap = this.staticGap ? this.staticGap + 'rem' : null;
      stylesheet =
        ` #${this.id} {
        ${columns ? 'grid-template-columns:' + columns + ';' + '-ms-grid-colums' + columns + ';' : ''}
        ${rows ? 'grid-template-rows:' + rows + ';' + '-ms-grid-rows' + rows + ';' : ''}
        ${gap ? 'grid-gap:' + gap + ';' + 'padding:' + gap + ';' + 'width: calc(100% - ' + gap + ' - ' + gap + ');' : ''}
          }`;
    }
    if (this.responsiveCols || this.responsiveRows || this.responsiveGap) {
      ['xs', 'sm', 'md', 'lg', 'xl'].forEach(bp => {
        let columns = this.responsiveCols ? ' 1fr '.repeat(this.responsiveCols[bp]) : null;
        let rows = this.responsiveRows ? ' 1fr '.repeat(this.responsiveRows[bp]) : null;
        let gap = this.responsiveGap ? this.responsiveGap[this.responsiveGap[bp]] + 'rem' : null;

        stylesheet = stylesheet +
          ` .${bp} #${this.id}  {
            ${columns ? 'grid-template-columns:' + columns + ';' + '-ms-grid-colums' + columns + ';' : ''}
            ${rows ? 'grid-template-rows:' + rows + ';' + '-ms-grid-rows' + rows + ';' : ''}
            ${gap ? 'grid-gap:' + gap + ';' + 'padding:' + gap + ';' + 'width: calc(100% - ' + gap + ' - ' + gap + ');' : ''}
              }`;
      });
    }
    let textNode = this.renderer.createText(stylesheet);
    this.renderer.appendChild(tag, textNode);
    this.styleTag = tag;
    this.renderer.appendChild(window.document.head, this.styleTag);

  } */

}
