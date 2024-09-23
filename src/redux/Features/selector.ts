import { RootState } from '../App/store';

export const selectUser = (state: RootState) => state.auth.userInfo;
