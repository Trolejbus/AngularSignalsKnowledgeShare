import { JsonPipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-eg13',
  imports: [JsonPipe],
  template: `
    <h2>Example 13</h2>
    <p style="color: #777">effect - used for side effects</p>

    {{ counter() }}<br /><br />
    <button (click)="increment()">+1</button>
    <br />
    <br />
    <hr />
    <br />
    {{ invocations | json }}<br />
  `,
})
export class Eg13 {
  counter = signal(0);
  invocations: number[] = [];

  increment(): void {
    this.counter.update((x) => x + 1);
  }

  constructor() {
    effect(() => {
      this.invocations.push(this.counter());
    });
  }
}
