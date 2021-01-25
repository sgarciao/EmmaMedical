import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable, throwError, BehaviorSubject} from 'rxjs';

import { Router } from '@angular/router';
import { map, catchError, filter, take, switchMap } from 'rxjs/operators';
import { isNull } from 'util';
@Injectable({
    providedIn: 'root'
    })
export class BasicAuthInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
        null
    );
    token: string;
    constructor(private authService: AuthService,
        private router: Router) { }



    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.token = sessionStorage.getItem('access_token');
        if (this.token != 'temporal') {
            request = request.clone({
                setHeaders: {
                    //Authorization: `Basic prueba`//`Basic ${currentUser.authdata}`
                    token: sessionStorage.getItem('access_token'),
                    language_id: '1'
                }
            });
       }
       return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let refresh_token = sessionStorage.getItem('refresh_token');
                // Si no existe token redirigir al login
                if( isNull(this.token) ) {
                    this.router.navigate(['/login']);
                    return throwError(error);
                }
                //No refreshToken, si se consume el api, de refreshtoken y login
                if (
                    request.url.includes('refresh-token') ||
                    request.url.includes('login') ||
                    request.url.includes('logout')
                ) {
                    //en caso de que falle el refresh token, cerramos la sesion
                    if (request.url.includes('refresh-token')) {
                        //console.log('fallo refreshToken,  logout');
                        let user_id = sessionStorage.getItem('user_id');
                        this.authService.logout(user_id).subscribe();
                    }
                    return throwError(error);
                }
                //Si el error es diferente de 409
                if (error.status != 409) {
                    return throwError(error);
                }

                if ( this.refreshTokenInProgress ) {
                    //todas las peticiones, hay que esperar a tener el nuevo token, cuando ya se esta onteniendo
                    return this.refreshTokenSubject.pipe(
                    filter((result: any) => {
                        return result != null;
                    }),
                    take(1),
                    switchMap(() => {
                        return next.handle(this.addAuthenticationToken(request));
                    })
                    );
                } else {
                    //Asingar refreshTokenSubject a nulo, para las api subsecuentes
                    console.log('Refresh Token');
                    this.refreshTokenInProgress = true;
                    this.refreshTokenSubject.next(null);
                    return this.authService
                    .refreshToken(this.token, refresh_token ).pipe(
                        switchMap((res: any) => {
                            console.log('Refresh Token termino correctamente',res);
                            this.refreshTokenInProgress = false;
                            this.refreshTokenSubject.next( res );
                            return next.handle(this.addAuthenticationToken(request));
                        }),
                        catchError((err: any) => {
                            console.log('Error al intentar hacer refresh Token', err);
                            this.refreshTokenInProgress = false;
                            let user_id = sessionStorage.getItem('user_id');
                            this.authService.logout(user_id).subscribe();
                            return throwError(error);
                        })
                    )
                }
            })
        );

    }
    addAuthenticationToken(request) {
        const accessToken = sessionStorage.getItem('access_token');
        if (!accessToken) {
            //peticion continua
            return request;
        }
        // se agrega, el nuevo token a la peticion
         return request.clone({
            setHeaders: {
                token: sessionStorage.getItem('access_token'),
                language_id: '1'
            }
        });
    }
}
