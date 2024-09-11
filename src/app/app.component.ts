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
  combined$!: Observable<CombinedEvent>;

  ngOnInit(): void {
    const timer$ = interval(1000);

    this.combined$ = fromEvent<MouseEvent>(document, 'click').pipe(
      map(event => ({ x: event.clientX, y: event.clientY })),
      withLatestFrom(timer$),
      map(([click, time]) => ({ ...click, time }))
    );

  }

}




