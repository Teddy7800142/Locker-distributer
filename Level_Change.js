//for changing background and will change the map stuff later
document.getElementById('lvlSwitcher').addEventListener('click', function() {
        const mapDiv = document.getElementById("map");
        const bg = mapDiv.style.backgroundImage;

        if (bg.includes("Floor1.jpg")) {
                mapDiv.style.backgroundImage = 'url("images/Floor2.jpg")';
        } else {
                mapDiv.style.backgroundImage = 'url("images/Floor1.jpg")';
        }
});




