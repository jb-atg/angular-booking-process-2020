import { Component, ElementRef, Input, OnChanges, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnChanges, OnDestroy {
  id: string;
  styleTag: Node;

  @Input('position') _position: any;
  position: object = {};

  @Input('size') _size: any;
  size: object = {};

  constructor(private renderer: Renderer2, private element: ElementRef) { }

  ngOnChanges(): void {
    if (this._position || this._size) {
      this.position = this.parseInputValue(this._position);
      this.size = this.parseInputValue(this._size);
      this.createStylesheet();
    } else if (this.styleTag) {
      this.renderer.removeChild(window.document.head, this.styleTag);
    }
  }

  parseInputValue(inputValue) {
    if (inputValue) {
      if (inputValue === Object(inputValue)  /* e.g. [position]="{xs:'x3 y2',sm:'x3 y2',md:'x3 y2',lg:'x3 y2',xl:'x3 y2'}"*/) {
        return inputValue;
      } else if (!inputValue.includes(":")/* e.g. position="x3 y2" */) {
        let staticValue: string = inputValue;
        return { xs: staticValue, sm: staticValue, md: staticValue, lg: staticValue, xl: staticValue };
      } else if (typeof inputValue == 'string' && inputValue.includes(":") && inputValue.includes(",") /* e.g. position="xs:x3 y2,sm:x3 y2,md:x3 y2,lg:x3 y2,xl:x3 y2"*/) {
        inputValue = inputValue.replace(/:/g, ":'");
        inputValue = inputValue.replace(/,/g, "',");
        inputValue = inputValue.charAt(inputValue.length - 1) != "," ? inputValue.concat("'") : null;
        return eval("(" + '{' + inputValue + '}' + ")");
      } else {
        console.log(inputValue + 'is invalid');
      }
    } else {
      return { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 };//
    }
  }

  createStylesheet() {
    this.id = 'cell-' + Math.random().toString(36).substring(2, 8);

    this.styleTag ? this.renderer.removeChild(window.document.head, this.styleTag) : null;
    this.styleTag = this.renderer.createElement('style');
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl'];
    let css: string = '';

    breakpoints.forEach((breakpoint) => {
      this.position[breakpoint] = this.position[breakpoint].replace(/x|X/g, "x:").replace(/y|y/g, "y:").replace(/ /g, ",");
      this.position[breakpoint] = eval("(" + '{' + this.position[breakpoint] + '}' + ")");

      this.size[breakpoint] = 'x:' + this.size[breakpoint].replace(/x|X/g, ",y:");
      this.size[breakpoint] = eval("(" + '{' + this.size[breakpoint] + '}' + ")");

      css = css +
        ` .${breakpoint} #${this.id}  {
        
        grid-column-start: ${this.position[breakpoint].x};
        -ms-grid-column: ${this.position[breakpoint].x};

        grid-column-end: span ${this.size[breakpoint].x};
        -ms-grid-column-span: ${this.size[breakpoint].x};

        grid-row-start: ${this.position[breakpoint].y};
        -ms-grid-row: ${this.position[breakpoint].y};

        grid-row-end: span ${this.size[breakpoint].y};
        -ms-grid-row-span: ${this.size[breakpoint].y};

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
