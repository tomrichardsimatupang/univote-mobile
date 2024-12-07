import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then(m => m.Tab3PageModule)
      },
      {
        path: 'profiling',
        loadChildren: () => import('./profiling/profiling.module').then( m => m.ProfilingPageModule)
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then( m => m.ReportPageModule)
      },
      {
        path: 'report-detail',
        loadChildren: () => import('./report-detail/report-detail.module').then( m => m.ReportDetailPageModule)
      },
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/app/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
