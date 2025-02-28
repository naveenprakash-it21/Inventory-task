import {test,expect} from '@playwright/test'

test('locators',async({page})=>{
    // Navigate to the page
    await page.goto("http://127.0.0.1:5500/");
    
    // Dark mode / Light mode - property 
    const toggleButton = page.locator('#dark-mode-toggle')
    const toggleText = page.locator('#toggle-text');
    await expect(toggleButton).toBeVisible();
    await expect(toggleText).toHaveText(/Light Mode/i);
    await toggleButton.click();
    await expect(toggleText).toHaveText(/Dark Mode/i);
    await toggleButton.click();
    await expect(toggleText).toHaveText(/Light Mode/i);
    
    // Header Add new Inventory Item
    const header = page.locator('#header');
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/add new inventory item/i);

    // Item name in form
    const itemNameLabel = page.locator('#ItemNameLabel');
    await expect(itemNameLabel).toHaveText(/Item Name/i);
    const itemNameInput = page.locator('#item-name');
    await expect(itemNameInput).toBeEmpty();
    await itemNameInput.fill('Laptop');
    await expect(itemNameInput).toHaveValue('Laptop');
    

    // Purchase Date in form
    //checking whether the date has been selected 
    const PurchaseDateField = page.locator('#dateLabel');
    await expect(PurchaseDateField).not.toHaveValue(''); // if the field is empty - test fails and if the field has value - test passes
    await PurchaseDateField.click();


    // Quantity in form
    const QuantityLabel = page.locator('#quantityLabel');
    await expect(QuantityLabel).toHaveText(/Quantity/i);
    const QuantityInput = page.locator('#quantity');
    await expect(QuantityInput).toBeEmpty();
    await QuantityInput.fill('100');
    await expect(QuantityInput).toHaveValue('100');
    await expect(QuantityInput).not.toHaveValue('');  // if the field is empty - test fails and if the field has value - test passes


    // Category in form
    const CategoryLabel = page.locator('#categoryLabel');
    await expect(CategoryLabel).toHaveText(/Category/i);
    const categoryDropdown = page.locator('#category');
    await expect(categoryDropdown).toBeVisible();
    const categories = ['Electronics', 'Furniture', 'Clothing'];
    for (const category of categories) {
        await categoryDropdown.selectOption(category);
        await expect(categoryDropdown).toHaveValue(category);
    }

    // Supplier Name
    const SupplierLabel = page.locator('#supplierLabel');
    await expect(SupplierLabel).toHaveText(/Supplier Name/i);
    const SupplierInput = page.locator("#supplier-name");
    await expect(SupplierInput).toBeEmpty();
    await SupplierInput.fill('Naveen Prakash S');
    await expect(SupplierInput).toHaveValue('Naveen Prakash S');

    // Status 
    const statusLabel = page.locator('#stautsLabel');
    await expect(statusLabel).toHaveText(/Status/i);
    const statusInput = page.locator('#status');
    await expect(statusInput).toBeVisible();
    const stock = ['Low Stock', 'Out of Stock','In Stock'] 
    for (const stockies of stock){
        await statusInput.selectOption(stockies);
        await expect(statusInput).toHaveValue(stockies);
    }

    // Add Items Buttom
    const addItemButton = page.locator("#addItemButton");
    await expect(addItemButton).toBeVisible();
    await addItemButton.click();

    // Category Filter - Electronic,Clothing,Funiture
    const categoryFilter = page.locator('#filter-category');
    await expect(categoryFilter).toBeVisible();
    await categoryFilter.selectOption('Electronics');
    const filteredItems = page.locator('.inventory-item'); // Assuming class for listed items
    //await expect(filteredItems).toContainText('Electronics');

    // Filtering Status - IN STOCK, OUT OF STOCK
    const statusFilter = page.locator('#filter-status');
    await expect(statusFilter).toBeVisible();
    await statusFilter.selectOption('In Stock');
    //await expect(filteredItems).toContainText('In Stock');
});