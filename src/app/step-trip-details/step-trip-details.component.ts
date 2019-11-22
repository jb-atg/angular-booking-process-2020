import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-step-trip-details",
  templateUrl: "./step-trip-details.component.html",
  styleUrls: ["./step-trip-details.component.scss"]
})
export class StepTripDetailsComponent implements OnInit {
  addOn: boolean = false;
  bedding: string = 'Twin'
  constructor() {}

  ngOnInit() {}

  hasAddOn(event) {
    this.addOn = event;
  }
}
