// listen for submit
document.querySelector("#loan-form").addEventListener("submit", function(e) {
  // Hide results
  document.querySelector("#results").style.display = "none";
  // Show loader
  document.querySelector("#loading").style.display = "block";
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// calculate results
function calculateResults() {
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");
  // turns amount in float
  const principal = parseFloat(amount.value);
  // interest value
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  // calculates payments
  const calculatePayments = parseFloat(years.value) * 12;

  // compute monthly payments
  const x = Math.pow(1 + calculateInterest, calculatePayments);
  const monthly = (principal * x * calculateInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatePayments).toFixed(2);
    totalInterest.value = (monthly * calculatePayments - principal).toFixed(2);
    // show results after 2 seconds
    document.querySelector("#results").style.display = "block";
    //   hide loader after 2 seconds
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please Enter Valid Numbers");
  }
}

// show error function
function showError(error) {
  // Hide results
  document.querySelector("#results").style.display = "none";
  // Hide loader
  document.querySelector("#loading").style.display = "none";
  // create div
  const errorDiv = document.createElement("div");
  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  // class name to add
  errorDiv.className = "alert alert-danger";
  // append to div created
  errorDiv.appendChild(document.createTextNode(error));
  // insert error above heading
  card.insertBefore(errorDiv, heading);
  //   clear error after 3 seconds
  setTimeout(clearError, 1000);
}

// clear error
function clearError() {
  document.querySelector(".alert").remove();
}
