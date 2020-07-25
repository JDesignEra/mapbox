import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabIcaPage } from './tab-ica.page';

const routes: Routes = [
  {
    path: '',
    component: TabIcaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabIcaPageRoutingModule {}
