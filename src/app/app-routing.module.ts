import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatListComponent } from 'src/app/Pages/chat-list/chat-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AsgardGuard } from './Guards/asgard/asgard.guard';

const routes: Routes = [
  {
    path: '', component: LoginPageComponent,
  },
  {
    path: 'chat-list', component: ChatListComponent,
    canActivate: [AsgardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
