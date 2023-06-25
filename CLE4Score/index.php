<?php
require_once "includes/actions.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'GetAllScores':
                $data = GetScoresAll();
                break;
            case 'GetTop3':
                $data = GetScoresTop3();
                break;
            case 'CheckForPlayer':
                $data = CheckForPlayer($_GET['name']);
                break;
            default:
                $data = "Action Invalid";
                break;
        }
    }else{
        $data = "Error: No Action Defined in post.";
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'SaveScore':
                $data = SaveScore($_POST['name'], $_POST['score']);
                break;
            default:
                $data = "Action Invalid";
                break;
        }
    } else {
        $data = "Error: No Action Defined in post.";
    }
}

header("Content-Type: application/json");
echo json_encode($data);
exit;