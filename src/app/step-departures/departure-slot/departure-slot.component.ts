import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  Output,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-departure-slot",
  templateUrl: "./departure-slot.component.html",
  styleUrls: ["./departure-slot.component.scss"]
})
export class DepartureSlotComponent implements OnInit, OnChanges {
  @Input() departure;
  @Output() isActive = new EventEmitter();
  constructor() {}

  ngOnInit() {
    this.generatePromos();
    this.generateCabins();
    this.generateBedding();
    this.generatePrice();
  }

  ngOnChanges() {}

  generatePromos() {
    this.selectRandomOptions("promotions");
  }
  generateCabins() {
    this.selectRandomOptions("cabins");
  }
  generateBedding() {
    this.selectRandomOptions("bedding");
  }
  generatePrice() {
    this.departure.price = Math.floor(
      Math.random() * (44000 - 10000 + 1) + 10000
    );
  }

  selectRandomOptions(type) {
    let filterOptions = this.departure.filters[type].options;
    if (filterOptions) {
      let min = 0;
      let max = filterOptions.length - 1;
      let start = Math.floor(Math.random() * (max - min + 1) + min);
      let end = Math.floor(Math.random() * (max - start + 1) + start);
      const randomOptions = Array.from(filterOptions).slice(start, end);
      this.departure[type] = randomOptions;
    }
  }

  activate() {
    this.isActive.emit(this.departure.index);
  }

  deactivate() {
    setTimeout(() => {
      this.isActive.emit(-1);
    }, 100);
  }

  inRange(startDate, endDate) {
    let filterStartDate = 0;
    let filterEndDate = 0;
   return startDate >= filterStartDate && endDate <= filterEndDate;
    // Illustration:
    //
    // filterStartDate                      filterEndDate
    // v                                        v
    // #----------------------------------------#
    //
    //         #----------------------#
    //         ^                      ^
    //         startDate              endDate

  }

}
