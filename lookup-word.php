<?php

$word = $_GET['word'];

// Check dictionary to see if this is a real word
$dictionaryResponse = 
  file_get_contents(
    "http://10.8.0.16/zhaoyun/findWords/dictionary.php?word=" .
          $word);
if ($dictionaryResponse == "-1") {
  echo "-1";
  return;
}

$vowels = array('a', 'e', 'i', 'o', 'u');

$score = 0;
for ($i=0; $i<strlen($word); $i++) {
  if (in_array($word[$i], $vowels))
    $score += 1;
  else
    $score += 2;
}

echo $score;

?>
