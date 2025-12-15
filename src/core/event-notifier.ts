let i = 1;
export default class EventNotifier {
  public static ROOT = new EventNotifier();
  public name = "";
  public id = i++;
  private listeners = {} as any;
  private parent: EventNotifier = EventNotifier.ROOT;
  private children: EventNotifier[] = [];

  setParent(parent: EventNotifier) {
    if (parent !== this.parent) {
      this.removeFromParent();
      this.parent = parent;
      this.parent.children.push(this);
    }
  }

  public notifyApp(event: string, ...data: any[]) {
    // Extract the last argument if it's a boolean for emitToParent
    let args = data;

    // Check if the last argument is a boolean (for backward compatibility)
    if (data.length > 0 && typeof data[data.length - 1] === "boolean") {
      args = data;
    }

    let propagate = true;
    if (this.listeners[event]) {
      propagate = !this.listeners[event].find((l: Function) => {
        try {
          return (l && l.apply(null, args)) === false;
        } catch (e) {
          console.error(e);
        }
        return true;
      });
    }
  }

  public notify(event: string, args: any[], emitToParent = false) {
    let propagate = true;
    if (this.listeners[event]) {
      propagate = !this.listeners[event].find((l: Function) => {
        try {
          return (l && l.apply(null, args)) === false;
        } catch (e) {
          console.error(e);
        }
        return true;
      });
    }
    if (propagate) {
      if (emitToParent) {
        this.parent?.notify(event, args, true);
      } else {
        this.children.forEach(c => {
          c.notify(event, args);
        });
      }
    }
  }

  public subscribe(event: string, fn: Function) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.unsubscribe(event, fn);
    };
  }

  public unsubscribe(event: string, fn: Function) {
    if (!this.listeners[event]) return;
    const index = this.listeners[event].findIndex((listener: Function) => listener === fn);
    if (index !== -1) {
      this.listeners[event].splice(index, 1);
      if (this.listeners[event].length === 0) {
        delete this.listeners[event];
      }
    }
  }

  private removeFromParent() {
    if (this.parent) {
      const i = this.parent.children.indexOf(this) || -1;
      if (i >= 0) {
        this.parent.children.splice(i, 1);
      }
      this.parent = null as any;
    }
  }

  public destroy() {
    this.removeFromParent();
    this.listeners = {};
  }
}

export function eventObserver() {
  let observers: any[] = [];

  return {
    subscribe(callback: any) {
      observers.push(callback);
      return () => {
        observers = observers.filter(obs => obs !== callback);
      };
    },

    next(value: any) {
      observers.forEach(callback => callback(value));
    },

    unsubscribe(callback: any) {
      observers = observers.filter(obs => obs !== callback);
    },
  };
}
