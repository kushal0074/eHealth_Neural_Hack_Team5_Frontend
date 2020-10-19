import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestResultsComponent } from './add-test-results.component';

describe('AddTestResultsComponent', () => {
  let component: AddTestResultsComponent;
  let fixture: ComponentFixture<AddTestResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
