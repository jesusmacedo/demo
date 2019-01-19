import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription } from 'rxjs';
import { EAlert } from '../../../enums/common/alert.enum';
import { IAlert } from '../../../interfaces/common/alert.interface';
import { AccountsService } from '../../../services/accounts/accounts.service';

@Component({
    selector: 'demo-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {
    // handle messages
    resultAlert: IAlert;
    // available accounts
    accounts: IAccount[] = [];
    // subscriptions
    private _accountsSubscription: Subscription;

    constructor(
        private accountsService: AccountsService,
        private spinner: SpinnerVisibilityService,
        private translate: TranslateService,
        private router: Router
    ) {}

    // * Angular Lifecycle

    /**
     * Get all available `IAccount` from service.
     */
    ngOnInit() {
        this._accountsSubscription = this.accountsService.getAccounts().subscribe((accounts: IAccount[]) => {
            if (accounts.length === 0) {
                this.resultAlert = {
                    content: this.translate.instant('ACCOUNTS.MESSAGE_NO_ACCOUNTS'),
                    type: EAlert.INFO
                };
            } else {
                this.accounts = accounts;
            }

            this.spinner.hide();
        });
    }

    /**
     * Unsubscribe from `Observables`.
     */
    ngOnDestroy() {
        this._accountsSubscription.unsubscribe();
    }

    // * User Interaction

    /**
     * Navigate to `RequestComponent`.
     */
    didPressRequestCard(): void {
        this.spinner.show();

        this.router.navigate(['/accounts/request']);
    }
}
