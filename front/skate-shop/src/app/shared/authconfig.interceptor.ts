// import { Injectable } from "@angular/core";
// import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
// import { AuthService } from "./auth.service";

// const TOKEN_HEADER_KEY = 'x-access-token';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(private authService: AuthService) { }
//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//         const authToken = this.authService.getToken();
//         if (authToken) {
//             req = req.clone({
//                 headers: req.headers.set(TOKEN_HEADER_KEY, authToken),
//               });
//         }
//         return next.handle(req);
//     }
// }