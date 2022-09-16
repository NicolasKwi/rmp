<?php

if (isset($_POST['message'])) {


    $entete  = 'MIME-Version: 1.0' . "\r\n";
    $entete .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    /*$entete .= 'From: webmaster@monsite.fr' . "\r\n";*/
    $entete .= 'Reply-to: ' . $_POST['email'];

    $message = '<h1>Message envoyé depuis la page Contact de monsite.fr</h1>
        <p><b>Email : </b>' . $_POST['email'] . '<br>
        <b>Message : </b>' . htmlspecialchars($_POST['message']) . '</p>';


    /* Expression régulière permettant de vérifier qu'aucun 
    * en-tête n'est inséré dans nos champs */
    $regex_head = '/[\n\r]/';

    /* Si le formulaire n'est pas posté de notre site on renvoie 
    * vers la page d'accueil */
    if ($_SERVER['HTTP_REFERER'] != 'http://www.monsite.com/send_email.php') {
        header('Location: http://www.monsite.com/');
        $retour = 0;
    }
    /* On vérifie qu'il n'y a aucun header dans les champs */ 
    elseif (preg_match($regex_head, $_POST['email'])) {
        $retour = 0;
    } else {
        $retour = mail('nicolas.ki@laposte.net', 'Envoi depuis page Contact', $message, $entete);
    }

    if ($retour) {
        echo '<p>Votre message a bien été envoyé.</p>';
    } else {
        echo "<p>Erreur d'envoie du message.</p>";
    }
    echo '<a href="/index.html#form_contact">Retour vers le site</a>';
}
