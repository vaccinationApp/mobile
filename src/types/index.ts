interface IStoreState {
    readonly currentUser?: ICurrentUser;
}

interface ICurrentUser {
    token?: string;
  }

  enum AddCurrentUserActionType {
    SET_USER_TOKEN = 'SET_USER_TOKEN',
  }
  

  interface ISetUserAction {
    type: AddCurrentUserActionType.SET_USER_TOKEN;
    token: ICurrentUser;
  }
  
 
export { IStoreState, ICurrentUser, ISetUserAction, AddCurrentUserActionType }