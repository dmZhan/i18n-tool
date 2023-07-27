import { join, resolve } from 'node:path'
import { cwd } from 'node:process'
import { read, set_fs, utils } from 'xlsx'
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
  const files = await fg(['*.json', '!zh_cn.json'], { cwd: langsRoot })
  const arr = []
  for (const file of files)
    arr.push(await fs.readJson(file))

  return arr
}
