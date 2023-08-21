/* eslint-disable no-inner-declarations */
function f1() {
  console.log(this);
}

function f2() {
  'use strict';
  console.log(this);
}

f1(); // window
f2(); // undefined

{
  const foo = {
    bar: 10,
    fn: function () {
      console.log(this);
      console.log(this.bar);
    },
  };

  let fn1 = foo.fn;
  fn1(); // window

  console.log(this);
  console.log(this.bar);
}

{
  const foo = {
    bar: 10,
    fn: function () {
      console.log(this);
      console.log(this.bar);
    },
  };

  foo.fn();
  // 输出将如下所示:
  // {"bar": 10, fn: f}
  // 10
}

{
  const student = {
    name: 'Lucas',
    fn: function () {
      return this;
    },
  };

  console.log(student.fn() === student);
}

{
  const person = {
    name: 'Lucas',
    brother: {
      name: 'Mike',
      fn: function () {
        return this.name;
      },
    },
  };

  console.log(person.brother.fn()); // Mike
}

{
  const o1 = {
    text: 'o1',
    fn: function () {
      return this.text;
    },
  };
  const o2 = {
    text: 'o2',
    fn: function () {
      return o1.fn();
    },
  };
  const o3 = {
    text: 'o3',
    fn: function () {
      let fn = o1.fn;
      return fn();
    },
  };

  console.log(o1.fn()); // o1
  console.log(o2.fn()); // o1
  console.log(o3.fn()); // undefined
}

{
  const o1 = {
    text: 'o1',
    fn: function () {
      return this.text;
    },
  };
  const o2 = {
    text: 'o2',
    fn: o1.fn,
  };

  console.log(o2.fn()); // o2
}
{
  function fn() {
    console.log(this);
  }

  // 1
  const target = {};
  fn.call(target, 'arg1', 'arg2');
  // 2
  fn.apply(target, ['arg1', 'arg2']);
  // 3
  fn.bind(target, 'arg1', 'arg2')();
}

{
  const foo = {
    name: 'Lucas',
    logName: function () {
      console.log(this.name);
    },
  };

  const bar = {
    name: 'mike',
  };

  console.log(foo.logName.call(bar));
  // 'mike'
}

{
  // eslint-disable-next-line no-inner-declarations
  function Foo() {
    this.bar = 'Lucas';
  }

  const instance = new Foo();
  console.log(instance.bar);
  // 'Lucas'
}

{
  let obj = {};
  obj.__proto__ = Foo.prototype;
  Foo.call(obj);
}

{
  // eslint-disable-next-line no-inner-declarations
  function Foo() {
    this.user = 'Lucas';
    const o = {};
    return o;
  }

  const instance = new Foo();
  console.log(instance.user);
}

{
  // eslint-disable-next-line no-inner-declarations
  function Foo() {
    this.user = 'Lucas';
    return 1;
  }

  const instance = new Foo();
  console.log(instance.user);
}

{
  const foo = {
    fn: function () {
      setTimeout(function () {
        console.log(this);
      });
    },
  };

  console.log(foo.fn());
  // window
}

{
  const foo = {
    fn: function () {
      setTimeout(() => {
        console.log('===>', this);
      });
    },
  };

  let at = foo.fn;
  console.log(at());
  // {fn: f}
}

{
  function foo() {
    console.log(this.a);
  }

  const obj1 = {
    a: 1,
    foo: foo,
  };
  const obj2 = {
    a: 2,
    foo: foo,
  };

  obj1.foo.call(obj2); // 2
  obj2.foo.call(obj1); // 1
}

{
  function foo(a) {
    this.a = a;
  }
  const obj1 = {};
  let bar = foo.bind(obj1);
  bar(2);
  console.log(obj1.a); // 2

  const baz = new bar(3);
  console.log(baz.a); // 3
}

{
  function foo() {
    return (a) => {
      console.log(this.a);
    };
  }

  const obj1 = {
    a: 2,
  };
  const obj2 = {
    a: 3,
  };
  const bar = foo.call(obj1);
  console.log(bar.call(obj2)); // 2
}

{
  // var a = 123;

  const a = 123;
  const foo = () => (a) => {
    console.log(this.a);
  };
  const obj1 = {
    a: 2,
  };
  const obj2 = {
    a: 3,
  };
  const bar = foo.call(obj1);
  console.log(bar.call(obj2)); // undefined
}

{
  Function.prototype.bind =
    Function.prototype.bind ||
    function (context, ...arg1) {
      let me = this;
      return function bound(...arg2) {
        let finalArgs = [...arg1, ...arg2];
        return me.apply(context, finalArgs);
      };
    };

  function foo(a) {
    this.a = a;
  }
  const obj1 = {};
  let bar = foo.bind(obj1);
  bar(2);
  console.log(obj1.a); // 2
}
