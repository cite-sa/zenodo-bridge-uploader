import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReportChapterComponent } from './book-report-chapter.component';

describe('BookReportChapterComponent', () => {
  let component: BookReportChapterComponent;
  let fixture: ComponentFixture<BookReportChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReportChapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReportChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
