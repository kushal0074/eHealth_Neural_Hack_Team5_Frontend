import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastLabRecordsComponent } from './past-lab-records.component';

describe('PastLabRecordsComponent', () => {
  let component: PastLabRecordsComponent;
  let fixture: ComponentFixture<PastLabRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastLabRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastLabRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
