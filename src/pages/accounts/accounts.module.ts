import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../components/shared/shared.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [DashboardComponent],
    imports: [CommonModule, AccountsRoutingModule, SharedModule]
})
export class AccountsModule {}
