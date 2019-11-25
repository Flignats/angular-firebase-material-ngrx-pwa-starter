import { first, debounceTime } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

export class DisplayNameValidator {
    static displayName(afs: AngularFirestore) {
        return (control: AbstractControl) => {
            // return an observable here....
            const displayName = control.value.toLowerCase();
            const path = 'displayNames/' + displayName;

            return afs
                .doc(path)
                .valueChanges()
                .pipe(debounceTime(500), first())
                .toPromise();
        };
    }
}
