import { Component, Input, OnInit } from '@angular/core';
import { EAlert } from '../../../enums/common/alert.enum';
import { IAlert } from '../../../interfaces/common/alert.interface';

/**
 * `component` for displaying success and error alerts.
 */
@Component({
    selector: 'demo-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.sass']
})
export class AlertsComponent implements OnInit {
    // actual alert object
    @Input() alert: IAlert;
    // all alert types
    TYPES = EAlert;

    constructor() {}

    // * Angular Lifecycle

    ngOnInit() {}
}
