import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token  = localStorage.getItem("token");
        const isApiUrl = req.url.startsWith(environment.API_URL);

        if(token && isApiUrl){
          req = req.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
          });
        }
        return next.handle(req);
    }
}
