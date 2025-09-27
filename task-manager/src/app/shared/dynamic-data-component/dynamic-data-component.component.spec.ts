import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicDataComponentComponent } from './dynamic-data-component.component';

describe('DynamicDataComponentComponent', () => {
  let component: DynamicDataComponentComponent;
  let fixture: ComponentFixture<DynamicDataComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicDataComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicDataComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
