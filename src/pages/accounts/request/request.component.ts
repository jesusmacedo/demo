import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { Subscription } from 'rxjs';
import { EAlert } from '../../../enums/common/alert.enum';
import { ICard } from '../../../interfaces/accounts/card.interface';
import { IAlert } from '../../../interfaces/common/alert.interface';
import { AccountsService } from '../../../services/accounts/accounts.service';

@Component({
    selector: 'demo-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.sass']
})
export class RequestComponent implements OnInit, OnDestroy {
    // handle card selection
    cardCatalog: ICard[] = [];
    selectedCard: ICard;
    // handle label
    dropdownLabel: string;
    // handle messages
    resultAlert: IAlert;
    // handle observable subscriptions
    private _getCardCatalogSubscription: Subscription;
    private _postAccounts: Subscription;

    constructor(
        private accountsService: AccountsService,
        private spinner: SpinnerVisibilityService,
        private translate: TranslateService
    ) {}

    // * Angular Lifecycle

    /**
     * Get all available `ICard` to choose from.
     */
    ngOnInit() {
        this._setDropdownLabel();

        this._getCardCatalogSubscription = this.accountsService.getCardCatalog().subscribe((cards: ICard[]) => {
            this.cardCatalog = cards;

            this.spinner.hide();
        });
    }

    /**
     * Unsubscribe from `Observable`.
     */
    ngOnDestroy() {
        this._getCardCatalogSubscription.unsubscribe();

        if (this._postAccounts !== undefined) {
            this._postAccounts.unsubscribe();
        }
    }

    // * User Interaction

    /**
     * Set the selected `ICard` by the received ID.
     * @param card from dropdown.
     */
    didSelectCard(card: number): void {
        this.selectedCard = this.cardCatalog[card];
        this.dropdownLabel = this.selectedCard.name;
    }

    /**
     * Send card request.
     */
    didPressSend(): void {
        this.spinner.show();
        this.resultAlert = undefined;

        this._postAccounts = this.accountsService.postAccounts(this.selectedCard).subscribe(
            (response: { success: string }) => {
                this.resultAlert = {
                    content: response.success,
                    type: EAlert.SUCCESS
                };
            },
            undefined,
            () => {
                this.selectedCard = undefined;
                this._setDropdownLabel();
                this.spinner.hide();
            }
        );
    }

    // * Private Methods

    /**
     * Set the dropdown label by default.
     */
    private _setDropdownLabel(): void {
        this.dropdownLabel = this.translate.instant('REQUEST.DROP_CARD');
    }
}
