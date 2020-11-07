import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatListComponent } from 'src/app/Pages/chat-list/chat-list.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AsgardGuard } from './Guards/asgard/asgard.guard';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { InvalidPageComponent } from './Pages/invalid-page/invalid-page.component';

const routes: Routes = [
  {
    path: 'login', component: LoginPageComponent,
  },
  {
    path: '', component: HomePageComponent,
    canActivate: [AsgardGuard]
  },
  {
    path: '*', component: InvalidPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
