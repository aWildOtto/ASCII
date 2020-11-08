import { Injectable } from '@angular/core';
// @ts-ignore
import data from '../../../assets/words.json';

@Injectable({
  providedIn: 'root'
})
export class DicService {
  public words = data.words;

  constructor() { }
  public selectRandomWord(): string{
   const word =  this.words[Math.floor(Math.random() * this.words.length)];
   console.log('The word is: ' + word);
   return word;
  }

  public getPairs(): any{
    const word = this.selectRandomWord();
    let ascii = '';
    for (let i = 0; i < word.length; i++) {
      console.log(word.charCodeAt(i).toString());
      ascii = ascii + word.charCodeAt(i).toString();
    }
    console.log('The ascii is: ' + ascii);
    return {word,  ascii};
  }
}
