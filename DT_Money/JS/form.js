let transactions = [];
const INITIAL_VALUES = {
  totalEntrys: 0,
  totalExits: 0,
  totalBalance: 0,
};
const jsonData = localStorage.getItem("transactions");
const table = document.querySelector(".info table");

function printLine(transaction) {
  const newTR = document.createElement("tr");
  //Create ftitle as a td
  const titleCell = document.createElement("td");
  titleCell.textContent = transaction.title;
  titleCell.className = "title-text";
  //Create fprice as a td and assign class(if transaction.flag(radiobutton value) it's entry or exit) and format the price to €
  const priceCell = document.createElement("td");
  if (transaction.flag == "1") {
    priceCell.className = "green-text";
    priceCell.textContent = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(transaction.price);
  } else if (transaction.flag == "0") {
    priceCell.className = "red-text";
    priceCell.textContent =
      "- " +
      new Intl.NumberFormat("de-DE", {
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
  dateCell.textContent = transaction.date;
  dateCell.className = "normal-text";
  //append the td's to the tr
  newTR.appendChild(titleCell);
  newTR.appendChild(priceCell);
  newTR.appendChild(categoryCell);
  newTR.appendChild(dateCell);
  //append the tr in table
  table.appendChild(newTR);
}

function recalculTotals(transaction) {
  if (transaction.flag === "1") {
    INITIAL_VALUES.totalEntrys += transaction.price;
  } else if (transaction.flag === "0") {
    INITIAL_VALUES.totalExits += transaction.price;
  }
  INITIAL_VALUES.totalBalance =
    INITIAL_VALUES.totalEntrys - INITIAL_VALUES.totalExits;
  console.log(INITIAL_VALUES);

  return INITIAL_VALUES;
}

function printBalance() {
  const entrynSpan = document.getElementById("entry");
  entrynSpan.textContent = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(INITIAL_VALUES.totalEntrys);

  const exitnSpan = document.getElementById("exit");
  exitnSpan.textContent = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(INITIAL_VALUES.totalExits);

  const balancenSpan = document.getElementById("balance");
  balancenSpan.textContent = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(INITIAL_VALUES.totalBalance);
  const balancenDiv = document.getElementById("balanceDiv");
  if (INITIAL_VALUES.totalBalance >= 0) {
    balancenDiv.className = "green-balance";
  } else {
    balancenDiv.className = "red-balance";
  }
}

function loadLocalStorage() {
  transactions = JSON.parse(jsonData);
  
  transactions.forEach((transaction) => {
    const transactionstoPrint = {
      ...transaction,
      price: parseFloat(transaction.price),
    };
    const jsonData = JSON.stringify(transactions);
    console.log(transactionstoPrint);
    printLine(transactionstoPrint);
    recalculTotals(transactionstoPrint);
    printBalance();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (jsonData) {
    console.log("Cargando datos desde el local storage");
    loadLocalStorage();
  } else {
    console.log(
      "No se puede cargar desde local storage ya que no hay ningun registro guardado"
    );
    printBalance();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const transactionstoSave = {
      title: data.fname,
      price: parseFloat(data.fprice),
      category: data.fcategory,
      date: new Date().toLocaleDateString(),
      flag: data.type,
    };

    console.log("transaction" + transactionstoSave);
    transactions.push(transactionstoSave);
    const jsonData = JSON.stringify(transactions);

    // Guarda la string en local storage
    localStorage.setItem("transactions", jsonData);

    console.log("transaction saved" + jsonData);
    form.reset();

    printLine(transactionstoSave);
    recalculTotals(transactionstoSave);
    printBalance();
  });
});
