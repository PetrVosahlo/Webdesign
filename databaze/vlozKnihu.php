<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="styleSheet" href="knihy.css" type="text/css">
</head>

<body>
    <fieldset>
        <legend>
            Zadávání informací o knize
        </legend>
        <form method="POST" action="vlozKnihu.php">
            <div class="radek">
                <div class="label">
                    <label for="ISBN">ISBN</label>
                </div>
                <div class="input">
                    <input type="text" id="ISBN" name="ISBN" placeholder="978-3-16-148410-0" /><br />
                </div>
            </div>
            <div class="radek">
                <div class="label">
                    <label for="jmeno">Jméno</label>
                </div>
                <div class="input">
                    <input type="text" id="jmeno" name="jmeno" placeholder="Jmeno autora" /><br />
                </div>
            </div>
            <div class="radek">
                <div class="label">
                    <label for="prijmeni">Příjmení</label>
                </div>
                <div class="input">
                    <input type="text" id="prijmeni" name="prijmeni" placeholder="Prijmeni autora" /><br />
                </div>
            </div>
            <div class="radek">
                <div class="label">
                    <label for="nazev">Název</label>
                </div>
                <div class="input">
                    <input type="text" id="nazev" name="nazev" placeholder="Nazev" /><br />
                </div>
            </div>
            <div class="radek">
                <div class="label">
                    <label for="popis">Popis</label>
                </div>
                <div class="input">
                    <textarea id="popis" name="popis" rows="4" cols="21" placeholder="Popis"></textarea><br />
                </div>
            </div>
            <div class="radek">
                <div class="label">
                </div>
                <div class="input">
                    <button class="btnRef" name="vloz" type="submit">Vlož knihu</button>
                </div>
            </div>
        </form>
    </fieldset>
    <div class="radek">
        <div class="label">
            <button class="btnRef"><a href="zobrazKnihy.php">Zobraz knihy</a></button>
        </div>
        <div class="input">
            <button class="btnRef"><a href="vyhledejKnihu.php">Vyhledej knihy</a></button>
        </div>
    </div>
    <?php
    require "dblogin.php";
    if (!($con = mysqli_connect($host, $user, $password, $db))) {
        die("Nelze se připojit k databázovému serveru!</body></html>");
    }
    mysqli_query($con, "SET NAMES 'utf8'");

    if (isset($_POST["vloz"])) {
        $ISBN = addslashes($_POST["ISBN"]);
        $jmeno = addslashes($_POST["jmeno"]);
        $prijmeni = addslashes($_POST["prijmeni"]);
        $nazev = addslashes($_POST["nazev"]);
        $popis = addslashes($_POST["popis"]);


        if (mysqli_query($con, "INSERT INTO " . $tabulka . " (ISBN, jmeno, prijmeni, nazev, popis)
                    VALUES ('" . $ISBN . "','" . $jmeno . "','" . $prijmeni . "','" . $nazev . "','" . $popis . "')")) {
            ?><div class="vysledek"><?php
                echo "Vloženo";
            ?></div><?php
        } else {
            // echo "Nevloženo - chyba";
        }
    }
    mysqli_close($con);
    ?>
</body>

</html>