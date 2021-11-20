export class ResCookieDto {
  readonly accessTokenCookie: {
    readonly token: string;
    readonly options: {
      httpOnly: boolean;
      maxAge: number;
    };
  };
  readonly refreshTokenCookie: {
    readonly token: string;
    readonly options: {
      httpOnly: boolean;
      maxAge: number;
    };
  };
}
