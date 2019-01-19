import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Initial `component`. It defines the default language from all available.
 */
@Component({
    selector: 'demo-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    constructor(translate: TranslateService) {
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }
}
