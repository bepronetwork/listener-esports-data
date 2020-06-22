import {
    helloWorld
} from '../../methods';

import chai from 'chai';
import { detectValidationErrors, mochaAsync } from '../../utils';

const expect = chai.expect;

context('Hello World', async () => {

    it('should register hello world', mochaAsync(async () => {
        var res = await helloWorld({name: "Hello World"});
        detectValidationErrors(res);
        expect(res.data.status).to.equal(200);
    }));
})
