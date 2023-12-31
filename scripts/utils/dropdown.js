    // Ajout d'un listner click sur le filtre pour le tri

    const filterMenuButton = document.querySelector(".btn_list");

    filterMenuButton.addEventListener("click", () => {
        const filterMenu = document.querySelector(".dropdown_content");
        const filterButtons = document.querySelectorAll(".dropdown_content button");
        const isExpanded = filterMenuButton.getAttribute("aria-expanded") === "true" || false;
    
        if (isExpanded) {
            filterMenu.style.display = "none";
        } else {
            filterMenu.style.display = "contents";
        }
    
        filterMenuButton.setAttribute("aria-expanded", !isExpanded);
        document.querySelector(".fa-chevron-down").classList.toggle("rotate");
    
        const newAriaHiddenValue = filterMenu.style.display === "none" ? "true" : "false";
        filterMenu.setAttribute("aria-hidden", newAriaHiddenValue);
    
        const newTabIndexValue = filterMenu.style.display === "none" ? "-1" : "0";
        filterButtons.forEach(button => button.setAttribute("tabindex", newTabIndexValue));        
    });
   
 

    document.addEventListener('DOMContentLoaded', function () {
    
        const currentFilter = document.querySelector('#current_filter');
        const allFilters = Array.from(document.querySelectorAll('.dropdown_content li button'));
    
        let filterAlreadySelected = allFilters.find(filter => filter.textContent == currentFilter.textContent);
    
        filterAlreadySelected.parentElement.style.display = 'none';
    
        allFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                currentFilter.textContent = filter.textContent;
    
                // Hide the entire <li> block
                const parentLi = filter.parentElement;
                parentLi.style.display = 'none';
    
                // If a filter was previously selected, show its <li> block
                if (filterAlreadySelected) {
                    const previousParentLi = filterAlreadySelected.parentElement;
                    previousParentLi.style.display = 'block';
                }
    
                filterAlreadySelected = filter;
          
    
                
            });
        });
    });








