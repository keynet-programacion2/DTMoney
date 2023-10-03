const transacción = [];
const INITIAL_VALUES = {
  totalEntrys: 0,
  totalExits: 0,
  totalBalance: 0,
};

function printLine(transaction) {
  const table = document.querySelector("#info table");
  const newRow = document.createElement("tr");

  const titleCell = document.createElement("td");
  titleCell.textContent = transaction.title;
  titleCell.className = "normal-text";

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


  const categoryCell = document.createElement("td");
  categoryCell.textContent = transaction.category;
  categoryCell.className = "normal-text";

  const dateCell = document.createElement("td");

  dateCell.textContent = transaction.date.toLocaleDateString();;
  dateCell.className = "normal-text";

  newRow.appendChild(titleCell);
  newRow.appendChild(priceCell);
  newRow.appendChild(categoryCell);
  newRow.appendChild(dateCell);

  table.appendChild(newRow);

}

function recalculTotals() {
  const totals = transactions.reduce((acc, el) => {
    return acc;
  }, INITIAL_VALUES);

  // buscar elementos html y asignar valores
}

document.addEventListener("DOMContentLoaded", function () {
  const transactions = [];
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
      price: data.fprice,
      category: data.fcategory,
      date: new Date(),
      flag: data.type,
    };

    console.log(transactionstoSave);
    transactions.push(transactionstoSave);
    form.reset();

    printLine(transactionstoSave);
    recalculTotals();

    console.log(transactions);
    // la transacción la guarda en una String de Json
    const jsonData = JSON.stringify(transactions);

    // Guarda la string en local
    localStorage.setItem("transactions", jsonData);
  });
});
