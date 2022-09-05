$checkBoxLUK = document.getElementById("lukModeToggle")
$lukCard = document.getElementById("LUKCard")

fetch(`http://${location.hostname}/service/luk`)
    .then((response) => response.json())
    .then((data) => {
        $checkBoxLUK.checked = data.lukmodeIsOn

        if (data.lukmodeIsOn) {
            $lukCard.classList.add("cardAnimation")
        } else {
            $lukCard.classList.remove("cardAnimation")
        }
    });

$checkBoxLUK.addEventListener("change", () => {
    fetch(`http://${location.hostname}/service/luk/toggle`)

    $lukCard.classList.toggle("cardAnimation")
})