import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleRetailComponent } from './module-retail.component';

describe('ModuleRetailComponent', () => {
  let component: ModuleRetailComponent;
  let fixture: ComponentFixture<ModuleRetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleRetailComponent]
    });
    fixture = TestBed.createComponent(ModuleRetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
