document.addEventListener("DOMContentLoaded", function () {
  // Get a reference to the table
  const table = document.querySelector("#info table");
  const entrynSpan = document.getElementById("entryn");
  let totalEntrys = new Decimal(0);
  const exitnSpan = document.getElementById("exitn");
  let totalExits = new Decimal(0);
  // Function to load transactions from localStorage and populate the table
  function loadTransactionsFromLocalStorage() {
    const jsonData = localStorage.getItem("transactions");

    if (jsonData) {
      const transactions = JSON.parse(jsonData);

      console.log(transactions);

      // Clear the table before populating it with the loaded data
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }

      transactions.forEach((transaction) => {
        const newRow = document.createElement("tr");
        const titleCell = document.createElement("td");
        titleCell.textContent = transaction.title;
        titleCell.className = "normal-text";

        const priceCell = document.createElement("td");

        if (transaction.flag === "1") {
          priceCell.className = "green-text";
          priceCell.textContent = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(transaction.price);
          totalEntrys = totalEntrys.plus(transaction.price);
          entrynSpan.textContent = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(totalEntrys);
        } else if (transaction.flag === "0") {
          priceCell.className = "red-text";
          priceCell.textContent =
            "- " +
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(transaction.price);
          totalExits = totalExits.plus(transaction.price);
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

        const categoryCell = document.createElement("td");
        categoryCell.textContent = transaction.category;
        categoryCell.className = "normal-text";

        const dateCell = document.createElement("td");
        dateCell.textContent = transaction.date;
        dateCell.className = "normal-text";

        newRow.appendChild(titleCell);
        newRow.appendChild(priceCell);
        newRow.appendChild(categoryCell);
        newRow.appendChild(dateCell);

        table.appendChild(newRow);
      });
    }
  }

  // Call the load function when the page loads
  loadTransactionsFromLocalStorage();
});
