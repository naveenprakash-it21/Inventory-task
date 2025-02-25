document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const toggleText = document.getElementById("toggle-text");
    const form = document.getElementById("inventory-form");
    const inventoryList = document.getElementById("inventory-list");
    const filterCategory = document.getElementById("filter-category");
    const filterStatus = document.getElementById("filter-status");
    const sortDateBtn = document.getElementById("sort-date");
    const sortQuantityBtn = document.getElementById("sort-quantity");
  
    // Array to store inventory items
    let inventoryItems = [];
  
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
        } else {
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
  
    // old - new . edit and updating new
    function renderInventory() {
        inventoryList.innerHTML = "";
        inventoryItems.forEach((item, index) => {
            inventoryList.appendChild(createRow(item, index));
        });
    }
  
    // Create table row for an item
    function createRow(data, index) {
        const { itemName, category, quantity, purchaseDate, supplierName, status } = data;
        const row = document.createElement("tr");
        // Add a custom class "dynamic-row" to this row
        row.className = "hover:bg-blue-200 transition dynamic-row";
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
            inventoryItems.splice(index, 1);
            renderInventory();
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
            enterEditMode(row, data, index);
        });
    
        return row;
    }
    
    
  
    // Enter edit mode for a row
    function enterEditMode(row, data, index) {
        const { itemName, category, quantity, purchaseDate, supplierName, status } = data;
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
            updateRow(row, index);
        });
  
        // Delete functionality in edit mode
        row.querySelector(".delete-btn").addEventListener("click", function () {
            inventoryItems.splice(index, 1);
            renderInventory();
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
  
    // Update row with new values
    function updateRow(row, index) {
        const updatedItemName = row.querySelector(".edit-item-name").value;
        const updatedCategory = row.querySelector(".edit-category").value;
        const updatedQuantity = row.querySelector(".edit-quantity").value;
        const updatedPurchaseDate = row.querySelector(".edit-purchase-date").value;
        const updatedSupplierName = row.querySelector(".edit-supplier-name").value;
        const updatedStatus = row.querySelector(".edit-status").value;
  
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
  
        inventoryItems[index] = {
            itemName: updatedItemName,
            category: updatedCategory,
            quantity: updatedQuantity,
            purchaseDate: updatedPurchaseDate,
            supplierName: updatedSupplierName,
            status: updatedStatus
        };
  
        renderInventory();
  
        Toastify({
            text: "Item updated successfully!",
            duration: 1000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "#4CAF50"
        }).showToast();
    }
  
    // Apply filters
    function applyFilters() {
        let filteredItems = [...inventoryItems];
  
        const selectedCategory = filterCategory.value;
        if (selectedCategory) {
            filteredItems = filteredItems.filter(item => item.category === selectedCategory);
        }
  
        const selectedStatus = filterStatus.value;
        if (selectedStatus) {
            filteredItems = filteredItems.filter(item => item.status === selectedStatus);
        }
  
        inventoryList.innerHTML = "";
        filteredItems.forEach((item, index) => {
            inventoryList.appendChild(createRow(item, index));
        });
    }
  
    // Sort inventory by key
    function sortInventory(key, isNumeric = false) {
        inventoryItems.sort((a, b) => {
            if (isNumeric) {
                return parseInt(a[key]) - parseInt(b[key]);
            } else {
                return new Date(a[key]) - new Date(b[key]);
            }
        });
        renderInventory();
    }
  
    // Event Listeners for Filters & Sorting
    filterCategory.addEventListener("change", applyFilters);
    filterStatus.addEventListener("change", applyFilters);
    sortDateBtn.addEventListener("click", () => sortInventory("purchaseDate"));
    sortQuantityBtn.addEventListener("click", () => sortInventory("quantity", true));
  
    // Form submission to add a new item
    form.addEventListener("submit", function (event) {
        event.preventDefault();
  
        const newItem = {
            itemName: document.getElementById("item-name").value,
            category: document.getElementById("category").value,
            quantity: document.getElementById("quantity").value,
            purchaseDate: document.getElementById("purchase-date").value,
            supplierName: document.getElementById("supplier-name").value,
            status: document.getElementById("status").value
        };
  
        inventoryItems.push(newItem);
        renderInventory();
        form.reset();
        Toastify({
            text: "Item added successfully!",
            duration: 1000,
            close: true,
            gravity: "top",
            position: "center",
            backgroundColor: "#4CAF50"
        }).showToast();
    });
  });