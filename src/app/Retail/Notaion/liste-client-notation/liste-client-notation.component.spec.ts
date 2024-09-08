import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeClientNotationComponent } from './liste-client-notation.component';

describe('ListeClientNotationComponent', () => {
  let component: ListeClientNotationComponent;
  let fixture: ComponentFixture<ListeClientNotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeClientNotationComponent]
    });
    fixture = TestBed.createComponent(ListeClientNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
