import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function endDateValidator(start: string, end: string) {
    return (group: FormGroup): { [key: string]: any } => {
        if (group.controls[start].value > group.controls[end].value) return { dates: "End date shouldn't be less than start date" };
        return {};
    }
}

export function dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!(control && control.value)) return null;
        return control.value > (new Date()) ? { invalidDate: 'You cannot use future dates' } : null;
    }
}