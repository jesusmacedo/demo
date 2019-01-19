import { Component, OnInit } from '@angular/core';
import { IAlert } from '../../../interfaces/common/alert.interface';

@Component({
    selector: 'demo-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
    resultAlert: IAlert;
    duh: string[] = ['1', '2', '3', '4'];
    constructor() {}

    ngOnInit() {}
}
