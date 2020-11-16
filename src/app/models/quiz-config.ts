export class QuizConfig {
    allowBack: boolean;
   
   constructor(data: any) {
       data = data || {};
        this.allowBack = data.allowBack;       
   }
}
