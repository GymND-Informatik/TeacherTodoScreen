<?php
$filePath = '../output.json';

if (file_exists($filePath)) {
    $fileContent = file_get_contents($filePath);
    echo $fileContent;
} else {
    echo "File not found.";
}
?>