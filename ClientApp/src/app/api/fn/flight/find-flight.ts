/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FlightRm } from '../../models/flight-rm';

export interface FindFlight$Params {
  id: string;
}

export function findFlight(http: HttpClient, rootUrl: string, params: FindFlight$Params, context?: HttpContext): Observable<StrictHttpResponse<FlightRm>> {
  const rb = new RequestBuilder(rootUrl, findFlight.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FlightRm>;
    })
  );
}

findFlight.PATH = '/Flight/{id}';
