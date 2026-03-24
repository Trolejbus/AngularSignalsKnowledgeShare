import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-eg11',
  imports: [],
  template: `
    <h2>Example 11</h2>
    <p style="color: #777">
      computed - batching changes will calculate for last value set for signal
    </p>

    {{ characterName() }}<br /><br />
    <button (click)="setName()">Set Name</button>
  `,
})
export class Eg11 {
  name = signal('James');

  characterName = computed(() => {
    const name = this.name();
    if (name === 'Voldemort') {
      throw new Error('Voldemort is not supported');
    }

    return `Hello ${name}`;
  });

  setName(): void {
    this.name.set('Voldemort');
    this.name.set('Severus');
  }
}
