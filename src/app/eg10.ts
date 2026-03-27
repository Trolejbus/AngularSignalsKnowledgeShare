import { AsyncPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { BehaviorSubject } from 'rxjs';

// https://justangular.com/blog/a-change-detection-zone-js-zoneless-local-change-detection-and-signals-story/
// https://angular.love/the-latest-in-angular-change-detection-zoneless-signals

@Component({
  selector: 'app-eg10',
  imports: [AsyncPipe],
  template: `
    <h2>Example 10</h2>
    <p style="color: #777">computed - Is calculated by batching all changes</p>

    {{ fullName() }}<br /><br />
    {{ fullNameWrapper() }}<br /><br />

    <button (click)="updateName()">Change to Severus Snape</button>
    <button (click)="updateNameWithConsoleLogs()">
      Change to Harry Potter (with console logs)
    </button>
    <button (click)="consoleLogSignals()">Console log signals</button>
    <br />
    <br />
    <hr />
    <br />
    computed triggered times: {{ computedTriggered$ | async }}<br />
  `,
})
export class Eg10 {
  computedTriggered$ = new BehaviorSubject(0);

  name = signal('James');
  surname = signal('Bond');

  fullName = computed(() => {
    this.computedTriggered$.next(this.computedTriggered$.value + 1);
    console.log('fullName calculated');
    return `${this.name()} ${this.surname()}`;
  });

  fullNameWrapper = computed(() => {
    console.log('fullNameWrapper calculated');
    return `Wrapper ${this.fullName()}`;
  });

  updateName(): void {
    this.name.set('Severus');
    this.surname.set('Snape');
  }

  updateNameWithConsoleLogs(): void {
    queueMicrotask(() => console.log('Microtask before'));

    this.name.set('Harry');

    this.surname.set('Potter');
    queueMicrotask(() => console.log('Microtask after'));
  }

  consoleLogSignals(): void {
    console.log('signal', { ...this.name });
    console.log('computed', { ...this.fullName });
  }
}
