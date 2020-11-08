import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChatService } from 'src/app/Services/chat/chat.service';
import { ChatListComponent } from 'src/app/Pages/chat-list/chat-list.component';
import { TopNavComponent } from 'src/app/Components/top-nav/top-nav.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginPageComponent } from './Pages/login-page/login-page.component';

import { HomePageComponent } from './Pages/home-page/home-page.component';
import { InvalidPageComponent } from './Pages/invalid-page/invalid-page.component';
import { environment } from '../environments/environment';
import { OnlineListComponent } from './Components/online-list/online-list.component';
import { ChatListItemComponent } from './Components/chat-list-item/chat-list-item.component';
import { DatePipe } from './date.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'ngx-avatar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from 'src/app/Components/chat/chat.component';
import { ChatPageComponent } from 'src/app/Pages/chat-page/chat-page.component';
import { ChatMessageComponent } from 'src/app/Components/chat-message/chat-message.component';
import { ChatFormComponent } from 'src/app/Components/chat-form/chat-form.component';
import { OnlineChatListItemComponent } from './Components/online-chat-list-item/online-chat-list-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    ChatListItemComponent,
    OnlineChatListItemComponent,
    TopNavComponent,
    NavBarComponent,
    LoginPageComponent,
    HomePageComponent,
    InvalidPageComponent,
    OnlineListComponent,
    DatePipe,
    ChatComponent,
    ChatPageComponent,
    ChatMessageComponent,
    ChatFormComponent,
    ChatMessageComponent
  ],
  imports: [
    HttpClientModule,
    MatListModule,
    AvatarModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    MatIconModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, BrowserAnimationsModule // storage
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
