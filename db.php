<?php

$conn = mysqli_connect(
    "localhost",
    "root",
    "",
    "patient_management_module"
);

if (!$conn) {
    die("Connection Failed: " . mysqli_connect_error());
}

?>