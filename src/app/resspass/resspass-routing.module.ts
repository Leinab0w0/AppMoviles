import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResspassPage } from './resspass.page';

const routes: Routes = [
  {
    path: '',
    component: ResspassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResspassPageRoutingModule {}
