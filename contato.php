<?php
/**
 * Script de Envio de E-mail - Dev Martins
 * Configurado para Hospedagem Hostinger
 */

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // --- CONFIGURAÇÃO ---
    $email_destino = "contato@devmartins.com.br"; // Seu e-mail Hostinger
    $assunto_site = "Novo Contato via Site - Dev Martins";

    // --- COLETA DE DADOS ---
    // Sanitização para evitar scripts maliciosos
    $nome = strip_tags(trim($_POST["nome"]));
    $email_usuario = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensagem = strip_tags(trim($_POST["mensagem"]));

    // Verifica se os campos estão preenchidos
    if (empty($nome) || empty($mensagem) || !filter_var($email_usuario, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Por favor, preencha todos os campos corretamente.'); window.history.back();</script>";
        exit;
    }

    // --- MONTAGEM DO E-MAIL ---
    $corpo_email = "Você recebeu uma nova mensagem pelo formulário do site:\n\n";
    $corpo_email .= "--------------------------------------------------\n";
    $corpo_email .= "NOME: $nome\n";
    $corpo_email .= "E-MAIL: $email_usuario\n";
    $corpo_email .= "MENSAGEM:\n$mensagem\n";
    $corpo_email .= "--------------------------------------------------\n";
    $corpo_email .= "Enviado em: " . date("d/m/Y H:i:s") . "\n";

    // --- CABEÇALHOS (HEADERS) ---
    // Na Hostinger, o 'From' deve ser o seu e-mail do domínio para evitar SPAM
    $headers = "From: " . $email_destino . "\r\n";
    $headers .= "Reply-To: " . $email_usuario . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // --- ENVIO ---
    if (mail($email_destino, $assunto_site, $corpo_email, $headers)) {
        // Sucesso: Redireciona para página de agradecimento
        header("Location: sucesso.html");
        exit;
    } else {
        // Erro no servidor
        echo "<script>alert('Erro ao processar o envio. Tente novamente mais tarde.'); window.history.back();</script>";
    }
} else {
    // Se tentarem acessar o arquivo diretamente sem POST
    header("Location: index.html");
    exit;
}
?>
