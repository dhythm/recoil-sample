import React from "react";
import { RecoilRoot } from "recoil"
import { Child } from "./Child";
import { nestedTestAtom } from "./states";

export const Parent = () => {
  return (
    <RecoilRoot initializeState={({ set }) => {
      set(nestedTestAtom, 'bar')
    }}>
      <Child />
    </RecoilRoot>
  )
}
