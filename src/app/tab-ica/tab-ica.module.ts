import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabIcaPageRoutingModule } from './tab-ica-routing.module';

import { TabIcaPage } from './tab-ica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabIcaPageRoutingModule
  ],
  declarations: [TabIcaPage]
})
export class TabIcaPageModule {}
