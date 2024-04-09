import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@guards/auth.guard';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import('./auth/sign-in/sign-in.module').then( m => m.SignInModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./auth/sign-up/sign-up.module').then( m => m.SignUpModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then( m => m.ForgotPasswordModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'app',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
      },
      {
        path: 'vote/scan',
        loadChildren: () => import('./vote/scan/scan.module').then( m => m.ScanPageModule)
      },
      {
        path: 'vote/scan-failed',
        loadChildren: () => import('./vote/scan-failed/scan-failed.module').then( m => m.ScanFailedPageModule)
      },
      {
        path: 'vote/dashboard',
        loadChildren: () => import('./vote/dashboard/dashboard.module').then( m => m.DashboardPageModule)
      },
      {
        path: 'vote/candidate-list',
        loadChildren: () => import('./vote/candidate-list/candidate-list.module').then( m => m.CandidateListPageModule)
      },
      {
        path: 'vote/candidate-detail',
        loadChildren: () => import('./vote/candidate-detail/candidate-detail.module').then( m => m.CandidateDetailPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
