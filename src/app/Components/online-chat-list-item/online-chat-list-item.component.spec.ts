import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineChatListItemComponent } from './online-chat-list-item.component';

describe('ChatListItemComponent', () => {
  let component: OnlineChatListItemComponent;
  let fixture: ComponentFixture<OnlineChatListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineChatListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineChatListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
