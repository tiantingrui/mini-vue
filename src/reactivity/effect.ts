import { extend } from "../shared";

let activeEffect;

class ReactiveEffect {
  private _fn: any;
  deps: any = [];
  active = true;
  onStop?: () => void;
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    return this._fn();
  }

  stop() {
    // 清空
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

// 清空依赖
function cleanupEffect(effect) {
  effect.deps.forEach((dep) => {
    dep.delete(effect);
  });
}

const targetMap = new Map();
export function track(target, key) {
  // target -> key -> dep
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    // 初始化，当没有depsMap
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    // 初始化dep
    // fn , 不可以重复， set
    dep = new Set();
    depsMap.set(key, dep);
  }
  if (!activeEffect) return;
  dep.add(activeEffect);
  // 反向存储 dep
  activeEffect.deps.push(dep);
}

export function trigger(target, key, value) {
  let depsMap = targetMap.get(target);
  console.log("targetMap", targetMap);
  console.log("depsMap", depsMap);
  let dep = depsMap.get(key);
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

export function effect(fn, options: any = {}) {
  // fn, 一上来就会去调用,可以去封装一个类，面向对象的思想
  const _effect = new ReactiveEffect(fn, options.scheduler);

  // Object.assign(_effect, options);
  extend(_effect, options);
  // _effect.onStop = options.onStop;

  _effect.run();

  const runner: any = _effect.run.bind(_effect);
  runner.effect = _effect;
  return runner;
}

export function stop(runner) {
  runner.effect.stop();
}
function dep(dep: any, arg1: (any: any) => void) {
  throw new Error("Function not implemented.");
}
