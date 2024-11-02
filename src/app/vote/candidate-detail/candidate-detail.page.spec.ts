import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidateDetailPage } from './candidate-detail.page';

describe('CandidateDetailPage', () => {
  let component: CandidateDetailPage;
  let fixture: ComponentFixture<CandidateDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CandidateDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
