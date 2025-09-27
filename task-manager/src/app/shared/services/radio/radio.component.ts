import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldConfig } from '../../model/dynamic-form.model';
import { TranslationService } from '../translation.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {
  @Input() field!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() slug: string = 'samplePage';

  constructor(private translateS: TranslationService) {}

  ngOnInit(): void {
    const control = this.group.get(this.field.key);
    if (!control) {
      // agar service ne pehle se nahi banaya to fallback
      this.group.setControl(
        this.field.key,
        new FormControl(this.field.defaultValue || null)
      );
    }
  }

  getLabel() {
    return this.translateS.getLabel(this.slug, this.field.key);
  }

  isInvalid() {
    const control = this.group.get(this.field.key) as FormControl;
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrors(): string[] {
    const control = this.group.get(this.field.key);
    if (!control) return [];
    const errors = control.errors || {};
    return Object.keys(errors).map(errKey =>
      this.translateS.getError(
        this.slug,
        this.field.key,
        errKey,
        this.field.validators?.find(v => v.name === errKey)?.value
      )
    );
  }
}
