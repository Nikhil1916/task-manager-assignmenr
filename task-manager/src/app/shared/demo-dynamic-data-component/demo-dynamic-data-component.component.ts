import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../shared.module';
import { DynamicFieldType } from '../enums';
import { DynamicContainerConfig } from '../interfaces';
// import { ChildComponent } from '../../child/child.component';

@Component({
  selector: 'app-demo-dynamic-data-component',
  templateUrl: './demo-dynamic-data-component.component.html',
  styleUrl: './demo-dynamic-data-component.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class DemoDynamicDataComponentComponent implements OnInit {
  toggle = false;
  componentMap!:any;
  config: DynamicContainerConfig = {
    parentClass: 'd-flex header',
    title: 'dynamic component construction',
    titleClass: 'font-bold m-2 border-none',
    fields: [
      {
        type: DynamicFieldType.LABEL,
        label: 'First Name',
        parentClass: 'col',
        fieldClass: 'm-2 font-bold',
        valueClass: 'font-low',
        key: 'first_name',
      },
      {
        type: DynamicFieldType.LABEL,
        label: 'Second Name',
        parentClass: 'col',
        fieldClass: 'm-2 font-bold',
        valueClass: 'font-low',
        key: 'second_name',
      },
      {
        type: DynamicFieldType.LABEL,
        label: 'Last Name',
        fieldClass: 'm-2 font-bold',
        valueClass: 'font-low',
        parentClass: 'col',
        key: 'last_name',
      },
      {
        type: DynamicFieldType.GROUP,
        title: 'Address',
        groupClass: 'd-flex gap-2 address-col',
        parentClass: 'p-5',
        fieldClass: 'm-2 font-bold',
        valueClass: 'font-low',
        fields: [
          {
            type: DynamicFieldType.GROUP,
            fields: [
              {
                type: DynamicFieldType.LABEL,
                label: 'Country',
                fieldClass: 'font-bold',
                valueClass: 'font-low',
                key: 'address.country',
              },
              {
                type: DynamicFieldType.LABEL,
                label: 'State',
                key: 'address.state',
                fieldClass: 'font-bold',
                valueClass: 'font-low',
              },
              {
                type: DynamicFieldType.LABEL,
                label: 'City',
                key: 'address.city',
                fieldClass: 'font-bold',
                valueClass: 'font-low',
              },
            ],
          },
          {
        type: DynamicFieldType.COMPONENT,
        component: 'demoComponent',
        inputs: {
          title: 'Dynamic Title',
          count: 5,
        },
        outputs: {
           clicked: (event: any) => this.onDemoClicked(event)
        },
      },
          {
            type: DynamicFieldType.LABEL,
            label: 'Salary',
            key: 'salary',
            transformType: 'currency',
            transformConfig: {
              currencyCode: 'INR',
              display: 'code',
            },
            fieldClass: 'p-2 font-bold',
            valueClass: 'font-low',
          },
          {
            type: DynamicFieldType.LABEL,
            label: 'Age',
            key: 'age',
            fieldClass: 'font-bold',
            valueClass: 'font-low',
          },
          {
            type: DynamicFieldType.INNERHTML,
            label: 'innerhtml',
            key: 'inner_html',
          },
        ],
      },
      {
        type: DynamicFieldType.BUTTON,
        label: 'Click me',
        onClick: this.onClick.bind(this),
      },
      {
        type: DynamicFieldType.COMPONENT,
        component: 'demoComponent',
        inputs: {
          title: 'Dynamic Title',
          count: 5,
        },
        outputs: {
           clicked: (event: any) => this.onDemoClicked(event)
        },
      },
    ],
  };
  onClick() {
    this.toggle = !this.toggle;
    console.log('click me to toggle Value', this.toggle);
  }

  response = {
    first_name: 'Nikhil',
    second_name: 'Manoj',
    last_name: 'Chawla',
    address: {
      city: 'Ludhiana',
      country: 'India',
      state: 'Punjab',
    },
    salary: 50000,
    age: 26,
  };

  ngOnInit(): void {
      this.componentMap = {
        // demoComponent:ChildComponent
      }
  }

   onDemoClicked(event: any) {
    console.log('Event from child:', event);
  }
}
