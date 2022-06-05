import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./component";

export function render(vnode, container) {
  // patch
  patch(vnode, container);
}

function patch(vnode, container) {
  // 去处理组件
  // 判断是不是element类型
  // TODO 判断vnode 是不是一个 element
  // 思考：如何去区分是 element 还是 component 类型？
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
    
  } else if (isObject(vnode.type)) {
  processComponent(vnode, container);
    
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)
  
}

function mountElement(vnode: any, container: any) {
  const el = document.createElement(vnode.type)
  
  // string array
  const { children } = vnode
  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el)
  }

  el.textContent = children

  // props
  const { props } = vnode
  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  container.append(el)
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container)
  })
}

function processComponent(vnode: any, container: any) {
  // 先去挂载一下组件
  mountComponent(vnode, container);
}

function mountComponent(vnode: any, container) {
  // 创建组件实例
  const instance = createComponentInstance(vnode);

  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance: any, container) {
  const subTree = instance.render();

  // vnode -> patch
  // vnode -> element -> mountElement

  patch(subTree, container);
}


