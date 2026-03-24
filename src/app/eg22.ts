import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxjs-example',
  imports: [AsyncPipe],
  template: `Rxjs Counter: {{ counter$ | async }} {{ notifyBindingsUpdated() }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxjsExample implements DoCheck {
  counter$ = new BehaviorSubject(0);

  increment(): void {
    this.counter$.next(this.counter$.value + 1);
  }

  intervalId = setInterval(() => {
    this.increment();
  }, 1000);

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  notifyBindingsUpdated() {
    console.log('RXJS Bindings Updated');
    return '';
  }

  ngDoCheck(): void {
    console.log('Rxjs Check');
  }
}

@Component({
  selector: 'signal-example',
  template: `Signal Counter: {{ counter() }} {{ notifyBindingsUpdated() }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalExample implements DoCheck {
  counter = signal(0);

  increment(): void {
    this.counter.update((x) => x + 1);
  }

  intervalId = setInterval(() => {
    this.increment();
  }, 1000);

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  notifyBindingsUpdated() {
    console.log('Signal Bindings Updated');
    return '';
  }

  ngDoCheck(): void {
    console.log('Signal Check');
  }
}

@Component({
  selector: 'app-eg22',
  imports: [RxjsExample, SignalExample],
  template: `
    <h2>Example 22</h2>
    <p style="color: #777">Difference between rxjs and signals in change detection</p>

    {{ notifyBindingsUpdated() }}

    @if (signalExample()) {
      <signal-example></signal-example><br /><br />
    }

    @if (rxjsExample()) {
      <rxjs-example></rxjs-example><br /><br />
    }

    <button (click)="toggleSignalExample()">
      {{ signalExample() ? 'Hide signal example' : 'Show signal example' }}
    </button>
    <button (click)="toggleRXJSExample()">
      {{ rxjsExample() ? 'Hide rxjs example' : 'Show rxjs example' }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg22 implements DoCheck {
  signalExample = signal(false);
  rxjsExample = signal(false);

  constructor() {}

  toggleSignalExample(): void {
    this.signalExample.update((x) => !x);
  }

  toggleRXJSExample(): void {
    this.rxjsExample.update((x) => !x);
  }

  notifyBindingsUpdated() {
    console.log('Parent Bindings Updated');
    return '';
  }

  ngDoCheck(): void {
    console.log('Parent Check');
  }
}
