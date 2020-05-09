import {
    AddCurrentUserActionType,
    ICurrentUser,
    ISetUserAction,
  } from '../../types/index';
  
  const {
    SET_USER_TOKEN,
  } = AddCurrentUserActionType;
  
  const initialState: ICurrentUser = {};
  
  type Action = ISetUserAction;
  
  export default (state = initialState, action: Action): ICurrentUser => {
    switch (action.type) {
      case SET_USER_TOKEN:
        return addCurrentUser(state, action.token);
      default:
        return state;
    }
  };
  
  const addCurrentUser = (state, token): ICurrentUser => {
    return {
      ...state,
      token
    };
  };
