import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomVerseComponent } from './random-verse.component';

describe('RandomVerseComponent', () => {
  let component: RandomVerseComponent;
  let fixture: ComponentFixture<RandomVerseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomVerseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomVerseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
