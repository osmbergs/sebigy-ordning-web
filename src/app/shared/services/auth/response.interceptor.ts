import { BsModalService } from 'ngx-bootstrap/modal';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {ActivatedRoute, Router} from '@angular/router';
import { Injectable } from "@angular/core"

import { ToastrService } from 'ngx-toastr';
import {Observable, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService,public auth: AuthService,private router: Router,private route: ActivatedRoute, private ms: BsModalService ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      tap(evt => {



        if (evt instanceof HttpResponse) {

          var t=evt.headers.get("x-token");
          if(t!=null) {
            sessionStorage.setItem('token', <string>evt.headers.get("x-token"));
          }


        }
      }),
      catchError((err: any) => {



        if(err instanceof HttpErrorResponse && this.router.url!=="/login" ) {


            try {


              if(err.status==500) {
                console.error("Caught error", err)


                // @ts-ignore
                if (!(err.error.code == "SCORING_ERROR" || err.error.code == "UNKNOWN_ERROR" || err.url.includes('/plot/'))) {

                  this.toasterService.error("An unknown error occurred, you will be logged out", err.statusText, {positionClass: 'toast-bottom-center'});
                  this.ms._hideModal(1);
                  this.router.navigate(['login']);
                }
              }
              if(err.status==403 || err.status==401) {
                alert("You are being logged out due to inactivity and will be redirected back to the login page");
                this.router.navigate(['login']);
              }

            } catch (e) {

              console.error("Caught excption when handling error", e)
              this.toasterService.error('An unknown error occurred', '', {positionClass: 'toast-bottom-center'});
              this.router.navigate(['login']);
            }

        }

        return throwError(err)
        //return of(err);
      }))   as Observable<HttpEvent<any>>;

  }

}
