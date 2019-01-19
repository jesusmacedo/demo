import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadGuard } from '../guards/can-load/can-load.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/start',
        pathMatch: 'full'
    },
    {
        path: 'auth/start',
        loadChildren: '../pages/auth/auth.module#AuthModule'
    },
    {
        path: 'accounts',
        canActivateChild: [CanLoadGuard],
        loadChildren: '../pages/accounts/accounts.module#AccountsModule'
    },
    {
        path: '**',
        redirectTo: 'auth/start',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
