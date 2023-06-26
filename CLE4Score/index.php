<?php
require_once "includes/actions.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        switch ($_GET['action']) {
            case 'GetAllScores':
                $data = GetScoresAll();
                break;
            case 'GetTop':
                $data = GetTopScore();
                break;
            case 'CheckForPlayer':
                $data = CheckForPlayer($_GET['name']);
                break;
            case 'GetPlayerScores':
                $data = GetPlayerScores($_GET['name']);
                break;
            default:
                $data = "Action Invalid";
                break;
        }
    }else{
        $data = "Error: No Action Defined in Get.";
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'SaveScore':
                if(isset($_POST['name'], $_POST['score'])){
                    $data = SaveScore($_POST['name'], $_POST['score']);
                } else{
                    $data = "Missing one or more neccessary post data";
                }
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