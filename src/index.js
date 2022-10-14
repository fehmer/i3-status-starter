'use strict';

export default class Text {
    constructor(options, output) {
        options = options || {};
        this.output = output || {};

        //custom config
        this.text = options.text || '';
        this.secretValue = options.secretValue;
    }

    async refresh() {
        //update output
        this.output.full_text = this.text;
        this.output.short_text = this.text;

    }

    action(action) {
        if (this.__reporter && this.__reporter.supports('html')) {
            var output = {
                header: 'Starter sample',
                content: `<h1>Hello World!</h1><p>Secret value is ${this.secretValue}`,
                userStyle: 'h1 { color: red }'
            };
            this.__reporter.display(output, action);
        }
    }

}