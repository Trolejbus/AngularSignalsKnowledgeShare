import { AsyncPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-eg8',
  imports: [AsyncPipe],
  template: `
    <h2>Example 8</h2>
    <p style="color: #888">computed - Is memoized, runs only once even when used multiple times</p>

    {{ characterName() }}<br /><br />
    {{ characterName() }}<br /><br />
    {{ characterName() }}<br /><br />
    {{ characterName() }}<br /><br />

    <button (click)="updateName()">Update name</button>
    <br />
    <br />
    <hr />
    <br />
    Computed triggered times: {{ computedTriggered$ | async }}
  `,
})
export class Eg8 {
  computedTriggered$ = new BehaviorSubject(0);

  character = signal({
    name: 'James Bond',
    age: 35,
  });

  characterName = computed(() => {
    this.computedTriggered$.next(this.computedTriggered$.value + 1);
    return `My name is ${this.character().name}`;
  });

  updateName(): void {
    this.character.update((x) =>
      x.name === 'James Bond'
        ? {
            ...x,
            name: 'Severus Snape',
          }
        : {
            ...x,
            name: 'James Bond',
          },
    );
  }
}
