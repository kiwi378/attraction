console.log("script.js loaded");

fetch('xml/attractions.xml')
    .then(response => response.text())
    .then(data => {
        console.log("XML fetched");

        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        const attractions = xml.getElementsByTagName("attraction");

        let output = '<h2>All Attractions</h2>';

        for (let i = 0; i < attractions.length; i++) {
            const placeID = attractions[i].getElementsByTagName("placeID")[0]?.textContent || "N/A";
            const name = attractions[i].getElementsByTagName("name")[0]?.textContent || "Unnamed";
            const category = attractions[i].getElementsByTagName("category")[0]?.textContent?.toLowerCase().replace(" ", "") || "general";

            output += `
            <div class="index-box">
                <p><strong>${placeID}</strong>: 
                    <a href="${category}.html?placeID=${placeID}">${name}</a>
                </p>
            </div>
        `;

        }

        document.getElementById("attraction-list").innerHTML = output;
    })
    .catch(error => {
        console.error("Error fetching XML:", error);
        document.getElementById("attraction-list").innerHTML = "<p>Error loading attractions.</p>";
    });
