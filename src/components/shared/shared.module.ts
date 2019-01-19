import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AlertsComponent } from './alerts/alerts.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

/**
 * `module` for all shared components across the application.
 */
@NgModule({
    declarations: [FooterComponent, AlertsComponent, HeaderComponent],
    imports: [CommonModule, TranslateModule, ReactiveFormsModule],
    exports: [TranslateModule, ReactiveFormsModule, FooterComponent, AlertsComponent, HeaderComponent]
})
export class SharedModule {}
