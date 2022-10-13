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
        it('should update the output and fire updated', async() => {
            //construct block
            var block = new Starter({
                text: 'Peter'
            });

            const output = await execute(block);
            //check output line
            expect(output.short_text).to.equal('Peter');
            expect(output.full_text).to.equal('Peter');
        });
    });

})


//copied from i3-status
async function execute(block) {
    return await new Promise(resolve => {
        block.on('updated', async(target, output) => {
            clearInterval(target.interval);
            resolve(output);
        });
        block.update();
    });
}
