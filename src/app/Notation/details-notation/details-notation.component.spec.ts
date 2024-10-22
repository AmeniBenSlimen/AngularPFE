import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsNotationComponent } from './details-notation.component';

describe('DetailsNotationComponent', () => {
  let component: DetailsNotationComponent;
  let fixture: ComponentFixture<DetailsNotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsNotationComponent]
    });
    fixture = TestBed.createComponent(DetailsNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
