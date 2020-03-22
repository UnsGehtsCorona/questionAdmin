import {Injectable} from '@angular/core';
import {BaseJsonService} from './base-json.service';
import {Observable} from 'rxjs';
import {QuestionModel} from '../models/question.model';
import {catchError, map} from 'rxjs/operators';

interface QuestionListResponse {
	data: QuestionModel[];
}
interface QuestionDetailResponse {
	data: QuestionModel;
}

@Injectable({
	providedIn: 'root'
})
export class QuestionService extends BaseJsonService {

	loadQuestionList(): Observable<QuestionModel[]> {
		const url = this.generateUrl('%s', 'questions');

		return this.http.get(url, this.options).pipe(
			map((res: QuestionListResponse) => {
					return res.data;
				},
				catchError(this.handleError))
		);
	}

	loadQuestionDetails(id: any): Observable<QuestionModel> {
		const url = this.generateUrl('%s/%s', 'questions', id);

		return this.http.get(url, this.options).pipe(
			map((res: QuestionDetailResponse) => {
					return res.data;
				},
				catchError(this.handleError))
		);
	}

	addQuestion(model: QuestionModel): Observable<void> {
		const url = this.generateUrl('%s', 'questions');

		return this.http.post(url, model, this.options).pipe(
			map(() => {
				},
				catchError(this.handleError))
		);
	}
	// TODO: Id?
	updateQuestion(questionModel: QuestionModel): Observable<QuestionModel> {
		const url = this.generateUrl('%s', 'questions');

		return this.http.put(url, questionModel, this.options).pipe(
			map((res: QuestionModel) => {
					return res;
				},
				catchError(this.handleError))
		);
	}

	deleteQuestion(questionModel: QuestionModel): Observable<void> {
		const url = this.generateUrl('%s/%s', 'questions', questionModel.Quid);

		return this.http.delete(url, this.options).pipe(
			map(() => {
				},
				catchError(this.handleError))
		);
	}

}
