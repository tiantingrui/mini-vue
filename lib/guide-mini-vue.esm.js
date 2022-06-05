function createComponentInstance(vnode) {
    const compoennt = {
        vnode,
        type: vnode.type,
    };
    return compoennt;
}
function setupComponent(instance) {
    // TODO initProps initSlots
    // 初始化一个有状态的component
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const Component = instance.type;
    const { setup } = Component;
    if (setup) {
        // function -> render ;  Object -> 注入到组件上下文中
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // function Object
    // TODO 先去实现Object， 后续实现function
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Component = instance.type;
    if (!Component.render) {
        instance.render = Component.render;
    }
}

function render(vnode, container) {
    // patch
    patch(vnode);
}
function patch(vnode, container) {
    // 去处理组件
    // 判断是不是element类型
    processComponent(vnode);
}
function processComponent(vnode, container) {
    // 先去挂载一下组件
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    // 创建组件实例
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    // vnode -> patch
    // vnode -> element -> mountElement
    patch(subTree);
}

// 将组件转换为 vdom
function createVnode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
    };
    return vnode;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // 先去转换为 vode
            // component -> vnode
            // 后续所有的逻辑操作都会基于 vnode 做处理
            const vnode = createVnode(rootComponent);
            render(vnode);
        },
    };
}

function h(type, props, children) {
    return createVnode(type, props, children);
}

export { createApp, h };
