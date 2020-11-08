import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DicService} from '../Services/dic/dic.service';

@Component({
  selector: 'app-ascii-game',
  templateUrl: './ascii-game.component.html',
  styleUrls: ['./ascii-game.component.scss']
})
export class AsciiGameComponent implements OnInit {
  public ascii: string;
  public word: string;
  public input: string;
  @Input() chatChances = 0;
  public toast = '';
  public isCorrect = -1;
  @Output() countChanged: EventEmitter<number> = new EventEmitter();
  constructor(private ds: DicService) {
  }

  ngOnInit(): void {
    this.getPairs();
  }
  public getPairs(): void{
    const pair = this.ds.getPairs();
    this.ascii = pair.ascii;
    this.word = pair.word;
  }

  public verifyPuzzle(): boolean {
    if (this.input === this.word){
      this.isCorrect = 1;
      this.chatChances++;
      this.countChanged.emit(this.chatChances);
      this.getPairs();
      this.input = '';
      return true;
    }
    else{
      this.isCorrect = 0;
      this.chatChances = 0;
      this.countChanged.emit(this.chatChances);
      return false;

    }
  }
}


