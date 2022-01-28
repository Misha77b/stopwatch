import './App.css';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Observable, Subject } from 'rxjs';
import { map, buffer, debounceTime, takeUntil, filter } from 'rxjs/operators';
import ClockFace from './components/ClockFace/ClockFace';
import ContolButtons from './components/ControlButtons/ContolButtons';

const App = () => {
  const [time, setTime] = useState(0);
  const [startCounting, setStartCounting] = useState(false);

  const stop$ = useMemo(() => new Subject(), []);
  const click$ = useMemo(() => new Subject(), []);

  useEffect(() => {
    let interval = null;

    if (startCounting) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!startCounting) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [startCounting]);




  const start = () => {
    setStartCounting(true);
  };

  const stop = () => {
    setStartCounting(false)
  };

  const reset = () => {
    setTime(0);
    setStartCounting(false)
  };

  const wait = useCallback(() => {
    click$.next();
    setStartCounting(false);
    click$.next();
  }, []);

  useEffect(() => {
    const doubleClick$ = click$.pipe(
      buffer(click$.pipe(debounceTime(300))),
      map((list) => list.length),
      filter((value) => value >= 2),
    );
    const timer$ = new Observable((observer) => {
      let count = 0;
    });

    const subscribtion$ = timer$
      .pipe(takeUntil(doubleClick$))
      .pipe(takeUntil(stop$))
      .subscribe({
        next: () => {
          if (startCounting) {
            setTime((prev) => prev + 1);
          }
        },
      });

    return (() => {
      subscribtion$.unsubscribe();
    });
  }, [startCounting]);

  return (
    <div className="App">
      <h1> Stopwatch </h1>
      <ClockFace time={time} />
      <ContolButtons start={start} stop={stop} reset={reset} wait={wait} />
    </div>
  );
}

export default App;
