// Require the Fastify framework and instantiate it
const fastify = require("fastify")();

const students = [
  {
    id: 1,
    last: "Last1",
    first: "First1",
  },
  {
    id: 2,
    last: "Last2",
    first: "First2",
  },
  {
    id: 3,
    last: "Last3",
    first: "First3",
  }
];


// const getStudent = (id) => {
//   let num = parseInt(id) - 1;
//   let response = students.filter(data => data.id = num)
//   return response[0];
// }

// const appendToStudent = (first, last) => {
//   const biggestId = students.reduce((prev, current) => {
//     if (current.id > prev) {
//       return current.id;
//     }
//     return prev;
//   }, -1)

//   const newStudent = (first, last) = { id: biggestId + 1, first, last };
//   students = [...students, newStudent];
//   return students
// }


fastify.get("/cit/student", (request, reply) => {

  reply
    .code(200)
    .header("Content-Type", "application/json; charset=utf-8")
    .send(students);
});






fastify.get("/cit/student/:id", (request, reply) => {
  console.log(request.params);
  const { id } = request.params;
  let student = null;
  for (const element of students) {
    if (element.id === parseInt(id)) {
      student = element;
      break;
    }
  }


  if (!student) {
    reply
      .code(404)
      .header('Content-Type', 'text/html')
      .send('student not found');
  } else {
    if (student) {
      reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send(student);
    }
  }
});



fastify.get("*", (request, reply) => {

  reply
    .code(401)
    .header("Content-Type", "applacarion/json; charset=utf-8")
    .send("route not found");
});


fastify.post("/cit/student", (request, reply) => {
  console.log(request.body)
  const { last, first } = request.body;
  
  if (!last || !first) {
    reply
      .code(404)
      .header("Content-Type", "text/html; charset=utf-8")
      .send("id not found");
  } else {
  let id = 0;
  for (const element of students) {
    if (element.id > id) {
      id = element.id;
    
    } 
  }
id++
students.push({id, last, first})
reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(students[students.length-1]);
  }

let response = response.body;
reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send(response);
  
});

// Start server and listen to requests using Fastify
const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
