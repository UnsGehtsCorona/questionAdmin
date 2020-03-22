import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionDetailComponent} from './components/question-detail/question-detail.component';
import {QuestionListComponent} from './components/question-list/question-list.component';
import {QuestionEditComponent} from './components/question-edit/question-edit.component';


const routes: Routes = [
	{path: '**', component: QuestionListComponent},
	{path: 'list', component: QuestionListComponent},
	{path: 'detail/:id', component: QuestionDetailComponent},
	{path: 'edit/:id', component: QuestionEditComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
