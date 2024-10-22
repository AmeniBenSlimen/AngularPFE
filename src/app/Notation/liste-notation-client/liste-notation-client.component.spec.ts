import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeNotationClientComponent } from './liste-notation-client.component';

describe('ListeNotationClientComponent', () => {
  let component: ListeNotationClientComponent;
  let fixture: ComponentFixture<ListeNotationClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeNotationClientComponent]
    });
    fixture = TestBed.createComponent(ListeNotationClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
