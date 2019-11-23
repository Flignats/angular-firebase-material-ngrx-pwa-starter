const packageJson = require('../../package.json');

export const environment = {
    appName: 'cryptorts',
    envName: 'PROD',
    production: true,
    i18nPrefix: '',
    firebase: {
        apiKey: "AIzaSyDhN5YN--nAXr_4Q0FxoroRtc_AMFcigno",
        authDomain: "cryptorts-58f4b.firebaseapp.com",
        databaseURL: "https://cryptorts-58f4b.firebaseio.com",
        projectId: "cryptorts-58f4b",
        storageBucket: "cryptorts-58f4b.appspot.com",
        messagingSenderId: "647700175181",
        appId: "1:647700175181:web:05556c9bdff103c469ff04",
        measurementId: "G-D0NTVH4L8Y"
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
