import React from "react";
import { useRecoilValue } from "recoil"
import { nestedTestAtom } from "./states";

export const GreatGrandChild = () => {
  const value = useRecoilValue(nestedTestAtom)
  return (
    <div>
      <p>GreatGrandChild: {value}</p>
    </div>
  )
}
