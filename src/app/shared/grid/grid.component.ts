import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, Renderer2, OnDestroy } from '@angular/core';
import { Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  @Input('cols') cols: any;
  staticCols: number;
  responsiveCols: object;

  @Input('rows') rows: any;
  staticRows: number;
  responsiveRows: object;

  @Input('gap') gap: any;
  staticGap: number;
  responsiveGap: object;

  id: string;
  styleTag: Node;


  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngOnInit() {

  }

  ngOnChanges() {
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
    this.styleTag ? this.renderer.removeChild(window.document.head, this.styleTag) : null;
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

  }

}
