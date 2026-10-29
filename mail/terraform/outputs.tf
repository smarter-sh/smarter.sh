output "mail_bucket" {
  description = "Where received messages are saved, under inbox/."
  value       = aws_s3_bucket.mail.id
}

output "forwarder_function" {
  description = "The Lambda function that forwards mail; its logs are in CloudWatch."
  value       = aws_lambda_function.forwarder.function_name
}

output "forwarder_address" {
  description = "Forwarded mail is sent from this address."
  value       = local.forwarder_address
}

output "smtp_host" {
  value = "email-smtp.${var.aws_region}.amazonaws.com"
}

output "smtp_username" {
  value = var.create_smtp_user ? aws_iam_access_key.smtp[0].id : null
}

# terraform output -raw smtp_password
output "smtp_password" {
  value     = var.create_smtp_user ? aws_iam_access_key.smtp[0].ses_smtp_password_v4 : null
  sensitive = true
}
