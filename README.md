yajefa
======

yet another javascript execution flow abstraction


**not very tested** so use at your own risk. Only the documented use cases were tested :) I'll update the code when I need more use cases.

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
Every function but the last of a serial execution must accept a callback as an argument.
