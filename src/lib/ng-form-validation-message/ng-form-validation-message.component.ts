import { Component, Input, Optional, Host, SkipSelf, DoCheck } from '@angular/core';
import { FormControl, ControlContainer } from '@angular/forms';
import { NgFormValidationMessageService } from '../ng-form-validation-message.service';

@Component({
  selector: 'ng-form-validation-message',
  templateUrl: './ng-form-validation-message.component.html',
  styleUrls: ['./ng-form-validation-message.component.css']
})
export class NgFormValidationMessageComponent implements DoCheck {

  @Input()
  controlName: string;

  @Input()
  control: FormControl;

  @Input()
  label: string;

  @Input()
  first = true;

  errorMessages: string[] = [];

  constructor(
    @Optional() @Host() @SkipSelf() private parent: ControlContainer,
    private formErrorService: NgFormValidationMessageService,
  ) {
    this.formErrorService.parent = this.parent;
  }

  ngDoCheck(): void {
    this.executeLogic();
  }

  private executeLogic(): void {

    this.formErrorService.control = this.control;
    this.formErrorService.controlName = this.controlName;
    this.formErrorService.label = this.label;
    this.formErrorService.implementationError();

    if (this.first) {
      this.errorMessages = [
        this.formErrorService.getErrorMessage()
      ];
    } else {
      this.errorMessages = this.formErrorService.getErrorMessages();
    }

  }

}
