import {Component, OnInit} from '@angular/core';
import {FlickrApiService} from '../services/flickr-api.service';
import {Photo} from '../models/photo.model';

@Component({
    selector: 'app-flickr-stream',
    templateUrl: './flickr-stream.component.html',
    styleUrls: ['./flickr-stream.component.css']
})
export class FlickrStreamComponent implements OnInit {
    photos: Photo[];
    private timeout = null;
    private searchTerm = null;

    constructor(private apiService: FlickrApiService) {
        this.updatePhotoStream();
    }

    ngOnInit() {
    }

    // trigger photo update after keypress timeout
    checkForSearchTerm(value) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            if (this.searchTerm !== value) {
                this.updatePhotoStream('&tags=' + value);
            }
            this.searchTerm = value;
        }, 500);
    }

    // call api to update photos
    updatePhotoStream(params = '') {
        this.photos = this.apiService.getPhotos(params);
    }

}
