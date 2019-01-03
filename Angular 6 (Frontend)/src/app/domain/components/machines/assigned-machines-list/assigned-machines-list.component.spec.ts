import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedMachinesListComponent } from './assigned-machines-list.component';

describe('AssignedMachinesListComponent', () => {
  let component: AssignedMachinesListComponent;
  let fixture: ComponentFixture<AssignedMachinesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedMachinesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedMachinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
