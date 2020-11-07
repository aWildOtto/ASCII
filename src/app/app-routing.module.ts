import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatListComponent } from './chat-list/chat-list.component';

const routes: Routes = [
  // {path: '', component: }
  { path: 'chat-list', component: ChatListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
