import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResspassPage } from './resspass.page';

describe('ResspassPage', () => {
  let component: ResspassPage;
  let fixture: ComponentFixture<ResspassPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResspassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
