import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModeleComponent } from './add-modele.component';

describe('AddModeleComponent', () => {
  let component: AddModeleComponent;
  let fixture: ComponentFixture<AddModeleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddModeleComponent]
    });
    fixture = TestBed.createComponent(AddModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
