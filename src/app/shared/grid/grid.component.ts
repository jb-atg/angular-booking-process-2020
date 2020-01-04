import { Component, ElementRef, Input, OnChanges, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnChanges, OnDestroy {
  id: string;
  styleTag: Node;

  @Input('cols') _cols: any;
  cols: object = {};

  @Input('rows') _rows: any;
  rows: object = {};

  @Input('gap') _gap: any;
  gap: object = {};


  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngOnChanges(): void {
    if (this._cols || this._rows || this._gap) {
      this.cols = this.parseInputValue(this._cols);
      this.rows = this.parseInputValue(this._rows);
      this.gap = this.parseInputValue(this._gap);
      this.createStylesheet();
    } else if (this.styleTag) {
      this.renderer.removeChild(window.document.head, this.styleTag);
    }
  }

  parseInputValue(inputValue) {
    if (inputValue) {
      if (inputValue === Object(inputValue)  /* e.g. [cols]="{xs:3,sm:4,md:5,lg:6,xl:7}"*/) {
        return inputValue;
      } else if (!inputValue.includes(":")/* e.g. cols="3" */) {
        let staticValue = typeof inputValue == 'string' ? Number(inputValue) : inputValue;
        return { xs: staticValue, sm: staticValue, md: staticValue, lg: staticValue, xl: staticValue };
      } else if (typeof inputValue == 'string' && inputValue.includes(":") && inputValue.includes(",") /* e.g. cols="xs:3,sm:4,md:5,lg:6,xl:7"*/) {
        return eval("(" + '{' + inputValue + '}' + ")");
      } else {
        console.log(inputValue + 'is invalid');
      }
    } else {
      return { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 };
    }
  }

  createStylesheet() {
   this.id = 'grid-' + Math.random().toString(36).substring(2, 8);

    this.styleTag ? this.renderer.removeChild(window.document.head, this.styleTag) : null;
    this.styleTag = this.renderer.createElement('style');
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
    let css: string = '';

    breakpoints.forEach((breakpoint) => {
      css = css +
        ` .${breakpoint} #${this.id}  {
        grid-template-columns: ${' 1fr '.repeat(this.cols[breakpoint])};
        -ms-grid-columns: ${' 1fr '.repeat(this.cols[breakpoint])};
        grid-template-rows: ${' 1fr '.repeat(this.rows[breakpoint])};
        -ms-grid:-rows: ${' 1fr '.repeat(this.rows[breakpoint])};
        grid-gap: ${this.gap[breakpoint] + 'rem'};
        padding: ${this.gap[breakpoint] + 'rem'};
        width: calc(100% - ${(this.gap[breakpoint] * 2) + 'rem'});
        height: calc(100% - ${(this.gap[breakpoint] * 2) + 'rem'});
          }`;
    });

    this.renderer.appendChild(this.styleTag, this.renderer.createText(css));
    this.renderer.appendChild(window.document.head, this.styleTag);
    this.renderer.setAttribute(this.element.nativeElement, 'id', this.id);
  }

  ngOnDestroy(): void {
    this.styleTag ? this.renderer.removeChild(window.document.head, this.styleTag) : null;
  }

}
