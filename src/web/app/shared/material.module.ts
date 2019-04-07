import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatBottomSheetModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatExpansionModule,
  MatGridListModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatStepperModule,
  MatTooltipModule,
  MatSidenavModule,
  MatSliderModule,
  MatButtonModule,
  MatSelectModule,
  MatDialogModule,
  MatOptionModule,
  MatChipsModule,
  MatBadgeModule,
  MatRadioModule,
  MatInputModule,
  MatTableModule,
  MatSortModule,
  MatCardModule,
  MatMenuModule,
  MatListModule,
  MatTabsModule,
  MatIconModule,
  MatTreeModule,
  MatButtonToggleModule,
} from '@angular/material';

const modules = [
  MatProgressSpinnerModule,
  MatBottomSheetModule,
  MatProgressBarModule,
  MatSlideToggleModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatGridListModule,
  MatSidenavModule,
  MatTooltipModule,
  MatToolbarModule,
  MatStepperModule,
  MatButtonModule,
  MatSliderModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule,
  MatChipsModule,
  MatBadgeModule,
  MatRadioModule,
  MatInputModule,
  DragDropModule,
  MatCardModule,
  MatListModule,
  MatSortModule,
  MatTabsModule,
  MatTreeModule,
  MatIconModule,
  MatMenuModule,
  OverlayModule,
  PortalModule,
  MatButtonToggleModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ... modules
  ],
  exports: modules
})
export class MaterialModule {
  /* static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialModule,
      providers: []
    };
  } */
}
