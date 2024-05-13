import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilingPage } from './profiling.page';

describe('ProfilingPage', () => {
  let component: ProfilingPage;
  let fixture: ComponentFixture<ProfilingPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfilingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
