import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScanFailedPage } from './scan-failed.page';

describe('ScanFailedPage', () => {
  let component: ScanFailedPage;
  let fixture: ComponentFixture<ScanFailedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ScanFailedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
