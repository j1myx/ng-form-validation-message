import { Directive, Input, Optional, SkipSelf, Host, TemplateRef, ViewContainerRef, DoCheck } from '@angular/core';
import { FormControl, ControlContainer } from '@angular/forms';
import { NgFormValidationMessageService } from './ng-form-validation-message.service';

@Directive({
  selector: '[ngFormValidationMessages]'
})
export class NgFormValidationMessagesDirective implements DoCheck {

  @Input('ngFormValidationMessagesControlname')
  controlName: string;

  @Input('ngFormValidationMessagesControl')
  control: FormControl;

  @Input('ngFormValidationMessagesLabel')
  label: string;

  constructor(
    @Optional() @Host() @SkipSelf() private parent: ControlContainer,
    private formErrorService: NgFormValidationMessageService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
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

    this.viewContainer.clear();

    const messages: string[] = this.formErrorService.getErrorMessages();

    for (const message of messages) {
      this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: message });
    }

  }

}
