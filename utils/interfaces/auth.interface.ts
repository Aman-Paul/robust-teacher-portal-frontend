export interface SignIn {
    email: string;
    password:string
}

export interface AuthInitialState {
    value: AuthState;
}
export interface AuthState  {
    isAuth: boolean;
    token: string;
}
