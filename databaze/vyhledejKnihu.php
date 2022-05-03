<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="styleSheet" href="knihy.css" type="text/css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Lato&family=Open+Sans:ital@1&family=Roboto&display=swap" rel="stylesheet">
</head>

<body>
    <fieldset>
        <legend>
            Kritéria vyhledávání
        </legend>
        <form method="POST" action="vyhledejKnihu.php">
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
                    <label for="ISBN">ISBN</label>
                </div>
                <div class="input">
                    <input type="text" id="ISBN" name="ISBN" placeholder="978-3-16-148410-0" /><br />
                </div>
            </div>
            <div class="radek">
                <div class="label">
                </div>
                <div class="input">
                    <button class="btnRef" name="najdi" type="submit">Najdi knihu</button>
                </div>
            </div>
    </fieldset>
    </form>
    <div class="radek">
        <div class="label">
            <button class="btnRef"><a href="vlozKnihu.php">Vlož knihu</a></button>
        </div>
        <div class="input">
            <button class="btnRef"><a href="zobrazKnihy.php">Zobraz knihy</a></button>
        </div>
    </div>
    <?php
    require "dblogin.php";
    if (!($con = mysqli_connect($host, $user, $password, $db))) {
        die("Nelze se připojit k databázovému serveru!</body></html>");
    }
    mysqli_query($con, "SET NAMES'utf8'");
    if (isset($_POST["najdi"])) {
        $ISBN = addslashes($_POST["ISBN"]);
        $jmeno = addslashes($_POST["jmeno"]);
        $prijmeni = addslashes($_POST["prijmeni"]);
        $nazev = addslashes($_POST["nazev"]);

        //$obsah = mysqli_query($con,"SELECT * FROM `produkt` WHERE `id_produkt` = '" . $id_produkt . "'");

        $obsah = mysqli_query($con, "SELECT * FROM `" . $tabulka . "`
                    WHERE `ISBN` = '" . $ISBN . "' OR `jmeno`  = '" . $jmeno . "'      
                    OR `prijmeni`  = '" . $prijmeni . "' OR `nazev`  = '" . $nazev . "'
                    ");
        //print_r($obsah);
    }
    ?>
    <table>
        <Caption>
            Seznam vyhledaných knih
        </Caption>
        <tr>
            <th>ISBN</th>
            <th>Jméno</th>
            <th>Příjmení</th>
            <th>Název</th>
            <th>Popis</th>
        </tr>
        <?php
        if (isset($_POST["najdi"])) {
            while ($radek = mysqli_fetch_array($obsah)) {
        ?>
                <tr>
                    <td> <?php echo htmlspecialchars($radek["ISBN"]); ?> </td>
                    <td> <?php echo htmlspecialchars($radek["jmeno"]); ?> </td>
                    <td> <?php echo htmlspecialchars($radek["prijmeni"]); ?> </td>
                    <td> <?php echo htmlspecialchars($radek["nazev"]); ?> </td>
                    <td> <?php echo htmlspecialchars($radek["popis"]); ?> </td>
                </tr>
        <?php
            }
            mysqli_free_result($obsah);
            mysqli_close($con);
        }
        ?>
    </table>
</body>

</html>