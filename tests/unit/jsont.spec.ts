import transform, { newJsonTransform } from "../json-transform";
describe("映射", () => {
  //   it("模板: 变量 常量", () => {
  //     const data = {
  //       a: "1",
  //       b: "144"
  //     };
  //     const res = transform(
  //       data,
  //       `{
  //       a: "a",
  //       b: $string("a").value,
  //       c: $string("b").value,
  //       d: "a"
  //     }`
  //     );
  //     expect(res).toEqual({ a: "a", b: "1", c: "144", d: "a" });
  //   });

  it("调用方法：变量 常量", () => {
    const data = {
      a: "1",
      b: "144",
      c: {
        s: "144",
        g: {
          f: "144"
        }
      }
    };

    const { $string, _ } = newJsonTransform(data);
    // type D = typeof data;
    // type K1<T> = keyof T;
    // type V1<T, K extends K1<T>> = T[K];
    // type K2<T> = keyof V1<T>;
    // type V2<T> = V1<T>[K2<T>];
    // type K3<T> = keyof V2<T>;
    // type V3<T> = V2<T>[K3<T>];
    // type Keys1<T> = [K1<T>];
    // type Keys2<T> = [K1<T>, K2<T>];
    // type Keys3<T> = [K1<T>, K2<T>, K3<T>];

    const res = {
      a: "a",
      b: $string("a").value,
      c: $string("b").value,
      d: "a",
      e: _.getVal(["c"], data)
    };

    expect(res).toEqual({ a: "a", b: "1", c: "144", d: "a", e: "144" });
  });

  it("调用方法： 处理器", () => {
    const data = {
      a: "1",
      c: 1,
      t: {
        b: {
          f: "lhh"
        }
      },
      v: [
        { a: 1, b: 2 },
        { a: 11, b: 12 },
        { a: 21, b: 22 }
      ]
    };

    const { $string, $number, $object, _ } = newJsonTransform(data);

    const res = {
      a: $string("a").appendAfter("个").value,
      b: _.appendAfter($string("a").value, "个"),
      c: _.appendAfter($string("a").value, $number("c").toString().value),
      d: _.appendAfter($string("t.b.f").value, "hello"),
      e: $object("t.b").value,
      f: _.concat($string("t.b.f").value, $string("t.b.f").value, "123456"),
      g: $number("v.0.a").value,
      h: {
        a: _.appendAfter("a", "个"),
        b: _.concat($string("t.b.f").value, $string("t.b.f").value, "123456"),
        c: $number("v.0.a").value,
        d: {
          a: _.appendAfter("a", "个"),
          b: _.concat($string("t.b.f").value, $string("t.b.f").value, "123456"),
          c: $number("v.0.a").value
        }
      },
      i: $string("liu", 0).value
    };

    expect(res).toEqual({
      a: "1个",
      b: "1个",
      c: "11",
      d: "lhhhello",
      e: { f: "lhh" },
      f: "lhhlhh123456",
      g: 1,
      h: {
        a: "a个",
        b: "lhhlhh123456",
        c: 1,
        d: { a: "a个", b: "lhhlhh123456", c: 1 }
      },
      i: "liu"
    });
  });

  //   it("数据处理: 处理器", () => {
  //     const data = {
  //       a: "1",
  //       c: 1,
  //       t: {
  //         b: {
  //           f: "lhh"
  //         }
  //       },
  //       v: [
  //         { a: 1, b: 2 },
  //         { a: 11, b: 12 },
  //         { a: 21, b: 22 }
  //       ]
  //     };
  //     const res = transform(
  //       data,
  //       `{
  //           a: appendAfter("a", "个"),
  //           b: appendAfter($("a"), "个"),
  //           c: appendAfter($("a"), $("c")),
  //           d: appendAfter($("t.b.f"), "hello"),
  //           e: $("t.b"),
  //           f: concat($("t.b.f"), $("t.b.f"), "123456"),
  //           g: $("v.0.a"),
  //           h: {
  //             a: appendAfter("a", "个"),
  //             b: concat($("t.b.f"), $("t.b.f"), "123456"),
  //             c: $("v.0.a"),
  //             d: {
  //               a: appendAfter("a", "个"),
  //               b: concat($("t.b.f"), $("t.b.f"), "123456"),
  //               c: $("v.0.a")
  //             }
  //           }
  //         }`
  //     );
  //     expect(res).toEqual({
  //       a: "a个",
  //       b: "1个",
  //       c: "11",
  //       d: "lhhhello",
  //       e: { f: "lhh" },
  //       f: "lhhlhh123456",
  //       g: 1,
  //       h: {
  //         a: "a个",
  //         b: "lhhlhh123456",
  //         c: 1,
  //         d: { a: "a个", b: "lhhlhh123456", c: 1 }
  //       }
  //     });
  //   });

  //   it("数据处理: 处理器 数组 回调函数", () => {
  //     const data = {
  //       v: [
  //         { a: 1, b: 2 },
  //         { a: 11, b: 12 },
  //         { a: 21, b: 22 }
  //       ]
  //     };
  //     const template = `{
  //       i: $map(
  //         $("v"),
  //         $func(
  //           $call($defineVar, "item", $e),
  //           $call($defineVar, "index", $i),
  //           $return({
  //             // a: $getVar("scopeVar.a"),
  //             // b: $getVar("scopeVar.b"),
  //             // c: appendAfter($getVar("scopeVar.a"), "个"),
  //             // d: {
  //             //   a: appendAfter($getVar("scopeVar.b"), $getVar("scopeVar.a")),
  //             //   b: {
  //             //     a: appendAfter($getVar("scopeVar.b"), $getVar("scopeVar.a"))
  //             //   }
  //             // },
  //             item: $call($getVar, "item"),
  //             index: $call($getVar, "index")
  //           })
  //         )
  //       )
  //     }`;

  //     const res = transform(data, template);
  //     console.log("res", JSON.stringify(res));

  //     expect(res).toEqual({
  //       i: [
  //         {
  //           // a: 1,
  //           // b: 2,
  //           // c: "1个",
  //           // d: {
  //           //   a: "21",
  //           //   b: {
  //           //     a: "21"
  //           //   }
  //           // }
  //           index: 0,
  //           item: {
  //             a: 1,
  //             b: 2
  //           }
  //         },
  //         {
  //           // a: 11,
  //           // b: 12,
  //           // c: "11个",
  //           // d: {
  //           //   a: "1211",
  //           //   b: {
  //           //     a: "1211"
  //           //   }
  //           // }
  //           index: 1,
  //           item: {
  //             a: 11,
  //             b: 12
  //           }
  //         },
  //         {
  //           // a: 21,
  //           // b: 22,
  //           // c: "21个",
  //           // d: {
  //           //   a: "2221",
  //           //   b: {
  //           //     a: "2221"
  //           //   }
  //           // }
  //           index: 2,
  //           item: {
  //             a: 21,
  //             b: 22
  //           }
  //         }
  //       ]
  //     });
  //   });
});
