import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodySettingsComponent } from './body-settings.component';

describe('BodySettingsComponent', () => {
  let component: BodySettingsComponent;
  let fixture: ComponentFixture<BodySettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodySettingsComponent]
    });
    fixture = TestBed.createComponent(BodySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
