import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVerseComponent } from './select-verse.component';

describe('SelectVerseComponent', () => {
  let component: SelectVerseComponent;
  let fixture: ComponentFixture<SelectVerseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectVerseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectVerseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
