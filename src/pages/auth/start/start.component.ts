import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { EAlert } from '../../../enums/common/alert.enum';
import { IAlert } from '../../../interfaces/common/alert.interface';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
    selector: 'demo-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.sass']
})
export class StartComponent implements OnInit {
    // available languages
    EN = 'en';
    ES = 'es';
    // handle account creation and sign-in
    showForm = false;
    isNewAccount = false;
    startForm: FormGroup;
    resultAlert: IAlert;
    // card settings
    cardTitle: 'START.CARD_HEADER' | 'START.CARD_TITLE_ENTER';
    formButtonLabel: 'BUTTONS.ENTER' | 'BUTTONS.SUBMIT';

    constructor(
        private translate: TranslateService,
        private fb: FormBuilder,
        private spinner: SpinnerVisibilityService,
        private authService: AuthService,
        private router: Router
    ) {}

    // * Angular Lifecycle

    /**
     * Initialize the `FormGroup` to create a new account.
     */
    ngOnInit() {
        this.startForm = this.fb.group({
            email: new FormControl('', Validators.compose([Validators.email, Validators.required])),
            password: new FormControl('', Validators.compose([Validators.required]))
        });
    }

    // * User Interaction

    /**
     * Change language for the selected.
     * @param lang available languages.
     */
    didSelectLanguage(lang: 'es' | 'en'): void {
        this.translate.use(lang);
    }

    /**
     * Add two more `FormControl` in order to create a new account.
     */
    didPressCreate(): void {
        // configure card and form for a new account
        this.showForm = true;
        this.isNewAccount = true;
        this.cardTitle = 'START.CARD_HEADER';
        this.formButtonLabel = 'BUTTONS.SUBMIT';

        this.startForm.addControl('firstName', new FormControl('', Validators.compose([Validators.required])));
        this.startForm.addControl('lastName', new FormControl('', Validators.compose([Validators.required])));
    }

    /**
     * Remove two `FormControl` in order to perform a sign-in.
     */
    didPressSignIn(): void {
        // configure card and form for sing in
        this.showForm = true;
        this.isNewAccount = false;
        this.cardTitle = 'START.CARD_TITLE_ENTER';
        this.formButtonLabel = 'BUTTONS.ENTER';

        this.startForm.removeControl('firstName');
        this.startForm.removeControl('lastName');
    }

    /**
     * According to the previously selected option, create a new account or sign in the user.
     */
    didPressFormButton(): void {
        this.resultAlert = undefined;
        this.spinner.show();

        if (this.isNewAccount) {
            this._createAccount();
        } else {
            this._signIn();
        }
    }

    // * Private Methods

    /**
     * Take the data from `startForm` and create a new `ICreateAccount`.
     */
    private _createAccount(): void {
        const newAccount: ICreateAccount = {
            firstname: this.startForm.controls['firstName'].value,
            lastname: this.startForm.controls['lastName'].value,
            email: this.startForm.controls['email'].value,
            password: this.startForm.controls['password'].value
        };

        this.authService.postCreate(newAccount).subscribe(
            (response: { success: string }) => {
                this.resultAlert = {
                    content: response.success,
                    type: EAlert.SUCCESS
                };
            },
            (e: any) => {
                this.resultAlert = {
                    content: e.error.message,
                    type: EAlert.ERROR
                };
            },
            () => this.spinner.hide()
        );
    }

    /**
     * Sign in the user with the received credentials.
     */
    private _signIn(): void {
        const access: { email: string; password: string } = {
            email: this.startForm.controls['email'].value,
            password: this.startForm.controls['password'].value
        };

        this.authService.postLogin(access).subscribe(
            () => {
                this.router.navigate(['/accounts']);
            },
            undefined,
            () => this.spinner.hide()
        );
    }
}
