export const mergeInverseHookSoFirestoreUnbindsAtTheEnd = (
  parentVal,
  childVal
) => {
  const res = childVal
    ? parentVal
      ? makeSureIsArray(childVal).concat(parentVal)
      : makeSureIsArray(childVal)
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

const makeSureIsArray = (childVal) => Array.isArray(childVal) ? childVal : [childVal];

const dedupeHooks = (hooks) => {
  const res = []
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i])
    }
  }
  return res
}
