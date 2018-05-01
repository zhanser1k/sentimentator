import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
    MatButtonModule,
    MatToolbarModule,
    MatInputModule
} from '@angular/material';

@NgModule({
  imports: [
      MatButtonModule,
      MatToolbarModule,
      MatInputModule
    ],
  exports: [
      MatButtonModule,
      MatToolbarModule,
      MatInputModule
    ],
})
export class MaterialModule { }