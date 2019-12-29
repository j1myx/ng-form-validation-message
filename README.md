# Form Error Messages

This package simplifies the way to display validation error messages on forms.

```
npm install ng-form-validation-message --save
```

## Features

You can work with directives or components, display the first or all messages at the same time or/and customize error messages globally.

## Usage

1. Import the ```NgFormValidationMessageModule``` interface in order to use the directives and/or components:

```typescript
import { NgModule } from '@angular/core';
import { NgFormValidationMessageModule } from 'ng-form-validation-message';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    ReactiveFormsModule,
    NgFormValidationMessageModule
  ],
})
export class AppModule { }
```

2. Define your formControl in your component:

```typescript
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  myControl: FormControl = new FormControl(
    '',
    [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(10)]
  );

}
```

3. Use the component ```ng-form-validation-message```, which you can use to display the first or all error messages by means of the ```[first]``` entry (true default), you can also send a ```[label]``` to interact with error messages:

```html
<input [formControl]="myControl">
<ng-form-validation-message [control]="myControl" [first]="false" label="Username"></ng-form-validation-message>

<!--
  output with first:
  
  Username cannot be empty.

  or:

  Username is not a valid email address.
-->

<!--
  output without first:

  Username cannot be empty.
  Username is not a valid email address.
  Username must not be less than 5.
-->
```

or use directives to show one ```ngFormValidationMessage``` or all ```*ngFormValidationMessages```

```html
<input [formControl]="myControl">
<p ngFormValidationMessage [control]="myControl" label="Username"></p>

<!--
  output:
  
  Username cannot be empty.

  or:

  Username is not a valid email address.
-->
```

```html
<input [formControl]="myControl">
<p *ngFormValidationMessages="let error; control: myControl; label: 'Username'">{{error}}</p>

<!--
  output:

  Username cannot be empty.
  Username is not a valid email address.
  Username must not be less than 5.
-->
```

Note that error messages will be displayed after the formControl is marked as ```touched```

Example with Angular Material Design:

```html
<mat-form-field>
  <mat-label>Username</mat-label>
  <input matInput [control]="myControl">
  <mat-error ngFormValidationMessage [control]="myControl" label="Username"></mat-error>
  <!-- <mat-error *ngFormValidationMessages="let error; control: myControl; label: 'Username'">{{error}}</mat-error> -->
</mat-form-field>
```

Example with Bootstrap 4.x:

```html
<div class="form-group">
  <label for="...">Username</label>
  <input class="form-control" id="..." [control]="myControl">
  <div class="valid-feedback" ngFormValidationMessage [control]="myControl" label="Username"></div>
  <!-- <div class="valid-feedback" *ngFormValidationMessages="let error; control: myControl; label: 'Username'">{{error}}</div> -->
</div>
```

Example with formGroup and Angular Material Design:

1. We create the form:

```typescript
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

}
```

2. Just like the example with ```formControl``` you can work with the single or multiple message directive. For this example, such directives are useful since we will use the design of the interior of your application. The difference is that in this case we must use the ```controlName``` property instead of ```[control]```:

```html
<form [formGroup]="myForm" (submit)="submit()">
  <mat-form-field>
    <mat-label>Username</mat-label>
    <input matInput formControlName="username">
    <mat-error ngFormValidationMessage controlName="username" label="Username"></mat-error>
  </mat-form-field>

  <mat-form-field>
    <mat-label>Password</mat-label>
    <input matInput formControlName="password" type="password">
    <mat-error ngFormValidationMessage controlName="password" label="Password"></mat-error>
  </mat-form-field>

  <button mat-raised-button color="primary" type="submit">SUBMIT</button>
</form>
```

## Customization

### Soon it will work with internationalization.

### You can work with a collection of different messages:

```typescript
import { NgModule } from '@angular/core';
import { NgFormValidationMessageModule, ERROR_MESSAGES } from 'ng-form-validation-message';

import { ReactiveFormsModule } from '@angular/forms';

export const customErrorMessages = {
  min: {
    message: '{label} must not be less than {min}.',
    rExp: 'min|actual'
  },
  max: {
    message: '{label} must not be greater than {max}.',
    rExp: 'max|actual'
  },
  required: {
    message: '{label} cannot be empty.'
  },
  requiredTrue: {
    message: '{label} must be true.'
  },
  email: {
    message: '{label} is not a valid email address.'
  },
  minlength: {
    message: '{label} should contain at least {requiredLength} character(s).',
    rExp: 'requiredLength|actualLength'
  },
  maxlength: {
    message: '{label} should contain at most {requiredLength} character(s).',
    rExp: 'requiredLength|actualLength'
  },
  pattern: {
    message: '{label} has an invalid format.',
    rExp: 'requiredPattern|actualValue'
  }
};

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    ReactiveFormsModule,
    NgFormValidationMessageModule
  ],
  providers: [
    {
      provide: ERROR_MESSAGES,
      useValue: customErrorMessages
    }
  ],
})
export class AppModule { }
```

**Attention**: consider the format of each value:
- As you can see there is a ```message``` property that has the content of the message and the values to be personalized enclosed in braces

- In the ```regEx``` property you have the aforementioned values separated by ```|```.


### You can work with a different label ('Field' by default):

```typescript
import { NgModule } from '@angular/core';
import { NgFormValidationMessageModule, DEFAULT_LABEL } from 'ng-form-validation-message';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    ReactiveFormsModule,
    NgFormValidationMessageModule
  ],
  providers: [
    ...,
    {
      provide: DEFAULT_LABEL,
      useValue: 'MyLabel'
    }
  ],
})
export class AppModule { }
```
