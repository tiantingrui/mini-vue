import { track, trigger } from "./effect";

// 一上来就去创建一下，这样初始化的时候只会被调用一次，减少性能开销
const get = createGetter();
const set = createSetter();

const readonlyGet = createGetter(true);

function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key);
    if (!isReadonly) {
      // 依赖收集
      track(target, key);
    }
    return res;
  };
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);
    // 触发依赖
    trigger(target, key, value);
    return res;
  };
}

export const mutableHandlers = {
  get,
  set,
};

export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`key：${key} set 失败，因为target是 readonly`, target);
    return true;
  },
};
