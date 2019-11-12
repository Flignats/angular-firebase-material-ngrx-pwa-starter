import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public navigation = [{ link: 'home', label: 'navigation.home' }];
    public navigationSideMenu = [...this.navigation];
}
