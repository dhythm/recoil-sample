import { number } from "@recoiljs/refine"
import { Link, useLocation } from "react-router-dom"
import { atom, RecoilRoot, useRecoilValue, useSetRecoilState } from "recoil"
import { RecoilURLSyncJSON, syncEffect, urlSyncEffect } from "recoil-sync"

const fooState = atom({
  key: 'foo',
  default: 0,
  effects: [syncEffect({ refine: number() })],
})

const barState = atom({
  key: 'bar',
  default: 0,
  // effects: [urlSyncEffect({ refine: number(), history: 'push' })]
  effects: [urlSyncEffect({ refine: number() })]
})

export const Location = () => {
  return (
    <RecoilRoot>
      <RecoilURLSyncJSON location={{ part: 'queryParams' }}>
        <Child />
        <Buttons />
        <ul>
          <li><Link to="/loc?foo=0">foo=0</Link></li>
          <li><Link to="/loc?foo=1">foo=1</Link></li>
        </ul>
        <ul>
          <li><Link to="/loc?bar=0">bar=0</Link></li>
          <li><Link to="/loc?bar=1">bar=1</Link></li>
        </ul>
      </RecoilURLSyncJSON>
    </RecoilRoot>
  )
}

const Buttons = () => {
  const setFoo = useSetRecoilState(fooState) 
  const setBar = useSetRecoilState(barState) 

  return (
    <>
      <ul>
        <li><button onClick={() => setFoo(2)}>foo=2</button></li>
        <li><button onClick={() => setFoo(3)}>foo=3</button></li>
      </ul>
      <ul>
        <li><button onClick={() => setBar(2)}>bar=2</button></li>
        <li><button onClick={() => setBar(3)}>bar=3</button></li>
      </ul>
    </>
  )
}

const Child = () => {
  const foo = useRecoilValue(fooState)
  const bar = useRecoilValue(barState)
  // location is not updated when query params in URL is changed
  const location = useLocation()
  return (
    <>
      <p>foo: {foo}</p>
      <p>bar: {bar}</p>
      <p>location: {JSON.stringify(location)}</p>
    </>
  )
}
