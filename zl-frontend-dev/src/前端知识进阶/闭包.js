/* eslint-disable no-inner-declarations */
{
  function foo() {
    let a = 'bar';
    console.log(a);
  }
  foo();
}

{
  let b = 'bar';
  function foo() {
    console.log(b);
  }
  foo();
}

{
  function bar() {
    let b = 'bar';
  }
  function foo() {
    console.log(b);
  }
  foo();
}

{
  function bar() {
    let b = 'bar';
    function foo() {
      console.log(b);
    }
    foo();
  }
  bar();
}

{
  let b = 'bar';
  function bar() {
    function foo() {
      console.log(b);
    }
    foo();
  }
  bar();
}

{
  function foo() {
    console.log(bar);
    var bar = 3;
  }
  foo();
}

{
  function foo() {
    var bar;
    console.log(bar);
    bar = 3;
  }
  foo();
}

{
  function foo() {
    console.log(bar);
    let bar = 3;
  }
  foo();
}

{
  function foo() {
    let bar = 3;
    console.log(bar);
  }
  foo();
}

{
  var foo1 = 'foo1'; //----全局作用域
  function bar1() {
    var foo2 = 'foo2'; //----bar1作用域
    function bar2() {
      var foo3 = 'foo3'; //----bar2作用域
    }
  }
}

{
  function bar1() {
    console.log(foo3);

    let foo3 = 'foo3';

    console.log(foo3);
  }

  bar1();
}

{
  function foo(arg1 = arg2, arg2) {
    console.log(`${arg1} ${arg2}`);
  }

  foo('arg1', 'arg2'); // arg1 arg2
}

{
  function foo(arg1 = arg2, arg2) {
    console.log(`${arg1} ${arg2}`);
  }

  foo(undefined, 'arg2');
  // Uncaught ReferenceError: Cannot access 'arg2' before initialization
}

{
  function foo(arg1 = arg2, arg2) {
    console.log(`${arg1} ${arg2}`);
  }

  foo(null, 'arg2');
  // 输出 null arg2
}

{
  function foo(arg1) {
    let arg1;
  }

  foo('arg1');
  // Uncaught SyntaxError: Identifier 'arg1' has already been declared
}

{
  function foo(arg1) {
    var arg1;
    let arg1;
  }

  foo('arg1');
}

{
  function bar() {
    console.log('bar1');
  }

  var bar = function () {
    console.log('bar2');
  };
  bar();
}

{
  var bar = function () {
    console.log('bar2');
  };

  function bar() {
    console.log('bar1');
  }

  bar();
}

{
  foo(10);
  function foo(num) {
    console.log(foo);
    foo = num;
    console.log(foo);
    var foo;
  }
  console.log(foo);
  foo = 1;
  console.log(foo);
}

{
  // undefined
  // 10
  // foo(num) {
  //   console.log(foo);
  //   foo = num;
  //   console.log(foo);
  //   var foo;
  // }
  // 1
}

{
  function foo1() {
    foo2();
  }
  function foo2() {
    foo3();
  }
  function foo3() {
    foo4();
  }
  function foo4() {
    console.log('foo4');
  }
  foo1();
}

{
  function foo1() {
    foo2();
  }
  function foo2() {
    foo3();
  }
  function foo3() {
    foo4();
  }
  function foo4() {
    console.lg('foo4');
  }
  foo1();
}

{
  function numGenerator() {
    let num = 1;
    num++;
    return () => {
      debugger;
      console.log(num);
    };
  }

  let getNum = numGenerator();
  getNum();
}

{
  let foo = 'bar'; // 分配内存
  alert(foo); // 读写内存
  foo = null; // 释放内存
}

{
  let a = 11;
  let b = 10;
  let c = [1, 2, 3];
  let d = {
    e: 20,
  };
}

{
  let element = document.getElementById('logo1');
  console.log('===>?>>', element);
  // element.mark = 'marked';
  // 移除 element 节点
  function remove() {
    element.parentNode.removeChild(element);
  }
  remove();
}

{
  let element = document.getElementById('element');
  element.innerHTML = '<button id="button">点击</button>';

  let button = document.getElementById('button');
  button.addEventListener('click', () => {
    // ...
  });
  element.innerHTML = '';
}

{
  function foo() {
    let name = 'Lucas';
    setInterval(function () {
      console.log(name);
    }, 1000);
  }
  foo();
}

{
  function foo() {
    let value = 123;
    function bar() {
      alert(value);
    }
    return bar;
  }

  let bar = foo();
}

{
  function foo() {
    let value = Math.random();
    function bar() {
      console.log(value);
      debugger;
    }
    return bar;
  }

  let bar = foo();
  bar();
}

{
  var array = [];
  function createNodes() {
    let div;
    let i = 100;
    let frag = document.createDocumentFragment();
    for (; i > 0; i--) {
      div = document.createElement('div');
      div.appendChild(document.createTextNode(i));
      frag.appendChild(div);
    }
    document.body.appendChild(frag);
  }

  function badCode() {
    array.push(...Array(100000).keys());
    createNodes();
    setTimeout(badCode, 1000);
  }

  badCode();
}

{
  const foo = (function () {
    let v = 0;
    return () => {
      return v++;
    };
  })();

  for (let i = 0; i < 10; i++) {
    foo();
  }

  console.log(foo()); // 10
}

{
  const foo = (function () {
    let v = 0;
    return () => {
      return v++;
    };
  })();

  console.log(foo); // () => { return v++ };

  () => {
    return v++;
  };
}

{
  const foo = () => {
    let arr = [];
    let i;
    for (i = 0; i < 10; i++) {
      arr[i] = function () {
        console.log(i);
      };
    }

    return arr[0];
  };
  foo()(); // 10
}

{
  let fn = null;
  const foo = () => {
    var a = 2;
    function innerFoo() {
      console.log(a);
    }
    fn = innerFoo;
  };

  const bar = () => {
    fn();
  };

  foo();
  bar(); // 2
}

{
  var fn = null;
  const foo = () => {
    var a = 2;
    function innerFoo() {
      console.log(c);
      console.log(a);
    }
    fn = innerFoo;
  };

  const bar = () => {
    var c = 10;
    fn();
  };

  foo();
  bar(); // Uncaught ReferenceError: c is not defined
}
