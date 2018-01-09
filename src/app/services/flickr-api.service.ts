import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {PhotoModel} from '../models/photo.model';

@Injectable()
export class FlickrApiService {
    private apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';

    constructor(private http: HttpClient) {
    }

    getData() {
        return this.http.get(this.apiUrl).map((res: Response) => res.json());
    }

    getPhotos(): PhotoModel[] {
        let photos: PhotoModel[] = [];
        this.getData().subscribe(data => {
            console.log(data);
        });
        return photos;
    }
}
