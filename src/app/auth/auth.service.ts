import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface SignupCredentials {
  username: string;
  password: string;
  passwordConfirmation: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  usernameAvailable(username: string) {
    return this.http.post<{ available: boolean }>(
      `${this.rootUrl}/auth/username`,
      {
        username,
      }
    );
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<{ username: string }>(
      `${this.rootUrl}/auth/signup`,
      credentials
    ).pipe(
      tap(() => {
        this.signedIn$.next(true);
      })
    )
  }
}
