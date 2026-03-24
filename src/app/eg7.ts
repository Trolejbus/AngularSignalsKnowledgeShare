import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, computed, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-eg7',
  imports: [AsyncPipe],
  template: `
    <h2>Example 7</h2>
    <p style="color: #777">
      computed - Is lazy evaluated, which means it will be called only if used
    </p>

    @if (showCharacter()) {
      {{ character() }}<br /><br />
    }

    <button (click)="makeOlder()" style="margin-right: 10px">Make Older</button>
    <button (click)="toggleCharacter()">
      {{ showCharacter() ? 'Hide character' : 'Show character' }}
    </button>
    <br />
    <br />
    <hr />
    <br />
    Computed triggered times: {{ computedTriggered$ | async }}
  `,
})
export class Eg7 {
  private cd = inject(ChangeDetectorRef);

  computedTriggered$ = new BehaviorSubject(0);

  showCharacter = signal(false);
  fullName = signal('Bond');
  age = signal(35);

  character = computed(() => {
    this.computedTriggered$.next(this.computedTriggered$.value + 1);
    return `My name is ${this.fullName()} (${this.age()})`;
  });

  makeOlder(): void {
    this.age.update((x) => x + 1);
  }

  toggleCharacter(): void {
    this.showCharacter.update((x) => !x);
  }

  update(): void {
    this.cd.detectChanges();
  }
}
