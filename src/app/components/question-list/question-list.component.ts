import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {QuestionModel} from '../../models/question.model';


@Component({
	selector: 'app-question-list',
	templateUrl: './question-list.component.pug',
	styleUrls: ['./question-list.component.sass']
})
export class QuestionListComponent implements OnInit {
	questionList: QuestionModel[];

	constructor(private questionService: QuestionService) {
	}

	ngOnInit(): void {
		this.questionService.loadQuestionList().subscribe((data: QuestionModel[]) => {
			this.questionList = data;
		})
	}

}
