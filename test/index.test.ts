import { describe, expect, it } from 'vitest'
import { generateExcel, getServerSideProps } from '../src/index'

describe('i18n-tool', () => {
  // it('readXlsx', async () => {
  //   expect(await readXlsx()).toMatchInlineSnapshot()
  // })

  it('getServerSideProps', async () => {
    expect(await getServerSideProps()).toMatchInlineSnapshot(`
      [
        {
          "list": [
            [
              "枪",
              "gun",
            ],
            [
              "中国",
              "China",
            ],
            [
              "同方",
              "Nuctech",
            ],
          ],
        },
      ]
    `)
  })

  it('generateExcel', async () => {
    expect(await generateExcel()).toMatchInlineSnapshot(`
      [
        "shell_1033.json",
        "shell_2052.json",
      ]
    `)
  })
})
