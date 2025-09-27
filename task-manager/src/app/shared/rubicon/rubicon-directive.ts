import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { TextComponent } from './components/text/text.component';
import { SelectComponent } from './components/select/select.component';
import { SelectV2Component } from './components/select-v2/select-v2.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { RadioComponent } from '../services/radio/radio.component';
import { DateComponent } from './components/date/date.component';
import { GroupArrayComponent } from './components/group-array/group-array.component';
import { PasswordComponent } from './components/password/password.component';
import { TextareaComponent } from './components/textarea/textarea.component';

const components: any = {
    text:TextComponent,
    select:SelectComponent,
    selectv2:SelectV2Component,
    checkbox: CheckboxComponent,
    radio: RadioComponent,
    date: DateComponent,
    array:GroupArrayComponent,
    password: PasswordComponent,
    textarea: TextareaComponent
};

@Directive({
  selector: '[appDynamicField]',
})
export class Rubicon implements OnInit {
  @Input() field!: any;
  @Input() group!: any;
  @Input() slug!:string;

  constructor(
    private resolver: ComponentFactoryResolver,
    private containerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    const component = components[this.field.type];
    // console.log(component);
    if(!component) {
        // const supportedTypes = Object.keys(components).join(", ");
        // throw new Error(`Trying to use an unsupported field type (${this.field.type}). Supported types: ${supportedTypes}`);
        return;
    }

    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef:any = this.containerRef.createComponent(factory);
    componentRef.instance.field = this.field;
    componentRef.instance.group = this.group;
    componentRef.instance.slug = this.slug;
  }
}
