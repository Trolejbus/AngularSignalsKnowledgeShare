import { httpResource } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injectable,
  Signal,
} from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

// https://ngrx.io/guide/signals/faq (#3 question)

type UserState = {
  currentPage: number;
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

const initialState: UserState = {
  currentPage: 1,
};

@Injectable({ providedIn: 'root' })
export class UserStore {
  private userApi = inject(UsersApi);
  private state = signalState(initialState);
  private userResource = this.userApi.usersResource(this.state.currentPage);

  users = computed(() => this.userResource.value());
  usersLoading = computed(() => this.userResource.isLoading());
  usersError = computed(() => this.userResource.error());

  constructor() {}

  nextUser(): void {
    const newPage = this.state.currentPage() + 1;
    patchState(this.state, { currentPage: newPage });
  }
}

@Component({
  selector: 'app-eg29',
  template: `
    <h2>Example 29</h2>
    <p style="color: #777">ngrx signal store (class syntax)</p>

    @if (store.usersLoading()) {
      Loading....
    } @else if (store.usersError()) {
      Error occured while loading users!
    } @else {
      {{ store.users()![0].title }}<br /><br />
      <button (click)="store.nextUser()">next</button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Eg29 {
  protected readonly store = inject(UserStore);
}
