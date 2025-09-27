import { DynamicFieldType } from "./enums";

export interface DynamicFields {
    readonly type: DynamicFieldType.BUTTON | DynamicFieldType.COMPONENT | DynamicFieldType.GROUP | DynamicFieldType.LABEL | DynamicFieldType.INNERHTML,
    readonly value?:string, //field value
    readonly label?:string, //field label
    readonly title?:string, // group title
    readonly key?:string,
    onClick?:()=>void, //button onclick
    fields?:DynamicFields[], // group fields
    readonly fieldClass?:string, //field class
    readonly valueClass?:string, //field value class
    readonly parentClass?:string, //field parent div clas
    readonly groupClass?:string, //group parent div class
    readonly transformType?:string,
    readonly transformConfig?:any,
    readonly component?:any,
    readonly inputs?:any,
    readonly outputs?:any,
    
}

export interface DynamicContainerConfig {
    title?:string,
    subtitle?:string,
    containerClass?:string,
    titleClass?:string,
    subTitleClass?:string,
    fields?:DynamicFields[],
    parentClass?:string
}

export interface ValueTransformStrategy {
  transform(value: any, config?:any): any;
}