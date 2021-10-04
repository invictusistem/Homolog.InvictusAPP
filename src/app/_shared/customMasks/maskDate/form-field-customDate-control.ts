import {FocusMonitor} from '@angular/cdk/a11y';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  Validators
} from '@angular/forms';
import {MAT_FORM_FIELD, MatFormField, MatFormFieldControl} from '@angular/material/form-field';
import {Subject} from 'rxjs';
import { MyDate } from './nyDate.model';



/* 

@Component({
  selector: 'form-field-custom-control-example',
  templateUrl: 'form-field-custom-control-example.html',
})
export class FormFieldCustomControlExample {
  form: FormGroup = new FormGroup({
    tel: new FormControl(new MyTel('', '', ''))
  });
}
*/

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'date-input',
  templateUrl: 'date-input.html',
  styleUrls: ['date-input.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: MyDateInput }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
  }
})


export class MyDateInput
  implements ControlValueAccessor, MatFormFieldControl<MyDate>, OnDestroy {
  static nextId = 0;
  @ViewChild('dia') diaInput: HTMLInputElement;
  @ViewChild('mes') mesInput: HTMLInputElement;
  @ViewChild('ano') anoInput: HTMLInputElement;

  parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'example-date-input';
  id = `example-date-input-${MyDateInput.nextId++}`;
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
   // console.log('get empty')
    const {
      value: { dia, mes, ano }
    } = this.parts;

    return !dia && !mes && !ano;
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input('aria-describedby') userAriaDescribedBy: string;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    //console.log(value)
    //console.log(this._placeholder)
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): any | null {
    //(this.parts)
    if (this.parts.valid) {
      const { value: { dia, mes, ano } } = this.parts;

      let data = new Date(ano,mes -1,dia)
     // console.log(data)
      return data;//new MyDate(dia, mes, ano);
    }
    //console.log('return null')
    return null;
  }
  set value(tel: any | null) {
    const { dia, mes, ano } = tel || new MyDate('', '', '');
    this.parts.setValue({ dia, mes, ano });
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.parts.dirty;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = formBuilder.group({
      dia: [
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)]
      ],
      mes: [
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)]
      ],
      ano: [
        null,
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
      ]
    });

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      //console.log(this.focused)
      //console.log(this.)
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    //console.log(nextElement);// é o próximo input
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program'); // envia para o próximo input
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    //console.log(prevElement)
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  ngOnDestroy() {
    //console.log('on destroy')
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement
      .querySelector('.example-date-input-container')!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    //console.log(this._focusMonitor)
    if (this.parts.controls.ano.valid) {
      this._focusMonitor.focusVia(this.anoInput, 'program');
    } else if (this.parts.controls.mes.valid) {
      this._focusMonitor.focusVia(this.anoInput, 'program');
    } else if (this.parts.controls.dia.valid) {
      this._focusMonitor.focusVia(this.mesInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.diaInput, 'program');
    }
  }

  writeValue(date: MyDate | null): void {
    this.value = date;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }

  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_required: BooleanInput;
}


/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */