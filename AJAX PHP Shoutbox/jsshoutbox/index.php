<?php include 'database.php'; ?>
<?php
    // Create Select Query
    $query = "SELECT * FROM shouts ORDER BY id ASC";
    $shouts = mysqli_query($con,$query);
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JS ShoutBox</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="js/app.js"></script>

</head>
<body>
<div id="container">
    <header>
        <h1>JS ShoutBox</h1>
    </header>
    <div id="shouts">
        <ul>
            <?php while($row = mysqli_fetch_assoc($shouts)) : ?>
            <li><strong><?php echo $row['name']; ?> :</strong> <?php echo $row['shout']; ?> [<?php echo $row['date']; ?>] </li>
            <?php endwhile; ?>
        </ul>
    </div>
    <footer>
        <form>
            <label>Name: </label>
            <input type="text" id="name">
            <label>Shout Text: </label>
            <input type="text" id="shout">
            <input type="submit" id="submit" value="SHOUT!">
        </form>
    </footer>
</div>
</body>
</html>