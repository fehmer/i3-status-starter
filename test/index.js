'use strict';

import { expect } from 'chai';
import Starter from './../src/index.js';


describe('Module Starter', () => {

    describe('#constructor', () => {
        it('should construct and store custom options', () => {
            var block = new Starter({
                text: 'Peter',
                secretValue: 'nonEncryptedSecret'
            });

            expect(block.text).to.equal('Peter');
            expect(block.secretValue).to.equal('nonEncryptedSecret');
        });
    });


    describe('update', () => {
        it('should update the output', async() => {
            //construct block
            var block = new Starter({
                text: 'Peter'
            });

            await block.refresh();
            const output = block.output;

            //check output line
            expect(output.short_text).to.equal('Peter');
            expect(output.full_text).to.equal('Peter');
        });
    });

})