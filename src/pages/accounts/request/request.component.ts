import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICard } from '../../../interfaces/accounts/card.interface';
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
    // handle observable subscriptions
    private _getCardCatalogSubscription: Subscription;
    private _postAccounts: Subscription;

    constructor(private accountsService: AccountsService) {}

    // * Angular Lifecycle

    /**
     * Get all available `ICard` to choose from.
     */
    ngOnInit() {
        this._getCardCatalogSubscription = this.accountsService.getCardCatalog().subscribe((cards: ICard[]) => {
            this.cardCatalog = cards;
        });
    }

    /**
     * Unsubscribe from `Observable`.
     */
    ngOnDestroy() {
        this._getCardCatalogSubscription.unsubscribe();
        this._postAccounts.unsubscribe();
    }

    // * User Interaction

    /**
     * Set the selected `ICard` by the received ID.
     * @param card from dropdown.
     */
    didSelectCard(card: number): void {
        this.selectedCard = this.cardCatalog[card];
    }

    /**
     * Send card request.
     */
    didPressSend(): void {
        this._postAccounts = this.accountsService.postAccounts(this.selectedCard).subscribe(() => {});
    }
}
