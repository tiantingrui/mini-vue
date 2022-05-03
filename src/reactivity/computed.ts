import { ReactiveEffect } from "./effect";

class ComputedRefImpl {
  private _getter: any;
  private _dirty: boolean = true;
  private _value: any;
  private _effect: ReactiveEffect;

  constructor(getter) {
    this._getter = getter;
    this._effect = new ReactiveEffect(getter, () => {
      // scheduler
      if (!this._dirty) {
        this._dirty = true;
      }
    });
  }

  get value() {
    // get 第一次的时候
    // 当依赖的响应式对象的值发生改变的时候，要将 dirty改为true
    // effect
    //
    if (this._dirty) {
      this._dirty = false;
      this._value = this._effect.run();
    }
    // 如果dirty为false，直接将之前保存好的value返回出去就可以了
    return this._value;
  }
}

export function computed(getter) {
  return new ComputedRefImpl(getter);
}
