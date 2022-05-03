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

    <?php
    require "dblogin.php";
    if (!($con = mysqli_connect($host, $user, $password, $db))) {
        die("Nelze se připojit k databázovému serveru!</body></html>");
    }
    mysqli_query($con, "SET NAMES'utf8'");

    $obsah = mysqli_query($con, "SELECT * FROM `" . $tabulka . "`");
    //print_r($obsah);
    ?>
    <table>
        <Caption>
            Seznam uložených knih
        </Caption>
        <tr>
            <th>ISBN</th>
            <th>Jméno</th>
            <th>Příjmení</th>
            <th>Název</th>
            <th>Popis</th>
        </tr>
        <?php
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
        ?>
    </table>
    <div class="radek">
        <div class="label">
            <button class="btnRef"><a href="vlozKnihu.php">Vlož knihu</a></button>
        </div>
        <div class="input">
            <button class="btnRef"><a href="vyhledejKnihu.php">Vyhledej knihy</a></button>
        </div>
    </div>
</body>

</html>