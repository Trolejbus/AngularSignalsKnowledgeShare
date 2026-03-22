import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

// https://medium.com/@giorgio.galassi/angular-v19-understanding-the-new-resource-and-rxresource-apis-8a387c7d9351

// https://www.angulararchitects.io/blog/using-the-resource-api-with-the-ngrx-signal-store/

@Component({
  selector: 'app-eg26',
  imports: [JsonPipe],
  template: `
    <h2>Example 26</h2>
    <p style="color: #777">rxResource</p>

    <button (click)="refresh()">Refresh</button>
    <button (click)="loadNext()">Load next</button><br /><br />

    @if (userResource.isLoading()) {
      Loading...
    }

    @if (userResource.hasValue()) {
      {{ userResource.value().title }}
    }

    @if (userResource.error != null) {
      {{ userResource.error() | json }}
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg26 {
  private http = inject(HttpClient);

  userId = signal(1);

  userResource = rxResource({
    params: () => ({ id: this.userId() }),
    stream: ({ params }) =>
      this.http.get<any>(`https://jsonplaceholder.typicode.com/posts/${params.id}`),
  });

  refresh(): void {
    this.userResource.reload();
  }

  loadNext(): void {
    this.userId.update((x) => x + 1);
  }
}
