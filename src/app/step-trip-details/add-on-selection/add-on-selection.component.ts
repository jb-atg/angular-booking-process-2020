import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-on-selection',
  templateUrl: './add-on-selection.component.html',
  styleUrls: ['./add-on-selection.component.scss']
})
export class AddOnSelectionComponent implements OnInit {
  promotions = [
    { value: 1, label: "Bonus Deal 1*", active: true},
    { value: 2, label: "Bonus Deal 2*", active: false },
  ];

  constructor() {}

  ngOnInit() {}

  activatePromo(i) {
   let toggle = this.promotions[i].active ? false : true ;
    this.promotions.forEach(promo => (promo.active = false));
    if (this.promotions[i]) {
      this.promotions[i].active = toggle;
    }
  }
}