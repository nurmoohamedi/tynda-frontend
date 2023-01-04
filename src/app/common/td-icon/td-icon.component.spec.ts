import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdIconComponent } from './td-icon.component';

describe('TdIconComponent', () => {
  let component: TdIconComponent;
  let fixture: ComponentFixture<TdIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TdIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
