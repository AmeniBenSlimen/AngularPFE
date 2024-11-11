import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterResultatCreditComponent } from './consulter-resultat-credit.component';

describe('ConsulterResultatCreditComponent', () => {
  let component: ConsulterResultatCreditComponent;
  let fixture: ComponentFixture<ConsulterResultatCreditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsulterResultatCreditComponent]
    });
    fixture = TestBed.createComponent(ConsulterResultatCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
