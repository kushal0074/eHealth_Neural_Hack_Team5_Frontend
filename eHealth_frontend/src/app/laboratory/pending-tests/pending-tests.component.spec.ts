import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTestsComponent } from './pending-tests.component';

describe('PendingTestsComponent', () => {
  let component: PendingTestsComponent;
  let fixture: ComponentFixture<PendingTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingTestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
