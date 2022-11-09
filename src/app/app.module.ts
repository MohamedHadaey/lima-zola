import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { KidsComponent } from './components/kids/kids.component';
import { MomsComponent } from './components/moms/moms.component';
import { AccountComponent } from './components/account/account.component';
import { MoreComponent } from './components/more/more.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/account/test/test.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavouriteComponent } from './components/account/favourite/favourite.component';
import { PrivacyComponent } from './components/more/privacy/privacy.component';
import { TermsComponent } from './components/more/terms/terms.component';
import { ContactComponent } from './components/more/contact/contact.component';
import { TeamComponent } from './components/more/team/team.component';
import { IdeaComponent } from './components/more/idea/idea.component';
import { ApplicationComponent } from './components/more/application/application.component';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';
import { VarifyComponent } from './components/account/varify/varify.component';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MyinfoComponent } from './components/account/myinfo/myinfo.component';
import { SubscribeComponent } from './components/account/subscribe/subscribe.component';
import { PasswordComponent } from './components/account/password/password.component';
import { MyIntercetor } from './intercetor';
import { ClipboardModule } from 'ngx-clipboard';
import { NgxCopyPasteModule } from 'ngx-copypaste';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { ForgetpassComponent } from './components/account/forgetpass/forgetpass.component';
import { VarifypasswordComponent } from './components/account/varifypassword/varifypassword.component';
import { NewpasswordComponent } from './components/account/newpassword/newpassword.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { YearsComponent } from './components/years/years.component';
import { SubjectComponent } from './components/subject/subject.component';
import { PlyrModule } from 'ngx-plyr';
import { LessonComponent } from './components/lesson/lesson.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    KidsComponent,
    MomsComponent,
    AccountComponent,
    MoreComponent,
    NotfoundComponent,
    HomeComponent,
    TestComponent,
    FavouriteComponent,
    PrivacyComponent,
    TermsComponent,
    ContactComponent,
    TeamComponent,
    IdeaComponent,
    ApplicationComponent,
    RegisterComponent,
    LoginComponent,
    VarifyComponent,
    MyinfoComponent,
    SubscribeComponent,
    PasswordComponent,
    PostComponent,
    PostsComponent,
    ForgetpassComponent,
    VarifypasswordComponent,
    NewpasswordComponent,
    SubjectsComponent,
    YearsComponent,
    SubjectComponent,
    LessonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ClipboardModule,
    PlyrModule,
    NgxCopyPasteModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      closeButton: true,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyIntercetor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

// this method make you able to use ngx-translate
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
