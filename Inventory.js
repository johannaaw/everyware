document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const stock = parseInt(card.getAttribute('data-stock'));
        const sold = parseInt(card.getAttribute('data-sold'));
        const progress = card.querySelector('.progress');
        const percentage = (sold / stock) * 100;
        progress.style.width = percentage + '%';
    });
});

function openModal() {
    document.getElementById("addItemModal").style.display = "block";
}

function closeModal() {
    document.getElementById("addItemModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("addItemModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("itemImage").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById("imagePreview");
            preview.src = e.target.result;
            preview.style.display = "block";
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById("addItemForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect form data
    const itemName = document.getElementById("itemName").value;
    const itemDescription = document.getElementById("itemDescription").value;
    const itemStock = document.getElementById("itemStock").value;
    const itemPrice = document.getElementById("itemPrice").value;
    const itemSold = document.getElementById("itemSold").value;
    const itemImage = document.getElementById("imagePreview").src;

    // Create new card element
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = `
        <img src="${itemImage}" alt="${itemName}">
        <div class="card-content">
            <h2>${itemName}</h2>
            <p>${itemDescription}</p>
            <p>Stock: ${itemStock}</p>
            <p>Price: $${itemPrice}</p>
            <p>Sold: ${itemSold}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${(itemSold/itemStock)*100}%;"></div>
            </div>
        </div>
    `;

    // Append the new card to the container
    document.querySelector(".card-container").appendChild(newCard);

    // Reset form and close modal
    document.getElementById("addItemForm").reset();
    document.getElementById("imagePreview").style.display = "none";
    closeModal();
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    let salesChart = null; // Store the Chart instance

    const suppliers = ["Supplier A", "Supplier B", "Supplier C", "Supplier D"];

    function getRandomSupplier() {
        return suppliers[Math.floor(Math.random() * suppliers.length)];
    }

    function getRandomDate() {
        const start = new Date(2022, 0, 1);
        const end = new Date();
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const itemName = card.querySelector('h2').innerText;
            const itemDescription = card.querySelector('p:nth-of-type(1)').innerText;
            const itemStock = card.querySelector('p:nth-of-type(2)').innerText;
            const itemPrice = card.querySelector('p:nth-of-type(3)').innerText;
            const itemSold = card.querySelector('p:nth-of-type(4)').innerText;
            const itemImage = card.querySelector('img').src;

            document.getElementById('modalItemName').innerText = itemName;
            document.getElementById('modalItemDescription').innerText = itemDescription;
            document.getElementById('modalItemStock').innerText = itemStock;
            document.getElementById('modalItemPrice').innerText = itemPrice;
            document.getElementById('modalItemSold').innerText = itemSold;
            document.getElementById('modalItemImage').src = itemImage;

            // Generate random barcode
            const barcodeValue = Math.random().toString(36).substring(2, 10).toUpperCase();
            JsBarcode("#barcodeCanvas", barcodeValue, {format: "CODE128"});

            // Generate random sales plot
            if (salesChart) {
                salesChart.destroy();
            }

            const ctx = document.getElementById('salesPlot').getContext('2d');
            salesChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Sales',
                        data: Array.from({length: 7}, () => Math.floor(Math.random() * 100)),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: { beginAtZero: true },
                        y: { beginAtZero: true }
                    }
                }
            });

            // Generate random supplier and last restock date
            document.getElementById('modalItemSupplier').innerText = getRandomSupplier();
            document.getElementById('modalItemRestockDate').innerText = getRandomDate();

            document.getElementById('productDetailModal').style.display = 'block';
        });
    });
});

function closeProductDetailModal() {
    document.getElementById('productDetailModal').style.display = 'none';

    // Reset barcode canvas and sales plot
    document.getElementById('barcodeCanvas').getContext('2d').clearRect(0, 0, document.getElementById('barcodeCanvas').width, document.getElementById('barcodeCanvas').height);
    document.getElementById('salesPlot').getContext('2d').clearRect(0, 0, document.getElementById('salesPlot').width, document.getElementById('salesPlot').height);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('productDetailModal');
    if (event.target == modal) {
        closeProductDetailModal();
    }
}