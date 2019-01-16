import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../components/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { StartComponent } from './start/start.component';

@NgModule({
    declarations: [StartComponent],
    imports: [CommonModule, AuthRoutingModule, SharedModule]
})
export class AuthModule {}
