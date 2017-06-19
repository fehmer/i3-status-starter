# i3-status-starter

[![npm version](https://img.shields.io/npm/v/i3-status-starter.svg?style=flat-square)](https://www.npmjs.com/package/i3-status-starter)
[![Dependency Status](https://img.shields.io/gemnasium/fehmer/i3-status-starter.svg?style=flat-square)](https://gemnasium.com/github.com/fehmer/i3-status-starter)
[![Build Status](https://img.shields.io/travis/fehmer/i3-status-starter.svg?style=flat-square)](https://travis-ci.org/fehmer/i3-status-starter)
[![Codacy Badge](https://img.shields.io/codacy/grade/a52f41f904b24aac8807bb8ecb3dbec0.svg?style=flat-square)](https://www.codacy.com/app/fehmer/i3-status-starter?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=fehmer/i3-status-starter&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://img.shields.io/codacy/coverage/a52f41f904b24aac8807bb8ecb3dbec0.svg?style=flat-square)](https://www.codacy.com/app/fehmer/i3-status-starter?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=fehmer/i3-status-starter&amp;utm_campaign=Badge_Coverage)


This is a template for writing modules for i3-status. It uses ES2015 modules and babel to compile to node 6. You can code your module as you want, this is just a suggestion. 

## Table of content

<!-- MarkdownTOC -->

- [Scripts](#scripts)
- [Documentation](#documentation)
  - [Constructor](#constructor)
  - [Update Method](#update-method)
  - [Interval based execution](#interval-based-execution)
  - [Additional Fields](#additional-fields)
  - [Custom click handler](#custom-click-handler)
  - [Pause executions](#pause-executions)
  - [Logging](#logging)
- [Testing](#testing)

<!-- /MarkdownTOC -->


## Scripts

use npm run <target>

- **compile** use babel to compile for non-es6 runtime
- **test** to run the mocha tests
- **watch** to watch for changes, compile and test on save.
- **cover** to build test coverage report

## Documentation

A module for i3-status contains a constructor and an update method.

``` js
import { EventEmitter } from 'events';

export default class Starter extends EventEmitter {
    constructor(options, output) {}

    update() {}
}
```


### Constructor

``` js
 constructor(options, output) {
        super();
        options = options || {};
        this.output = output || {};

        //custom config
        this.myField = options.myField || 'default';
    }
```

i3-status provides the options for the current module from the config together with an output to your constructor.

If you want to provide extra config just add them to the config file and it is passed to the constructor, example:

``` yml
  - name: starter
    module: i3-status-starter
    myField: value
```

Labels, intervals, click actions etc. will automatically add to your module. If you need to overwrite the click handler see [custom click handler](#custom-click-handler)

The output is defined by the [i3-bar documentation](http://i3wm.org/docs/i3bar-protocol.html#_blocks_in_detail). The most basic usage is:

``` json
{
    "full_text": "full text",
    "short_text": "short text"
}
```

The *name* and *color* is set by the i3-status, but you may overwrite the *color*. To mark a block as urgent set ```"urgent":true```.


### Update Method

``` js
 update() {
        //update output
        this.output.full_text = 'My value: ' + this.myValue;
        this.output.short_text = this.myValue;

        //emit updated event to i3Status
        this.emit('updated', this, this.output);
    }
```

The update method is called by i3-status based on the configured interval. The update method should update the ```this.output``` object and emit an *updated* event with the blocks name and the output object. 
If your code uses callbacks just emit the *updated* event when your callback is done. You can [pause executions](#pause-executions) until your update method is fully completed.


### Interval based execution

Your module will be called by the i3-status based on the interval set in the block config or the main config. The interval is available in your module:

``` js
console.log(this.__interval); // interval started by i3-status
console.log(this.__interval_time); // interval length in ms
```


### Additional Fields

There are some fields set by i3-status to your module instances.

- **__name**: The name of the block your module instanced is started for
- **__click**: The click configuration from the config file. See i3-status documentation for more detail.
- **__label**: The label of the block
- **__index**: Position of the block inside the bar
- **__logger**: [winston](https://www.npmjs.com/package/winston) logger to use for logging


### Custom click handler

By default i3-status injects an action method into your module. You can implement a custom action method if you need more control over the mouse events on the block. The action method gets an action as parameter, which is documented in the [i3bar documentation](http://i3wm.org/docs/i3bar-protocol.html#_click_events).

Example:

``` js

action(action) {
    __logger.debug('button pressed on %s:', this.__name, action.button);
}
```


### Pause executions

If you have a module with long-running code you maybe want to prevent further invocations of the update method until your code execution is ready.

``` js
update() {
    //pause further executions
    this.emit('pause', this);

    //ivoke some call
    invoke( (text) => {
        //update output
        this.output.full_text = result.length > 0 ? result[0] : '';
        this.output.short_text = result.length > 1 ? result[1] : '';

        //resume further executions
        this.emit('resume', this);

        //emit updated event to i3Status
        this.emit('updated', this, this.output);
    });
}
```


### Logging

i3-status uses [winston](https://www.npmjs.com/package/winston) for logging. The log file is written to ```~/.i3status.log```. Start i3-status with ```-v``` to enable verbose logging.

``` js

update() {
    __logger.debug('update called on ', this.__name);
}

```


## Testing

Please have a look at the [Tests](test/index.js) for a test example.