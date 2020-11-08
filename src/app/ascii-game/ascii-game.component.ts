import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DicService} from '../Services/dic/dic.service';
import {interval, Subscription} from 'rxjs';

@Component({
  selector: 'app-ascii-game',
  templateUrl: './ascii-game.component.html',
  styleUrls: ['./ascii-game.component.scss']
})
export class AsciiGameComponent implements OnInit {
  public ascii: string;
  public word: string;
  public input: string;
  private timerInterval;
  @Input() chatChances = 0;
  public toast = '';
  public isCorrect = -1;
  private worker: Subscription;
  private MAXCOUNT = 20;
  public timer = this.MAXCOUNT;

  @Output() countChanged: EventEmitter<number> = new EventEmitter();

  constructor(private ds: DicService) {
  }

  ngOnInit(): void {
    this.restartTimer();
  }

  public getPairs(): void {
    const pair = this.ds.getPairs();
    this.timer = this.MAXCOUNT;
    this.ascii = pair.ascii;
    this.word = pair.word;
  }

  private restartTimer(): void {
    this.getPairs();
    if (this.timerInterval) {
      this.timer = this.MAXCOUNT;
      clearInterval(this.timerInterval);
    }
    this.timerInterval = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {

        this.getPairs();
      }
    }, 1000);
  }

  public verifyPuzzle(): boolean {
    if (this.input === this.word) {
      this.isCorrect = 1;
      this.chatChances++;
      this.countChanged.emit(this.chatChances);
      this.restartTimer();

      this.input = '';
      return true;
    } else {
      this.isCorrect = 0;
      this.chatChances = 0;
      this.countChanged.emit(this.chatChances);
      this.restartTimer();

      return false;

    }
  }
}


