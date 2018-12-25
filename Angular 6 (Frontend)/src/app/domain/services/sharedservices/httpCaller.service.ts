import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { httpType } from '../../shared/enums/enums';
import { domainUtills } from '../../shared/utills/domainUtills';
import { Employee } from '../../models/employee/employee';

@Injectable()
export class httpCaller {
  uri = "";
  constructor(private http: HttpClient) {
  }

  public apiCaller(type: string, url: string, data?: any): any {
    //this.tost.info("Please wait.......", "Loading");
    this.uri = new domainUtills().getEnvirementUrl() + url;
    if (type === httpType.get) {
      return this.get(this.uri)
    }
    else {
      return this.post(this.uri, data)
    }
  }
  private post(url: string, data: Employee): any {
    return this.http.post(url, data, { headers: this.getHeaders() })
  }
  private get(url: string): any {
    return this.http.get(url, { headers: this.getHeaders() })
  }
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }
}
