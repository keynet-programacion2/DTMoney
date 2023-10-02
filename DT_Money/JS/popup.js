const showPopupBtn = document.getElementById("CreateTransactionBtn");
const popup = document.getElementById("transactionform");
const closePopupBtn = document.getElementById("closePopupBtn");
const closePopupBtn2 = document.getElementById("submit");

showPopupBtn.addEventListener("click", () => {
  popup.style.display = "block";
});

closePopupBtn.addEventListener("click", () => {
  popup.style.display = "none";
});
closePopupBtn2.addEventListener("click", () => {
  popup.style.display = "none";
});
