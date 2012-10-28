yajafc
======

yet another javascript asynchronous flow controler

this is a requirejs module

**untested** so use at your own risk. Only the documented use case was tested :) I'll update the code when I need more use cases.

usage in a requirejs module :
```
define([
    'yajafc'
  ]
  ,
  function(run) {
    var program = [
      function(callback) {
        doSomethingAsynchronousThenCallback(callback);
      },
      function(callbackResult) {
        doSomethingWithResult(callbackResult);
      }
    ];
    run(program);
  }
```

program must be a data structure that represents the flow of your program. It must be made of nested Arrays and Objects
Arrays represent serial execution while Objects represent parallel execution.
each function that's the last of a serial execution must accept a callback as argument.
