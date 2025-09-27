import { AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { DynamicContainerConfig, DynamicFields } from '../interfaces';
import { DynamicFieldType } from '../enums';
import { MappingService } from '../services/mapping-service.service';

@Component({
  selector: 'app-dynamic-data-component',
  templateUrl: './dynamic-data-component.component.html',
  styleUrl: './dynamic-data-component.component.css',
})
export class DynamicDataComponentComponent implements OnInit, AfterViewInit {
  toggle = false;
  DynamicFieldType = DynamicFieldType;
  @Input({ required: true }) config!: DynamicContainerConfig;
  @Input({ required: true }) response!: any;
  @Input()componentMap:any;
  @ViewChildren('dynamicHost', { read: ViewContainerRef })
  dynamicHosts!: QueryList<ViewContainerRef>;
  constructor(private mappingS: MappingService) {}
  ngOnInit(): void {
    console.log(this.config);
    this.setMapping();
  }

  setMapping() {
    this.config.fields = this.mappingS.attachValues(
      this.config.fields || [],
      this.response
    );
  }

  ngAfterViewInit(): void {
    // this.loadDynamicComponents();
  }

  loadDynamicComponents() {
    if(!this.config || this.config.fields?.length  == 0) return;
    this.dynamicHosts.forEach((host, index) => {
      const field = this.config.fields![index];
      if(field.type === DynamicFieldType.COMPONENT && this.componentMap[field?.component]) {
        const compClass = this.componentMap[field.component];
        const compRef:any = host.createComponent(compClass);
        if(field.inputs) {
          Object.entries(field.inputs).forEach(([key,value])=>{
            compRef.setInput(key, value);
          })
        }

        if(field.outputs) {
          Object.entries(field.outputs).forEach(([key,handler])=>{
            if(compRef?.instance[key] && compRef.instance[key].subscribe) {
                compRef.instance[key].subscribe(handler);
            }
          })
        }
      }
    })
  }
}
