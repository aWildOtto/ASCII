import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AsciiGameComponent} from './ascii-game/ascii-game.component';
import { ChatListComponent } from 'src/app/Pages/chat-list/chat-list.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { AsgardGuard } from './Guards/asgard/asgard.guard';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { InvalidPageComponent } from './Pages/invalid-page/invalid-page.component';
import { OnlineListComponent } from './Components/online-list/online-list.component';
import { ChatPageComponent } from './Pages/chat-page/chat-page.component';

const routes: Routes = [
  {
    path: 'sign-in', component: LoginPageComponent,
  },
  {
    path: '', component: HomePageComponent,
    canActivate: [AsgardGuard]
  },
  { path: 'chat-list', component: ChatListComponent },
  { path: 'game', component: AsciiGameComponent },


  {
    path: 'chat-with/:uid',
    component: ChatPageComponent,
    canActivate: [AsgardGuard]
  },
  {
    path: '**',
    component: InvalidPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
