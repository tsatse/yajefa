yajafc
======

yet another javascript asynchronous flow controler

this is a requirejs module

untested (more or less) so use at your own risk

usage :
Run(program);

program must be a data structure that represents the flow of your program. It must be made of nested Arrays and Objects
Arrays represent serial execution while Objects represent parallel execution.
each function that's the last of a serial execution must accept a callback as argument.
