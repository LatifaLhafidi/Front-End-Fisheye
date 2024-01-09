const dropdownList = document.getElementById('dropdownList');



dropdownButton.addEventListener('click', function () {
    const expanded = dropdownButton.getAttribute('aria-expanded') === 'true' || false;
    dropdownButton.setAttribute('aria-expanded', !expanded);
    dropdownList.style.display = expanded ? 'none' : 'block';
    
    
});

dropdownList.addEventListener('click', function (event) {
    const target = event.target;
        const selectedValue = target.getAttribute('data-value');
        dropdownButton.innerHTML= selectedValue;
        target.style.display="none";
        dropdownButton.setAttribute('aria-expanded', 'false');
        //  dropdownList.style.display = 'none';  
    
});







