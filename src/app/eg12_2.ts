import { AsyncPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-eg12_2_2',
  imports: [AsyncPipe],
  template: `
    <h2>Example 12_2</h2>
    <p style="color: #777">computed - can set equal to determine if computed was changed</p>

    {{ name() }}<br /><br />

    <button (click)="peek()">Peek computed</button>
    <button (click)="nextCharacter()">Next character</button>
    <br />
    <br />
    <hr />
    <br />
    computed triggered times: {{ computedTriggered$ | async }}<br />
  `,
})
export class Eg12_2 {
  computedTriggered$ = new BehaviorSubject(0);

  name = signal('James');

  characterName = computed(() => {
    this.computedTriggered$.next(this.computedTriggered$.value + 1);
    return `My name is ${this.name()}`;
  });

  peek(): void {
    this.name.set(this.characterName());
  }

  nextCharacter(): void {
    this.name.update((x) => (x.includes('James') ? 'Severus' : 'James'));
  }
}
