import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
    ]
})
export class EqualValidator implements Validator {
    constructor(
        @Attribute('validateEqual') public validateEqual: string,
        @Attribute('reverse')       public reverse: string) {
    }

    private get isReverse() {
        if (!this.reverse) return false;

        return this.reverse === 'true' ? true: false;
    }

    validate(c: AbstractControl): { [key: string]: any } {
        // self value
        const selfValue = c.value;

        // controlElement value
        const controlElement = c.root.get(this.validateEqual);

        // value not equal
        if (controlElement && selfValue !== controlElement.value && !this.isReverse) {
          return {
            validateEqual: false
          }
        }

        // value equal and reverse
        if (controlElement && selfValue === controlElement.value && this.isReverse) {
            delete controlElement.errors['validateEqual'];
            if (!Object.keys(controlElement.errors).length) {
              controlElement.setErrors(null);
            }
        }

        // value not equal and reverse
        if (controlElement && selfValue !== controlElement.value && this.isReverse) {
            controlElement.setErrors({
                validateEqual: false
            });
        }

        return null;
    }
}
