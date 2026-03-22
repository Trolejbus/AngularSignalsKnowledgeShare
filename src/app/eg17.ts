import { JsonPipe } from '@angular/common';
import { Component, effect, EffectRef, inject, Injector, signal } from '@angular/core';

@Component({
  selector: 'app-eg17',
  imports: [JsonPipe],
  template: `
    <h2>Example 17</h2>
    <p style="color: #777">effect - how to create effect outside of constructor</p>

    {{ counter() }}<br /><br />
    <button (click)="incremenent()">+1</button>
    <button (click)="startListening()">Start listening</button>
    <button (click)="stopListening()">Stop listening</button>
    <br />
    <br />
    <hr />
    <br />
    {{ invocations | json }}<br />
  `,
})
export class Eg17 {
  private injector = inject(Injector);
  counter = signal(0);
  invocations: number[] = [];
  effectRef: EffectRef | null = null;

  incremenent(): void {
    this.counter.update((x) => x + 1);
  }

  startListening(): void {
    this.effectRef = effect(
      () => {
        this.invocations.push(this.counter());
      },
      { injector: this.injector },
    );
  }

  stopListening(): void {
    this.effectRef?.destroy();
  }

  constructor() {}
}
