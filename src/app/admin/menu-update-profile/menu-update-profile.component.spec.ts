import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuUpdateProfileComponent } from './menu-update-profile.component';

describe('MenuUpdateProfileComponent', () => {
  let component: MenuUpdateProfileComponent;
  let fixture: ComponentFixture<MenuUpdateProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuUpdateProfileComponent]
    });
    fixture = TestBed.createComponent(MenuUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
