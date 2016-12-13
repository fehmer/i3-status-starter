'use strict';

import { expect } from 'chai';
import Starter from './../lib/index';

describe('Module Starter', function() {

    describe('#constructor', function() {
        it('should construct and store custom options', () => {
            var block = new Starter({
                text: 'Peter'
            });

            expect(block.text).to.equal('Peter');
        });
    });


    describe('update', function() {
        it('should update the output and fire updated', (done) => {
            //construct block
            var block = new Starter({
                text: 'Peter'
            });

            execute(block, (output) => {
                //check output line
                expect(output.short_text).to.equal('Peter');
                expect(output.full_text).to.equal('Peter');

                done();
            });
        });
    });

})


//copied from i3-status
function execute(block, verify) {
    block.name = block.constructor.name;

    block.on('updated', function(target, output) {
        clearInterval(target.interval);

        expect(target.name).to.equal(block.name);
        verify(output);
    });

    //simulate set interval, will never fire
    block._interval = 10000;
    block.interval = setInterval(() => {
        block.update();
    }, block._interval);

    block.update();
}