import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { FavouriteComponent } from './components/account/favourite/favourite.component';
import { ForgetpassComponent } from './components/account/forgetpass/forgetpass.component';
import { LoginComponent } from './components/account/login/login.component';
import { MyinfoComponent } from './components/account/myinfo/myinfo.component';
import { NewpasswordComponent } from './components/account/newpassword/newpassword.component';
import { PasswordComponent } from './components/account/password/password.component';
import { RegisterComponent } from './components/account/register/register.component';
import { SubscribeComponent } from './components/account/subscribe/subscribe.component';
import { TestComponent } from './components/account/test/test.component';
import { VarifyComponent } from './components/account/varify/varify.component';
import { VarifypasswordComponent } from './components/account/varifypassword/varifypassword.component';
import { KidsComponent } from './components/kids/kids.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { MomsComponent } from './components/moms/moms.component';
import { ApplicationComponent } from './components/more/application/application.component';
import { ContactComponent } from './components/more/contact/contact.component';
import { IdeaComponent } from './components/more/idea/idea.component';
import { MoreComponent } from './components/more/more.component';
import { PrivacyComponent } from './components/more/privacy/privacy.component';
import { TeamComponent } from './components/more/team/team.component';
import { TermsComponent } from './components/more/terms/terms.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { SubjectComponent } from './components/subject/subject.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { YearsComponent } from './components/years/years.component';
import { LogGuard } from './guards/log.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  { path: '', redirectTo: 'kids', pathMatch: 'full' },
  { path: 'kids', component: KidsComponent },
  { path: 'moms', component: MomsComponent },
  { path: 'years', component: YearsComponent },
  {path: "posts/:categoryId/:categoryType" , component: PostsComponent},
  { path: 'posts/:categoryId/:categoryType/post/:postId', component: PostComponent},
  { path: 'years/subjects/:yearId', component: SubjectsComponent },
  { path: 'years/subjects/:yearId/subject/:subjectId', component: SubjectComponent },
  { path: 'lesson', component: LessonComponent},
  { path: 'account', component: AccountComponent },
  { path: 'more', component: MoreComponent },
  { path: 'account/test', component: TestComponent },
  { path: 'account/favourite', component: FavouriteComponent, canActivate:[LogGuard]},
  { path: 'account/myinfo', component: MyinfoComponent , canActivate:[LogGuard]},
  { path: 'account/subscribe', component: SubscribeComponent, canActivate:[LogGuard] },
  { path: 'account/password', component: PasswordComponent, canActivate:[LogGuard]},
  { path: 'account/newpassword', component: NewpasswordComponent},
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/varify', component: VarifyComponent },
  { path: 'account/varifypassword', component: VarifypasswordComponent },
  { path: 'account/login', component: LoginComponent, canActivate:[LoginGuard]},
  { path: 'account/forgetpass', component: ForgetpassComponent },
  { path: 'more/privacy', component: PrivacyComponent },
  { path: 'more/terms', component: TermsComponent },
  { path: 'more/application', component: ApplicationComponent },
  { path: 'more/contact', component: ContactComponent },
  { path: 'more/idea', component: IdeaComponent },
  { path: 'more/team', component: TeamComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
