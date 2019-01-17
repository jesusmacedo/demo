import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    showCreateForm = false;
    shotSignInForm = false;
    startForm: FormGroup;
    resultAlert: IAlert;

    constructor(
        private translate: TranslateService,
        private fb: FormBuilder,
        private spinner: SpinnerVisibilityService,
        private authService: AuthService
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
        this.showCreateForm = true;

        this.startForm.addControl('firstName', new FormControl('', Validators.compose([Validators.required])));
        this.startForm.addControl('lastName', new FormControl('', Validators.compose([Validators.required])));
    }

    /**
     * Remove two `FormControl` in order to perform a sign-in.
     */
    didPressSignIn(): void {
        this.shotSignInForm = true;

        this.startForm.removeControl('firstName');
        this.startForm.removeControl('lastName');
    }

    /**
     * Take the data from `startForm` and create a new `ICreateAccount`.
     */
    didPressSubmit(): void {
        this.resultAlert = undefined;
        this.spinner.show();

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
}
