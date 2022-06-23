import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorImgComponent } from './editor-img.component';

describe('EditorImgComponent', () => {
  let component: EditorImgComponent;
  let fixture: ComponentFixture<EditorImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
