import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

const items = [
  {
    year: "2027",
    publish: (
      <>
        <p><strong>石塚 翔馬</strong>, 紅林 勇陽, 戸辺 義人, 「脳波感情認識における脳波に適した適応型変分的モード分解の検討」, 情報処理学会全国大会 86, 2024‑03, 神奈川</p><br />
        <p><strong>石塚 翔馬</strong>, 紅林 勇陽, 戸辺 義人, 「脳波感情認識における脳波に適した適応型変分的モード分解の検討」, 情報処理学会全国大会 86, 2024‑03, 神奈川</p>
      </>
    ),
  },
  {
    year: "2024",
    publish: (
      <>
        <p><strong>石塚 翔馬</strong>, 紅林 勇陽, 戸辺 義人, 「脳波感情認識における脳波に適した適応型変分的モード分解の検討」, 情報処理学会全国大会 86, 2024‑03, 神奈川</p>
      </>
    ),
  },
]

const publish = () => {
  return (
    <div>
      <h2 id='publishes'>出版</h2>
      <Table>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.year}>
              <TableCell className="w-[20%] font-medium align-text-top pl-2 sm:pl-4 leading-8">{item.year}</TableCell>
              <TableCell className="pr-2 sm:pr-4">{item.publish}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default publish