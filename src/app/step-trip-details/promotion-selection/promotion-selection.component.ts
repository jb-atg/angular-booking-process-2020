import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-promotion-selection",
  templateUrl: "./promotion-selection.component.html",
  styleUrls: ["./promotion-selection.component.scss"]
})
export class PromotionSelectionComponent implements OnInit {
  @Output() hasAddOn = new EventEmitter();
  promotions = [
    { value: 1, label: "Fly Free*", active: true },
    { value: 2, label: "Fly From $495pp*", active: false },
    { value: 3, label: "Companion Fly Free*", active: false },
    { value: 4, label: "Fly Business Class From $3,995pp*", active: false },
    { value: 5, label: "50% Off Solo Supplement*", active: false }
  ];

  constructor() {}

  ngOnInit() {}

  activatePromo(i) {
    let toggle = this.promotions[i].active ? false : true;
    this.promotions.forEach(promo => (promo.active = false));
    if (this.promotions[i]) {
      this.promotions[i].active = toggle;
    }

    if (this.promotions[2].active) {
      this.hasAddOn.emit(true);
    } else {
      this.hasAddOn.emit(false);
    }
  }
}
