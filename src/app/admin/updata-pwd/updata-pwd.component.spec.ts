import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdataPwdComponent } from './updata-pwd.component';

describe('UpdataPwdComponent', () => {
  let component: UpdataPwdComponent;
  let fixture: ComponentFixture<UpdataPwdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdataPwdComponent]
    });
    fixture = TestBed.createComponent(UpdataPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
