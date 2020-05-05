import { Action } from 'redux';

export const API_FAIL = 'API_FAIL';

export interface IAPIFailAction extends Action<typeof API_FAIL> {
  message: string;
  error?: typeof Error;
}
