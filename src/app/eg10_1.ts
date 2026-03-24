import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-eg10',
  imports: [JsonPipe],
  template: `
    <h2>Example 10.1</h2>
    <p style="color: #777">computed - Is calculated by batching all changes</p>

    <button (click)="addCharacter()">Add character</button>
    <button (click)="nextPage()">Next page</button>
    <button (click)="previousPage()">Previous page</button>
    <br /><br />
    @if (paginatorVisible()) {
      <div>Page: {{ currentPage() + 1 }} of {{ pagesCount() }}</div>
    }

    <br />
    <div>
      @for (item of pageItems(); track item.id) {
        <div>{{ item | json }}</div>
      }
    </div>
    <br />
    <br />
    <hr />
    <br />
    <button (click)="togglePaginatorVisible()">
      {{ paginatorVisible() ? 'Hide paginator' : 'Show paginator' }}
    </button>
    <button (click)="consoleLogPagesCount()">console log pagesCount</button>
  `,
})
export class Eg10_1 {
  private characters = signal<{ id: number; name: string }[]>([]);
  private pageSize = signal(10);

  paginatorVisible = signal(true);
  currentPage = signal(0);
  pagesCount = computed(() =>
    Math.max(Math.floor(this.characters().length / this.pageSize()) + 1, 1),
  );
  pageItems = computed(() =>
    this.characters().slice(
      this.currentPage() * this.pageSize(),
      (this.currentPage() + 1) * this.pageSize(),
    ),
  );

  addCharacter(): void {
    this.characters.update((x) => [...x, { id: x.length, name: 'James Bond' }]);
  }

  nextPage(): void {
    if (this.currentPage() === this.pagesCount() - 1) {
      return;
    }

    this.currentPage.update((x) => x + 1);
  }

  previousPage(): void {
    if (this.currentPage() === 0) {
      return;
    }

    this.currentPage.update((x) => x - 1);
  }

  togglePaginatorVisible(): void {
    this.paginatorVisible.update((x) => !x);
  }

  consoleLogPagesCount(): void {
    console.log({ ...this.pagesCount });
  }
}
