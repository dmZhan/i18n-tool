import { describe, expect, it } from 'vitest'
import { getServerSideProps, readXlsx } from '../src/index'

describe('i18n-tool', () => {
  it('readXlsx', async () => {
    const a = await readXlsx()
    expect(a).toMatchInlineSnapshot(`
      {
        "SheetNames": [
          "Sheet1",
        ],
        "Sheets": {
          "Sheet1": {
            "!ref": "A1",
            "A1": {
              "t": "s",
              "v": "{¦¦W¬ÿ\\\\e³ ",
              "w": "{¦¦W¬ÿ\\\\e³ ",
            },
          },
        },
      }
    `)
  })

  it('getServerSideProps', async () => {
    const a = await getServerSideProps()
    expect(a).toMatchInlineSnapshot(`
      {
        "SheetNames": [
          "Sheet1",
        ],
        "Sheets": {
          "Sheet1": {
            "!ref": "A1:B1",
            "A1": {
              "t": "s",
              "v": "ê^-",
              "w": "ê^-",
            },
            "B1": {
              "t": "s",
              "v": "Ú(ìZ^³\\\\e³ ",
              "w": "Ú(ìZ^³\\\\e³ ",
            },
          },
        },
      }
    `)
  })
})
