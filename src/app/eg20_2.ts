import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-eg20_2',
  imports: [],
  template: `
    <h2>Example 20_2</h2>
    {{ character() ?? 'no value' }}
    <br /><br />
    <button (click)="changeCharacter()">Change Character</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg20_2 {
  character1 = false;
  character$ = new Subject<string>();

  character = toSignal(this.character$); // requireSync: true
  characterWithInitial = toSignal(this.character$, { initialValue: 'Harry' });

  constructor() {
    effect(() => {
      console.log(this.character());
    });
  }

  changeCharacter(): void {
    this.character$.next(this.character1 ? 'Severus' : 'James');
    this.character1 = !this.character1;
  }
}
