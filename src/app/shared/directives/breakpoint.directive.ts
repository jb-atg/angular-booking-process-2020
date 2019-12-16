import { Directive, Renderer2, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Directive({
  selector: '[breakpoints]'
})
export class BreakpointDirective {

  breakpoints: Array<string>;

  constructor(private breakpointObserver: BreakpointObserver, private renderer: Renderer2, private element: ElementRef) {

  }

  ngOnInit() {
    this.breakpoints = Object.keys(Breakpoints);

    this.breakpoints.forEach(breakpoint => {
      this.breakpointObserver.observe([
        Breakpoints[`${breakpoint}`]
      ]).subscribe(result => {
        if (result.matches) {
          this.renderer.addClass(this.element, breakpoint);
        } else {
          this.renderer.removeClass(this.element, breakpoint);
        }
      });

    });
  }

}
