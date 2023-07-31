import { join, resolve } from 'node:path'
import { cwd } from 'node:process'
import { read, set_fs, utils } from 'xlsx'
import type { WorkBook, WritingOptions } from 'xlsx'
import fg from 'fast-glob'
import fs from 'fs-extra'

const rootDir = resolve(__dirname, '..')

export async function getServerSideProps() {
  set_fs(await import('node:fs')) // dynamically import 'fs' in `getServerSideProps`
  const wb = read(join(cwd(), 'examples', '1.xlsx'), {
    type: 'file',
  })
  const sheets = wb.Sheets
  const sheetItem = Object.keys(sheets)
  const sheetArr: Record<string, any>[] = []
  sheetItem.forEach((item) => {
    const sheetJson = utils.sheet_to_json(sheets[item], { header: 1 })
    sheetArr.push({
      list: sheetJson,
    })
  })
  return sheetArr
}

// export async function readXlsx() {
//   const files = await fg('examples/**/*.xlsx', {
//   })

//   const work = read(join(cwd(), files[0]), {
//     type: 'file',
//   })
//   // const work = join(cwd(), files[0])
//   return work
// }
export async function generateExcel() {
  const langsRoot = resolve(rootDir, 'langs')
  const files = await fg(['zh_cn.json'], { cwd: langsRoot })
  // const ws = utils.json_to_sheet(Object.values(flatJson(await fs.readJson(join(langsRoot, files[0])))))
  return [{ zh_cn: '中文' }, ...Object.values(flatJson(await fs.readJson(join(langsRoot, files[0])))).map(item => ({ zh_cn: item }))]
}

export async function kk() {
  const s: any[] = await generateExcel()
  const wopts: WritingOptions = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'file',
  }
  const workBook: WorkBook = {
    SheetNames: ['Sheet1'],
    Sheets: {},
    Props: {},
  }
  workBook.Sheets.Sheet1 = utils.json_to_sheet(s, { header: ['zh_cn'], skipHeader: true })
  // writeFile(workBook, join(cwd(), 'examples', '2.xlsx'), wopts)
  return workBook
}
export function flatJson(obj: Record<string, any>, pKey?: string): Record<string, string> {
  let result: Record<string, string> = {}
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    const _key = pKey ? `${pKey}.${key}` : key
    if (typeof value === 'object')
      result = { ...result, ...flatJson(value, _key) }

    else
      result[_key] = value
  })

  return result
}

// (async () => {
//   /* fetch JSON data and parse */
//   const url = 'https://theunitedstates.io/congress-legislators/executive.json'
//   const raw_data = (await axios(url, { responseType: 'json' })).data

//   /* filter for the Presidents */
//   const prez = raw_data.filter(row => row.terms.some(term => term.type === 'prez'))

//   /* flatten objects */
//   const rows = prez.map(row => ({
//     name: `${row.name.first} ${row.name.last}`,
//     birthday: row.bio.birthday,
//   }))

//   /* generate worksheet and workbook */
//   const worksheet = utils.json_to_sheet(rows)
//   const workbook = utils.book_new()
//   utils.book_append_sheet(workbook, worksheet, 'Dates')

//   /* fix headers */
//   utils.sheet_add_aoa(worksheet, [['Name', 'Birthday']], { origin: 'A1' })

//   /* calculate column width */
//   const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10)
//   worksheet['!cols'] = [{ wch: max_width }]

//   /* create an XLSX file and try to save to Presidents.xlsx */
//   writeFile(workbook, 'Presidents.xlsx')
// })()
