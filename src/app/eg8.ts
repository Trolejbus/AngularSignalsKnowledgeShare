import { AsyncPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-eg8',
  imports: [AsyncPipe],
  template: `
    <h2>Example 7</h2>
    <p style="color: #777">computed - Will trigger computed only when changes</p>
    <p style="color: #777">signal() is not memoized</p>

    {{ displayedComputed() }}<br /><br />

    <button (click)="updateName('James Bond')">Update to Bond</button>
    <button (click)="updateName('Severus Snape')">Update to Severus</button>
    <br />
    <br />
    <hr />
    <br />
    computedCharacterName triggered times: {{ computedCharacterNameTriggered$ | async }}<br />
    computedDisplayed triggered times: {{ displayedComputedTriggered$ | async }}
  `,
})
export class Eg8 {
  computedCharacterNameTriggered$ = new BehaviorSubject(0);
  displayedComputedTriggered$ = new BehaviorSubject(0);

  character = signal({
    name: 'Bond',
    age: 35,
  });

  displayedComputed = computed(() => {
    this.displayedComputedTriggered$.next(this.displayedComputedTriggered$.value + 1);
    return `Human said: ${this.characterName()}`;
  });

  characterName = computed(() => {
    this.computedCharacterNameTriggered$.next(this.computedCharacterNameTriggered$.value + 1);
    return `My name is ${this.character().name}`;
  });

  updateName(name: string): void {
    this.character.update((x) => ({
      ...x,
      name,
    }));
  }
}
