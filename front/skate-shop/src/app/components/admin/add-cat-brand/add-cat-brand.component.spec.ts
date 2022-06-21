import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatBrandComponent } from './add-cat-brand.component';

describe('AddCatBrandComponent', () => {
  let component: AddCatBrandComponent;
  let fixture: ComponentFixture<AddCatBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCatBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCatBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
