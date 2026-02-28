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
    biography: (
      <>
        <p>
          青山学院大学理工学部情報テクノロジー学科 卒業見込
        </p>
      </>
    ),
  },
  {
    year: "2023",
    biography: (
      <>
        <p>
          神奈川県立秦野高等学校 卒業
        </p>
      </>
    ),
  },
  {
    year: "2004",
    biography: (
      <>
        <p>
          神奈川県平塚市生まれ
        </p>
      </>
    ),
  },
]

const biography = () => {
  return (
    <div>
      <h2 id='bios'>経歴</h2>
      <Table>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.year}>
              <TableCell className="w-[20%] font-medium align-text-top pl-2 sm:pl-4 leading-8">{item.year}</TableCell>
              <TableCell className="pr-2 sm:pr-4">{item.biography}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default biography