import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../components/shared/shared.module';
import { AccountsService } from '../../services/accounts/accounts.service';
import { AccountsRoutingModule } from './accounts-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestComponent } from './request/request.component';

@NgModule({
    declarations: [DashboardComponent, RequestComponent],
    imports: [CommonModule, AccountsRoutingModule, SharedModule],
    providers: [AccountsService]
})
export class AccountsModule {}
