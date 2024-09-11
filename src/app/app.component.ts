import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { catchError, concat, concatMap, delay, finalize, first, fromEvent, iif, interval, map, mergeMap, Observable, of, onErrorResumeNext, retry, retryWhen, scan, startWith, Subject, switchMap, take, takeUntil, takeWhile, tap, throttleTime, throwError, timer, withLatestFrom } from 'rxjs';

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
  // combined$!: Observable<CombinedEvent>;

  // ngOnInit(): void {
  //   const timer$ = interval(1000);

  //   this.combined$ = fromEvent<MouseEvent>(document, 'click').pipe(
  //     map(event => ({ x: event.clientX, y: event.clientY })),
  //     withLatestFrom(timer$),
  //     map(([click, time]) => ({ ...click, time }))
  //   );

  // }


  //task 3
  // data$!: Observable<number[]>;

  // ngOnInit(): void {
  //   const rawData$: Observable<number> = this.simulateDataStream();

  //   this.data$ = rawData$.pipe(
  //     tap((res) => console.log('before map:', res)),
  //     map(value => [value * 2]),
  //     startWith([]),
  //     catchError(err => {
  //       console.error('Error occurred:', err); 
  //       return of([-2]); 
  //     }),
  //     scan((acc: number[], curr: number[]) => {
  //       console.log('acc:', acc)
  //       console.log('curr:', curr)
  //       return acc.concat(curr)
  //     }),
  //   );
  // }

  // simulateDataStream(): Observable<number> {
  //   const values = [1, 2, 3, 4, 5];

  //   return of(...values).pipe(
  //     concatMap((val, index) => {
  //       if (index === 3) {
  //         return throwError(() => new Error('Ошибка на индексе 3')).pipe(delay(1000));
  //       }
  //       console.log('val:', val)
  //       return of(val).pipe(delay(1000));
  //     }),
  //   );
  // }

  //task 4
  result$!: Observable<string>;

  ngOnInit(): void {
    this.result$ = fromEvent<MouseEvent>(document, 'click').pipe(
      throttleTime(2000), 
      switchMap(() => timer(0, 2000).pipe( 
        takeUntil(timer(5000)) 
      )),
      map(() => `Клик зарегистрирован в ${new Date().toLocaleTimeString()}`), 
      startWith('Ожидание кликов...') 
    );
  }
}


