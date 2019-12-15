
import "../polyfills";
import { DragScrollModule } from 'ngx-drag-scroll';
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {ScrollingModule} from '@angular/cdk/scrolling';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { NgMarqueeModule } from 'ng-marquee';
import { AppComponent } from "./app.component";
import { StepDeparturesComponent } from "./step-departures/step-departures.component";
import { PromoBadgeComponent } from './promo-badge/promo-badge.component';
import { CountdownModule } from 'ngx-countdown';
import { DepartureMonthComponent } from './step-departures/departure-month/departure-month.component';
import { DepartureSlotComponent } from './step-departures/departure-slot/departure-slot.component';
import { StepTripDetailsComponent } from './step-trip-details/step-trip-details.component';
import { PromotionSelectionComponent } from './step-trip-details/promotion-selection/promotion-selection.component';
import { CabinSelectionComponent } from './step-trip-details/cabin-selection/cabin-selection.component';
import { AddOnSelectionComponent } from './step-trip-details/add-on-selection/add-on-selection.component';
import { StepPassengerDetailsComponent } from './step-passenger-details/step-passenger-details.component';
import { PassengerDetailsFormComponent } from './step-passenger-details/passenger-details-form/passenger-details-form.component';
import { CabinDialogComponent } from './step-departures/cabin-dialog/cabin-dialog.component';
import { AssignBeddingDialogComponent } from './step-departures/assign-bedding-dialog/assign-bedding-dialog.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { GridComponent } from './shared/grid/grid.component';
import { StyleComponent } from './shared/style/style.component';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CdkTableModule,
    CdkTreeModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    CountdownModule,
    DragScrollModule,
    SatDatepickerModule,
    SatNativeDateModule,
    NgMarqueeModule,
    ScrollingModule
  ],
  entryComponents: [AppComponent,CabinDialogComponent, AssignBeddingDialogComponent ],
  declarations: [AppComponent, StepDeparturesComponent, PromoBadgeComponent, DepartureMonthComponent, DepartureSlotComponent, StepTripDetailsComponent, PromotionSelectionComponent, CabinSelectionComponent, AddOnSelectionComponent, StepPassengerDetailsComponent, PassengerDetailsFormComponent, CabinDialogComponent, AssignBeddingDialogComponent, CarouselComponent, GridComponent, StyleComponent],
  bootstrap: [AppComponent],
  providers: []
  
})
export class AppModule {}
