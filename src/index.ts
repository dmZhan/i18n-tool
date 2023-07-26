import { join } from 'node:path'
import { cwd } from 'node:process'
import fg from 'fast-glob'
import { read, set_fs } from 'xlsx'

export async function getServerSideProps() {
  set_fs(await import('node:fs')) // dynamically import 'fs' in `getServerSideProps`
  const wb = read(join(cwd(), 'examples', '1.xlsx'))
  return wb
}

export async function readXlsx() {
  const files = await fg('examples/**/*.xlsx', {
  })

  const work = read(files[0])
  return work
}
