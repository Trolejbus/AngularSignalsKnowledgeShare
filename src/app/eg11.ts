import { Component, computed, signal, untracked } from '@angular/core';

@Component({
  selector: 'app-eg11',
  imports: [],
  template: `
    <h2>Example 11</h2>
    <p style="color: #777">computed - untracked will not trigger computation on change</p>

    {{ characterName() }}<br /><br />
    <button (click)="toggleName()">Change Name</button>
    <button (click)="makeOlder()">Make Older</button>
  `,
})
export class Eg11 {
  name = signal('James');
  age = signal(30);

  characterName = computed(() => `${this.name()} (${untracked(() => this.age())})`);

  toggleName(): void {
    this.name.update((x) => (x == 'James' ? 'Harry' : 'James'));
  }

  makeOlder(): void {
    this.age.update((x) => x + 1);
  }
}
