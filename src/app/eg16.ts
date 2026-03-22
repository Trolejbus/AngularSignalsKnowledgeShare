import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-eg16',
  imports: [],
  template: `
    <h2>Example 16</h2>
    <p style="color: #777">effect - when to set signals in effect</p>

    User ID: {{ userId() }}<br /><br />

    <div style="display: flex; margin-bottom: 100px;">
      <div
        [style.color]="selectedTab() == 1 ? 'red' : 'black'"
        style="width: 100px;"
        (click)="changeTab(1)"
      >
        Profile
      </div>
      <div
        [style.color]="selectedTab() == 2 ? 'red' : 'black'"
        style="width: 100px;"
        (click)="changeTab(2)"
      >
        Activities
      </div>
      <div
        [style.color]="selectedTab() == 3 ? 'red' : 'black'"
        style="width: 100px;"
        (click)="changeTab(3)"
      >
        Logs
      </div>
    </div>

    <button (click)="loadDifferentCounter()">Load Different User</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg16 {
  userId = signal(1);
  selectedTab = signal(1);

  constructor() {
    effect(() => {
      this.userId();

      this.selectedTab.set(1);
    });
  }

  changeTab(tabIndex: number): void {
    this.selectedTab.set(tabIndex);
  }

  loadDifferentCounter(): void {
    this.userId.update((x) => x + 1);
  }
}
