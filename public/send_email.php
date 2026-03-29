<?php
/**
 * Marrakech Weddings - Form Submission Backend (PHP)
 * This script sends email notifications for all site forms.
 * No 3rd party service limits!
 */

// 1. Configuration & Security
$to_email = "bentaouiloussama@gmail.com";
$from_name = "Marrakech Weddings Lead System";
$from_email = "noreply@marrakechweddings.com"; // Change to your domain email if available

// Simple CORS to allow your React app to send data
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle OPTIONS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// 2. Capture Data
$raw_data = file_get_contents("php://input");
$data = json_decode($raw_data, true);

if (!$data) {
    echo json_encode(["success" => false, "message" => "No data received"]);
    exit;
}

$name = strip_tags($data['contact_name'] ?? 'N/A');
$email = filter_var($data['contact_email'] ?? '', FILTER_SANITIZE_EMAIL);
$phone = strip_tags($data['contact_phone'] ?? 'N/A');
$service = strip_tags($data['service_type'] ?? 'General Inquiry');
$message = nl2br(strip_tags($data['message'] ?? ''));
$date = strip_tags($data['preferred_date'] ?? 'N/A');

// Validation
if (empty($name) || empty($email)) {
    echo json_encode(["success" => false, "message" => "Missing required fields"]);
    exit;
}

// 3. Email for Oussama (Admin)
$admin_subject = "NEW Lead: $name - $service";
$admin_headers = "MIME-Version: 1.0" . "\r\n" .
                "Content-type:text/html;charset=UTF-8" . "\r\n" .
                "From: $from_name <$from_email>" . "\r\n" .
                "Reply-To: $name <$email>";

$admin_html = "
<html>
<head>
    <style>
        body { font-family: sans-serif; background-color: #f7f7f7; padding: 20px; }
        .card { max-width: 600px; background: #fff; margin: auto; padding: 30px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-bottom: 20px; }
        .header h2 { margin: 0; color: #111; }
        .info { line-height: 1.8; color: #333; }
        .label { font-weight: bold; color: #888; display: inline-block; width: 100px; }
        .msg-box { background: #fdfaf5; padding: 20px; border-left: 3px solid #d4af37; margin-top: 20px; font-style: italic; }
    </style>
</head>
<body>
    <div class='card'>
        <div class='header'><h2>New Lead Captured</h2></div>
        <div class='info'>
            <p><span class='label'>Name:</span> $name</p>
            <p><span class='label'>Email:</span> $email</p>
            <p><span class='label'>Phone:</span> $phone</p>
            <p><span class='label'>Service:</span> $service</p>
            <p><span class='label'>Date:</span> $date</p>
        </div>
        <div class='msg-box'>\"$message\"</div>
    </div>
</body>
</html>
";

$admin_sent = mail($to_email, $admin_subject, $admin_html, $admin_headers);

// 4. Confirmation Email for Client
$client_subject = "Thank You for Your Inquiry - Marrakech Weddings";
$client_headers = "MIME-Version: 1.0" . "\r\n" .
                 "Content-type:text/html;charset=UTF-8" . "\r\n" .
                 "From: Oussama Bentaouil <$to_email>";

$client_html = "
<html>
<body style='font-family: serif; background-color: #f7f7f7; padding: 40px;'>
    <div style='max-width: 600px; margin: auto; background: #fff; padding: 50px; text-align: center;'>
        <h1 style='color: #d4af37; letter-spacing: 2px;'>THANK YOU</h1>
        <p style='color: #888; text-transform: uppercase; font-size: 13px;'>Marrakech Weddings</p>
        <hr style='border: 0.5px solid #eee; margin: 40px 0;'>
        <p style='font-size: 16px; color: #333; line-height: 1.8;'>
            Dear <b>$name</b>,<br><br>
            We are delighted to hear about your upcoming <b>$service</b>. Marrakech is a magical place, and we look forward to crafting an extraordinary experience for you.
        </p>
        <p style='font-size: 16px; color: #333;'>Our team will review your inquiry and reach out within 24 hours.</p>
        <br><br>
        <p style='color: #888;'>Warm regards,<br><b>Oussama Bentaouil</b><br>Lead Planner</p>
    </div>
</body>
</html>
";

mail($email, $client_subject, $client_html, $client_headers);

// 5. Response
if ($admin_sent) {
    echo json_encode(["success" => true, "message" => "Emails sent successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Oussama, the server could not send the email. Check PHP configuration."]);
}
?>
