import React from "react";
import { RecoilRoot, useRecoilValue } from "recoil"
import { GrandChild } from "./GrandChild"
import { nestedTestAtom } from "./states";

export const Child = () => {
  const value = useRecoilValue(nestedTestAtom)
  return (
    <RecoilRoot>
      <p>Child: {value}</p>
      <GrandChild />
    </RecoilRoot>
  )
}
