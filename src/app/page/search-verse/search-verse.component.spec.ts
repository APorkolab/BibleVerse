import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVerseComponent } from './search-verse.component';

describe('SearchVerseComponent', () => {
  let component: SearchVerseComponent;
  let fixture: ComponentFixture<SearchVerseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchVerseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchVerseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
