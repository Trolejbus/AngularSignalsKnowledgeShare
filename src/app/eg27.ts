import { JsonPipe } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

// https://medium.com/@giorgio.galassi/angular-v19-understanding-the-new-resource-and-rxresource-apis-8a387c7d9351
// https://www.angulararchitects.io/blog/using-the-resource-api-with-the-ngrx-signal-store/

@Component({
  selector: 'app-eg27',
  imports: [JsonPipe],
  template: `
    <h2>Example 27</h2>
    <p style="color: #777">httpResource</p>

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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg27 {
  userId = signal(1);

  userResource = httpResource<{ title: string }[]>(() => ({
    url: `https://jsonplaceholder.typicode.com/posts`,
    method: 'GET',
    params: { userId: this.userId() },
    headers: {
      'Content-Type': 'application/json',
    },
  }));

  refresh(): void {
    this.userResource.reload();
  }

  loadNext(): void {
    this.userId.update((x) => x + 1);
  }
}
