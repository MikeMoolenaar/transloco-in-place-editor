import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyEditorOverlayComponent } from './key-editor-overlay.component';

describe('KeyEditorOverlayComponent', () => {
  let component: KeyEditorOverlayComponent;
  let fixture: ComponentFixture<KeyEditorOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyEditorOverlayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyEditorOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
