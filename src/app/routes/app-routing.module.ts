import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/auth/login/login.component';
import { AuthGuard } from '../utils/auth-guard/auth.guard';
import { PostsComponent } from '../components/posts/posts/posts.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
