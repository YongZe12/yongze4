<?php
// Simple feedback handler
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = htmlspecialchars($_POST['name']);
    $msg = htmlspecialchars($_POST['message']);
    if (strlen($name) < 1 || strlen($msg) < 1) {
        echo "Please enter both your name and a message!";
        exit();
    }
    // In practice, save to database or file, here just return thanks
    echo "Thank you, $name! 🌱 Your nature message was received!";
}
else {
    echo "Invalid request.";
}
?>