// Mock for @wavemaker/variables package used in Storybook environment
// This provides stub implementations for variable-related functionality

/**
 * Mock implementation of wmSetDependency
 * In production, this sets dependencies for the WaveMaker variable system
 * In Storybook, we just log the call for debugging purposes
 */
export const wmSetDependency = (key: string, value: any) => {
  // console.log(`[Mock] wmSetDependency called with key: ${key}`, value);
  // No-op in Storybook environment
};

/**
 * Mock implementation of wmGetDependency
 * Returns undefined as dependencies are not available in Storybook
 */
export const wmGetDependency = (key: string) => {
  // console.log(`[Mock] wmGetDependency called with key: ${key}`);
  return undefined;
};

/**
 * Mock implementation of ServiceVariable base class
 * This provides a minimal implementation for Storybook environment
 */
export class ServiceVariable {
  name: string;
  dataSet: any;
  dataBinding: any;
  firstRecord: any;
  lastRecord: any;
  isList: boolean;
  service: string;
  serviceType: string;
  maxResults: number;
  operation: string;
  operationId: string;
  operationType: string;
  controller: string;
  serviceInfo: any;
  pagination: any;

  constructor(config: any) {
    this.name = config.name;
    this.dataSet = config.dataSet;
    this.dataBinding = config.dataBinding || {};
    this.firstRecord = config.firstRecord || {};
    this.lastRecord = config.lastRecord || {};
    this.isList = config.isList;
    this.service = config.service;
    this.serviceType = config.serviceType;
    this.maxResults = config.maxResults;
    this.operation = config.operation;
    this.operationId = config.operationId;
    this.operationType = config.operationType;
    this.controller = config.controller;
    this.serviceInfo = config.serviceInfo;
    this.pagination = { page: 0 };
  }

  invoke(_options?: any, onSuccess?: Function, _onError?: Function) {
    // Mock invoke - just call success callback with empty data
    if (onSuccess) {
      setTimeout(() => onSuccess({}), 0);
    }
    return this;
  }
}

// Export other potential functions that might be needed
export default {
  wmSetDependency,
  wmGetDependency,
  ServiceVariable,
};
