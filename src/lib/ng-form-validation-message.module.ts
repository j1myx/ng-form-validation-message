import { NgModule } from '@angular/core';
import { errorMessages } from './error-messages';
import { NgFormValidationMessageComponent } from './ng-form-validation-message/ng-form-validation-message.component';
import { NgFormValidationMessageDirective } from './ng-form-validation-message.directive';
import { NgFormValidationMessageService } from './ng-form-validation-message.service';
import { ERROR_MESSAGES, DEFAULT_LABEL } from './tokens';
import { NgFormValidationMessagesDirective } from './ng-form-validation-messages.directive';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NgFormValidationMessageComponent,
    NgFormValidationMessageDirective,
    NgFormValidationMessagesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgFormValidationMessageComponent,
    NgFormValidationMessageDirective,
    NgFormValidationMessagesDirective
  ],
  providers: [
    NgFormValidationMessageService,
    {
      provide: ERROR_MESSAGES,
      useValue: errorMessages
    },
    {
      provide: DEFAULT_LABEL,
      useValue: 'Field'
    }
  ]
})
export class NgFormValidationMessageModule { }
