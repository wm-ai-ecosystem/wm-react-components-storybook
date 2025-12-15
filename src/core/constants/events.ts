import { EventEmitter } from "../util/browserEventEmitter";

const partialStateSyncEmitter = new EventEmitter();
const prefabStateSyncEmitter = new EventEmitter();

const EVENTEMITTER = {
  PARTIAL_STATE_SYNC: "partial-state-sync",
  PREFAB_STATE_SYNC: "prefab-state-sync",
};

export const EVENTEMITTER_METHODS = {
  PREFAB_STATE_SYNC_ON: (name: string = "", callback: (data: any) => void) => {
    return prefabStateSyncEmitter.on(
      EVENTEMITTER.PREFAB_STATE_SYNC + (name ? "_" + name : ""),
      callback
    );
  },
  PREFAB_STATE_SYNC_OFF: (name: string = "", callback: (data: any) => void) => {
    return prefabStateSyncEmitter.off(
      EVENTEMITTER.PREFAB_STATE_SYNC + (name ? "_" + name : ""),
      callback
    );
  },
  PREFAB_STATE_SYNC_EMIT: (name: string = "", data: any) => {
    return prefabStateSyncEmitter.emit(
      EVENTEMITTER.PREFAB_STATE_SYNC + (name ? "_" + name : ""),
      data
    );
  },
  PARTIAL_STATE_SYNC_ON: (callback: (data: any) => void) => {
    return partialStateSyncEmitter.on(EVENTEMITTER.PARTIAL_STATE_SYNC, callback);
  },
  PARTIAL_STATE_SYNC_OFF: (callback: (data: any) => void) => {
    return partialStateSyncEmitter.off(EVENTEMITTER.PARTIAL_STATE_SYNC, callback);
  },
  PARTIAL_STATE_SYNC_EMIT: (data: any) => {
    return partialStateSyncEmitter.emit(EVENTEMITTER.PARTIAL_STATE_SYNC, data);
  },
};
