yajefa
======

yet another javascript execution flow abstraction

this is a requirejs module

**untested** so use at your own risk (as a fun read). Only the documented use case was tested :) I'll update the code when I need more use cases.

usage in a requirejs module :
```
define([
    'yajefa'
  ]
  ,
  function(run) {
    var program = [
      function(callback, additionalParameter) {
        doSomethingAsynchronousThenCallback(callback);
      },
      function(callbackResult) {
        doSomethingWithResult(callbackResult);
      }
    ];
    run(program);
  }
```

*program* must be a data structure that represents the flow of your program. It must be made of nested Arrays and Objects.
Arrays represent serial execution while Objects represent parallel execution.
Every function but the last of a serial execution must accept a callback as argument.
