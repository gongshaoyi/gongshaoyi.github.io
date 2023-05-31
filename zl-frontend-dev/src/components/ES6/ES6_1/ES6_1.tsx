import { Image } from "antd";

export const ES6_1 = () => {
  // const a = "===>";
  return (
    <div>
      <h1>说说var、let、const之间的区别</h1>
      <h3>1,var</h3>
      <div>
        <div style={{ marginBottom: 10 }}>
          在ES5中，顶层对象的属性和全局变量是等价的，用 var
          声明的变量既是全局变量，也是顶层变量
        </div>
        <div style={{ marginBottom: 10 }}>
          注意：顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是 global
          对象
        </div>
        <div style={{ marginBottom: 10 }}>
          <Image width={"100%"} src="src/components/ES6/ES6_1/1.jpg" />
        </div>
        <div style={{ marginBottom: 10 }}>
          使用var声明的变量存在变量提升的情况
        </div>
        <div style={{ marginBottom: 10 }}>
          <Image width={"100%"} src="src/components/ES6/ES6_1/2.jpg" />
        </div>
        <div style={{ marginBottom: 10 }}>
          在编译阶段，编译器会将其变成以下执行
        </div>
        <div style={{ marginBottom: 10 }}>
          <Image width={"100%"} src="src/components/ES6/ES6_1/3.jpg" />
        </div>
        <div style={{ marginBottom: 10 }}>
          使用
          var，我们能够对一个变量进行多次声明，后面声明的变量会覆盖前面的变量声明
        </div>
        <div style={{ marginBottom: 10 }}>
          <Image width={"100%"} src="src/components/ES6/ES6_1/4.jpg" />
        </div>
      </div>
      <h3>2,let</h3>
      <div></div>
      <h3>3,const</h3>
      <div></div>
    </div>
  );
};
