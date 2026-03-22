import { AsyncPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-eg7',
  imports: [AsyncPipe],
  template: `
    <h2>Example 7</h2>
    <p style="color: #777">computed - Is memoized, runs only once even when used multiple times</p>

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
export class Eg7 {
  computedTriggered$ = new BehaviorSubject(0);

  character = signal({
    name: 'Bond',
    age: 35,
  });

  characterName = computed(() => {
    this.computedTriggered$.next(this.computedTriggered$.value + 1);
    return `My name is ${this.character().name}`;
  });

  updateName(): void {
    this.character.update((x) => ({
      ...x,
      name: 'James Bond',
    }));
  }
}
