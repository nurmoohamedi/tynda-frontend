import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistHistoryComponent } from './playlist-history.component';

describe('PlaylistHistoryComponent', () => {
  let component: PlaylistHistoryComponent;
  let fixture: ComponentFixture<PlaylistHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
