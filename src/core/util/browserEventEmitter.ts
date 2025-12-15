// Lightweight browser-compatible EventEmitter replacement.
// Provides the minimal API used in the project: on, off, emit.
export class EventEmitter {
  private listeners: Map<string, Set<(...args: any[]) => void>> = new Map();

  on(event: string, callback: (...args: any[]) => void) {
    let set = this.listeners.get(event);
    if (!set) {
      set = new Set();
      this.listeners.set(event, set);
    }
    set.add(callback);
    return this;
  }

  off(event: string, callback: (...args: any[]) => void) {
    const set = this.listeners.get(event);
    if (!set) return this;
    set.delete(callback);
    if (set.size === 0) this.listeners.delete(event);
    return this;
  }

  emit(event: string, ...args: any[]) {
    const set = this.listeners.get(event);
    if (!set) return false;
    // iterate over a copy to avoid issues if listeners mutate during emit
    for (const cb of Array.from(set)) {
      try {
        cb(...args);
      } catch (e) {
        // swallow errors to mimic EventEmitter behaviour but log to console for debugging
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
    return true;
  }
}

export default EventEmitter;
