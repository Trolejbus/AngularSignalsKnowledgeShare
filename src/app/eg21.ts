import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';

// After Render Effect
// afterNextRender
// https://angular.dev/api/core/afterRenderEffect

@Component({
  selector: 'app-eg21',
  imports: [],
  template: `
    <h2>Example 21</h2>
    <p style="color: #777">effect - onCleanup</p>
    {{ counter() }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg21 {
  counter = signal(0);

  constructor() {
    effect((onCleanup) => {
      let iterator = 0;
      const intervalId = setInterval(() => {
        console.log(iterator);
        this.counter.update((x) => x + 1);
      }, 1000);

      onCleanup(() => {
        console.log('onCleanup()');
        clearInterval(intervalId);
      });
    });

    // manualCleanup: true
  }
}
