[CN](README.md) / [EN](README_EN.md)

## mini-vue  
> 手写一遍，才算真正的掌握

实现最简 vue3 模型，用于深入学习 vue3，理解 vue3 的核心逻辑。

## 和vue3源码有什么区别

当我们需要深入学习 vue3 时，我们就需要看源码来学习，但是像这种工业级别的库，源码中有很多逻辑是用于处理边缘情况或者是兼容处理逻辑，是不利于我们学习的。

我们应该关注于核心逻辑，而这个库的目的就是把 vue3 源码中最核心的逻辑剥离出来，只留下核心逻辑，帮助大家快速掌握 vue3。

## Tip

基于 vue3 的功能点，一点一点的拆分出来。

代码命名会保持和源码中的一致，会方便大家通过命名去源码中查找逻辑。

## Tasking

### reactivity

目标是用自己的 reactivity 支持现有的 demo 运行

- [x] reactive 的实现
- [x] ref 的实现
- [x] readonly 的实现
- [ ] computed 的实现
- [x] track 依赖收集
- [x] trigger 触发依赖
- [x] 支持 isReactive
- [x] 支持嵌套 reactive
- [ ] 支持 toRaw
- [x] 支持 effect.scheduler
- [x] 支持 effect.stop
- [x] 支持 isReadonly
- [x] 支持 isProxy
- [x] 支持 shallowReadonly
- [x] 支持 proxyRefs

### runtime-core

- [ ] 支持组件类型
- [ ] 支持 element 类型
- [ ] 初始化 props
- [ ] setup 可获取 props 和 context
- [ ] 支持 component emit
- [ ] 支持 proxy
- [ ] 可以在 render 函数中获取 setup 返回的对象
- [ ] nextTick 的实现
- [ ] 支持 getCurrentInstance
- [ ] 支持 provide/inject
- [ ] 支持最基础的 slots
- [ ] 支持 Text 类型节点
- [ ] 支持 $el api



### compiler-core
- [ ] 解析插值
- [ ] 解析 element
- [ ] 解析 text

### runtime-dom
- [ ] 支持 custom renderer 

