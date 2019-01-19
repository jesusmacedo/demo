import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EApi } from '../../enums/api.enum';
import { ECardType } from '../../enums/common/card-type.enum';
import { ICard } from '../../interfaces/accounts/card.interface';
import { MSession } from '../../models/auth/session.model';

/**
 * `service` for all accounts-related endpoints.
 */
@Injectable()
export class AccountsService {
    constructor(private http: HttpClient) {}

    // * Public GET Endpoints

    /**
     * Get all available `IAccount`.
     */
    getAccounts(): Observable<IAccount[]> {
        return this.http.get(EApi.getAccounts).pipe(map((accounts: { response: IAccount[] }) => accounts.response));
    }

    /**
     * Get all available `ICard` to choose from.
     */
    getCardCatalog(): Observable<ICard[]> {
        return this.http
            .get(EApi.getCardCatalog)
            .pipe(map((catalog: { response: { type_cards: ICard[] } }) => catalog.response.type_cards));
    }

    // * Public POST Endpoints

    /**
     * Request the selected `ICard`.
     * @param card selected by user.
     */
    postAccounts(card: ICard): Observable<{ success: string }> {
        const payload: {
            userId: string;
            type: ECardType;
            name: string;
        } = {
            userId: MSession.getSessionData().id,
            type: card.type,
            name: card.name
        };

        return this.http.post(EApi.postAccount, payload).pipe(tap((res: { success: string }) => res));
    }
}
