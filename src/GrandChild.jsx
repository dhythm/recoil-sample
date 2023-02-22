import React from "react";
import { RecoilRoot, useRecoilValue } from "recoil"
import { GreatGrandChild } from "./GreatGrandChild";
import { nestedTestAtom } from "./states";

export const GrandChild = () => {
  const value = useRecoilValue(nestedTestAtom)
  return (
    <RecoilRoot>
      <p>GrandChild: {value}</p>
      <GreatGrandChild />
    </RecoilRoot>
  )
}
