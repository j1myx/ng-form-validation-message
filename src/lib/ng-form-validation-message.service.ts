import { Injectable, Inject } from '@angular/core';
import { FormControl, ControlContainer, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ERROR_MESSAGES, DEFAULT_LABEL } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class NgFormValidationMessageService {

  controlName: string;

  control: FormControl;

  parent: ControlContainer;

  hasImplementationErrors = false;

  label: string;

  constructor(
    @Inject(ERROR_MESSAGES) private messages,
    @Inject(DEFAULT_LABEL) private defaultLabel: string
  ) { }

  get currentControl(): AbstractControl {

    if (this.control instanceof FormControl) {
      return this.control;
    }

    if (this.parent.control.get(this.controlName) instanceof FormControl) {
      return this.parent.control.get(this.controlName);
    }

  }

  private get doNotShowMessage(): boolean {
    const currentControl: AbstractControl = this.currentControl;

    return !this.hasImplementationErrors && currentControl.touched && currentControl.errors !== null;
  }

  implementationError(): void {

    if (this.hasImplementationErrors) {
      return;
    }

    if (this.control === undefined && this.controlName === undefined) {
      this.hasImplementationErrors = true;
      throw new Error('control or controlName must be defined.');
    }

    if (this.control !== undefined && this.controlName !== undefined) {
      console.warn('If a control and a controlName have been specified, the control over the controlName will be taken into account.');
    }

    if (this.controlName === undefined && this.control !== undefined && !(this.control instanceof FormControl)) {
      this.hasImplementationErrors = true;
      throw new Error('The control defined is not of the FormControl type.');
    }

    if (this.control === undefined && this.controlName !== undefined) {

      if (typeof this.controlName !== 'string') {
        this.hasImplementationErrors = true;
        throw new Error('controlname must be of type string.');
      }

      if (!(this.parent.control.get(this.controlName) instanceof FormControl)) {
        this.hasImplementationErrors = true;
        throw new Error('No formControl was found with the name specified in the controlName.');
      }

    }

    this.hasImplementationErrors = false;

  }

  getErrorMessage(): string {

    if (!this.doNotShowMessage) {
      return '';
    }

    const errors: ValidationErrors | ValidatorFn = this.currentControl.errors;

    return this.buildMessage({
      name: Object.keys(errors)[0],
      value: Object.values(errors)[0]
    });
  }

  getErrorMessages(): string[] {
    if (!this.doNotShowMessage) {
      return [];
    }

    const errors: ValidationErrors | ValidatorFn = this.currentControl.errors;

    const messages: string[] = [];

    for (const err of Object.keys(errors)) {

      messages.push(
        this.buildMessage({
          name: err,
          value: errors[err]
        })
      );

    }

    return messages;
  }

  private buildMessage(err: Error): string {
    let message = '';

    const errorMessage = this.messages[err.name];

    if (errorMessage !== undefined) {
      message = errorMessage.message.replace(/{label}/g, this.label || this.defaultLabel);

      if (errorMessage.rExp !== undefined) {

        const errorValues: string[] = errorMessage.rExp.split('|');

        for (const errorValue of errorValues) {

          message = message.replace(new RegExp(`{${errorValue}}`, 'g'), err.value[errorValue]);

        }

      }

    } else {
      message = typeof err === 'string' ? err : JSON.stringify(err);
    }

    return message;
  }

}

interface Error {
  name: string;
  value: any;
}
