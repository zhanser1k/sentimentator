import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatCardModule,
    MatSelectModule,
} from '@angular/material';

@NgModule({
  imports: [
      MatButtonModule,
      MatToolbarModule,
      MatInputModule,
      MatProgressSpinnerModule,
      MatSliderModule,
      MatCardModule,
      MatSelectModule,
    ],
  exports: [
      MatButtonModule,
      MatToolbarModule,
      MatInputModule,
      MatProgressSpinnerModule,
      MatSliderModule,
      MatCardModule,
      MatSelectModule,
    ],
})
export class MaterialModule { }