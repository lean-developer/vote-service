import { Injectable, CanActivate, ExecutionContext, Logger } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);
  
  constructor(private authService: AuthService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return true;
  }
  /*
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();
      let authKey: string = req.headers.authorization;
      if (!authKey) {
          return false;
      }
      return this.authService.verifyBasicAuth(authKey);
  }
  catch (err) {
      return false;
  }
  */
}