import { atom, selector } from 'recoil';

/**
 * ? 몇 분인지만 상태에 저장하고 이 상태를 활용해서 (selector) 새로운 상태값을 만들어내자
 */

export const minuteState = atom({
  key: 'minute',
  default: 0,
});

export const hourState = selector<number>({
  key: 'hour',
  get: ({ get }) => {
    const minute = get(minuteState);
    return minute / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60;
    set(minuteState, minutes);
  },
});
