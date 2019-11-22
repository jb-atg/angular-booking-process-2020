import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Input
} from "@angular/core";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements OnInit {
  @Input('items') items;
  @Input() itemTemplate;
  @Input('itemWidth') itemWidth: number;
  @Input('itemMinHeight') itemMinHeight: number;
  currentIndex: number = 0;

  constructor() {}

  ngOnInit() {}

  scrolledIndexChange(index) {
   this.currentIndex = index;
  }

}
