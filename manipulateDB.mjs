import { PrismaClient } from "@prisma/client";

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const prisma = new PrismaClient();

// for (let i = 0; i < 24; i++) {
//   let end;
//   if (i <= 9) {
//     end = "0" + i;
//   } else {
//     end = i;
//   }
//   const result = await prisma.unit.create({
//     data: {
//       id: parseInt("11" + end),
//     },
//   });
//   console.log(result)
// }

for (let i = 0; i < 5; i++) {
  const result = await prisma.assignment.create({
    data: {
      id: i,
      title: "Assignment " + i,
      description: "Description " + 1,
      openDate: new Date(
        `${randInt(2021, 2022)}-${randInt(11, 12)}-${randInt(10, 30)}`
      ),
      dueDate: new Date(
        `${randInt(2021, 2022)}-${randInt(11, 12)}-${randInt(10, 30)}`
      ),
    },
  });
  console.log(result);
}
