import BushyPath from '../src/summarizer/BushyPath'

const sentences = [
  [0, 1, 2, 3, 4, 5, 1, 2],
  [0, 1, 5],
  [6, 7, 2, 3, 4, 0, 1, 2],
  [6, 8, 9, 10, 11],
]
const keyWords = [0, 6, 1]
// evaluation steps
// similarity matrix -----------------------------
// 1       0.707    0.772     0
// 0.707   1        0.436     0
// 0.772   0.436    1         0.169
// 0       0        0.169     1
// normalized weights by similarity matrix -------
// 2.479 1
// 2.143 0.8644
// 2.377 0.9588
// 1.169 0.4715
// normalized weights by key words frequency -----
// 2 0.666
// 2 0.666
// 3 1
// 1 0.333
// final weight -----------------------------------
// 1.666
// 1.5310
// 1.9588
// 0.8045

let bushyPath
const expectedMatrix = [
  [1, 0.707, 0.772, 0],
  [0.707, 1, 0.436, 0],
  [0.772, 0.436, 1, 0.169],
  [0, 0, 0.169, 1],
]

beforeAll(() => {
  bushyPath = new BushyPath(sentences, keyWords)
})

test('Returns correct similarity matrix', () => {
  const matrix = bushyPath.generateSimilarityMatrix()
  expectedMatrix.forEach((row, i) =>
    row.forEach((value, j) => expect(matrix[i][j]).toBeCloseTo(value, 3))
  )
})

test('Returns correct weights by similarity matrix evaluation', () => {
  const weights = bushyPath.evaluateBySimilarityMatrix(expectedMatrix)
  const expected = [1, 0.8644, 0.9588, 0.4715]
  expected.forEach((value, i) => expect(weights[i]).toBeCloseTo(value, 3))
})

test('Returns correct weights by key words evaluation', () => {
  const weights = bushyPath.evaluateByKeyWords()
  const expected = [0.6666, 0.6666, 1, 0.3333]
  expected.forEach((value, i) => expect(weights[i]).toBeCloseTo(value, 3))
})

test('Returns correct final ranking', () => {
  bushyPath.execute()
  const rank = bushyPath.getRank()
  const expected = [
    { index: 2, weight: 1.9588 },
    { index: 0, weight: 1.6666 },
    { index: 1, weight: 1.5310 },
    { index: 3, weight: 0.8045 },
  ]
  expected.forEach((value, i) => {
    expect(rank[i].index).toEqual(value.index)
    expect(rank[i].weight).toBeCloseTo(value.weight, 3)
  })
  // immutable array test
  rank[0] = null
  const immutableRank = bushyPath.getRank()
  expected.forEach((value, i) => {
    expect(immutableRank[i].index).toEqual(value.index)
    expect(immutableRank[i].weight).toBeCloseTo(value.weight, 3)
  })
})

test('Returns correct ranking to empty key words', () => {
  bushyPath = new BushyPath(sentences, [])
  bushyPath.execute()
  const rank = bushyPath.getRank()
  const expected = [
    { index: 0, weight: 2 },
    { index: 2, weight: 1.9588 },
    { index: 1, weight: 1.8644 },
    { index: 3, weight: 1.4715 },
  ]
  expected.forEach((value, i) => {
    expect(rank[i].index).toEqual(value.index)
    expect(rank[i].weight).toBeCloseTo(value.weight, 3)
  })
})

test('Returns correct ranking to empty sentences', () => {
  const bushyPath = new BushyPath([], [])
  bushyPath.execute()
  expect(bushyPath.getRank()).toEqual([])
})

test('Returns correct ranking to a single sentence', () => {
  const bushyPath = new BushyPath([[1, 2, 3, 4, 5]], [1, 2, 3, 4])
  bushyPath.execute()
  expect(bushyPath.getRank()).toEqual([{ index: 0, weight: 2 }])
})
