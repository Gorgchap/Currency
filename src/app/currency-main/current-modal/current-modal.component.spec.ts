import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentModalComponent } from './current-modal.component';

describe('CurrentModalComponent', () => {
  let component: CurrentModalComponent;
  let fixture: ComponentFixture<CurrentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
