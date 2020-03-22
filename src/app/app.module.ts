import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {QuestionListComponent} from './components/question-list/question-list.component';
import {QuestionDetailComponent} from './components/question-detail/question-detail.component';
import {QuestionFormComponent} from 'src/app/components/question-form/question-form.component';
import {SharedModule} from 'src/modules/shared/shared.module';
import {Router, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
	imports: [
		BrowserModule,
		AppRoutingModule,
		SharedModule,
		RouterModule,
		HttpClientModule,
		ReactiveFormsModule
	],
	declarations: [
		AppComponent,
		QuestionListComponent,
		QuestionDetailComponent,
		QuestionFormComponent
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
