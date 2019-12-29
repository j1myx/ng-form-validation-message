import { Directive, ElementRef, Host, Input, Optional, SkipSelf, DoCheck } from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';
import { NgFormValidationMessageService } from './ng-form-validation-message.service';

@Directive({
  selector: '[ngFormValidationMessage]'
})
export class NgFormValidationMessageDirective implements DoCheck {

  @Input()
  controlName: string;

  @Input()
  control: FormControl;

  @Input()
  label: string;

  constructor(
    @Optional() @Host() @SkipSelf() private parent: ControlContainer,
    private formErrorService: NgFormValidationMessageService,
    private el: ElementRef
  ) {
    this.formErrorService.parent = this.parent;
  }

  ngDoCheck() {
    this.executeLogic();
  }

  private executeLogic(): void {

    this.formErrorService.control = this.control;
    this.formErrorService.controlName = this.controlName;
    this.formErrorService.label = this.label;
    this.formErrorService.implementationError();

    this.el.nativeElement.innerText = this.formErrorService.getErrorMessage();

  }

}
