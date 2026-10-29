#------------------------------------------------------------------------------
# usage:  email for @smarter.sh - the SES domain identity and receipt rule.
#
#         ubc.smarter.sh has its own SES identity (smarter-infrastructure). A
#         verified subdomain doesn't cover its parent, so smarter.sh gets one
#         here. Nothing in this module touches ubc.smarter.sh.
#------------------------------------------------------------------------------

resource "aws_sesv2_email_identity" "domain" {
  email_identity = var.domain

  dkim_signing_attributes {
    next_signing_key_length = "RSA_2048_BIT"
  }
}

resource "aws_ses_receipt_rule_set" "inbound" {
  rule_set_name = local.rule_set_name
}

# A region has at most one active rule set. If another one is active in
# var.aws_region, applying this replaces it.
resource "aws_ses_active_receipt_rule_set" "inbound" {
  rule_set_name = aws_ses_receipt_rule_set.inbound.rule_set_name

  depends_on = [aws_ses_receipt_rule.forward]
}

# Every address at the domain: save the message to S3, then invoke the
# forwarder, which reads it from there.
resource "aws_ses_receipt_rule" "forward" {
  name          = local.rule_name
  rule_set_name = aws_ses_receipt_rule_set.inbound.rule_set_name
  recipients    = [var.domain]
  enabled       = true
  scan_enabled  = true
  tls_policy    = "Optional"

  s3_action {
    position          = 1
    bucket_name       = aws_s3_bucket.mail.id
    object_key_prefix = local.mail_prefix
  }

  lambda_action {
    position        = 2
    function_arn    = aws_lambda_function.forwarder.arn
    invocation_type = "Event"
  }

  # SES checks both permissions when the rule is created.
  depends_on = [
    aws_s3_bucket_policy.mail,
    aws_lambda_permission.ses,
  ]
}
