import { Injectable } from '@angular/core';
import { LocalStorageConstants } from '../constants';

@Injectable()
export class LocalStorageService {

  constructor() { }

  getSessions(): number {
    return parseInt(localStorage.getItem(LocalStorageConstants.SESSIONS_KEY) || '0', 10);
  }

  setSessions(sessions: number): void {
    localStorage.setItem(LocalStorageConstants.SESSIONS_KEY, sessions.toString());
  }

}
