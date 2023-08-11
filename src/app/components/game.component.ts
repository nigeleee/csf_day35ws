import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Game } from '../model/game';
import { GameService } from '../services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  // KIV read up on it
  changeDetection : ChangeDetectionStrategy.Default,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  @Input() pagePerRec = 0;
  games!: Game[];
  currentIndex: number = 0;
  pageNo: number = 1;
  sub$!: Subscription;

  constructor(private gameService : GameService) {}

  ngOnDestroy(): void {
    this.sub$.unsubscribe()
;  }

previousPage() {
  this.pageNo--;
  this.currentIndex = this.currentIndex - this.pagePerRec;
  this.fetchData(this.pagePerRec, this.currentIndex);
}

nextPage() {
  this.pageNo++;
  this.currentIndex = this.currentIndex + this.pagePerRec;
  this.fetchData(this.pagePerRec, this.currentIndex);
}

  ngOnInit(): void {
    console.log("pagePerRec" + this.pagePerRec)
    if(this.pagePerRec == null)
      this.pagePerRec = 5;
      this.sub$ = this.gameService.getGames(this.pagePerRec, this.currentIndex).subscribe(((result : any) => {
        this.games = result.games;
        console.log(this.games.length);
      }))
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['pagePerRec'].currentValue == null)
      this.pagePerRec = 5;
    else
      this.pagePerRec = changes['pagePerRec'].currentValue;

    this.gameService.getGames(this.pagePerRec, this.currentIndex).subscribe((result:any) => {
      this.games = result.games;
      console.log(this.games.length);
    })

    }

    private fetchData(pagePerRec: number, currentIndex: number) {
      this.gameService.getGames(pagePerRec, currentIndex).subscribe((result : any ) => {
        this.games = result.games;
      })
    }

}
