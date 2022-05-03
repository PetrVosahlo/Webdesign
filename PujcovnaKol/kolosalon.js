
let CenaSNosicem;

function VyslednaCena(form) {
    let kolo1 = form.typkola1.checked == true ? 500 : 0;
    let cenaKol1 = kolo1 * parseInt(form.poc1.value);
    //console.log("cenaKol1:" + cenaKol1);
    let kolo2 = form.typkola2.checked == true ? 200 : 0;
    let cenaKol2 = kolo2 * parseInt(form.poc2.value);

    let kolo3 = form.typkola3.checked == true ? 1500 : 0;
    let cenaKol3 = kolo3 * parseInt(form.poc3.value);
    console.log("cenaKol3:" + kolo3);

    let kolo4 = form.typkola4.checked == true ? 2500 : 0;
    let cenaKol4 = kolo4 * parseInt(form.poc4.value);
    console.log("cenaKol4:" + kolo4);

    let CenaZaDen = cenaKol1 + cenaKol2 + cenaKol3 + cenaKol4;

    let CenaZaDobu = CenaZaDen * (form.DobaVypujcky.value);

    let nosic1 = form.radBtn[0].checked == true ? 1.05 : 1
    let nosic2 = form.radBtn[1].checked == true ? 1.1 : 1
    let nosic3 = form.radBtn[2].checked == true ? 1 : 1

    CenaSNosicem = CenaZaDobu * nosic1 * nosic2 * nosic3

}

function PorovnanCena(form) {
    VyslednaCena(form);
    let maximalniCena = document.form1.MaxCena.value;
    if (CenaSNosicem == 0) {
        document.querySelector(`#balance`).innerHTML = "Vyberte kolo zatržením příslušného checkboxu a případně zadejte maximální cenu za vypůjčení kterou jste ochoten/á akceptovat."
    }
    else if (!isNaN(maximalniCena) && maximalniCena > 0 && CenaSNosicem <= maximalniCena) {
        document.querySelector(`#balance`).innerHTML = "Cena vypujceni je NIZSI nez cena kterou jste ochoten zaplatit"
    } else if (!isNaN(maximalniCena) && maximalniCena > 0 && CenaSNosicem > maximalniCena) {
        document.querySelector(`#balance`).innerHTML = "Cena vypujceni je VYSSI nez cena kterou jste ochoten zaplatit"
    }
    else {
        document.querySelector(`#balance`).innerHTML = "Nebyla zadána nejvyšší cena kterou jste ochoten zaplatit nebo to není kladné číslo."
    }

    document.querySelector(`#KoncovaCena`).value = Math.round(CenaSNosicem,0);
    console.log(CenaSNosicem);
    event.preventDefault();
}

function Reset() {
    document.querySelector(`#balance`).innerHTML = "Vešel jste se do ceny";
}