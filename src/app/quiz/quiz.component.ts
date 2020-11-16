import { Component, OnInit } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import {Router} from '@angular/router';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizes: any;
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  title: string;
  config: QuizConfig = {'allowBack': true};


  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  correctAnswersCount = 0;
  constructor(private quizService: QuizService, private router : Router) { } //DI

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.title = this.quizes.id;
    this.startQuiz(this.title);
  }

  startQuiz(title: string) {
    this.quizService.get(title).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
    });
    this.mode = 'quiz';
  }

  get questionnaire() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? ' Answered' : ' Not Answered';
  };

  isCorrect(question: Question) {
    if (question.options.every(x => x.selected === x.isAnswer)) {     
      this.correctAnswersCount++;
    }
    return question.options.every(x => x.selected === x.isAnswer) ? ' correct' : ' wrong';
  };

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));
    this.quiz.questions.forEach((question)=>{
    question.verdict = this.isCorrect(question);
    })
    this.mode = 'result';
    
  }
}
