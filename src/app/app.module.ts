import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChatService } from 'src/app/Services/chat/chat.service';
import {DicService} from 'src/app/Services/dic/dic.service';
import { ChatListComponent } from './chat-list/chat-list.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {environment} from '../environments/environment';
import { AsciiGameComponent } from './ascii-game/ascii-game.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    TopNavComponent,
    NavBarComponent,
    LoginPageComponent,
    AsciiGameComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    FormsModule,
    // storage
  ],
  providers: [
    ChatService,
    DicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
