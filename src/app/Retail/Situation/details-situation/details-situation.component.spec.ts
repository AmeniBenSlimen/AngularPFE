import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSituationComponent } from './details-situation.component';

describe('DetailsSituationComponent', () => {
  let component: DetailsSituationComponent;
  let fixture: ComponentFixture<DetailsSituationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsSituationComponent]
    });
    fixture = TestBed.createComponent(DetailsSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
