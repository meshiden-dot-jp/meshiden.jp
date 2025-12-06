import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

const items = [
  {
    year: "2024",
    award: (
      <>
        <p><a href="https://topaz.dev/projects/ac3c682bb55442262681">Progateハッカソン 優秀賞（団体） <i className="fa-solid fa-arrow-up-right-from-square"></i></a></p>
      </>
    ),
  },
  {
    year: "2022",
    award: (
      <>
        <p><a href="https://express.adobe.com/page/SQ8KHbD94RDKy/">SDGsクリエイティブアイデアコンテスト2021 優秀賞（個人） <i className="fa-solid fa-arrow-up-right-from-square"></i></a></p><br />
        <p>平塚秦野地区県立学校交通安全大会ポスターの部 最優秀賞（個人）</p>
      </>
    ),
  },
]

const award = () => {
  return (
    <div>
      <h2 id='awards'>受賞歴</h2>
      <Table>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.year}>
              <TableCell className="w-[20%] font-medium align-text-top pl-2 sm:pl-4 leading-8">{item.year}</TableCell>
              <TableCell className="pr-2 sm:pr-4">{item.award}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default award