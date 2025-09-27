import { Component, Input, OnInit } from '@angular/core';
import { FormCreateService } from '../../../services/form-create.service';
import { TranslationService } from '../../../services/translation.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-group-array',
  templateUrl: './group-array.component.html',
  styleUrl: './group-array.component.css'
})
export class GroupArrayComponent implements OnInit {
  @Input() field:any;
  @Input() group:any;
  @Input() slug:any;

  constructor(
    private formS: FormCreateService,
    private translateS: TranslationService
  ) {
    console.log("hu");
  }

  ngOnInit(): void {
      console.log(this.field, this.formArray);
  }

  get formArray() {
    return this.group.get(this.field.key) as FormArray;
  }

  addItem() {
    const newGroup = this.formS.createArrayGroup(this.field.children);
    this.formArray.push(newGroup);
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
  }

  getLabel() {
    return this.translateS.getLabel(this.slug, this.field.key);
  }
}
