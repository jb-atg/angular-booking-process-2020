import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  AfterViewInit,
  Renderer2,
  HostListener
} from "@angular/core";

import { DragScrollComponent } from "ngx-drag-scroll";

@Component({
  selector: "app-departure-month",
  templateUrl: "./departure-month.component.html",
  styleUrls: ["./departure-month.component.scss"]
})
export class DepartureMonthComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input() month: any;
  @Output() isActive = new EventEmitter();

  @ViewChild("dragScroll", { static: false }) dragScroll: DragScrollComponent;
  @HostListener("window:mousewheel", ["$event"])
  onScroll(e) {
    const delta = Math.sign(e.deltaY);
    this.mouseWheel = true;
  }
  mouseWheel: boolean = false;
  hasReachedLeft: boolean = false;
  hasReachedRight: boolean = false;

  constructor(public renderer: Renderer2) {}

  ngOnInit() {}

  ngOnChanges() {}

  ngAfterViewInit() {}

  setActive(departureIndex) {
    this.isActive.emit({monthIndex:this.month.index, departureIndex:departureIndex});
  }

  reachLeft(event) {
    this.hasReachedLeft = event;
  }

  reachRight(event) {
    this.hasReachedRight = event;
  }
}
