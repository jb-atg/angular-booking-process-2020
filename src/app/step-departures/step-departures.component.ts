import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { MatMenu } from "@angular/material/menu";

import { CabinDialogComponent } from "./cabin-dialog/cabin-dialog.component";


import { AssignBeddingDialogComponent } from "./assign-bedding-dialog/assign-bedding-dialog.component";

@Component({
  selector: "app-step-departures",
  templateUrl: "./step-departures.component.html",
  styleUrls: ["./step-departures.component.scss"]
})
export class StepDeparturesComponent implements OnInit {
  @Output() isActive = new EventEmitter();
  @ViewChild("beddingMenu", { static: false }) beddingMenu: MatMenu;

  departureSelected: boolean = false;
  months = [
    {
      index: 0,
      label: "Jan",
      numberOfDepartures: 2,
      departures: [],
      isInRange: false,
      active: false
    },
    {
      index: 1,
      label: "Feb",
      numberOfDepartures: 1,
      departures: [],
      isInRange: false,
      active: false
    },
    {
      index: 2,
      label: "Mar",
      numberOfDepartures: 8,
      departures: [],
      isInRange: false,
      active: false
    },
    {
      index: 3,
      label: "Apr",
      numberOfDepartures: 1,
      departures: [],
      isInRange: false,
      active: false
    },
    {
      index: 4,
      label: "May",
      numberOfDepartures: 10,
      departures: [],
      isInRange: false,
      active: false
    },
    {
      index: 5,
      label: "Jun",
      numberOfDepartures: 2,
      departures: [],
      isInRange: false,
      active: false
    },
    {
      index: 6,
      label: "Jul",
      numberOfDepartures: 1,
      departures: [],
      isInRange: false,
      active: false
    }
  ];

  promotions = [
    { value: 1, label: "Fly Free*", active: false },
    { value: 2, label: "Fly From $495pp*", active: false },
    { value: 3, label: "Companion Fly Free*", active: false },
    { value: 4, label: "Fly Business Class From $3,995pp*", active: false },
    { value: 5, label: "50% Off Solo Supplement*", active: false }
  ];

  bedding = [
    { value: 1, label: "Twin", quantity: 0, paxQuantity: 2 },
    { value: 2, label: "Double", quantity: 1, paxQuantity: 2 },
    { value: 3, label: "Single", quantity: 0, paxQuantity: 1 }
  ];

  cabins = [
    { value: 1, label: "B+" },
    { value: 2, label: "C" },
    { value: 3, label: "CC" },
    { value: 4, label: "D" },
    { value: 5, label: "DD" },
    { value: 6, label: "E" },
    { value: 7, label: "EE" },
    { value: 8, label: "T" }
  ];

  sort = [{ value: 1, label: "Date" }, { value: 2, label: "Price" }];

  filters = {
    dateRange: undefined,
    promotions: { options: this.promotions, selectedOptions: undefined },
    travellers: { selectedOption: 2 },
    bedding: {
      options: this.bedding,
      beddingDisplayValue: "1 " + "Double " + "Room",
      totalPaxQuantity: 2
    },
    cabins: { options: this.cabins, selectedOptions: undefined },
    sort: { options: this.sort, selectedOption: undefined }
  };

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.generateDepartures();
  }

  openCabinDialog(): void {
    let name = "abc";
    const dialogRef = this.dialog.open(CabinDialogComponent, {
      width: window.innerWidth < 767 ? window.innerWidth - 32 + 'px': window.innerWidth/1.5 + 'px',
      height: window.innerHeight - 64 + 'px',
      data: { name: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      name = result;
    });
  }

  logFilters() {
    console.log(this.filters);
  }

  generateDepartures() {
    this.months.forEach(month => {
      let numberOfDepartures = month.numberOfDepartures;
      let i;
      for (i = 0; i < numberOfDepartures; i++) {
        let departure = {
          index: undefined,
          year: 2020,
          month: month.index,
          begin: undefined,
          end: undefined,
          isInRange: true,
          promotions: [],
          travellers: [],
          bedding: [],
          cabins: [],
          price: undefined,
          active: false,
          limited: false,
          filters: this.filters
        };
        this.generateDates(departure);
        month.departures.push(departure);

        if (month.departures.length == numberOfDepartures) {
          month.departures = month.departures.sort(
            this.sortDeparturesByDate("begin")
          );
          this.months.forEach(month => {
            month.departures.forEach((departure, index) => {
              departure.index = index;
            });
          });
        }
      }
    });
  }

  generateDates(departure) {
    let month = departure.month;
    let begin = this.randomDayGenerator(1, 28);
    let end = begin + 15;
    if (end > 28) {
      end = end - 28;
      departure.begin = new Date(2020, month, begin, 0, 0, 0, 0);
      departure.end = new Date(2020, month + 1, end, 0, 0, 0, 0);
      departure.endsNextMonth = true;
    } else {
      departure.begin = new Date(2020, month, begin, 0, 0, 0, 0);
      departure.end = new Date(2020, month, end, 0, 0, 0, 0);
    }
  }

  randomDayGenerator(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  sortDeparturesByDate(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function(a, b) {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

  setActive(active) {
    let monthIndex = active.monthIndex;
    let departureIndex = active.departureIndex;

    this.months.forEach(month => {
      month.active = false;
      month.departures.forEach(departure => {
        departure.active = false;
      });
    });

    if (this.months[monthIndex].departures[departureIndex]) {
      this.months[monthIndex].departures[departureIndex].active = true;
      this.departureSelected = true;
    } else {
      this.departureSelected = false;
    }

    this.isActive.emit(this.departureSelected);
  }
  incrementRoomQuanity(i) {
    let quantity = this.filters.bedding.options[i].quantity;
    if (quantity < 10) {
      this.filters.bedding.options[i].quantity = quantity + 1;
      this.updateBeddingDisplayValue();
    }
  }

  decrementRoomQuanity(i) {
    let quantity = this.filters.bedding.options[i].quantity;
    if (quantity > 0) {
      this.filters.bedding.options[i].quantity = quantity - 1;
      this.updateBeddingDisplayValue();
    }
  }

  menuWidth: number = 0;
  menuOpened(field) {
    this.menuWidth = field.firstElementChild.clientWidth - 64;
  }

  menuItemClick(event, index, action) {
    event.stopPropagation();
    if (action == "increment") {
      this.incrementRoomQuanity(index);
    } else if (action == "decrement") {
      this.decrementRoomQuanity(index);
    }
  }

  updateBeddingDisplayValue() {
    let displayValue: string = "";
    let totalPaxQuantity: number = 0;
    let roomLabel: string = this.filters.bedding.options.some(option => {
      return option.quantity > 1;
    })
      ? " rooms."
      : " room.";
    let beddingOptions = this.filters.bedding.options.filter(beddingOption => {
      if (beddingOption.quantity > 0) {
        return beddingOption;
      }
    });
    beddingOptions.forEach((beddingOption, index) => {
      displayValue =
        displayValue +
        beddingOption.quantity +
        " " +
        beddingOption.label +
        (index == beddingOptions.length - 1
          ? roomLabel
          : index == beddingOptions.length - 2
          ? " & "
          : ", ");

      totalPaxQuantity =
        totalPaxQuantity + beddingOption.quantity * beddingOption.paxQuantity;
    });
    this.filters.bedding.beddingDisplayValue = displayValue;
    this.filters.bedding.totalPaxQuantity = totalPaxQuantity;
  }
}
