import { Injectable } from '@nestjs/common';

import { GameState } from '../models/game-state';

@Injectable()
export class StateService {
  private state?: GameState;

  constructor() {
    this.initializeState();
  }

  public getCurrentState(): GameState | undefined {
    return { ...this.state };
  }

  public resetAllState(): void {
    this.initializeState();
  }

  public patchState(partialState: Partial<GameState>): void {
    this.state = { ...this.state, ...partialState };
  }

  private initializeState(): void {
    this.state = {};
  }
}
