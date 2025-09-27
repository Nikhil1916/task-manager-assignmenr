import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslationService } from '../../../services/translation.service';
import { FieldConfig } from '../../../model/dynamic-form.model';
@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  @Input() field!: FieldConfig;
  @Input() group!: FormGroup;
  @Input() slug: string = 'samplePage';

  constructor(private translateS: TranslationService) {}

  ngOnInit(): void {
    const control = this.group.get(this.field.key);
    if (!control) {
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
