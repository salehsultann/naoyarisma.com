 <?php
 
 $ad = $_POST['ad'];
 $il = $_POST['il'];
 $ilce = $_POST['ilce'];
 $okul = filter_input(INPUT_POST, "okul", FILTER_VALIDATE_INT);
 $telefon = $_POST['telefon'];
 $d_ad = $_POST['d_ad'];
 $d_telefon = $_POST['d_telefon'];
 
 var_dump($ad, $il, $ilce, $okul, $telefon, $telefon, $d_ad, $d_telefon);
 
$sql = "INSERT INTO message (ad, il, ilce, okul, telefon, d_ad, d_telefon)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
 
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "sssisss",
                       $ad,
                       $il,
                       $ilce,
                       $okul,
                       $telefon,
                       $d_ad,
                       $d_telefon);
                       
mysqli_stmt_execute($stmt);

echo "Record saved.";
                       
