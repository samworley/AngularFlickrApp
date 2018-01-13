import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Photo} from '../models/photo.model';

@Injectable()
export class FlickrApiService {
    private apiUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
    private extraParams = '&safe_search=1';
    private callback = 'jsoncallback';

    constructor(private http: HttpClient) {
    }

    getPhotos(params): Photo[] {
        const photos: Photo[] = [];
        this.extraParams = params;
        this.getData().subscribe(data => {
            if (data.hasOwnProperty('items')) {
                for (const obj in data.items) {
                    if (data.items.hasOwnProperty(obj)) {
                        // ensure title not too long
                        const title = this.shortenString(data.items[obj].title, 60);
                        // ensure author not too long and strip text
                        const author = this.shortenString(data.items[obj].author, 40, 'author');
                        // strip description of html tags
                        const description = this.shortenString(data.items[obj].description, 40, 'description');
                        // ensure tags not too long
                        const tags = this.shortenString(data.items[obj].tags, 40);
                        // create new instance of photo from response
                        const photoModel = new Photo(
                            title,
                            description,
                            author,
                            data.items[obj].author_id,
                            data.items[obj].media.m,
                            data.items[obj].link,
                            tags
                        );
                        photos.push(photoModel);
                    }
                }
            } else {
                throw new Error('No items returned');
            }
        });
        return photos;
    }

    getData() {
        return this.http.jsonp<any>(this.apiUrl + this.extraParams, this.callback);
    }

    // trim string if too long
    private shortenString(inputString: string, maxLength: number, type: any = false): string {
        if (inputString.length === 0 || inputString === ' ') {
            return 'n/a';
            // if author remove extra text
        } else if (type && type === 'author') {
            const match = inputString.match(/\("([^)]+)"\)/);
            if (match && match[1] !== undefined) {
                inputString = match[1];
            }
        } else if (type && type === 'description') {
            inputString = this.parseHtmlString(inputString);
        }
        return inputString.length > maxLength ? inputString.substr(0, maxLength) + '...' : inputString;
    }

    // return final <p> tag of inputString
    private parseHtmlString(inputString: string): any {
        const el = document.createElement('html');
        el.innerHTML = inputString;
        const result = el.getElementsByTagName('p');
        if (result) {
            return result[result.length - 1].innerText;
        }
        return '';
    }
}
