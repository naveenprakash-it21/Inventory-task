document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const toggleIcon = document.getElementById("toggle-icon");
    const toggleText = document.getElementById("toggle-text");
    const form = document.getElementById("inventory-form");
    const inventoryList = document.getElementById("inventory-list");



    // Initialize dark/light mode based on localStorage
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        toggleText.textContent = "Dark Mode";
    } else {
        document.body.classList.remove("dark-mode");
        toggleText.textContent = "Light Mode";
    }


    // Toggle dark/light mode with Toastify feedback
    darkModeToggle.addEventListener("click", function () {
        if (document.body.classList.contains("dark-mode")) {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
            toggleText.textContent = "Light Mode";
            Toastify({
                text: "Switched to Light Mode",
                duration: 1000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "#4CAF50"
            }).showToast();
        }else {
            document.body.classList.add("dark-mode");
            localStorage.setItem("darkMode", "enabled");
            toggleText.textContent = "Dark Mode";
            Toastify({
                text: "Switched to Dark Mode",
                duration: 1000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "#333"
            }).showToast();
        }
    });



    // Handle form submission for adding a new item
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Gather input values
        const itemName = document.getElementById("item-name").value;
        const category = document.getElementById("category").value;
        const quantity = document.getElementById("quantity").value;
        const purchaseDate = document.getElementById("purchase-date").value;
        const supplierName = document.getElementById("supplier-name").value;
        const status = document.getElementById("status").value;

        // Validate required fields
        if (!itemName || !quantity || isNaN(quantity) || quantity <= 0) {
            Toastify({
                text: "Item Name and Quantity are required!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "#E74C3C"
            }).showToast();
            return;
        }

        // Create a new table row for the item
        const row = createRow({ itemName, category, quantity, purchaseDate, supplierName, status });
        inventoryList.appendChild(row);

        Toastify({
            text: "Item added successfully!",
            duration: 1000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "#4CAF50"
        }).showToast();

        // Reset the form for new entry
        form.reset();
    });

    // Function to create a table row element with provided data
    function createRow(data) {
        const { itemName, category, quantity, purchaseDate, supplierName, status } = data;
        const row = document.createElement("tr");
        row.className = "hover:bg-indigo-300 dark:hover:bg-blue-500 transition";
        row.innerHTML = `
            <td class="px-6 py-4 font-medium">${itemName}</td>
            <td class="px-6 py-4">${category}</td>
            <td class="px-6 py-4">${quantity}</td>
            <td class="px-6 py-4">${purchaseDate}</td>
            <td class="px-6 py-4">${supplierName}</td>
            <td class="px-6 py-4">${status}</td>
            <td class="px-6 py-4 text-center">
                <button class="edit-btn bg-green-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                <button class="delete-btn bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </td>
        `;

        // Delete functionality
        row.querySelector(".delete-btn").addEventListener("click", function () {
            row.remove();
            Toastify({
                text: "Item deleted",
                duration: 1000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "#E74C3C"
            }).showToast();
        });

        // Edit functionality
        row.querySelector(".edit-btn").addEventListener("click", function () {
            enterEditMode(row);
        });

        return row;
    }

    // Function to switch a row to edit mode
    function enterEditMode(row) {
        // Get current values
        const itemName = row.querySelector("td:nth-child(1)").textContent;
        const category = row.querySelector("td:nth-child(2)").textContent;
        const quantity = row.querySelector("td:nth-child(3)").textContent;
        const purchaseDate = row.querySelector("td:nth-child(4)").textContent;
        const supplierName = row.querySelector("td:nth-child(5)").textContent;
        const status = row.querySelector("td:nth-child(6)").textContent;

        // Replace cell contents with input fields
        row.innerHTML = `
            <td class="px-6 py-4"><input type="text" class="edit-item-name border rounded w-full p-2" value="${itemName}"></td>
            <td class="px-6 py-4">
                <select class="edit-category border rounded w-full p-2">
                    <option ${category === "Electronics" ? "selected" : ""}>Electronics</option>
                    <option ${category === "Furniture" ? "selected" : ""}>Furniture</option>
                    <option ${category === "Clothing" ? "selected" : ""}>Clothing</option>
                </select>
            </td>
            <td class="px-6 py-4"><input type="number" class="edit-quantity border rounded w-full p-2" value="${quantity}"></td>
            <td class="px-6 py-4"><input type="date" class="edit-purchase-date border rounded w-full p-2" value="${purchaseDate}"></td>
            <td class="px-6 py-4"><input type="text" class="edit-supplier-name border rounded w-full p-2" value="${supplierName}"></td>
            <td class="px-6 py-4">
                <select class="edit-status border rounded w-full p-2">
                    <option ${status === "In Stock" ? "selected" : ""}>In Stock</option>
                    <option ${status === "Low Stock" ? "selected" : ""}>Low Stock</option>
                    <option ${status === "Out of Stock" ? "selected" : ""}>Out of Stock</option>
                </select>
            </td>
            <td class="px-6 py-4 text-center">
                <button class="update-btn bg-blue-500 text-white px-3 py-1 rounded mr-2">Update</button>
                <button class="delete-btn bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </td>
        `;

        // Update functionality
        row.querySelector(".update-btn").addEventListener("click", function () {
            updateRow(row);
        });

        // Delete in edit mode
        row.querySelector(".delete-btn").addEventListener("click", function () {
            row.remove();
            Toastify({
                text: "Item deleted",
                duration: 1000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "#E74C3C"
            }).showToast();
        });
    }

    // Function to update the row with new values
    function updateRow(row) {
        const updatedItemName = row.querySelector(".edit-item-name").value;
        const updatedCategory = row.querySelector(".edit-category").value;
        const updatedQuantity = row.querySelector(".edit-quantity").value;
        const updatedPurchaseDate = row.querySelector(".edit-purchase-date").value;
        const updatedSupplierName = row.querySelector(".edit-supplier-name").value;
        const updatedStatus = row.querySelector(".edit-status").value;

        // Validate inputs
        if (!updatedItemName || !updatedQuantity) {
            Toastify({
                text: "Item Name and Quantity are required!",
                duration: 3000,
                close: true,
                gravity: "top",
                position: "center",
                backgroundColor: "#E74C3C"
            }).showToast();
            return;
        }

        // Update row content
        row.innerHTML = `
            <td class="px-6 py-4 font-medium">${updatedItemName}</td>
            <td class="px-6 py-4">${updatedCategory}</td>
            <td class="px-6 py-4">${updatedQuantity}</td>
            <td class="px-6 py-4">${updatedPurchaseDate}</td>
            <td class="px-6 py-4">${updatedSupplierName}</td>
            <td class="px-6 py-4">${updatedStatus}</td>
            <td class="px-6 py-4 text-center">
                <button class="edit-btn bg-green-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                <button class="delete-btn bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </td>
        `;

        // Reattach listeners for updated row
        row.querySelector(".edit-btn").addEventListener("click", function () {
            enterEditMode(row);
        });
        row.querySelector(".delete-btn").addEventListener("click", function () {
            row.remove();
            Toastify({
                text: "Item deleted",
                duration: 1000,
                close: true,
                gravity: "top",
                position: "right",
                backgroundColor: "#E74C3C"
            }).showToast();
        });

        Toastify({
            text: "Item updated successfully!",
            duration: 1000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "#4CAF50"
        }).showToast();
    }
});
