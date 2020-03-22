export class QuestionModel {
	Quid: string;
	Question: string;
	Sort: number;
	Answers: AnswerModel[];
}

export class AnswerModel {
	Auid: string;
	Answer: string;
	Sort: number;
}
