import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EApi } from '../../enums/api.enum';

/**
 * `service` for handling all auth-related endpoints.
 */
@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    // * Public POST Endpoints

    /**
     * Create a new account.
     * @param account to create.
     */
    postCreate(account: ICreateAccount): Observable<{ success: string }> {
        return this.http.post(EApi.postCreate, account).pipe(tap((res: { success: string }) => res));
    }
}
