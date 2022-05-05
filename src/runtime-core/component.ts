export function createComponentInstance(vnode) {
  const compoennt = {
    vnode,
    type: vnode.type,
  };

  return compoennt;
}

export function setupComponent(instance) {
  // TODO initProps initSlots
  // 初始化一个有状态的component
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type;

  const { setup } = Component;

  if (setup) {
    // function -> render ;  Object -> 注入到组件上下文中
    const setupResult = setup();

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance, setupResult: any) {
  // function Object
  // TODO 先去实现Object， 后续实现function

  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const Component = instance.type;

  if (!Component.render) {
    instance.render = Component.render;
  }
}
