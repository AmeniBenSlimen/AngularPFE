import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditDecisionComponent } from './credit-decision.component';

describe('CreditDecisionComponent', () => {
  let component: CreditDecisionComponent;
  let fixture: ComponentFixture<CreditDecisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditDecisionComponent]
    });
    fixture = TestBed.createComponent(CreditDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
