import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilingPage } from './profiling.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilingPageRoutingModule {}
