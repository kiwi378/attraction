function loadAdventureAttractions() {
    fetch('xml/attractions.xml')
        .then(response => response.text())
        .then(str => {

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(str, "text/xml");
            const attractions = xmlDoc.getElementsByTagName("attraction");

            const adventureList = document.getElementById("adventure-list");
            adventureList.innerHTML = "";

            Array.from(attractions).forEach(attraction => {
                const category = attraction.getElementsByTagName("category")[0].textContent;


                if (category === "Adventure") {
                    const name = attraction.getElementsByTagName("name")[0].textContent;
                    const location = attraction.getElementsByTagName("location")[0].textContent;
                    const description = attraction.getElementsByTagName("description")[0].textContent;
                    const image = attraction.getElementsByTagName("image")[0]?.textContent;
                    const openingHours = attraction.getElementsByTagName("openingHours")[0]?.textContent;
                    const ticket = attraction.getElementsByTagName("ticket")[0]?.textContent;
                    const price = attraction.getElementsByTagName("price")[0]?.textContent;

                    const div = document.createElement("div");
                    div.className = "attraction";
                    div.style.textAlign = "center";
                    div.innerHTML = `
                        <h3>${name}</h3>
                        <img src="${image}" alt="${name}" style="max-width: 300px; height: auto; border-radius: 10px;">
                        <p><strong>Location:</strong> ${location}</p>
                        <p><strong>Description:</strong> ${description}</p>
                        ${openingHours ? `<p><strong>Opening Hours:</strong> ${openingHours}</p>` : ""}
                        <p><strong>Ticket:</strong> ${ticket}</p>
                        <p><strong>Price:</strong> ${price}</p>
                    `;

                    adventureList.appendChild(div);
                }
            });
        })
        .catch(error => console.error("Error loading XML file:", error));
}

window.onload = loadAdventureAttractions;
