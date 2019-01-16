import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * `model` for handling all session-related values.
 */
@Injectable()
export class MSession {
    // actual token received from postLogin response
    static ACCESS_TOKEN = 'X-access-token';

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
     * Clear all values from `sessionStorage`.
     */
    static clearSession(): Observable<any> {
        const observable = new Observable<any>(observer => {
            sessionStorage.clear();

            observer.next();
            observer.complete();
        });

        return observable;
    }
}
