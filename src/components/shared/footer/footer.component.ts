import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'demo-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {
    // app version
    version = { value: environment.version };

    constructor() {}

    // * Angular Lifecycle

    ngOnInit() {}
}
