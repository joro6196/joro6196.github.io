function print (n, obj){
    console.log(`Problem ${n}`, JSON.parse(JSON.stringify(obj)));
}

// P1: Create JSON for each employee

const employees = [
    {
        firstName: "Sam",
        department: "Tech",
        designation: "Manager",
        salary: 40000,
        raiseEligible: true,   
    },
    {
        firstName: "Mary",
        department: "Finance",
        designation: "Trianee",
        salary: 18500,
        raiseEligible: true 
    },
    {
        firstName: "Bill",
        department: "HR",
        designation: "Executive",
        salary: 21200,
        raiseEligible: true 
    },
];

print(1, employees);

/////////console.log('Problem 1', employees)

// P2: Create JSON for the company

const company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
}

print(2, company);

//console.log('Problem 2', company)

// P3: A new employee has joined

const newEmployee = {
    firstName: "Anna",
    department: "Tech",
    designation: "Executive",
    salary: 25600,
    raiseEligible: false,
}

company.employees.push(newEmployee);
print(3, employees);
/////////console.log('Problem 3', employees);

// P4: Calculate total salary for all company employees

let total = 0;
for(const employee of employees){
    total += employee["salary"];
}

print(4, total);
/////////console.log('Problem 4', total);

// P5: Update salary for eligible employees
for(const employee of employees){
    if (employee["raiseEligible"] == true){
        employee["salary"] *= 1.1;
        employee["raiseEligible"] = false;
    }
}

print(5, employees);
///////// console.log('Problem 5', employees)


// P6: Update employees working from home

const employeeWFH = ['Anna', 'Sam'];

for(const employee of employees){
    let flag = false;
    for(const employeeName of employeeWFH){
        if(employee.firstName == employeeName){
            flag = true;
            break;
        }
    }
    employee.WFH = flag;
}

print(6, employees);


