import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChatService } from 'src/app/Services/chat/chat.service';
import { ChatListComponent } from 'src/app/Pages/chat-list/chat-list.component';
import { TopNavComponent } from 'src/app/Components/top-nav/top-nav.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { environment } from '../environments/environment';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { InvalidPageComponent } from './Pages/invalid-page/invalid-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    TopNavComponent,
    NavBarComponent,
    LoginPageComponent,
    HomePageComponent,
    InvalidPageComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
