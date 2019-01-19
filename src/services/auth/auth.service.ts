import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EApi } from '../../enums/api.enum';
import { MSession } from '../../models/auth/session.model';

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

    /**
     * Sign in the user and load its accounts.
     * @param access retrieved from user.
     */
    postLogin(access: { email: string; password: string }): Observable<any> {
        return this.http.post(EApi.postLogin, access).pipe(
            tap((res: { token: string }) => {
                MSession.setValueInSession(MSession.ACCESS_TOKEN, res.token);
                MSession.setSessionData(jwtDecode(res.token));
            })
        );
    }
}
