import {Injectable } from "@angular/core";
import { DatePipe, CurrencyPipe } from '@angular/common';
import { DateTransformStrategy } from "./date-transform-strategy";
import { CurrencyTransformStrategy } from "./currency-transform-strategy";
import {ValueTransformStrategy} from "../interfaces";

@Injectable({providedIn:"root"})
export class TransformStrategyFactory {
    constructor(
        private datePipe:DatePipe,
        private currencyPipe: CurrencyPipe
    ) {}

    getStrategy(type: string): ValueTransformStrategy {
        switch(type){
            case "date":
                return new DateTransformStrategy(this.datePipe)
            case "currency":
                return new CurrencyTransformStrategy(this.currencyPipe)
            default:
                return {transform:(val:any)=>{val!=null ? val?.toString(): ""}}
        }
    }
}