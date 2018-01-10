import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpClientJsonpModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {FlickrApiService} from './services/flickr-api.service';
import {FlickrStreamComponent} from './flickr-stream/flickr-stream.component';

@NgModule({
    declarations: [
        AppComponent,
        FlickrStreamComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpClientJsonpModule
    ],
    providers: [
        FlickrApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
