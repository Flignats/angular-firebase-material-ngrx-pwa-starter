// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const packageJson = require('../../package.json');

export const environment = {
    appName: 'angular-firebase-material-ngrx-pwa-starter',
    envName: 'DEV',
    production: false,
    i18nPrefix: '',
    firebase: {
        apiKey: 'xxxxxxxxxxxxx',                                   // Insert your API  key here
        authDomain: 'xxxxx.firebaseapp.com',                       // Update to your domain
        databaseURL: 'https://xxxxx.firebaseio.com',               // Update your db url
        projectId: 'xxxxx',                                        // Update to your project id
        storageBucket: 'xxxxx.appspot.com',                        // Update to your app storeage bucket
        messagingSenderId: 'xxxxxxxxxxxx',                         // Update to your app's messagingId
        appId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',        // Update to your app's id
        measurementId: 'xxxxxxxxxxx'                               // Update to your app's measurementId
    },
    versions: {
        app: packageJson.version,
        angular: packageJson.dependencies['@angular/core'],
        firebase: packageJson.dependencies['"@angular/fire'],
        material: packageJson.dependencies['@angular/material'],
        ngrx: packageJson.dependencies['@ngrx/store'],
        pwa: packageJson.dependencies['@angular/pwa'],
        serviceWorker: packageJson.dependencies['@angular/service-worker'],
        rxjs: packageJson.dependencies.rxjs,
        ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
        angularCli: packageJson.devDependencies['@angular/cli'],
        typescript: packageJson.devDependencies.typescript,
        compodoc: packageJson.devDependencies.compodoc,
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
