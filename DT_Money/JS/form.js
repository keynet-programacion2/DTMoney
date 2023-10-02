document.addEventListener("DOMContentLoaded", function () { 
    const form = document.querySelector("form");
    const table = document.querySelector("#info table");
    let totalEntrys = new Decimal(0) ;
    let totalExits =  new Decimal(0) ;
    let totalBalance = new Decimal(0) ;



    // Update the UI with the loaded values
    const entrynSpan = document.getElementById("entryn");
    entrynSpan.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalEntrys));

    const exitnSpan = document.getElementById("exitn");
    exitnSpan.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalExits));

    const balancenSpan = document.getElementById("balancen");
    balancenSpan.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalBalance));
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const title = document.querySelector("#fname").value;
      const priceInput = document.getElementById("fprice");
  const price = new Decimal(priceInput.value);
      const category = document.querySelector("#fcategory").value;
      const date = new Date().toLocaleDateString();
      const transaction = document.querySelector(
        'input[name="type"]:checked'
      ).value;

      if (transaction === "1") {
        totalEntrys = totalEntrys.plus(price);
        entrynSpan.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalEntrys));
       }
      if (transaction === "-1") {
        totalExits = totalExits.plus(price);
        exitnSpan.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalExits));
       }

      totalBalance =  totalEntrys.minus(totalExits);
      const balancenDiv = document.getElementById("balance");
      if (totalBalance.greaterThanOrEqualTo(0)) {
        balancenDiv.className = "green-balance";
      } else{
        balancenDiv.className = "red-balance";
      }
      const balancenSpan = document.getElementById("balancen");
      balancenSpan.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalBalance));

      const newRow = document.createElement("tr");

      const titleCell = document.createElement("td");
      titleCell.textContent = title;

      const priceCell = document.createElement("td");
      if (transaction === "1") {
        priceCell.className = "green-text";
        priceCell.textContent = (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price));
      } else if (transaction === "-1") {
        priceCell.className = "red-text";
        priceCell.textContent = "- "+(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price));
      }

      const categoryCell = document.createElement("td");
      categoryCell.textContent = category;

      const dateCell = document.createElement("td");
      dateCell.textContent = date;

      newRow.appendChild(titleCell);
      newRow.appendChild(priceCell);
      newRow.appendChild(categoryCell);
      newRow.appendChild(dateCell);

      table.appendChild(newRow);

      form.reset();


      for (let i = 1; table.rows.length-1; i++) {
        const row = table.rows[i];
        const cells = row.cells;
        const title = cells[0].textContent;
        const price = parseFloat(cells[1].textContent);
        const category = cells[2].textContent;
        const date = cells[3].textContent;
  
  
        const transactionstoSave = {
          title: title,
          price: price,
          category: category,
          date: date,
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