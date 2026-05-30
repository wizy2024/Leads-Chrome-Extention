let saveUrl = document.getElementById("saveUrl");
let leads = [];
let input = document.getElementById("inputBox");
let unOrdedList = document.getElementById("listItems");
let DeleteBtn = document.getElementById("deleteBtn");
let SaveTab = document.getElementById("saveTab");

// Check local storage on load
let localStorageLead = JSON.parse(localStorage.getItem("leads"));
if (localStorageLead) {
  leads = localStorageLead;
  render(leads);
}

// SAVE TAB FUNCTION
SaveTab.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs[0] && tabs[0].url) {
      leads.push(tabs[0].url);
      localStorage.setItem("leads", JSON.stringify(leads));
      render(leads);
    }
  });
});

// SAVE INPUT FUNCTION
saveUrl.addEventListener("click", function () {
  if (input.value) {
    leads.push(input.value);
    localStorage.setItem("leads", JSON.stringify(leads));
    input.value = "";
    render(leads);
  }
});

// DELETE FUNCTION
DeleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  leads = [];
  render(leads);
});

// RENDER FUNCTION
function render(lds) {
  let listItems = "";
  for (let i = 0; i < lds.length; i++) {
    listItems += `
      <li> 
        <a target='_blank' href='${lds[i]}'> 
          ${lds[i]} 
        </a> 
      </li>`;
  }
  unOrdedList.innerHTML = listItems;
}
