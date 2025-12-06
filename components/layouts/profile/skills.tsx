import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"

const items = [
  {
    category: "Frontend",
    contents: (
      <>
        <p>HTML, CSS, Javascript, Next.js, Ruby on Rails, Tailwind CSS, Sass</p>
      </>
    ),
  },
  {
    category: "Language",
    contents: (
      <>
        <p>C, Java, Ruby</p>
      </>
    ),
  },
  {
    category: "Design",
    contents: (
      <>
        <p>Illustrator, After Effects, Premiere Pro, Photoshop, Figma</p>
      </>
    ),
  },
]

const biography = () => {
  return (
    <div>
      <h2 id='skills'>技術</h2>
      <Table>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.category}>
              <TableCell className="w-[20%] font-medium align-text-top pl-2 sm:pl-4 leading-8">{item.category}</TableCell>
              <TableCell className="pr-2 sm:pr-4">{item.contents}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default biography