import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVariableModeleComponent } from './liste-variable-modele.component';

describe('ListeVariableModeleComponent', () => {
  let component: ListeVariableModeleComponent;
  let fixture: ComponentFixture<ListeVariableModeleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeVariableModeleComponent]
    });
    fixture = TestBed.createComponent(ListeVariableModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
