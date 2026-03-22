import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, Injectable, Signal } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

// https://www.angulararchitects.io/blog/using-the-resource-api-with-the-ngrx-signal-store/
// https://medium.com/@schnabelelisa0/integrating-httpresource-with-signalstore-in-angular-4962fdc22a2e

type UserState = {
  currentPage: number;
};

const initialState: UserState = {
  currentPage: 1,
};

@Injectable({ providedIn: 'root' })
export class UsersApi {
  public usersResource(userId: Signal<number>) {
    return httpResource<User[]>(() => ({
      url: `https://jsonplaceholder.typicode.com/posts`,
      method: 'GET',
      params: { userId: userId() },
      headers: {
        'Content-Type': 'application/json',
      },
    }));
  }
}

export interface User {
  title: string;
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withProps(() => ({
    usersApi: inject(UsersApi),
  })),
  withProps(({ usersApi, currentPage }) => ({
    _users: usersApi.usersResource(currentPage),
  })),
  withComputed(({ _users }) => ({
    users: () => {
      return _users.hasValue() ? _users.value() : [];
    },
    usersLoading: () => {
      return _users.isLoading();
    },
    usersError: () => {
      return _users.error();
    },
  })),
  withMethods((store) => ({
    nextUser: () => {
      const newPage = store.currentPage() + 1;
      patchState(store, { currentPage: newPage });
    },
  })),
);

@Component({
  selector: 'app-eg28',
  template: `
    <h2>Example 28</h2>
    <p style="color: #777">ngrx signal store</p>

    @if (store.usersLoading()) {
      Loading....
    } @else if (store.usersError()) {
      Error occured while loading users!
    } @else {
      {{ store.users()[0].title }}<br /><br />
      <button (click)="store.nextUser()">next</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg28 {
  protected readonly store = inject(UserStore);
}
