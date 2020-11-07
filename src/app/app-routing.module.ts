import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {OnlineListComponent} from './online-list/online-list.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'chat-list', component: ChatListComponent },
  { path: 'online-list', component: OnlineListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
