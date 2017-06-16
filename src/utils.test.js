import path from 'path';
import resize, { getImagesInPath, parseImages } from './resize';

describe('Image resizing suite', () => {
    let dirPath = path.resolve('example', 'assets');
    it('should return an array of files in a folder', () => {
        expect(Array.isArray(getImagesInPath(dirPath))).resolves;
    });


    it('should only contain images', () => {
        expect(getImagesInPath(dirPath))
            .resolves
            .arrayItemsMatching(/\.(jpg|png|jpeg)/);
    });

});

