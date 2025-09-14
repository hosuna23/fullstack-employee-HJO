import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

export async function seedEmployees() {
  const employees = [
    { name: "Alice Johnson",   birthday: "1990-01-15", salary: 72000 },
    { name: "Bob Smith",       birthday: "1985-03-22", salary: 84000 },
    { name: "Carla Gomez",     birthday: "1992-07-09", salary: 68000 },
    { name: "David Lee",       birthday: "1979-11-30", salary: 95000 },
    { name: "Elena Fisher",    birthday: "1995-05-12", salary: 63000 },
    { name: "Frank Nguyen",    birthday: "1988-09-01", salary: 80000 },
    { name: "Grace Park",      birthday: "1991-12-03", salary: 77000 },
    { name: "Hector Osuna",    birthday: "1986-06-18", salary: 88000 },
    { name: "Ivy Chen",        birthday: "1993-02-25", salary: 69000 },
    { name: "Jason Turner",    birthday: "1982-08-14", salary: 91000 },
  ];

 
  await db.query(`DELETE FROM employees;`);

  const values = employees
    .map(
      (_, i) =>
        `($${i * 3 + 1}, $${i * 3 + 2}, $${i * 3 + 3})`
    )
    .join(", ");

  const params = employees.flatMap((e) => [e.name, e.birthday, e.salary]);

  await db.query(
    `INSERT INTO employees (name, birthday, salary) VALUES ${values};`,
    params
  );
}
