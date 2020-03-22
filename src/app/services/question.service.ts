import {Injectable} from '@angular/core';
import {BaseJsonService} from './base-json.service';
import {Observable} from 'rxjs';
import {QuestionModel} from '../models/question.model';
import {catchError, map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class QuestionService extends BaseJsonService {

	loadQuestionList(): Observable<QuestionModel[]> {
		const url = this.generateUrl('%s', 'list');

		return this.http.get(url, this.options).pipe(
			map((res: QuestionModel[]) => {
					return res;
				},
				catchError(this.handleError))
		);
	}

	loadQuestionDetails(id: any): Observable<QuestionModel> {
		const url = this.generateUrl('%s/%s', 'details', id);

		return this.http.get(url, this.options).pipe(
			map((res: QuestionModel) => {
					return res;
				},
				catchError(this.handleError))
		);
	}
	// TODO: Id?
	updateQuestion(questionModel: QuestionModel): Observable<QuestionModel> {
		const url = this.generateUrl('%s', 'edit');

		return this.http.post(url, questionModel, this.options).pipe(
			map((res: QuestionModel) => {
					return res;
				},
				catchError(this.handleError))
		);
	}
	// TODO: ID?
	deleteQuestion(questionModel: QuestionModel): Observable<void> {
		const url = this.generateUrl('%s', 'delete');

		return this.http.post(url, questionModel, this.options).pipe(
			map(() => {
				},
				catchError(this.handleError))
		);
	}

}
