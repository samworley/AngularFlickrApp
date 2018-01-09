import {Component, OnInit} from '@angular/core';
import {FlickrApiService} from '../services/flickr-api.service';
import {PhotoModel} from '../models/photo.model';

@Component({
    selector: 'app-flickr-stream',
    templateUrl: './flickr-stream.component.html',
    styleUrls: ['./flickr-stream.component.css']
})
export class FlickrStreamComponent implements OnInit {
    photos: PhotoModel[];

    constructor(private apiService: FlickrApiService) {
        this.photos = this.apiService.getPhotos();
    }

    ngOnInit() {
    }

}
