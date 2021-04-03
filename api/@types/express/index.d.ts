import { AuthUser } from 'src/auth/auth.service';

declare global {
  namespace Express {
    interface Request {
      authUser?: AuthUser;
    }
  }
}
