export const getItemFromListObject = (objList, keyName, keyValue) => {
  const objValues = Object.values(objList)
  const lengthValue = objValues.length
  for (let i = 0; i < lengthValue; i++) {
    const itemFinal = objValues[i].find(item => item[keyName] === keyValue)
    if (itemFinal) {
      return itemFinal
    }
  }

  return null
}

export const getListIdentify = (objList, keyName) => {
  const keyList = []
  const objValues = Object.values(objList)
  objValues.forEach((list) => {
    list.forEach((item) => {
      if (item.gameId && !keyList.includes(item.gameId)) {
        keyList.push(item[keyName])
      }
    })
  })
  return keyList
}
