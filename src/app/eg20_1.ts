import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-eg20_1',
  imports: [AsyncPipe],
  template: `
    <h2>Example 20_1</h2>
    {{ character$ | async }}
    <br /><br />
    <button (click)="changeCharacter()">Change Character</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg20_1 {
  character = signal('James');

  character$ = toObservable(this.character).pipe(tap((x) => console.log('Rxjs updated')));

  changeCharacter(): void {
    queueMicrotask(() => console.log('Microtask'));
    this.character.update((x) => (x === 'James' ? 'Severus' : 'James'));

    this.character$.pipe(take(1)).subscribe((x) => {
      console.log(x);
    });
  }
}
