import {
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[dynamicHost]'
})
export class DynamicHostDirective implements OnChanges, OnDestroy {
  @Input('dynamicHost') component: any;
  @Input() inputs: Record<string, any> = {};
  @Input() outputs: Record<string, Function> = {};

  private compRef: any;

  constructor(private vcr: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.component, this.outputs);
      if (changes['component'] && this.component) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    this.vcr.clear();
    if (!this.component) return;

    this.compRef = this.vcr.createComponent(this.component);

    // Set inputs
    if (this.inputs) {
      Object.entries(this.inputs).forEach(([key, value]) => {
        this.compRef.setInput(key, value);
      });
    }

    // Subscribe outputs
    if (this.outputs) {
      Object.entries(this.outputs).forEach(([key, handler]) => {
        if (this.compRef.instance[key]?.subscribe) {
          this.compRef.instance[key].subscribe(handler);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.compRef) {
      this.compRef.destroy();
    }
  }
}
