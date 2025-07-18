import { Routes } from '@angular/router';
import { ContentComponent } from './pub/components/home-page/content/content.component';
import { ErrorPageComponent } from './pub/components/error-page/error-page.component';
import { PostsComponent } from './pub/components/posts/posts.component';
import { PopUpComponent } from './pub/components/pop-up/pop-up.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { UsersComponent } from './admin/components/users/users.component';
import { LoginComponent } from './admin/auth/login/login.component';
import { RegisterComponent } from './admin/auth/register/register.component';
import { AdminPostsComponent } from './admin/components/posts/posts.component';
import { PostEditComponent } from './admin/components/post-edit/post-edit.component';
import { PostDetailComponent } from './pub/components/post-detail/post-detail.component';
import { PostCreateComponent } from './admin/components/post-create/post-create.component';
import { AuthGuard } from './auth.guard';
import { SampleSearchComponent } from './pub/components/sample-search/sample-search.component';

export const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full'}, 
  {
    path: '',
    children: [ 
      { path: 'home', component: ContentComponent},
      { path: 'users', component: UsersComponent },
      { path: 'posts', component: PostsComponent }, 
      { path: 'posts/:id', component: PostDetailComponent },
    ]
  },

  {
    path: 'admin',
    canActivate: [AuthGuard] ,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: DashboardComponent},
      { path: 'users', component: UsersComponent },
      { path: 'posts/edit/:id', component: PostEditComponent },
      {path:'posts/create',component: PostCreateComponent},
      {path:'sample-search', component: SampleSearchComponent}
    
    ]
  },
  
    {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login',pathMatch: 'full' }, 
      { path: 'login', component: LoginComponent},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },

 { path: '**', component:ErrorPageComponent}
];

