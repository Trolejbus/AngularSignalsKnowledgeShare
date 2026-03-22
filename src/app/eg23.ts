import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';

@Component({
  selector: 'character-view',
  template: `
    Child: {{ counter() }} <br /><br />
    <button (click)="increment()">Increment Child</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterView {
  counter = model.required<number>();

  increment(): void {
    this.counter.update((x) => x + 1);
  }
}

@Component({
  selector: 'app-eg23',
  imports: [CharacterView],
  template: `
    <h2>Example 23</h2>
    <p style="color: #777">model</p>

    <character-view [(counter)]="counter"></character-view>

    <br />
    <br />
    <hr />
    <br />

    Counter: {{ counter() }} <br /><br />
    <button (click)="increment()">Increment Parent</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg23 {
  counter = signal(0);

  increment(): void {
    this.counter.update((x) => x + 1);
  }
}
