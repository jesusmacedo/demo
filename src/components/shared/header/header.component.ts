import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { timer } from 'rxjs';
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

    constructor(
        private translate: TranslateService,
        private spinner: SpinnerVisibilityService,
        private router: Router
    ) {}

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

    /**
     * Navigate to `RequestComponent`.
     */
    didPressRequestCard(): void {
        this.spinner.show();

        this.router.navigate(['/accounts/request']);
    }

    /**
     * Clear the current `ISession` and take the user back to the `StartComponent`.
     */
    didPressLogout(): void {
        this.spinner.show();

        const source = timer(1000);

        source.subscribe(() => {
            MSession.clearSession().subscribe(
                () => {
                    this.router.navigate(['/auth/start']);
                },
                undefined,
                () => this.spinner.hide()
            );
        });
    }
}
