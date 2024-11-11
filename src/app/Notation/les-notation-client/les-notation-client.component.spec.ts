import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesNotationClientComponent } from './les-notation-client.component';

describe('LesNotationClientComponent', () => {
  let component: LesNotationClientComponent;
  let fixture: ComponentFixture<LesNotationClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LesNotationClientComponent]
    });
    fixture = TestBed.createComponent(LesNotationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
