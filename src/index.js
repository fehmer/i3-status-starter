'use strict';

import { EventEmitter } from 'events';

export default class Text extends EventEmitter {
    constructor(options, output) {
        super();
        options = options || {};
        this.output = output || {};

        //custom config
        this.text = options.text || '';
        this.secretValue = options.secretValue;

    }

    update() {
        //update output
        this.output.full_text = this.text;
        this.output.short_text = this.text;

        //emit updated event to i3Status
        this.emit('updated', this, this.output);
    }

}