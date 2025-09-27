import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectV2Component } from './select-v2.component';

describe('SelectV2Component', () => {
  let component: SelectV2Component;
  let fixture: ComponentFixture<SelectV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectV2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
