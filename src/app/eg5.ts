import { AsyncPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-eg5',
  imports: [AsyncPipe],
  template: `
    <h2>Example 5</h2>
    <p style="color: #777">
      computed - Combining multiple signals - trigger computed only for used signal
    </p>

    Character: {{ character() }}<br /><br />

    <button (click)="toggleName()" style="margin-right: 10px">Toggle Name</button>
    <button (click)="makeOlder()" style="margin-right: 10px">Make Older</button>
    <button (click)="toggleDisplayAge()" style="margin-right: 10px">
      {{ displayAge() ? 'Hide age' : 'Show age' }}
    </button>

    <br />
    <br />
    <hr />
    <br />
    Computed triggered times: {{ computedTriggered$ | async }}
  `,
})
export class Eg5 {
  displayAge = signal(true);

  fullName = signal('Bond');
  age = signal(35);
  computedTriggered$ = new BehaviorSubject(0);

  character = computed(() => {
    let result = this.fullName();
    if (this.displayAge()) {
      result += ` (${this.age()})`;
    }

    this.computedTriggered$.next(this.computedTriggered$.value + 1);
    return result;
  });

  toggleName(): void {
    this.fullName.set(this.fullName() === 'Bond' ? 'James Bond' : 'Bond');
  }

  makeOlder(): void {
    this.age.update((x) => x + 1);
  }

  toggleDisplayAge(): void {
    this.displayAge.update((x) => !x);
  }
}
