import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EApi } from '../../enums/api.enum';

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
}
