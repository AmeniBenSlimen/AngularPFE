import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRetailComponent } from './menu-retail.component';

describe('MenuRetailComponent', () => {
  let component: MenuRetailComponent;
  let fixture: ComponentFixture<MenuRetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuRetailComponent]
    });
    fixture = TestBed.createComponent(MenuRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
