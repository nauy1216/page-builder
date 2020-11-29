// import JsonTransform, { processor, EnvironmentVars } from "../json-transform";
// const { $, $defineVar, $getVar, $func, $return, appendAfter, toString, toNumber, concat, map } = processor;
// const { $e, $i } = EnvironmentVars;
// describe("processor", () => {
//   it("appendAfter", () => {
//     const res = appendAfter("a", "px");
//     expect(res).toEqual(["appendAfter", "a", "px"]);
//   });

//   it("appendAfter toString", () => {
//     const res = toString(appendAfter("a", "px"));
//     expect(res).toEqual(["toString", ["appendAfter", "a", "px"]]);
//   });

//   it("toString appendAfter", () => {
//     const res = appendAfter(toString("a"), "px");
//     expect(res).toEqual(["appendAfter", ["toString", "a"], "px"]);
//   });

//   it("toString appendAfter $", () => {
//     const res = appendAfter($("a"), "px");
//     expect(res).toEqual(["appendAfter", ["internal_getValue", "a"], "px"]);
//   });

//   // it("eval", () => {
//   //   const transformStr = eval(`({
//   //     i: map(
//   //       $("v"),
//   //       $func({
//   //         a: $("a"),
//   //         b: $("b"),
//   //         c: appendAfter($("a"), "个"),
//   //         d: {
//   //           a: appendAfter($("b"), $("a")),
//   //           b: {
//   //             a: appendAfter($("b"), $("a"))
//   //           }
//   //         }
//   //       })
//   //     )
//   //   })`);
//   //   // console.log("transformStr===============> ", JSON.stringify(transformStr));
//   //   expect(transformStr).toEqual({
//   //     i: map(
//   //       $("v"),
//   //       $func({
//   //         a: $("a"),
//   //         b: $("b"),
//   //         c: appendAfter($("a"), "个"),
//   //         d: {
//   //           a: appendAfter($("b"), $("a")),
//   //           b: {
//   //             a: appendAfter($("b"), $("a"))
//   //           }
//   //         }
//   //       })
//   //     )
//   //   });
//   // });
//   // it("节点嵌套", () => {
//   //   const res = appendAfter("222", $("a"), $("b"), "123");
//   //   // console.log("res==============", JSON.stringify(res, null, 2));
//   //   expect(res).toEqual({
//   //     typeof: "ProcessorNode",
//   //     type: "appendAfter",
//   //     children: [
//   //       "222",
//   //       {
//   //         typeof: "ProcessorNode",
//   //         type: "internal_getValue",
//   //         children: ["a"]
//   //       },
//   //       {
//   //         typeof: "ProcessorNode",
//   //         type: "internal_getValue",
//   //         children: ["b"]
//   //       },
//   //       "123"
//   //     ]
//   //   });
//   // });
// });

// describe("JsonTransform", () => {
//   it("映射: 基本类型 常量 变量", () => {
//     const data = {
//       a: "1",
//       b: "144"
//     };
//     const res = new JsonTransform().transform(
//       {
//         a: "a",
//         b: $("a"),
//         c: $("b"),
//         d: "a"
//       },
//       data
//     );
//     expect(res).toEqual({ a: "a", b: "1", c: "144", d: "a" });
//   });

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
//     const jsonTransform = new JsonTransform();
//     const res = jsonTransform.transform(
//       {
//         a: appendAfter("a", "个"),
//         b: appendAfter($("a"), "个"),
//         c: appendAfter($("a"), $("c")),
//         d: appendAfter($("t.b.f"), "hello"),
//         e: $("t.b"),
//         f: concat($("t.b.f"), $("t.b.f"), "123456"),
//         g: $("v.0.a"),
//         h: {
//           a: appendAfter("a", "个"),
//           b: concat($("t.b.f"), $("t.b.f"), "123456"),
//           c: $("v.0.a"),
//           d: {
//             a: appendAfter("a", "个"),
//             b: concat($("t.b.f"), $("t.b.f"), "123456"),
//             c: $("v.0.a")
//           }
//         }
//       },
//       data
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
//     const transform = {
//       i: map(
//         $("v"),
//         $func(
//           $defineVar("item", $e),
//           $defineVar("index", $i),
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
//             item: $getVar("item"),
//             index: $getVar("index")
//           })
//         )
//       )
//     };
//     const jsonTransform = new JsonTransform();
//     console.log(JSON.stringify(transform));
//     const res = jsonTransform.transform(transform, data);
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
//   // it("数据处理: 处理器 作用域", () => {
//   //   const data = {
//   //     v: [
//   //       { a: 1, b: 2 },
//   //       { a: 11, b: 12 },
//   //       { a: 21, b: 22 }
//   //     ]
//   //   };
//   //   const transform = {
//   //     i: $scope($("v"), $("1"))
//   //   };
//   //   console.log("transform", JSON.stringify(transform));
//   //   const jsonTransform = new JsonTransform();
//   //   const res = jsonTransform.transform(transform, data);
//   //   console.log("res", JSON.stringify(res));
//   //   expect(res).toEqual({
//   //     i: { a: 1, b: 2 }
//   //   });
//   // });
// });
// // eslint-disable-next-line
// const data = {
//   a: "1",
//   c: 1,
//   t: {
//     b: {
//       f: "lhh"
//     }
//   },
//   v: [
//     { a: 1, b: 2 },
//     { a: 11, b: 12 },
//     { a: 21, b: 22 }
//   ]
// };
// // eslint-disable-next-line
// const t = `
// {
//     a:
// }
// `;
