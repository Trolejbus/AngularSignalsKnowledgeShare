import { ChangeDetectionStrategy, Component, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-eg30',
  imports: [],
  template: `
    <h2>Example 30</h2>
    <p style="color: #777">linkedSignal</p>

    Original: {{ originalCharacter().name }} <br /><br />
    Current: {{ character().name }} <br /><br />

    <input type="text" (input)="updateText($event)" />

    <br />
    <br />
    <hr />
    <br />

    <button (click)="loadOtherCharacter()">Load other character</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg30 {
  originalCharacter = signal({
    name: 'James',
  });

  character = linkedSignal(() => this.originalCharacter());

  constructor() {}

  updateText(event: Event): void {
    this.character.set({
      name: (event.target as any).value,
    });
  }

  loadOtherCharacter(): void {
    this.originalCharacter.update((x) =>
      x.name === 'Severus Snape'
        ? {
            name: 'James Bond',
          }
        : {
            name: 'Severus Snape',
          },
    );
  }
}
