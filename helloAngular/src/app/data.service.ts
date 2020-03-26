import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'api/customers';

  constructor(private http: HttpClient) { }

  //Get all customers
  getCustomers(): Promise<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl)
      .toPromise()
      .then(response => response as Customer[])
      .catch(this.handleError);
  }

  getCustomersByLastName(lastName: string): Promise<Customer[]> {
    const url = `${this.baseUrl}/${lastName}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response as Customer[])
      .catch(this.handleError);
  }

  create(customer: Customer): Promise<Customer> {
      return this.http
        .post(this.baseUrl, JSON.stringify(customer), {headers: new HttpHeaders().set('Content-Type', 'application/json'),})
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.baseUrl}/${id}`;

      return this.http.delete(url)
        .toPromise()
        .then(() => null)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error:', error);
    return Promise.reject(error.message || error);
  }
}
