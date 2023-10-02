document.addEventListener("DOMContentLoaded", function () {
  const transactions = [];
  const form = document.querySelector("form");
  const table = document.querySelector("#info table");
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
    //Cogo los atributos y los guardo en una variable
    const title = document.querySelector("#fname").value;
    const priceInput = document.getElementById("fprice");
    const price = new Decimal(priceInput.value);
    const category = document.querySelector("#fcategory").value;
    const date = new Date().toLocaleDateString();
    const transaction = document.querySelector(
      'input[name="type"]:checked'
    ).value;
    //muestro por pantalla entrada salida y balance (calculando el balance)
    if (transaction === "1") {
      totalEntrys = totalEntrys.plus(price);
      entrynSpan.textContent = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(totalEntrys);
    }
    if (transaction === "0") {
      totalExits = totalExits.plus(price);
      exitnSpan.textContent = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(totalExits);
    }

    totalBalance = totalEntrys.minus(totalExits);
    const balancenDiv = document.getElementById("balance");
    //depende del balance se printa en verde o rojo
    if (totalBalance.greaterThanOrEqualTo(0)) {
      balancenDiv.className = "green-balance";
    } else {
      balancenDiv.className = "red-balance";
    }
    const balancenSpan = document.getElementById("balancen");
    balancenSpan.textContent = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(totalBalance);
    //para mostrar la información de la transacción
    const newRow = document.createElement("tr");
    //se muestra el titulo
    const titleCell = document.createElement("td");
    titleCell.textContent = title;
    titleCell.className = "normal-text";
    // se muestra el precio aplicando una classe
    const priceCell = document.createElement("td");
    if (transaction === "1") {
      priceCell.className = "green-text";
      priceCell.textContent = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
      }).format(price);
    } else if (transaction === "0") {
      priceCell.className = "red-text";
      priceCell.textContent =
        "- " +
        new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(price);
    }

    const categoryCell = document.createElement("td");
    categoryCell.textContent = category;
    categoryCell.className = "normal-text";

    const dateCell = document.createElement("td");
    dateCell.textContent = date;
    dateCell.className = "normal-text";

    const transactionCell = document.createElement("td");
    transactionCell.textContent = transaction;

    newRow.appendChild(titleCell);
    newRow.appendChild(priceCell);
    newRow.appendChild(categoryCell);
    newRow.appendChild(dateCell);
    newRow.appendChild(transactionCell);

    table.appendChild(newRow);

    form.reset();

    for (let i = 1; table.rows.length - 1; i++) {
      const row = table.rows[i];
      const cells = row.cells;
      const title = cells[0].textContent;
      const price = cells[1].textContent;
      const category = cells[2].textContent;
      const date = cells[3].textContent;
      const flag = cells[4].textContent;

      console.log(typeof price);
      console.log("diners" + price);

      const precio = price
        .replace(/€/g, "")
        .replace(/,/g, ".")
        .replace(/-/g, "");
      const precioformatted = parseFloat(precio);

      console.log("diners" + precio + "tipo" + typeof precioformatted);
      const transactionstoSave = {
        title: title,
        price: precioformatted,
        category: category,
        date: date,
        flag: flag,
      };
      transactions.push(transactionstoSave);
      // la transacción la guarda en una String de Json
      const jsonData = JSON.stringify(transactions);

      // Guarda la string en local
      localStorage.setItem("transactions", jsonData);

      console.log("transaction saved" + jsonData);
    }
  });
});
