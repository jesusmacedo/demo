import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
