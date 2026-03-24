import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-eg4',
  imports: [],
  template: `
    <h2>Example 4</h2>
    <p style="color: #777">computed - computes values based on other signals</p>

    {{ characterName() }}<br /><br />
    <button (click)="changeName()">Change Name</button>
  `,
})
export class Eg4 {
  fullName = signal('Bond');

  characterName = computed(() => `My name is ${this.fullName()}`);

  changeName(): void {
    this.fullName.set('James Bond');
  }
}
