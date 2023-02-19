import { atom, selector } from "recoil";
import { getId } from "./utils";

export const todoListState = atom({
  key: "todoListState",
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      console.log('effects is called')
      setTimeout(() => {
        setSelf([
          {
            id: getId(),
            text: 'delayed initilization',
            isComplete: false,
          },
        ])
      }, 1000)
      return () => {
        console.log('cleanup is called')
      }
    }
  ]
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompleteNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompleteNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompleteNum / totalNum;

    return {
      totalNum,
      totalCompleteNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

export const notCalledAtomState = atom({
  key: 'notCalledAtom',
  default: () => {
      console.log('atom is called: foo')
      return 'foo'
    }
})

export const notCalledAtomWithEffectsState = atom({
  key: 'notCalledAtomWithEffects',
  effects: [
    ({ setSelf }) => {
      console.log('atom is called: bar')
      setSelf('bar')
    }
  ]
})

const baz = () => {
  console.log('baz is called')
  return baz
}

export const notCalledAtomWithFunctionState = atom({
  key: 'notCalledAtomWithFunction',
  default: baz()
})

export const nestedTestAtom = atom({
  key: 'nestedTestAtom',
  default: 'foo'
})
