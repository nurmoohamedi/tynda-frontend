import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TdHeaderComponent } from './td-header.component';

describe('TdHeaderComponent', () => {
  let component: TdHeaderComponent;
  let fixture: ComponentFixture<TdHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TdHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TdHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
