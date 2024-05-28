import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSituationCsvComponent } from './upload-situation-csv.component';

describe('UploadSituationCsvComponent', () => {
  let component: UploadSituationCsvComponent;
  let fixture: ComponentFixture<UploadSituationCsvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadSituationCsvComponent]
    });
    fixture = TestBed.createComponent(UploadSituationCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
