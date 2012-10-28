define(
    function() {
        function makeSerialExecution(func1, func2) {
            return function() {
                func1(func2);
            }
        }
        
        function makeParallelExecution(funcList) {
            for(var i = 0 ; i < funcList.length ; i++) {
                funcList[i]();
            }
        }

        function parse(program) {
            var result = null;
            if(program instanceof Array && program.length > 0) {
                result = parse(program[0]);
                for(var i = 1 ; i < program.length ; i++) {
                    result = makeSerialExecution(result, parse(program[i]));
                }
            }
            else if(program instanceof Function) {
                result = program;
            }
            else if(program instanceof Object) {
                var params = [];
                for(var index in program) {
                    params.push(parse(program[index]));
                }
                result = makeParallelExecution(params);
            }
            return result;
        }

        function run(program) {
            return parse(program)();
        }

        return run;
    }
);
