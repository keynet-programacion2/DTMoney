const transactions = [];
const INITIAL_VALUES = {
  totalEntrys: 0,
  totalExits: 0,
  totalBalance: 0,
};

function printLine(transaction) {
  //search table
  const table = document.querySelector("#info table");
  //create a tr
  const newRow = document.createElement("tr");
  //Create ftitle as a td
  const titleCell = document.createElement("td");
  titleCell.textContent = transaction.title;
  titleCell.className = "normal-text";
   //Create fprice as a td and assign class(if transaction.flag(radiobutton value) it's entry or exit) and format the price to €
  const priceCell = document.createElement("td");
  if (transaction.flag == '1') {
    priceCell.className = "green-text";
    priceCell.textContent =  new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(transaction.price);
  } else if (transaction.flag == '0') {
    priceCell.className = "red-text";
    priceCell.textContent = '- '+ new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(transaction.price);
  }
  //Create the category as a td
  const categoryCell = document.createElement("td");
  categoryCell.textContent = transaction.category;
  categoryCell.className = "normal-text";
  //Create the date as a td 
  const dateCell = document.createElement("td");
  dateCell.textContent = transaction.date.toLocaleDateString();;
  dateCell.className = "normal-text";
  //append the td's to the tr
  newRow.appendChild(titleCell);
  newRow.appendChild(priceCell);
  newRow.appendChild(categoryCell);
  newRow.appendChild(dateCell);
  //append the tr in table
  table.appendChild(newRow);
}

function recalculTotals(transaction) {

  const totals = transactions.reduce((totals,transaction) => {
    
    console.log(totals)
    console.log(transaction)
    if (transaction.flag === "1") {
      totals.totalEntrys += transaction.price;
    } else if (transaction.flag === "0") {
      totals.totalExits += transaction.price;
    }
    

    return totals;
  }, INITIAL_VALUES);
  console.log(INITIAL_VALUES)
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  let totalEntrys = new Decimal(0);
  let totalExits = new Decimal(0);
  let totalBalance = new Decimal(0);

  // Update the UI with the loaded values
  const entrynSpan = document.getElementById("entryn");
  entrynSpan.textContent = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(totalEntrys);

  const exitnSpan = document.getElementById("exitn");
  exitnSpan.textContent = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(totalExits);

  const balancenSpan = document.getElementById("balancen");
  balancenSpan.textContent = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(totalBalance);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const transactionstoSave = {
      title: data.fname,
      price: parseFloat(data.fprice),
      category: data.fcategory,
      date: new Date(),
      flag: data.type,
    };

    console.log(transactionstoSave);
    transactions.push(transactionstoSave);
    form.reset();

    printLine(transactionstoSave);
    recalculTotals(transactionstoSave);


    const jsonData = JSON.stringify(transactions);

  });
});
