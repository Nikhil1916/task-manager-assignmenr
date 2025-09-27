import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDynamicDataComponentComponent } from './demo-dynamic-data-component.component';

describe('DemoDynamicDataComponentComponent', () => {
  let component: DemoDynamicDataComponentComponent;
  let fixture: ComponentFixture<DemoDynamicDataComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoDynamicDataComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoDynamicDataComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
