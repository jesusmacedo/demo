import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MSession } from '../../models/auth/session.model';

/**
 * `guard` for allowing/restricting access to child components.
 */
@Injectable({
    providedIn: 'root'
})
export class CanLoadGuard implements CanActivateChild {
    constructor(private router: Router) {}

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const can = MSession.getSessionData() !== undefined;

        if (!can) {
            MSession.clearSession().subscribe(() => {
                this.router.navigate(['/auth/start']);
            });
        }

        return can;
    }
}
