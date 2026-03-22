import { ChangeDetectionStrategy, Component, computed, DoCheck, signal } from '@angular/core';

@Component({
  selector: 'app-eg20',
  imports: [],
  template: `
    <h2>Example 20</h2>
    <p style="color: #777">
      effect - difference in change detection between 'character().age' and 'characterAge()'
    </p>

    <p>{{ displayComputed() ? 'characterAge()' : 'character().age' }}</p>

    @if (displayComputed()) {
      Character age: {{ characterAge() }}<br /><br />
    } @else {
      Character age: {{ character().age }}<br /><br />
    }

    <button (click)="toggleDisplayComputed()">
      {{ displayComputed() ? 'character().age' : 'characterAge()' }}
    </button>

    {{ notifyBindingsUpdated() }}
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg20 implements DoCheck {
  displayComputed = signal(true);

  character = signal({
    age: 30,
  });

  characterAge = computed(() => this.character().age);

  constructor() {
    setInterval(() => {
      this.character.set({
        ...this.character,
        age: 30,
      });
    }, 1000);
  }

  toggleDisplayComputed(): void {
    this.displayComputed.update((x) => !x);
  }

  notifyBindingsUpdated() {
    console.log('Parent Bindings Updated');
    return '';
  }

  ngDoCheck(): void {
    console.log('Check');
  }
}
