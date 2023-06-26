<?php

$host = 'sql.hosted.hro.nl';
$user = '1062604';
$db = '1062604';
$pass = 'iefeikae';
$port = "3306";
$charset = 'utf8mb4';

$options = [
    \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
    \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
    \PDO::ATTR_EMULATE_PREPARES   => false,
];

$dsn = "mysql:host=$host;dbname=$db;charset=$charset;port=$port";
try {
    $pdo = new \PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    throw new \PDOException($e->getMessage(), (int)$e->getCode());
}

function CheckForPlayer($name)
{
    global $pdo;
    $query = "SELECT * FROM user where name=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$name]);
    return $stmt->fetchAll();
}

function SaveScore($name, $score)
{
    global $pdo;
    $ress = CheckForPlayer($name);
    $pid = 0;
    if(isset($ress[0]['id'])){
        if($ress[0]['name'] === $name){
            $pid = $ress[0]['id'];
        }
        $query = "INSERT INTO scores (score, user_id) values (?, ?)";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$score, $pid]);
        return "Inserted Score of value ".$score." into PID: ".$pid." with name ".$name;
    }else{
	//inser new user first
        $query = "INSERT INTO user (name) values (?)";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$name]);
        $pid = $pdo->lastInsertId();
        $query = "INSERT INTO scores (score, user_id) values  (?, ?)";
        $stmts = $pdo->prepare($query);
        $stmts->execute([$score, $pid]);
        return "Inserted Score of value ".$score." into NEW PID: ".$pid." with name ".$name;
    }
}

function GetScoresAll()
{
    global $pdo;
    $sql = "SELECT scores.id,scores.score,user.name FROM scores
INNER JOIN user on scores.user_id = user.id;";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}

function GetTopScore()
{
    global $pdo;
    $sql = "SELECT scores.id,MAX(scores.score) AS top_score,user.name FROM scores
INNER JOIN user on scores.user_id = user.id;";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll();
}

function GetPlayerScores($name)
{
    global $pdo;
    $sql = "SELECT scores.id,scores.score,user.name FROM scores INNER JOIN user on scores.user_id = user.id WHERE name=?;";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$name]);
    return $stmt->fetchAll();
}
