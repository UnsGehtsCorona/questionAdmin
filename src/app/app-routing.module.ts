import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionDetailComponent} from './components/question-detail/question-detail.component';
import {QuestionListComponent} from './components/question-list/question-list.component';
import {QuestionFormComponent} from './components/question-form/question-form.component';


const routes: Routes = [
	{path: 'list', component: QuestionListComponent},
	{path: 'detail/:id', component: QuestionDetailComponent},
	{path: 'edit/:id', component: QuestionFormComponent},
	{path: 'create', component: QuestionFormComponent},
	{path: '**', component: QuestionListComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
