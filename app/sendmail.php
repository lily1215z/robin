<?php
    use PHPMailer\PHPMailer\PHPMailer;  //подключаем php из папки PHPMailer чтоб плагин заработал
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);  //обьявляем плагин
    $mail->CharSet = 'UTF-8';     //настройка кодировка чтоб не было каракулей
    $mail->setLanguage('ru', 'phpmailer/language/'); //подключаем языковой файл с папки PHPMailer чтоб ошибки выводились на понятном нам языке
    $mail->IsHTML(true);  //включаем возможность писать html теги

   
    $mail->setForm('info@fls.guru', 'Робин дизайнер');       // от кого письмо (емеил/имя или текст)  
    $mail->addAddress('webdeveloperjscss@gmail.com');      // кому отправить. Можно указать1 или несколько адресатов
    $mail->Subject = 'Hello. I am robin';         // тема письма

    // рука У фрилансера в форме были радиокнопки и выбирали левша или правша
    // $hand = "Правая";
    // if($_POST['hand'] == "left") {
    //     $hand = "Левая";
    // }

    // тело письма
    $body = '<h1>встречайте супер письмо!</h1>'; //создаем заголовок приветственный

    // проверки
    if(trim(!empty($_POST['name']))) {  //если поле не пустое то имени присваиваю значение поля
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }

    if(trim(!empty($_POST['email']))) {
        $body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }

    // if(trim(!empty($_POST['hand']))) {
    //     $body.='<p><strong>Рука:</strong> '.$hand.'</p>'; //идет переменная $hand левая или правая
    // }

    // if(trim(!empty($_POST['age']))) {
    //     $body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
    // }

    if(trim(!empty($_POST['message']))) {
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }

// Если нужно прикрепить файл к письму
// if(!empty($_FILES['image']['tmp_name'])) {
// //путь загрузки файла. В верстке у меня нет что прикреплять поэтому красное. Пишу про Фрилансеру
//     $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
//     // грузим файл
//     if(copy($_FILES['images']['tmp_name'], $filePath)) {
//         $fileAttach = $filePath;
//         $body.='<p><strong>Фот ов приложении</strong>';
//         $mail->addAttachment($fileAttach);
//     }
// }
// $mail->Body = $body;

// Отправляем
if(!$mail->send()) {  //если форма не отправилась то выдать ошибку
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
}

$response = ['message' => $message];  //формируем из этого json

header('Content-type: application/json');
echo json_encode($response);
?>