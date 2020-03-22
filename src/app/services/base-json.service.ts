import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {Config} from '../../config/Config';

export interface HttpOptions {
	headers: HttpHeaders;
	params: HttpParams;
	body: {};
	withCredentials: boolean;
	reportProgress?: boolean;
}

@Injectable({providedIn: 'root'})
export class BaseJsonService {
	protected options: HttpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		}),
		params: new HttpParams(),
		withCredentials: true,
		body: {}
	};

	constructor(protected http: HttpClient) {
	}

	protected generateUrl(format: string, ...params: any[]): string {
		let i = 0;
		if (params.length === 0) {
			return '';
		}

		return Config.backendURL + format.replace(/%d|%s/g,
			(match: string): string => {
				const value = params[i];
				i++;

				switch (match) {
					case '%d':
						return parseInt(value, 10).toString();
					case '%s':
						return value;
				}
			}
		);
	}

	protected handleError(error: HttpErrorResponse): Observable<never> {
		return throwError(error || 'Server error');
	}
}
