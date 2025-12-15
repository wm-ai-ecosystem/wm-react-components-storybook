import { ActionConfig, BaseAction } from "./base-action";
import { VariableEvents } from "@wavemaker/react-runtime/variables/base-variable";
import { merge } from "lodash-es";

export interface TimerActionConfig extends ActionConfig {
  repeating: boolean;
  delay: number;
  _context: any;
}

export class TimerAction extends BaseAction<TimerActionConfig> {
  private _timerId: number | NodeJS.Timeout = -1;
  private _isActive: boolean = false;
  private _onSuccess?: Function;
  private _onError?: Function;

  constructor(config: TimerActionConfig) {
    super(config);
  }

  public invoke(
    params?: Record<string, any>,
    onSuccess?: Function,
    onError?: Function
  ): Promise<TimerAction> {
    params = params?.data
      ? merge(this.config.paramProvider(), params.data)
      : merge(this.config.paramProvider(), this.dataSet);

    // Notify that we're about to invoke
    this.notify(VariableEvents.BEFORE_INVOKE, [this, this.dataSet]);

    return super
      .invoke(params, onSuccess, onError)
      .then(() => {
        // Start the timer
        this.startTimer();

        // Store the callbacks for later use when timer fires
        this._onSuccess = onSuccess;
        this._onError = onError;
      })
      .then(() => {
        this.notify(VariableEvents.AFTER_INVOKE, [this, this.dataSet]);
        return this;
      });
  }

  /**
   * Starts the timer based on configuration
   */
  private startTimer(): void {
    // Cancel any existing timer first
    this.cancel();

    const { repeating, delay } = this.config;
    this._isActive = true;

    const executeCallback = () => {
      try {
        // Call the configured success handler
        this.config.onSuccess && this.config.onSuccess(this, this.dataSet);

        this._onSuccess && this._onSuccess(this, this.dataSet);

        this.notify(VariableEvents.SUCCESS, [this, this.dataSet]);
      } catch (error) {
        console.error("Error in timer callback:", error);

        // Call the configured error handler
        this.config.onError && this.config.onError(this, error);

        this._onError && this._onError(this, error);

        this.notify(VariableEvents.ERROR, [this, error]);
      }
    };

    if (repeating) {
      this._timerId = setInterval(executeCallback, delay);
    } else {
      this._timerId = setTimeout(() => {
        executeCallback();
        this._isActive = false;
        this._timerId = -1;
      }, delay);
    }
  }

  //   Cancel  active timer
  public cancel(): void {
    if (this._timerId !== -1) {
      if (this.config.repeating) {
        clearInterval(this._timerId as NodeJS.Timeout);
      } else {
        clearTimeout(this._timerId as NodeJS.Timeout);
      }
      this._timerId = -1;
      this._isActive = false;
    }
  }

  // Pauses the timer (alias for cancel)
  public pause(): void {
    this.cancel();
  }

  // Resumes the timer (if it was paused)
  public resume(): void {
    if (!this._isActive) {
      this.startTimer();
    }
  }

  public trigger(): Promise<TimerAction> {
    // Notify we're about to trigger
    this.notify(VariableEvents.BEFORE_INVOKE, [this, this.dataSet]);

    // Execute callback immediately
    try {
      this.config.onSuccess && this.config.onSuccess(this, this.dataSet);

      this._onSuccess && this._onSuccess(this, this.dataSet);

      this.notify(VariableEvents.SUCCESS, [this, this.dataSet]);
    } catch (error) {
      console.error("Error in timer trigger:", error);

      this.config.onError && this.config.onError(this, error);

      this._onError && this._onError(this, error);

      this.notify(VariableEvents.ERROR, [this, error]);
    }

    // Notify we've completed the trigger
    this.notify(VariableEvents.AFTER_INVOKE, [this, this.dataSet]);

    return Promise.resolve(this);
  }

  /**
   * Checks if the timer is currently active
   */
  public isActive(): boolean {
    return this._isActive;
  }

  public destroy(): void {
    this.cancel();
    super.destroy();
  }
}
