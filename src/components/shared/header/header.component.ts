import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MSession } from '../../../models/auth/session.model';

/**
 * `component` header for being shared in the whole app.
 */
@Component({
    selector: 'demo-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
    // available languages
    EN = 'en';
    ES = 'es';
    // handle menu options
    isThereASession: boolean;

    constructor(private translate: TranslateService) {}

    // * Angular Lifecycle

    /**
     * Validate if there is a valid session.
     */
    ngOnInit() {
        this.isThereASession = MSession.getSessionData() !== undefined ? true : false;
    }

    // * User Interaction

    /**
     * Change language for the selected.
     * @param lang available languages.
     */
    didSelectLanguage(lang: 'es' | 'en'): void {
        this.translate.use(lang);
    }
}
