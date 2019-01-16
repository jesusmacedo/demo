import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EApi } from '../enums/api.enum';
import { EHeaders } from '../enums/auth/headers.enum';
import { environment } from '../environments/environment';
import { MSession } from '../models/auth/session.model';

// path to languages
const LANGS = 'assets/i18n/';
/**
 * Custom `HttpInterceptor` for handling every single `Http` request, in order to add request-specific
 * `HttpHeaders` and handle error codes.
 */
@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    constructor() {}

    // * HttpInterceptor Implementation

    /**
     * Intercept every `HttpRequest` in order to add custom headers.
     * @param request HttpRequest.
     * @param next HttpHandler.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headersType: EHeaders;

        if (
            request.url.includes(LANGS) ||
            request.url.startsWith(EApi.postCreate) ||
            request.url.startsWith(EApi.postLogin)
        ) {
            // * requests for json languages DO NOT require headers
            headersType = EHeaders.NONE;
        } else {
            headersType = EHeaders.AUTENTICATED;
        }

        const newRequest = this.setRequestHeaders(headersType, request);

        if (!environment.production) {
            console.warn('HttpRequest:/', newRequest);
        }

        return next.handle(newRequest).pipe(
            tap(
                (event: HttpEvent<any>) => {},
                (err: any) => {
                    return throwError(err);
                }
            )
        );
    }

    // * Private Methods

    /**
     * Set the headers for the current `HttpRequest`.
     * @param type `EHeaders`.
     * @param request current request.
     * @return updated request.
     */
    private setRequestHeaders(type: EHeaders, request: HttpRequest<any>): HttpRequest<any> {
        const headers: { [name: string]: string } = {};

        const langs = request.url;
        const newUrl = `${environment.baseUrl}${request.url}`;

        headers['Content-Type'] = 'application/json';

        if (type === EHeaders.AUTENTICATED) {
            headers['X-access-token:'] = MSession.getValueFromSession(MSession.ACCESS_TOKEN);
        }

        const newRequest = request.clone({
            setHeaders: headers,
            url: request.url.includes(LANGS) ? langs : newUrl
        });

        return newRequest;
    }
}
