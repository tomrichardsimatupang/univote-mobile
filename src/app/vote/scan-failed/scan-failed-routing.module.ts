import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanFailedPage } from './scan-failed.page';

const routes: Routes = [
  {
    path: '',
    component: ScanFailedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanFailedPageRoutingModule {}
