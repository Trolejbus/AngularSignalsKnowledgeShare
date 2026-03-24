import { JsonPipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-eg16',
  imports: [JsonPipe],
  template: `
    <h2>Example 16</h2>
    <p style="color: #777">effect - is also batching changes & tracking only</p>

    {{ counter() }}<br /><br />
    <button (click)="increment()">+1</button>
    <br />
    <br />
    <hr />
    <br />
    {{ invocations | json }}<br />
  `,
})
export class Eg16 {
  counter = signal(0);
  invocations: number[] = [];

  increment(): void {
    this.counter.update((x) => x + 1);
    this.counter.update((x) => x + 1);
  }

  constructor() {
    effect(() => {
      console.log('effect run');
      this.invocations.push(this.counter());
    });

    console.log('after effect');
  }
}
