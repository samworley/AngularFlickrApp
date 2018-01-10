import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Photo} from '../models/photo.model';

@Injectable()
export class FlickrApiService {
    private apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
    private callback = 'jsoncallback';

    constructor(private http: HttpClient) {
    }

    getPhotos(): Photo[] {
        let photos: Photo[] = [];
        this.getData().subscribe(data => {
            if (data.hasOwnProperty('items')) {
                for (let obj in data.items) {
                    if (data.items.hasOwnProperty(obj)) {
                        // ensure title not too long
                        const title = data.items[obj].title.length > 50
                            ? data.items[obj].title.substr(0, 50) + '...'
                            : data.items[obj].title;
                        // ensure author not too long
                        let author = data.items[obj].author.length > 30
                            ? data.items[obj].author.substr(0, 30) + '...'
                            : data.items[obj].author;
                        // create new instance of photo from response
                        let photoModel = new Photo(
                            title,
                            data.items[obj].description,
                            author,
                            data.items[obj].author_id,
                            data.items[obj].media.m,
                            data.items[obj].link,
                            data.items[obj].tags
                        );
                        photos.push(photoModel);
                    }
                }
            } else {
                console.log('no items');
            }
        });
        return photos;
    }

    getData() {
        return this.http.jsonp<any>(this.apiUrl, this.callback);
    }
}
