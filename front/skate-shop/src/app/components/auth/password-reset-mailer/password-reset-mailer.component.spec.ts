import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordResetMailerComponent } from './password-reset-mailer.component';

describe('PasswordResetMailerComponent', () => {
  let component: PasswordResetMailerComponent;
  let fixture: ComponentFixture<PasswordResetMailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordResetMailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetMailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
