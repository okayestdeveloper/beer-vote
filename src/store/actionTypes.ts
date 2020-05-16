import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const API_FAIL = 'API_FAIL';

export interface IAPIFailAction extends AnyAction {
  type: typeof API_FAIL;
  message: string;
  error?: typeof Error;
}

export type ThunkResult<Return, State> = ThunkAction<
  Return,
  State,
  undefined,
  AnyAction
>;

export const apiFail = (
  message: string,
  error?: typeof Error,
): IAPIFailAction => ({
  type: API_FAIL,
  message,
  error,
});
