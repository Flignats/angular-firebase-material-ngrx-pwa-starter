import { Component, OnInit, Input } from '@angular/core';
import { IUserResources } from './../../../modules/user/user.model';

@Component({
    selector: 'app-user-resources',
    templateUrl: './user-resources.component.html',
    styleUrls: ['./user-resources.component.scss']
})
export class UserResourcesComponent implements OnInit {
    @Input() userResources: IUserResources;

    constructor() {}

    ngOnInit() {}
}