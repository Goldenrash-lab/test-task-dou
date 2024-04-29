const salaries2 = {
  TeamLead: { salary: 1000, tax: "99%" },
  Architect: { salary: 9000, tax: "34%" },
};
const team2 = [
  { name: "Alexander", specialization: "TeamLead" },
  { name: "Gaudi", specialization: "Architect" },
  { name: "Koolhas", specialization: "Architect" },
  { name: "Foster", specialization: "Architect" },
  { name: "Napoleon", specialization: "General" },
];
function calculateTeamFinanceReport(salaries, team) {
  let total = 0;
  const keys = Object.keys(salaries);
  const result = {};

  const countMembers = {};

  keys.forEach((el) => {
    countMembers[el] = team.filter((element) => {
      return element.specialization === el;
    }).length;
  });

  team.forEach((el, idx) => {
    if (keys.includes(el.specialization)) {
      const salary = salaries[el.specialization].salary;
      const tax = salaries[el.specialization].tax;
      const newTax = +tax.split("%")[0];

      total += calculateSalary(salary, newTax);

      if (el.specialization === keys[idx]) {
        result["totalBudget" + el.specialization] =
          calculateSalary(salary, newTax) * countMembers[el.specialization];
      }
    }
  });
  result.totalBudgetTeam = Math.round(total);
  return result;
}

console.log(calculateTeamFinanceReport(salaries2, team2));

function calculateSalary(salary, newTax) {
  return Math.round(salary / (1 - newTax / 100));
}
