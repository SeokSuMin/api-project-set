declare namespace Express {
  export interface Request {
    userId: string | jsonwebtoken.JwtPayload | null;
  }
}
