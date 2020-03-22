import {Component, OnInit, ViewChild} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {QuestionModel} from '../../models/question.model';
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
	selector: 'app-question-detail',
	templateUrl: './question-detail.component.pug',
	styleUrls: ['./question-detail.component.sass']
})
export class QuestionDetailComponent implements OnInit {
	loading: boolean = true;

	question: QuestionModel;

	constructor(private route: ActivatedRoute,
				private router: Router,
				private questionService: QuestionService) {
	}

	ngOnInit(): void {
		this.initRouteParamsListener();
	}

	private initRouteParamsListener() {
		this.route.params.subscribe(
			(params: Params) => {
				const questionId = params.id;
				console.log('QID: ', questionId);
				if (questionId) {
					this.loadQuestionDetails(questionId);
				}
			}
		);
	}

	private loadQuestionDetails(questionId: string) {
		this.questionService.loadQuestionDetails(questionId).subscribe((model: QuestionModel) => {
			this.question = model;
		}, () => {
			this.router.navigateByUrl('/list');
		});
	}

	deleteQuestion(): void {
		this.questionService.deleteQuestion(this.question).subscribe(() => {
			this.router.navigateByUrl('/list');
		});
	}

}
