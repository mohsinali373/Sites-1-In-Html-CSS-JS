document.addEventListener("DOMContentLoaded", function () {
    // Function to dynamically load header and footer
    function loadHeaderFooter() {
        // Load header
        fetch('header.html')
            .then(response => response.text())
            .then(data => {
                document.querySelector('#header').innerHTML = data;
                initializeMenuToggle(); // Reinitialize menu toggle after loading
            })
            .catch(error => console.error('Error loading header:', error));

        // Load footer
        fetch('footer.html')
            .then(response => response.text())
            .then(data => {
                document.querySelector('#footer').innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }

    // Function to initialize menu toggle and dropdown behavior
    function initializeMenuToggle() {
        const menuToggle = document.querySelector(".menu-toggle"); // Hamburger button
        const menu = document.querySelector(".menu"); // The menu itself

        // Toggle the 'active' class when the menu button is clicked (for mobile)
        menuToggle.addEventListener("click", function () {
            menu.classList.toggle("active"); // Toggle the menu visibility
        });

        // Handle dropdown behavior (hover for desktop, click for mobile)
        document.querySelectorAll('.dropdown').forEach(function (dropdown) {
            let timeout;

            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            const toggle = dropdown.querySelector('.dropdown-toggle');

            // Show dropdown on mouse enter (desktop only)
            dropdown.addEventListener('mouseenter', function () {
                if (window.innerWidth > 768) { // Desktop only
                    clearTimeout(timeout);
                    dropdownMenu.style.display = 'block'; // Show the dropdown
                }
            });

            // Hide dropdown with a delay when mouse leaves (desktop only)
            dropdown.addEventListener('mouseleave', function () {
                if (window.innerWidth > 768) { // Desktop only
                    timeout = setTimeout(function () {
                        dropdownMenu.style.display = 'none'; // Hide the dropdown after delay
                    }, 300); // Delay in ms
                }
            });

            // Toggle dropdown on click (mobile only)
            toggle.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default anchor behavior
                if (window.innerWidth <= 768) { // Mobile only
                    const isVisible = dropdownMenu.style.display === 'block';
                    dropdownMenu.style.display = isVisible ? 'none' : 'block'; // Toggle visibility
                }
            });
        });
    }

    // Load header and footer
    loadHeaderFooter();
});
