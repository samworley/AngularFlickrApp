import {AppPage} from './app.po';

describe('angular-flickr-app App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display title', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Flickr Photo Stream');
    });
});
