<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $textToSave = file_get_contents('php://input');

    if (!empty($textToSave)) {
        // Define the file path where you want to save the text
        $filePath = 'output.json';

        if (file_put_contents($filePath, $textToSave) !== false) {
            echo "Text saved successfully.";
        } else {
            echo "Error: Could not save the text.";
        }
    } else {
        echo "Error: Empty text received.";
    }
} else {
    echo "Error: Invalid request method.";
}
?>
