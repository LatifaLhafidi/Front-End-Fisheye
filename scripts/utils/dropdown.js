const dropdownButton = document.getElementById('dropdownButton');
const dropdownList = document.getElementById('dropdownList');

dropdownList.addEventListener('click', function (event) {
    const target = event.target;
    console.log(event.target);
    if (target.tagName === 'LI') {
        const selectedValue = target.getAttribute('data-value');
        dropdownButton.innerHTML = selectedValue;
        // target.tagName.innerHTML=dropdownButton.value;
        dropdownButton.setAttribute('aria-expanded', 'false');
   
    }
});

dropdownButton.addEventListener('click', function () {
    const expanded = dropdownButton.getAttribute('aria-expanded') === 'true' || false;
    dropdownButton.setAttribute('aria-expanded', !expanded);
    dropdownList.style.display = expanded ? 'none' : 'block';
});