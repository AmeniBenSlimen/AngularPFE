import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotationInProgressUpdateComponent } from './notation-in-progress-update.component';

describe('NotationInProgressUpdateComponent', () => {
  let component: NotationInProgressUpdateComponent;
  let fixture: ComponentFixture<NotationInProgressUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotationInProgressUpdateComponent]
    });
    fixture = TestBed.createComponent(NotationInProgressUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
