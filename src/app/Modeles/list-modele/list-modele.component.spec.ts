import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModeleComponent } from './list-modele.component';

describe('ListModeleComponent', () => {
  let component: ListModeleComponent;
  let fixture: ComponentFixture<ListModeleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListModeleComponent]
    });
    fixture = TestBed.createComponent(ListModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});