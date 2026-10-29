#------------------------------------------------------------------------------
# usage:  email for @smarter.sh - SES SMTP credentials for sending.
#
#         A mail client such as Gmail ("Send mail as") sends through
#         email-smtp.<region>.amazonaws.com with these, so that replies go out
#         from @smarter.sh, DKIM-signed by SES. The same pattern as
#         smarter-infrastructure's smtp_user: the SMTP password is derived from
#         the IAM access key. It is in the Terraform state, which is why the
#         state bucket (terraform.smarter.sh) must stay private.
#------------------------------------------------------------------------------

resource "aws_iam_user" "smtp" {
  count = var.create_smtp_user ? 1 : 0
  name  = "${local.name}-smtp"
}

resource "aws_iam_access_key" "smtp" {
  count = var.create_smtp_user ? 1 : 0
  user  = aws_iam_user.smtp[0].name
}

# Only From addresses at the domain.
data "aws_iam_policy_document" "smtp" {
  statement {
    actions   = ["ses:SendRawEmail"]
    resources = ["*"]

    condition {
      test     = "StringLike"
      variable = "ses:FromAddress"
      values   = ["*@${var.domain}"]
    }
  }
}

resource "aws_iam_user_policy" "smtp" {
  count  = var.create_smtp_user ? 1 : 0
  name   = "send-as-${local.name}"
  user   = aws_iam_user.smtp[0].name
  policy = data.aws_iam_policy_document.smtp.json
}
