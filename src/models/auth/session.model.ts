import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * `model` for handling all session-related values.
 */
@Injectable()
export class MSession {
    // whole session object
    private static _session: ISession;
    // actual token received from postLogin response
    static ACCESS_TOKEN = 'X-access-token';

    // * Static Public Methods

    /**
     * Set the user session.
     * @param session from jwt token.
     */
    static setSessionData(session: any): void {
        this._session = {
            id: session.id,
            iat: session.lat,
            exp: session.exp,
            email: session.email,
            firstname: session.firstname,
            lastname: session.lastname
        };
    }

    /**
     * Get the whole session detail.
     */
    static getSessionData(): ISession {
        return this._session;
    }

    /**
     * Save in the `sessionStorage` the received value.
     * @param key name of value.
     * @param value actual value.
     */
    static setValueInSession(key: string, value: string): void {
        sessionStorage.setItem(key, value);
    }

    /**
     * Retrieve the received value from `sessionStorage`.
     * @param key name of value to retrieve.
     */
    static getValueFromSession(key: string): string {
        return sessionStorage.getItem(key);
    }

    /**
     * Clear all values from `sessionStorage` and local session.
     */
    static clearSession(): Observable<any> {
        const observable = new Observable<any>(observer => {
            sessionStorage.clear();
            this._session = undefined;

            observer.next();
            observer.complete();
        });

        return observable;
    }
}
