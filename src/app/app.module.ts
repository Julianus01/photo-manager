import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routes/app-routing.module';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Utils
import { AuthGuard } from './utils/auth-guard/auth.guard';

// UI
import '../styles/shards/shards.min.js';
import { MatDialogModule } from '@angular/material/dialog';

// Components
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginFormComponent } from './components/auth/login-form/login-form.component';
import { RegisterFormComponent } from './components/auth/register-form/register-form.component';
import { PostsComponent } from './components/posts/posts/posts.component';
import { PostComponent } from './components/posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostFormDialogComponent } from './components/posts/post-form-dialog/post-form-dialog.component';
import { ReversePipe } from './utils/pipes/reverse.pipe';
import { ConfirmationDialogComponent } from './components/shared/confirmation-dialog/confirmation-dialog.component';
import { TagsComponent } from './components/posts/tags/tags.component';

// Services
import { CommentsService } from './services/comments/comments.service';
import { TagsService } from './services/tags/tags.service'
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterFormComponent,
    PostsComponent,
    PostComponent,
    PostFormDialogComponent,
    ReversePipe,
    ConfirmationDialogComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    Ng4GeoautocompleteModule
  ],
  providers: [
    AuthGuard,
    CommentsService,
    TagsService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    PostFormDialogComponent,
    ConfirmationDialogComponent
  ]
})
export class AppModule { }
