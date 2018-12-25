import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCountsComponent } from './dashboard-counts.component';

describe('DashboardCountsComponent', () => {
  let component: DashboardCountsComponent;
  let fixture: ComponentFixture<DashboardCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
