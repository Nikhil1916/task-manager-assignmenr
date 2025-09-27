import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DynamicDataComponentComponent } from './dynamic-data-component/dynamic-data-component.component';
import { DemoDynamicDataComponentComponent } from './demo-dynamic-data-component/demo-dynamic-data-component.component';
import { DynamicHostDirective } from './directives/dynamicHost.directive';
import { FormCheckComponent } from './form-check/form-check.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextComponent } from './rubicon/components/text/text.component';
import { RubiconComponent } from './rubicon/rubicon.component';
import { Rubicon } from './rubicon/rubicon-directive';
import { SelectComponent } from './rubicon/components/select/select.component';
import { SelectV2Component } from './rubicon/components/select-v2/select-v2.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CheckboxComponent } from './rubicon/components/checkbox/checkbox.component';
import { RadioComponent } from './services/radio/radio.component';
import { DateComponent } from './rubicon/components/date/date.component';
import { GroupArrayComponent } from './rubicon/components/group-array/group-array.component';
import { PasswordComponent } from './rubicon/components/password/password.component';

@NgModule({
  declarations: [
    DynamicDataComponentComponent,
    DemoDynamicDataComponentComponent,
    DynamicHostDirective,
    FormCheckComponent,
    TextComponent,
    RubiconComponent,
    Rubicon,
    SelectComponent,
    SelectV2Component,
    CheckboxComponent,
    RadioComponent,
    DateComponent,
    GroupArrayComponent,
    PasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports:[
    DynamicDataComponentComponent,
    DemoDynamicDataComponentComponent,
    FormCheckComponent,
    RubiconComponent
  ],
  providers:[
    DatePipe,
    CurrencyPipe
  ]
})
export class SharedModule { }
