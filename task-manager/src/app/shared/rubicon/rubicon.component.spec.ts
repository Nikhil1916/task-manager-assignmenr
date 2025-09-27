import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubiconComponent } from './rubicon.component';

describe('RubiconComponent', () => {
  let component: RubiconComponent;
  let fixture: ComponentFixture<RubiconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RubiconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RubiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
