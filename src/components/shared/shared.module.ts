import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';

/**
 * `module` for all shared components across the application.
 */
@NgModule({
    declarations: [FooterComponent],
    imports: [CommonModule, TranslateModule],
    exports: [TranslateModule, FooterComponent]
})
export class SharedModule {}
