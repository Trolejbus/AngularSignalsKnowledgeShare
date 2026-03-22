import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-eg15',
  imports: [],
  template: `
    <h2>Example 15</h2>
    <p style="color: #777">effect - allowSignalWrites</p>

    Counter 1: {{ counter1() }}<br /><br />
    Counter 2: {{ counter2() }}<br /><br />
    <button (click)="incrementCounter1()">Counter1 +1</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg15 {
  counter1 = signal(0);
  counter2 = signal(0);
  counter2Wrapper = computed(() => `${this.counter2()}`);
  otherCounter = signal(0);
  invocations: number[] = [];

  incrementCounter1(): void {
    console.log('Counter1 +1 clicked');
    queueMicrotask(() => console.log('Microtask 1'));
    this.counter1.update((x) => x + 1);
  }

  constructor() {
    effect(() => {
      queueMicrotask(() => console.log('Microtask 2'));
      console.log('effect 1');
      this.counter2.set(this.counter1());
    });

    effect(() => {
      this.counter2Wrapper();
      console.log('effect 2');
    });
  }
}
