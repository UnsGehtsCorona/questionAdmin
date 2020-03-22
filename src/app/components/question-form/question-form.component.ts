import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionService} from 'src/app/services/question.service';
import {AnswerModel, QuestionModel} from 'src/app/models/question.model';

@Component({
	selector: 'app-question-edit',
	templateUrl: './question-form.component.pug',
	styleUrls: ['./question-form.component.sass']
})
export class QuestionFormComponent implements OnInit {

	questionForm: FormGroup;

	answerFormArray: FormArray;

	private questionId: string;

	constructor(private route: ActivatedRoute,
				private fb: FormBuilder,
				private router: Router,
				private questionService: QuestionService
	) {
		this.initForm();
	}

	ngOnInit(): void {
		this.initRouteParamsListener();
	}

	addAnswer(): void {
		const control = this.getNewAnswerGroup();
		this.answerFormArray.push(control);
		control.markAsTouched();
	}

	removeAnswer(index: number): void {
		this.answerFormArray.removeAt(index);
	}

	private loadQuestionDetails(questionId: string) {
		this.questionService.loadQuestionDetails(questionId).subscribe((model: QuestionModel) => {
			this.questionForm.patchValue(model);
		});
	}

	private getNewAnswerGroup(): FormGroup {
		const sortValue = this.answerFormArray ? this.answerFormArray.length + 1 : 1;

		return this.fb.group({
			Auid: [''],
			Sort: [sortValue],
			Answer: ['']
		});
	}

	private initForm() {

		const answers = this.fb.array([]);
		answers.push(this.getNewAnswerGroup());

		this.questionForm = this.fb.group({
			Qid: [''],
			Question: [''],
			Sort: [''],
			Answers: answers
		});
		this.answerFormArray = answers;
	}

	private initRouteParamsListener() {
		this.route.params.subscribe(
			(params: Params) => {
				const questionId = params.id;
				this.questionId = questionId;
				if (questionId) {
					this.loadQuestionDetails(questionId);
				}
			}
		);
	}


	submit(): void {
		if (!this.questionForm.valid) {
			this.questionForm.markAllAsTouched();
			return;
		}

		const questionModel: QuestionModel = this.questionForm.value;
		this.sanitizeNumberValues(questionModel);

		if (this.questionId) {
			this.questionService.updateQuestion(questionModel).subscribe(() => {
				this.router.navigateByUrl('/details/' + this.questionId);
			});
		} else {
			this.questionService.addQuestion(questionModel).subscribe(() => {
				this.router.navigateByUrl('/list');
			});

		}
	}

	private sanitizeNumberValues(questionModel: QuestionModel) {
		questionModel.Sort = +questionModel.Sort;
		questionModel.Answers.forEach((answer: AnswerModel, index: number) => {
			answer.Sort = +answer.Sort;
		});
	}
}
