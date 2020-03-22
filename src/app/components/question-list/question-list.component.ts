import {Component, OnInit, ViewChild} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {QuestionModel} from '../../models/question.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';


@Component({
	selector: 'app-question-list',
	templateUrl: './question-list.component.pug',
	styleUrls: ['./question-list.component.sass']
})
export class QuestionListComponent implements OnInit {
	loading: boolean = true;

	questionList: QuestionModel[];

	constructor(private questionService: QuestionService) {
	}

	ngOnInit(): void {
		this.loadQuestions();
	}

	private loadQuestions() {
		this.questionService.loadQuestionList().subscribe((data: QuestionModel[]) => {
			this.questionList = data;
			this.loading = false;
		});
	}
}
