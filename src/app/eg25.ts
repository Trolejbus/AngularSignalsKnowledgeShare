import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, resource, signal } from '@angular/core';

@Component({
  selector: 'app-eg25',
  imports: [JsonPipe],
  template: `
    <h2>Example 25</h2>
    <p style="color: #777">resource</p>

    <button (click)="refresh()">Refresh</button>
    <button (click)="loadNext()">Load next</button><br /><br />

    @if (userResource.isLoading()) {
      Loading...
    }

    @if (userResource.hasValue()) {
      {{ userResource.value()[0].title }}
    }

    @if (userResource.error != null) {
      {{ userResource.error() | json }}
    }

    <br />
    <br />
    <hr />
    <br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg25 {
  userId = signal(1);

  userResource = resource({
    params: () => ({ id: this.userId() }),
    loader: ({
      params,
      abortSignal,
    }): Promise<{ userId: number; id: number; title: string; body: string }[]> => {
      return fetch(`https://jsonplaceholder.typicode.com/posts/`, { signal: abortSignal }).then(
        (x) => x.json(),
      );
    },
  });

  refresh(): void {
    this.userResource.reload();
  }

  loadNext(): void {
    this.userId.update((x) => x + 1);
  }
}
