import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { concatMap, first, fromEvent, interval, map, mergeMap, Observable, scan, startWith, Subject, switchMap, take, takeUntil, takeWhile, tap, timer, withLatestFrom } from 'rxjs';

interface ClickEvent {
  x: number;
  y: number;
}

interface CombinedEvent {
  x: number;
  y: number;
  time: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  //task 1
  // public source$!: Observable<number>;

  // ngOnInit(): void {
  //   this.source$ = interval(1000).pipe(
  //     map(value => value + 1),
  //     switchMap(value =>
  //       interval(value % 2 === 0 ? 500 : 1000).pipe(map(() => value))
  //     )
  //   );

  //   this.source$.subscribe(value => console.log(value));
  // }




  //task 2
  clicks$!: Observable<ClickEvent>;
  timer$!: Observable<number>;
  combined$!: Observable<CombinedEvent>;

  lastClick: CombinedEvent | null = null;

  ngOnInit(): void {
    this.clicks$ = fromEvent<MouseEvent>(document, 'click').pipe(
      map(event => ({ x: event.clientX, y: event.clientY }))
    );

    this.timer$ = interval(1000);

    this.combined$ = this.clicks$.pipe(
      withLatestFrom(this.timer$),
      map(([click, time]) => ({ ...click, time }))
    );

    this.combined$.subscribe(event => {
      this.lastClick = event;
    });
  }

}




