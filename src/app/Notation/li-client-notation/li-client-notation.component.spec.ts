import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiClientNotationComponent } from './li-client-notation.component';

describe('LiClientNotationComponent', () => {
  let component: LiClientNotationComponent;
  let fixture: ComponentFixture<LiClientNotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiClientNotationComponent]
    });
    fixture = TestBed.createComponent(LiClientNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
