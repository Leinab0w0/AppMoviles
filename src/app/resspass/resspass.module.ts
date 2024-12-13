import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ResspassPage } from './resspass.page';
import { ResspassPageRoutingModule } from './resspass-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResspassPageRoutingModule
  ],
  declarations: [ResspassPage]
})
export class ResspassPageModule {}